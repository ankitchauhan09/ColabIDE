import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {UserProvider} from "@/app/context/UserContext";
import ReactLenis from "lenis/react";
import {ProjectProvider} from "@/app/context/ProjectContext";
import {Toaster} from "@/components/ui/sonner";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <html className="dark" lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <ReactLenis root>
            <UserProvider>
                <ProjectProvider>
                    {children}
                    <Toaster />
                </ProjectProvider>
            </UserProvider>
        </ReactLenis>
        </body>
        </html>
    );
}
