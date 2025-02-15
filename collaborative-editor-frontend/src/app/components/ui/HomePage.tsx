"use client";

import React, {useRef} from "react";
import {useUser} from '@/app/context/UserContext'
import HomePageProjects from "@/app/components/ui/HomePageProjects";

const HomePage = () => {

    return (
        <div className="w-full flex justify-center items-center ">
            <HomePageProjects/>
        </div>
    )
};
export default HomePage;