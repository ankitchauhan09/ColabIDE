"use client";

import {Input} from "@/components/ui/input";
import React, {useEffect, useRef, useState} from "react";
import {useUser} from "@/app/context/UserContext";
import {AxiosInstance} from "@/app/utils/axiosInstance";
import {MagicCard} from "@/components/ui/magic-card";
import {useTheme} from "next-themes";
import {useRouter} from 'next/navigation'
import {MultiStepLoader} from "@/components/ui/multi-step-loader";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";



const allLanguages = [
    "java",
    "python",
    "javascript",
    "cpp",
    "golang"
]


export interface Project {
    projectId: string;
    userId: string;
    title: string;
    createdAt: string;
}

type LoadingState = {
    text: string;
};

const HomePageProjects = () => {
    const {theme} = useTheme();
    const {user} = useUser();
    const [allProjects, setAllProjects] = useState<Project[]>([]);
    const [clickedProjectId, setClickedProjectId] = useState<string | null>(null); // State for clicked card
    const projectTitleInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingSteps, setLoadingSteps] = useState<LoadingState[]>([]);
    const router = useRouter();
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);


    useEffect(() => {
        if (user?.userId) {
            setLoadingSteps([{text: "Fetching projects..."}]);
            setLoading(true);
            fetchAllProjectsByUserId(user.userId);
        }
    }, [user]);

    const fetchAllProjectsByUserId = async (userId: string) => {
        try {
            const response = await AxiosInstance.get("/api/v1/project/user/" + userId);
            if (response.status === 200) {
                setAllProjects(response.data);
                console.log(response.data);
            }
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setLoading(false);
        }
    };

    const createProject = async () => {
        if (!projectTitleInputRef.current?.value) {
            alert("Project title cannot be empty");
            return;
        }

        setLoadingSteps([
            {text: "Creating project..."},
            {text: "Project Created"},
            {text: "Configuring IDE"},
            {text: "Redirecting to the IDE"}
        ]);
        setLoading(true);

        try {
            const project = {
                title: projectTitleInputRef.current?.value,
                userId: user.userId,
                language: selectedLanguage
            };

            const response = await AxiosInstance.post("/api/v1/project/new", project);
            if (response.status === 200) {
                console.log(response);
                setAllProjects([response.data, ...allProjects]);
                console.log(response.data.projectId);
                navigateToEditor(response.data.projectId)
            } else {
                console.error("Error while creating project");
            }
        } catch (error) {
            console.error("Error creating project:", error);
        }
    };

    const navigateToEditor = (projectId: string) => {
        setTimeout(() => {
            setLoading(false);
            router.push("/editor?projectId=" + projectId);
        }, 8000)
    }


    const handleCardClick = (projectId: string) => {
        setClickedProjectId(projectId); // Toggle clicked state
        setLoadingSteps([
            {text: "Fetching project details..."},
            {text: "Project fetched..."},
            {text: "Configuring IDE"},
            {text: "Redirecting to the IDE"}
        ])
        setLoading(true)
        navigateToEditor(projectId);
    };

    return (
        <>
            {loading ? (
                <MultiStepLoader loading={loading} loadingStates={loadingSteps}/>
            ) : (
                <div className="flex flex-col gap-8 justify-center mt-20 w-full items-center">
                    <div className="flex flex-col gap-8 justify-center mt-20 items-center w-full">
                        <Input
                            ref={projectTitleInputRef}
                            placeholder="Enter project name"
                            className="w-2/5 font-medium text-slate-400 text-center px-5 py-5"
                        />
                        <Select onValueChange={(val) => setSelectedLanguage(val)}>
                            <SelectTrigger className="w-2/5 font-medium text-slate-400 text-center px-5 py-5">
                                <SelectValue placeholder="Choose programming language"/>
                            </SelectTrigger>
                            <SelectContent>
                                {allLanguages.map((lang, index) => (
                                    <SelectItem value={lang}
                                                onSelect={(event) => setSelectedLanguage(lang)}>{lang}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <button
                            onClick={createProject}
                            className="inline-flex py-2 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                        >
                            Create
                        </button>
                    </div>
                    <div className="w-full px-40">
                        <div
                            className="flex justify-center items-center h-auto w-full flex-col gap-4 lg:h-auto md:flex-row flex-wrap lg:flex-row">
                            {allProjects.map((project) => (
                                <MagicCard
                                    key={project.projectId}
                                    className={`cursor-pointer py-5 flex-col items-center justify-center whitespace-nowrap text-lg shadow-2xl w-auto px-20 ${
                                        clickedProjectId === project.projectId
                                            ? "transform scale-105 transition-all duration-300 bg-gray-300"
                                            : ""
                                    }`}
                                    gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
                                    onClick={() => handleCardClick(project.projectId)} // Ensure onClick is correct
                                >
                                    {project.title}
                                </MagicCard>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default HomePageProjects;
