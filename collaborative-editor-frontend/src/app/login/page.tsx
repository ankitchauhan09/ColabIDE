"use client";

import LoginPage from "@/app/components/ui/LoginPage"; // Update the path if necessary
import CustomNavbar from "../components/ui/CustomNavbar";
import { div } from "framer-motion/client";

export default function Login() {
  return (
    <div>
      <CustomNavbar isProjectOpen={false} />
      <LoginPage />
    </div>
  );
}
