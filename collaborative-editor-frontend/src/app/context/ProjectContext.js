"use client";
import {createContext, useContext, useState} from "react";

const ProjectContext = createContext();

export const ProjectProvider = ({children}) => {
    const [project, setProject] = useState(null);

    return (
        <ProjectContext.Provider value={{project, setProject}}>{children}</ProjectContext.Provider>
    )
}

export const useProject = () => useContext(ProjectContext);