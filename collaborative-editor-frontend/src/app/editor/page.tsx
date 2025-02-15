"use client"

import CustomNavbar from "@/app/components/ui/CustomNavbar";
import SignupPage from "@/app/components/ui/SignupPage";
import CodeEditor from "@/app/components/ui/CodeEditor";
import {useSearchParams} from "next/navigation";

export default function Editor() {

    const searchParams = useSearchParams();

    const projectId : string | null = searchParams.get("projectId");


    return (
        <div>
            <CustomNavbar isProjectOpen={true} />
            <CodeEditor projectId={projectId} />
        </div>
    );
}