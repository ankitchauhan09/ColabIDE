"use client";
import React, {useState} from "react";
import {Label} from "./Label";
import {Input} from "./Input";
import {cn} from "@/app/lib/utils";
import {IconBrandGithub, IconBrandGoogle,} from "@tabler/icons-react";
import {useRouter} from "next/navigation";
import {AxiosInstance} from '@/app/utils/axiosInstance';
import {useUser} from '@/app/context/UserContext'

export default function LoginPage() {

    const {login} = useUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loginUser(email, password);
    };

    const loginUser = async (email : string, password: string) => {
        const loginPayload = {email: email, password: password};
        const response = await AxiosInstance.post('/api/v1/auth/login', loginPayload);
        if(response.status === 200) {
            console.log(response);
            login(response.data);
            router.push("/");
        } else {
            console.error("Error while logining the user");
        }
    }

    return (
        <div className="flex justify-center items-center w-full min-h-screen overflow-hidden">
            <div
                className="max-w-md mix-blend-normal  w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-card shadow-white bg-white dark:bg-black">
                <h2 className="font-bold text-xl dark:text-white text-black text-neutral-800 dark:text-neutral-200">
                    Welcome to Aceternity
                </h2>
                <p className="dark:text-neutral-600 dark:text-white text-black text-sm max-w-sm mt-2 dark:text-neutral-300">
                    Login to aceternity if you can because we don&apos;t have a login flow
                    yet
                </p>

                <form className="my-8" onSubmit={handleSubmit}>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Email Address</Label>
                        <Input onChange={(event) => setEmail(event.target.value)} id="email" placeholder="projectmayhem@fc.com" type="email"/>
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="password">Password</Label>
                        <Input onChange={(event) => setPassword(event.target.value)} id="password" placeholder="••••••••" type="password"/>
                    </LabelInputContainer>
                    <button
                        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                        type="submit"
                    >
                        Sign up &rarr;
                        <BottomGradient/>
                    </button>

                    <div
                        className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full"/>

                    <div className="flex flex-col space-y-4">
                        <button
                            className=" relative dark:bg-[#323232cc] dark:text-white group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                            type="submit"
                        >
                            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300"/>
                            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                GitHub
              </span>
                            <BottomGradient/>
                        </button>
                        <button
                            className=" relative dark:bg-[#323232cc] dark:text-white group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                            type="submit"
                        >
                            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300"/>
                            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                Google
              </span>
                            <BottomGradient/>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span
                className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"/>
            <span
                className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"/>
        </>
    );
};

const LabelInputContainer = ({
                                 children,
                                 className,
                             }: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
