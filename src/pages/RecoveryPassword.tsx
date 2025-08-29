import { Link, useSearchParams } from "react-router-dom";
import Header from "../components/Public/Header";
import FeatureIcon from "../components/ui/FeatureIcon";
import { LucideLock, LucideLockOpen, LucideShield } from "lucide-react";
import { useEffect, useState } from "react";
import IconInput from "../components/ui/IconInput";
import { IconButton } from "../components/ui/IconButton";
import AlertBlock from "../components/ui/AlertBlock";
import type { Alert } from "../types/general/AlertType";
import { userApi } from "../api/rest/userApi";
import type { UserChangePasswordRecoveryRequest } from "../types/dto/UserChangePasswordRecoveryRequest";
import { useTranslation } from "react-i18next";

function RecoveryPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState<string | null>(null)
    const [alertType, setAlertType] = useState<Alert>("Tip")
    const {t} = useTranslation(["password", "common"]);
    const hasUppercase = /[A-Z]/; 
    const hasLowercase = /[a-z]/; 
    const hasNumber = /\d/;
    const hasSpecialChar = /[^A-Za-z0-9]/;

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                token : token,
                newPassword : password
            }
            const response = await userApi.changePasswordRecovery(payload as UserChangePasswordRecoveryRequest);
            setAlertType("Success");
            setMessage(response.message);
        }
        catch (error : any) {
            setAlertType("Error")
            setMessage(error.details != undefined ? error.details : error.message)
        }
    };
    const checkPasswordValidity = () => {
        if(confirmPassword != password) {
            setAlertType("Error");
            setMessage(t("passwordSameError"));
        }
        else {
            setMessage("");
        }
    }
    const checkPasswordRequirements = () => {
        setMessage("");
        let messages = []
        if(password.length < 10) {
            messages.push(`• ${t("charactersValidation")}`);
        }
        if(!hasUppercase.test(password)){
            messages.push(`• ${t("upperCaseValidation")}`);
        }
        if(!hasLowercase.test(password)){
            messages.push(`• ${t("lowerCaseValidation")}`);
        }
        if(!hasNumber.test(password)){
            messages.push(`• ${t("numberValidation")}`);
        }
        if(!hasSpecialChar.test(password)){
            messages.push(`• ${t("specialCharValidation")}`);
        }
        if(messages.length > 0) {
            messages.push(`${t("passwordRequirements")}`);
        }
        setAlertType("Tip");
        setMessage(messages.reverse().join('\n'))
    }

    useEffect(() => {
        checkPasswordRequirements();
    }, [password])

    useEffect(() => {
        checkPasswordValidity();
    }, [confirmPassword])

    return (
        <div className="flex w-full h-full flex-col items-center justify-center bg-gray-100">
            <div className="flex flex-col items-center justify-center gap-6 lg:gap-4">
                <Header subtitle={t("loginHeaderMessage", { ns: "common" })} />
                <div className="flex flex-row items-center gap-6">
                    <div className="flex flex-col items-center justify-center gap-6 lg:gap-4">
                        <section className="flex flex-col items-center justify-center bg-white rounded-md shadow-xl p-6 gap-4">
                            <div className="flex flex-col items-center gap-2">
                                <FeatureIcon label="" icon={LucideLockOpen}
                                    classname="bg-green-100 rounded-full w-12 h-12 flex justify-center items-center text-green-500" />
                                <p className="text-black text-left font-bold text-2xl">{t("resetPasswordTitle")}</p>
                                <p className="text-gray-500 text-center line-clamp-2 w-70 lg:w-90">{t("resetPasswordSubtitle")}</p>
                            </div>
                            <form className="flex flex-col w-80 gap-6" onSubmit={handleResetPassword}>
                                <div className="flex flex-col">
                                    <IconInput inputId="password" onChange={(e) => setPassword(e.target.value)}
                                        icon={LucideLock} type="password" placeholder={t("newPasswordPlaceholder")} label={t("newPasswordLabel")}
                                        classname="pl-10 w-full p-2 mb-2 border border-gray-200 rounded text-gray-500" />
                                    <IconInput inputId="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)}
                                        icon={LucideLock} type="password" placeholder={t("confirmNewPasswordPlaceholder")} label={t("confirmNewPasswordLabel")}
                                        classname="pl-10 w-full p-2 mb-2 border border-gray-200 rounded text-gray-500" />
                                </div>
                                <IconButton label={t("resetPassword")} icon={LucideShield}
                                    classname="flex items-center justify-center text-white w-full gap-4 font-medium bg-linear-to-r from-sky-600 to-blue-800" />
                            </form>
                        </section>
                        <section className="flex items-center gap-2">
                            <p className="text-gray-500">{t("resetSuccessfully")}</p>
                            <Link to="/login" className="text-sm !text-blue-600">{t("signInNow")}</Link>
                        </section>
                    </div>
                    {message && <AlertBlock icon={LucideShield}
                    title={t("resetPassword")}
                    body={message}
                    type={alertType} />}
                </div>
            </div>
        </div>
    );
}

export default RecoveryPassword;