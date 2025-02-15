"use client";

import Split from "react-split";
import { Editor } from "@monaco-editor/react";
import React, { useEffect, useRef, useState } from "react";
import { IconEdit, IconRun } from "@tabler/icons-react";
import { AxiosInstance } from "@/app/utils/axiosInstance";
import { Project } from "@/app/components/ui/HomePageProjects";
import { Button } from "@/components/ui/button";
import { useProject } from "@/app/context/ProjectContext";
import { editor } from "monaco-editor";
import { useUser } from "@/app/context/UserContext";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

// Yjs and binding imports
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { MonacoBinding } from "y-monaco";

const CollaborativeCodeEditor = ({
                                     projectId,
                                     sessionId,
                                 }: {
    projectId: string | null;
    sessionId: string | null;
}) => {
    const { user } = useUser();
    const { setProject } = useProject();

    // Local state
    const [editorLanguage, setEditorLanguage] = useState<string>("cpp");
    const [currentProject, setCurrentProject] = useState<Project | null>(null);
    const [output, setOutput] = useState<string | null>(null);
    const [activeUsers, setActiveUsers] = useState<Record<string, string>>({});

    const yDocRef = useRef<Y.Doc>(null);
    const providerRef = useRef<WebsocketProvider | null>(null);
    const yTextRef = useRef<Y.Text>(null);
    const decorationsRef = useRef<string[]>([]);

    useEffect(() => {
        if (!yDocRef.current) {
            yDocRef.current = new Y.Doc();
            providerRef.current = new WebsocketProvider(
                "ws://localhost:1234",
                "test-room1",
                yDocRef.current
            );
            yTextRef.current = yDocRef.current.getText("monaco");

            // Set up awareness
            if (providerRef.current && user) {
                providerRef.current.awareness.setLocalStateField("user", {
                    name: user.firstName + " " + user.lastName,
                    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                    id: user.userId,
                });
            }
        }

        return () => {
            providerRef.current?.destroy();
            yDocRef.current?.destroy();
            yDocRef.current = null;
            providerRef.current = null;
        };
    }, [user]);

    const editorRef = useRef<editor.IStandaloneCodeEditor>(null);

    // Dynamically create styles for each user
    const injectCursorLabelStyles = (name: string, color: string, clientId: number) => {
        const className = `remote-cursor-label-${clientId}`;
        if (document.querySelector(`.${className}`)) return;

        const style = document.createElement("style");
        style.textContent = `
      .${className}::before {
          content: "${name}";
          position: absolute;
          top: -24px;
          left: -2px;
          background-color: ${color};
          color: white;
          padding: 2px 6px;
          font-size: 12px;
          font-weight: bold;
          white-space: nowrap;
          border-radius: 3px;
          pointer-events: none;
          z-index: 100;
          user-select: none;
      }
    `;
        document.head.appendChild(style);
    };

    // Update remote user cursors
    const updateRemoteSelections = () => {
        if (!editorRef.current || !providerRef.current) return;

        // Clear previous decorations
        decorationsRef.current = editorRef.current.deltaDecorations(decorationsRef.current, []);

        const decorations: editor.IModelDeltaDecoration[] = [];
        const states = providerRef.current.awareness.getStates() as Map<
            number,
            { user: { name: string; color: string; id: string }; cursor: any }
        >;

        states.forEach((state, clientId) => {
            if (!state.cursor || state.user.id === user?.userId) return;

            const { cursor, user: remoteUser } = state;

            if (!cursor.anchor || !cursor.head) return;

            const range = new monaco.Range(
                cursor.anchor.line + 1,
                cursor.anchor.character + 1,
                cursor.head.line + 1,
                cursor.head.character + 1
            );

            // Add cursor decoration with a unique class for this user
            decorations.push({
                range: range,
                options: {
                    className: "remote-cursor",
                    isWholeLine: false,
                    stickiness: monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
                    before: {
                        content: "|",
                        inlineClassName: `remote-cursor-${clientId}`,
                    },
                },
            });

            // Add user label decoration
            decorations.push({
                range: range,
                options: {
                    className: `remote-cursor-label-${clientId}`,
                    isWholeLine: false,
                },
            });

            injectCursorLabelStyles(remoteUser.name, remoteUser.color, clientId);
        });

        // Apply new decorations
        decorationsRef.current = editorRef.current.deltaDecorations([], decorations);
    };

    // Fetch project info
    useEffect(() => {
        if (!projectId) return;
        const fetchProjectWithProjectId = async (projectId: string) => {
            const response = await AxiosInstance.get("/api/v1/project/" + projectId);
            if (response.status === 200) {
                setCurrentProject(response.data);
                setEditorLanguage(response.data.language);
                setProject(response.data);
            }
        };
        fetchProjectWithProjectId(projectId);
    }, [projectId, setProject]);

    // Run code button
    const runCode = async () => {
        const code = yTextRef.current?.toString();
        const response = await AxiosInstance.post("/api/v1/editor/compile", {
            code,
            language: editorLanguage,
        });
        if (response.status === 200) {
            setOutput(response.data.output);
        }
    };

    // Editor mount callback
    const editorDidMount = (editor: editor.IStandaloneCodeEditor) => {
        editorRef.current = editor;
        new MonacoBinding(
            yTextRef.current!,
            editorRef.current.getModel()!,
            new Set([editorRef.current]),
            providerRef.current!.awareness
        );

        // Track cursor position changes
        editor.onDidChangeCursorPosition(() => {
            const position = editor.getPosition();
            if (!position || !providerRef.current) return;

            const selection = editor.getSelection();
            if (!selection) return;

            providerRef.current.awareness.setLocalStateField("cursor", {
                anchor: { line: selection.startLineNumber - 1, character: selection.startColumn - 1 },
                head: { line: selection.endLineNumber - 1, character: selection.endColumn - 1 },
            });
        });

        // Update cursors when awareness changes
        if (providerRef.current) {
            providerRef.current.awareness.on("change", updateRemoteSelections);
        }

        // Force initial update of remote selections
        updateRemoteSelections();
    };

    return (
        <div className="">
            <div className="w-full flex flex-row justify-between h-auto dark:bg-[#4e4c4c] p-3 px-10">
                <h3 className="text-black flex flex-row gap-1 dark:text-white">
                    <span>{currentProject?.title}</span>
                    <span>
            <IconEdit />
          </span>
                </h3>
                <div>
                    <Button onClick={runCode} className="bg-green-600 text-white px-6">
                        <IconRun /> Run
                    </Button>
                </div>
                <div className="flex justify-center items-center gap-10">
                    <h1 className="dark:text-white uppercase font-bold text-sm">
                        {editorLanguage}
                    </h1>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Online users" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.values(activeUsers).map((username, index) => (
                                <SelectItem key={index} value={username}>
                                    {username}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <Split
                className="split"
                sizes={[75, 25]}
                minSize={[600, 250]}
                expandToMin={false}
                gutterSize={10}
                gutterAlign="center"
                snapOffset={30}
                dragInterval={1}
                direction="horizontal"
                cursor="col-resize"
            >
                <Editor
                    defaultLanguage={editorLanguage}
                    onMount={editorDidMount}
                    theme="vs-light"
                    defaultValue=""
                    height="90vh"
                    width="90%"
                />
                <div className="bg-white text-black">
                    {output &&
                        output.split("\n").map((line, index) => <div key={index}>{line}</div>)}
                </div>
            </Split>
        </div>
    );
};

export default CollaborativeCodeEditor;
