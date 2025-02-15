"use client";


import Split from "react-split";
import {Editor, Monaco} from "@monaco-editor/react";
import React, {useEffect, useRef, useState} from "react";
import {IconEdit, IconRun} from "@tabler/icons-react";
import {AxiosInstance} from "@/app/utils/axiosInstance";
import {Project} from "@/app/components/ui/HomePageProjects";
import {Button} from "@/components/ui/button";
import {useProject} from "@/app/context/ProjectContext";
import {editor, IPosition} from 'monaco-editor';
import MonacoCollabExt, {EditorContentManager, RemoteCursorManager} from "@convergencelabs/monaco-collab-ext";


const allLanguages = [
    "java",
    "python",
    "javascript",
    "cpp",
    "golang"
]


const CodeEditor = ({projectId}: { projectId: string | null }) => {
    const [editorLanguage, setEditorLanguage] = React.useState<string>("cpp");
    const [codeEditor, setCodeEditor] = useState<editor.IStandaloneCodeEditor>();
    const {setProject} = useProject();

    const cRef = useRef<EditorContentManager | null>(null);
    const [projectName, setProjectName] = useState(null);
    const [currentProject, setCurrentProject] = useState<Project | null>(null);
    const [writtenCode, setWrittenCode] = useState<string | null>(null);
    const [output, setOutput] = useState<string | null>(null);
    useEffect(() => {
        fetchProjectWithProjectId(projectId);
    }, [projectId]);

    useEffect(() => {
        const updateRemoteCursors = () => {
            if (!codeEditor) return; // Ensure editor exists before running effect
            console.log("hoi");

            const remoteCursorManager = new RemoteCursorManager({
                editor: codeEditor,
                tooltips: true,
                tooltipDuration: 2
            });

            const cursor = remoteCursorManager.addCursor("jDoe", "blue", "John Doe");
            cursor.setPosition({lineNumber : 10, column : 1 })
            cursor.show()

        }
        updateRemoteCursors()
    }, [codeEditor]);



    const fetchProjectWithProjectId = async (projectId: string | null) => {
        const response = await AxiosInstance.get("/api/v1/project/" + projectId);
        if (response.status === 200) {
            setCurrentProject(response.data);
            setEditorLanguage(response.data.language)
            console.log(response.data);
            setProject(response.data);
        }
    }

    const runCode = async () => {
        const dataToSend = {
            code: writtenCode,
            language: editorLanguage
        }
        const response = await AxiosInstance.post("/api/v1/editor/compile", dataToSend);
        if (response.status === 200) {
            if (response.data.status === true) {
                setOutput(response.data.output);
            } else {
                setOutput(response.data.output);
            }
        }
    }


    const editorDidMount = (editor: editor.IStandaloneCodeEditor) => {
        // Handle regular cursor movements

        console.log("editorDidMount");
        setCodeEditor(editor);
        editor.onDidChangeCursorPosition((event) => {
            console.log("Cursor moved:", event.position);
            // Send cursor position to WebSocket here
            // editor.setPosition({lineNumber : 1, column : 1});
        });

        // Special handling for paste operations
        editor.onDidPaste(() => {
            // Use setTimeout to ensure we get the final cursor position
            setTimeout(() => {
                const position = editor.getPosition();
                if (position) {
                    console.log("Cursor after paste:", position);
                    // Send updated position to WebSocket here

                    // Force a cursor position change notification
                    editor.trigger('paste', 'cursorUpdate', {});
                }
            }, 0);
        });
    }
    return <div className="">
        <div className="w-full flex flex-row justify-between h-auto dark:bg-[#4e4c4c] p-3 px-10">
            <h3 className="text-black flex flex-row gap-1 dark:text-white"><span>{currentProject?.title}</span>
                <span><IconEdit/></span></h3>
            <div>
                {/*<Button onClick={runCode} className="bg-green-600 text-white px-6"><IconRun/>Run</Button>*/}
                <Button onClick={() => {
                    cRef.current?.insert(10, "teare")
                }}>Add Text</Button>
            </div>
            <div className="flex flex-row gap-1">
                <h1 className="dark:text-white uppercase font-bold text-sm">
                    {editorLanguage}
                </h1>
            </div>
        </div>
        <Split
            className={`split`}
            sizes={[75, 25]} // Initial sizes: 25% left, 75% right
            minSize={[600, 250]}// Minimum size: 20% for both sections
            expandToMin={false}
            gutterSize={10}
            gutterAlign="center"
            snapOffset={30}
            dragInterval={1}
            direction="horizontal"
            cursor="col-resize"
        >
            <Editor onChange={(value) => {
                setWrittenCode(value!!)
            }} defaultLanguage={editorLanguage} onMount={editorDidMount} theme="vs-light" defaultValue='' height="90vh"
                    width="90%"/>
            <div className="bg-white text-black">
                <div className="bg-white text-black">
                    {output && output.split('\n').map((line, index) => (
                        <div key={index}>{line}</div>
                    ))}
                </div>
            </div>
        </Split>
    </div>
}

export default CodeEditor;