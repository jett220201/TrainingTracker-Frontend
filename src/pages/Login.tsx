import { LucideChartLine, LucideDumbbell, LucideLock, LucideLogIn, LucideMail, LucideTrophy } from "lucide-react";
import Header from "../components/Public/Header";
import { IconButton } from "../components/ui/IconButton";
import { Link, useNavigate } from "react-router-dom";
import FeatureIcon from "../components/ui/FeatureIcon";
import IconInput from "../components/ui/IconInput";
import React, { useState } from "react";
import { authApi } from "../api/authApi";
import type { LoginRequest } from "../types/dto/LoginRequest";
import { useAuthStore } from "../store/AuthStore";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate();
    const fetchUser = useAuthStore((state) => state.fetchUser)
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const payload = {
            username: email,
            password: password
        };
        try {
            await authApi.login(payload as LoginRequest);
            await fetchUser();
            navigate("/app/home");
        }
        catch (error : any) {
            setError(error.message)
        }
    };

    return (
        <div className="flex w-full h-full flex-col items-center justify-center bg-gray-100">
            <div className="flex flex-col items-center justify-center gap-12 lg:gap-6">
                <Header subtitle="Track your fitness journey" />
                <section className="flex flex-col items-start justify-center bg-white rounded-md shadow-xl p-6 gap-6">
                    <div className="flex flex-col gap-2">
                        <p className="text-black text-left font-bold text-2xl">Welcome Back!</p>
                        <p className="text-gray-500">Sign in to continue your fitness journey</p>
                    </div>
                    <div>
                        <form className="flex flex-col w-80 mt-4 gap-2" onSubmit={handleLogin}>
                            <div>
                                <IconInput inputId="email" onChange={(e) => { setEmail(e.target.value) }} icon={LucideMail} type="email" placeholder="Enter your email" label="Email Address" classname="pl-10 w-full p-2 mb-2 border border-gray-200 rounded text-gray-500" />
                                <IconInput inputId="password" onChange={(e) => { setPassword(e.target.value) }} icon={LucideLock} type="password" placeholder="Enter your password" label="Password" classname="pl-10 w-full p-2 mb-2 border border-gray-200 rounded text-gray-500" />
                            </div>
                            <div className="flex">
                                <Link to="/forgot-password" className="text-sm !text-blue-600">Forgot password?</Link>
                            </div>
                            {error && <p className="text-red-500">{error}</p>}
                            <IconButton label="Sign In" icon={LucideLogIn} classname="flex items-center justify-center text-white w-full gap-4 font-medium bg-linear-to-r from-sky-600 to-blue-800" />
                        </form>
                    </div>
                </section>
                <section className="flex items-center gap-2">
                    <p className="text-gray-500">Don't have an account?</p>
                    <Link to="/register" className="text-sm !text-blue-600">Create Account</Link>
                </section>
                <section className="flex flex-row gap-10">
                    <FeatureIcon label="Track Progress" icon={LucideChartLine} classname="bg-blue-100 rounded-full w-10 h-10 flex justify-center items-center text-blue-500" />
                    <FeatureIcon label="Custom Workouts" icon={LucideDumbbell} classname="bg-orange-100 rounded-full w-10 h-10 flex justify-center items-center text-orange-500" />
                    <FeatureIcon label="Achievements" icon={LucideTrophy} classname="bg-green-100 rounded-full w-10 h-10 flex justify-center items-center text-green-500" />
                </section>
            </div>
        </div>
    );
}

export default Login;