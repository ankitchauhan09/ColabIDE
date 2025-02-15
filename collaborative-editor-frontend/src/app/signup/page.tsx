    import SignupPage from '@/app/components/ui/SignupPage';
        import CustomNavbar from "@/app/components/ui/CustomNavbar";


    export default function Signup() {
        return (
            <div>
                <CustomNavbar isProjectOpen={false} />
                <SignupPage />
            </div>
        );
    }
