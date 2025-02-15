"use client";

import { useSearchParams } from "next/navigation";
import ColaborativeCodeEditor from "@/app/components/ui/ColaborativeCodeEditor";

const Collab = () => {
    const searchParams = useSearchParams();
    const projectId = searchParams.get("projectId");  // Access here
    const sessionId = searchParams.get("sessionId");
    console.log("Project ID:", projectId); // Debugging step
    console.log("Session ID:", sessionId);
    return (
        <ColaborativeCodeEditor projectId={projectId} sessionId={sessionId}/>
    );
};

export default Collab;
