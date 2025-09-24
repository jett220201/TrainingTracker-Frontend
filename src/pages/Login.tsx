import { LucideChartLine, LucideDumbbell, LucideLock, LucideLogIn, LucideMail, LucideTrophy, LucideUserX } from "lucide-react";
import Header from "../components/Public/Header";
import { IconButton } from "../components/ui/IconButton";
import { Link, useNavigate } from "react-router-dom";
import FeatureIcon from "../components/ui/FeatureIcon";
import IconInput from "../components/ui/IconInput";
import React, { useState } from "react";
import { authApi } from "../api/rest/authApi";
import type { LoginRequest } from "../types/dto/LoginRequest";
import { useAuthStore } from "../store/AuthStore";
import "../i18n";
import { useTranslation } from "react-i18next";
import AlertBlock from "../components/ui/AlertBlock";
import VideoBackground from "../components/Public/VideoBackground";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate();
    const fetchUser = useAuthStore((state) => state.fetchUser)
    const {t, i18n} = useTranslation(["login", "common"]);
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
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    }

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <VideoBackground />
            <div className="relative z-20 flex w-full h-full flex-col items-center justify-center overflow-y-auto">
                <div className="flex flex-col items-center justify-center gap-6 lg:gap-4 my-4">
                    <Header subtitle={t("loginHeaderMessage", { ns: "common" })} subtitleColor="text-gray-200" titleColor="text-gray-100"/>
                    <section className="flex flex-col items-start justify-center bg-white rounded-md shadow-xl p-6 m-2 lg:m-0 gap-2">
                        <div className="flex flex-col gap-2">
                            <p className="text-black text-left font-bold text-2xl">
                                {t("welcome")}
                            </p>
                            <p className="text-gray-500">{t("welcomeSubtitle")}</p>
                        </div>
                        <div>
                            <form
                                className="flex flex-col w-80 mt-4 gap-2"
                                onSubmit={handleLogin}
                            >
                                <div>
                                    <IconInput
                                        inputId="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        icon={LucideMail}
                                        type="email"
                                        placeholder={t("emailPlaceholder", { ns: "common" })}
                                        label={t("emailLabel", { ns: "common" })}
                                        classname="pl-10 w-full p-2 mb-2 border border-gray-200 rounded text-gray-500"
                                    />
                                    <IconInput
                                        inputId="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        icon={LucideLock}
                                        type="password"
                                        placeholder={t("passwordPlaceholder")}
                                        label={t("passwordLabel")}
                                        classname="pl-10 w-full p-2 mb-2 border border-gray-200 rounded text-gray-500"
                                    />
                                </div>
                                <div className="flex">
                                    <Link to="/forgot-password" className="text-sm !text-blue-600">
                                        {t("forgotPassword")}
                                    </Link>
                                </div>
                                <IconButton
                                    label={t("signIn", { ns: "common" })}
                                    icon={LucideLogIn}
                                    classname="flex items-center justify-center text-white w-full gap-4 font-medium bg-linear-to-r from-sky-600 to-blue-800"
                                />
                            </form>
                        </div>
                    </section>
                    {error && (
                        <AlertBlock
                            icon={LucideUserX}
                            title=""
                            body={error}
                            type={"Error"}
                        />
                    )}
                    <section className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-2">
                            <p className="text-gray-200">{t("dontHaveAccount")}</p>
                            <Link to="/register" className="text-sm !text-blue-600">
                                {t("createAccount")}
                            </Link>
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="text-gray-200">{t("changeLanguage")}</p>
                            <select
                                value={i18n.language}
                                onChange={(e) => changeLanguage(e.target.value)}
                                className="p-1 border rounded bg-white border-gray-200 text-gray-500 h-8"
                            >
                                <option value="en">{t("english", { ns: "common" })}</option>
                                <option value="es">{t("spanish", { ns: "common" })}</option>
                            </select>
                        </div>
                    </section>
                    <section className="flex flex-row gap-8 lg:gap-10">
                        <FeatureIcon
                            label={t("trackProgressFeature", { ns: "common" })}
                            labelColor="text-gray-200"
                            icon={LucideChartLine}
                            classname="bg-blue-100 rounded-full w-10 h-10 flex justify-center items-center text-blue-500"
                        />
                        <FeatureIcon
                            label={t("customWorkoutFeature", { ns: "common" })}
                            icon={LucideDumbbell}
                            labelColor="text-gray-200"
                            classname="bg-orange-100 rounded-full w-10 h-10 flex justify-center items-center text-orange-500"
                        />
                        <FeatureIcon
                            label={t("achievementsFeature", { ns: "common" })}
                            icon={LucideTrophy}
                            labelColor="text-gray-200"
                            classname="bg-green-100 rounded-full w-10 h-10 flex justify-center items-center text-green-500"
                        />
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Login;