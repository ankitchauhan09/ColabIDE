"use client";

import React, { useEffect } from "react";

import CustomNavbar from "./components/ui/CustomNavbar";
import HomePage from "@/app/components/ui/HomePage";
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import {BackgroundBeams} from "@/components/ui/background-beams";

export default function Home() {
    const { user, isInitialized } = useUser();
    const router = useRouter();

    useEffect(() => {
        // Redirect only after initialization
        if (isInitialized && !user) {
            router.push("/login");
        }
        console.log(user)
    }, [isInitialized, user, router]);

    // Show a loading state while initializing user
    if (!isInitialized) {
        return <div>Loading...</div>;
    }

    // Render the home page if user is logged in
    return (
        <div className="min-h-screen relative dark:bg-black/20 bg-white">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <BackgroundBeams/>
            </div>

            {/* Main Content */}
            <div className="relative">
                <CustomNavbar isProjectOpen={false}/>
                {isInitialized && user && <HomePage />}
            </div>

        </div>
    );

}
