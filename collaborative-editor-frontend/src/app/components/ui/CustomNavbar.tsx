"use client";

import {useRouter} from "next/navigation";
import {Button, Collapse, IconButton, Navbar, Typography,} from "@material-tailwind/react";
import {IconBrandGithub} from "@tabler/icons-react";
import {useEffect, useState} from "react";
import {useUser} from '@/app/context/UserContext'
import {useProject} from "@/app/context/ProjectContext"
import {AxiosInstance} from "@/app/utils/axiosInstance";
import {toast} from 'sonner'


interface ColabSessionInterface {
    sessionId: string,
    participatingUserId: [],
    hostUserId: string,
    projectId: string,
    startTime: string
}

export default function CustomNavbar({isProjectOpen}: { isProjectOpen: boolean }) {
    const [openNav, setOpenNav] = useState(false);
    const router = useRouter();
    const {project} = useProject();
    const {user, logout} = useUser();

    const navbarItems = [
        {
            label: "Editor",
            link: "/"
        },
        {
            label: "Contact",
            link: "/contact"
        },
        {
            label: <IconBrandGithub/>,
            link: "/github"
        },
    ]

    useEffect(() => {
        window.addEventListener("resize", () => {
            window.innerWidth >= 960 && setOpenNav(false);
        });
    }, [user]);

    const customCommandMap = {
        npm: "npm run shadcn add button",
        yarn: "yarn shadcn add button",
        pnpm: "pnpm dlx shadcn@latest add button",
        bun: "bun x shadcn@latest add button",
    };

    const createCollabSession = async () => {
            console.log("Creating a collaborative session...");

            try {
                const collaborativeSession = {
                    projectId: project.projectId,
                    hostUserId: user.userId,
                    joinedUseridList: [user.userId],
                };

                const response = await AxiosInstance.post(
                    "/api/v1/project/create/colab-session",
                    collaborativeSession
                );

                console.log("Response received:", response);

                if (response.status === 200) {
                    toast("Click the link to open the project in colaboration mode..", {
                        description: (
                            <p
                                // href={`http://localhost:8080/collab?projectId=${response.data.sessionId}`}
                                onClick={() => {
                                    console.log(response.data)
                                    console.log("Navigating to:", `/collab?projectId=${response.data.projectId}&sessionId=${response.data.sessionId}`);
                                    router.push(`/collab?projectId=${response.data.projectId}&sessionId=${response.data.sessionId}`);
                                }
                                }
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                            >
                                Click to open
                            </p>
                        ),
                        action: {
                            label: "Undo",
                            onClick: () => console.log("Undo"),
                        },
                    })
                }
            } catch
                (error) {
                console.error("Error creating session:", error);
                toast("Event has been created", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                    action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                    },
                })
            }
        }
    ;


    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            {isProjectOpen && (<Typography
                as="li"
                variant="small"
                className="p-1 font-normal text-gray-700 dark:text-gray-300"
                placeholder={null} onPointerEnterCapture={null}
                onPointerLeaveCapture={undefined}
            >
                <a className="flex cursor-pointer items-center" onClick={createCollabSession}>
                    Collab
                </a>
            </Typography>)}

            {navbarItems.map((item, index) =>
                (<Typography
                        as="li"
                        variant="small"
                        key={index}
                        className="p-1 font-normal text-gray-700 dark:text-gray-300"
                        placeholder={null} onPointerEnterCapture={null}
                        onPointerLeaveCapture={undefined}
                    >
                        <a className="flex cursor-pointer items-center" onClick={() => router.push(`${item.link}`)}
                        >
                            {item.label}
                        </a>
                    </Typography>
                )
            )}
        </ul>
    );

    return (
        <>
            <Navbar
                className="sticky top-0 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 bg-transparent !border-none"
                placeholder={null} onPointerEnterCapture={null}
                onPointerLeaveCapture={undefined}>
                <div className="flex items-center justify-between text-gray-900 dark:text-gray-100">
                    <Typography
                        as="a"
                        href="#"
                        className="mr-4 cursor-pointer py-1.5 font-medium" placeholder={null}
                        onPointerEnterCapture={null} onPointerLeaveCapture={null}
                    >
                        CollabIDE <span className="text-sm">By Ankit Chauhan</span>
                    </Typography>
                    <div className="flex items-center gap-4">
                        <div className="mr-4 hidden lg:block">{navList}</div>
                        {!user && (<div className="flex items-center gap-x-1">
                                <Button
                                    variant="text"
                                    size="sm"
                                    className="hidden lg:inline-block text-gray-900 dark:text-gray-100"
                                    onClick={() => router.push("/login")}
                                    placeholder={null} onPointerEnterCapture={null}
                                    onPointerLeaveCapture={undefined}
                                >
                                    <span>Log In</span>
                                </Button>
                                <Button
                                    variant="gradient"
                                    size="sm"
                                    className="hidden lg:inline-block text-gray-900 dark:text-gray-100"
                                    onClick={() => router.push("/signup")}
                                    placeholder={null} onPointerEnterCapture={null}
                                    onPointerLeaveCapture={undefined}
                                >
                                    <span>Sign up</span>
                                </Button>
                            </div>
                        )}
                        {user && (
                            <div className="flex items-center gap-x-1">
                                <Button
                                    variant="gradient"
                                    size="sm"
                                    className="hidden lg:inline-block text-gray-900 dark:text-gray-100"
                                    onClick={() => {
                                        logout()
                                        router.push("/")
                                    }}
                                    placeholder={null} onPointerEnterCapture={null}
                                    onPointerLeaveCapture={undefined}
                                >
                                    <span>Logout</span>
                                </Button>
                            </div>
                        )}
                        <IconButton
                            variant="text"
                            className="ml-auto h-6 w-6 text-gray-900 dark:text-gray-100 lg:hidden"
                            ripple={false}
                            onClick={() => setOpenNav(!openNav)}
                            placeholder={null} onPointerEnterCapture={null}
                            onPointerLeaveCapture={undefined}
                        >
                            {openNav ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </IconButton>
                    </div>
                </div>
                <Collapse open={openNav}>
                    {navList}
                    <div className="flex items-center gap-x-1">
                        <Button
                            fullWidth
                            variant="text"
                            size="sm"
                            className="text-gray-900 dark:text-gray-100"
                            onClick={() => router.push("/login")}
                            placeholder={null} onPointerEnterCapture={null}
                            onPointerLeaveCapture={undefined}
                        >
                            <span>Log In</span>
                        </Button>
                        <Button
                            fullWidth
                            variant="gradient"
                            size="sm"
                            className="text-gray-900 dark:text-gray-100"
                            onClick={() => router.push("/signup")}
                            placeholder={null} onPointerEnterCapture={null}
                            onPointerLeaveCapture={undefined}
                        >
                            <span>Sign up</span>
                        </Button>
                    </div>
                </Collapse>
            </Navbar>
        </>
    );
}