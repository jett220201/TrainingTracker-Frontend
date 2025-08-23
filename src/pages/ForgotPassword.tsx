import { Link } from "react-router-dom";
import Header from "../components/Public/Header";
import { LucideArrowLeft, LucideKeyRound, LucideMail, LucideSend, LucideShield } from "lucide-react";
import FeatureIcon from "../components/ui/FeatureIcon";
import IconInput from "../components/ui/IconInput";
import { useState } from "react";
import { IconButton } from "../components/ui/IconButton";
import AlertBlock from "../components/ui/AlertBlock";
import { userApi } from "../api/userApi";
import type { UserRecoveryPasswordRequest } from "../types/dto/UserRecoveryPasswordRequest";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState<string | null>(null)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        const payload = {
            email : email
        }
        try {
            const response = await userApi.recoveryPassword(payload as UserRecoveryPasswordRequest);
            setMessage(response.message);
        }
        catch (error : any) {
            setMessage(error.details != undefined ? error.details : error.message)
        }
    }

    return (
        <div className="flex w-full h-full flex-col items-center justify-center bg-gray-100">
            <div className="flex flex-col items-center justify-center gap-6 lg:gap-4">
                <Header subtitle="Track your fitness journey" />
                <div className="flex flex-row w-full gap-4">
                    <LucideArrowLeft className="text-gray-500"></LucideArrowLeft>
                    <Link to="/login" className="!text-gray-500">Back to login</Link>
                </div>
                <section className="flex flex-col items-center justify-center bg-white rounded-md shadow-xl p-6 gap-4">
                    <div className="flex flex-col items-center gap-2">
                        <FeatureIcon label="" icon={LucideKeyRound} 
                            classname="bg-orange-100 rounded-full w-12 h-12 flex justify-center items-center text-orange-500" />
                        <p className="text-black text-left font-bold text-2xl">Forgot Password?</p>
                        <p className="text-gray-500 text-center line-clamp-2 w-70 lg:w-90">No worries! Enter your email and we'll send you reset instructions.</p>
                    </div>
                    <form className="flex flex-col w-80 gap-6" onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <IconInput inputId="email" onChange={(e) => { setEmail(e.target.value) }} 
                                    icon={LucideMail} type="email" placeholder="Enter your email" label="Email Address" 
                                    classname="pl-10 w-full p-2 mb-2 border border-gray-200 rounded text-gray-500" />
                            <p className="text-gray-500 text-left text-xs">We'll send reset instructions to this email address.</p>
                        </div>
                        {message && <p className="text-sky-600">{message}</p>}
                        <IconButton label="Send Reset Link" icon={LucideSend} 
                                    classname="flex items-center justify-center text-white w-full gap-4 font-medium bg-linear-to-r from-sky-600 to-blue-800"/>
                    </form>
                </section>
                <section className="flex items-center gap-2">
                    <p className="text-gray-500">Remember your password?</p>
                    <Link to="/login" className="text-sm !text-blue-600">Sign In</Link>
                </section>
                <AlertBlock icon={LucideShield} 
                            title="Security Notice" 
                            body="For your security, the reset link will expire in 15 minutes."
                            type="Tip"/>
            </div>
        </div>
    );
}

export default ForgotPassword;