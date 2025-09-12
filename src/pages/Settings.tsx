import { useTranslation } from "react-i18next";
import "../i18n";
import TitleHeader from "../components/Public/TitleHeader";
import SettingCard from "../components/ui/SettingCard";
import { LucideBadgeInfo, LucideHatGlasses, LucideInfo, LucideKeyRound, LucideLock, LucideLogOut, LucideShield, LucideTrash, LucideUserRoundX } from "lucide-react";
import { useAuthStore } from "../store/AuthStore";
import { useTheme } from "../hooks/useTheme";
import type { Theme } from "../types/general/ThemeType";
import { Fragment, useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, Description } from "@headlessui/react";
import IconInput from "../components/ui/IconInput";
import { IconButton } from "../components/ui/IconButton";
import { userApi } from "../api/rest/userApi";
import type { UserChangePasswordRequest } from "../types/dto/UserChangePasswordRequest";
import type { Alert } from "../types/general/AlertType";
import AlertBlock from "../components/ui/AlertBlock";
import { useNavigate } from "react-router-dom";
import type { UserDeleteAccountRequest } from "../types/dto/UserDeleteAccountRequest";

function Settings() {
    const {t, i18n} = useTranslation(["settings", "common", "password", "login"]);
    const [openModalChangePassword, setOpenModalChangePassword] = useState(false);
    const [openModalDeleteAccount, setOpenModalDeleteAccount] = useState(false);
    const [openModalContactSupport, setOpenModalContactSupport] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState<string | null>(null)
    const [deleteMessage, setDeleteMessage] = useState<string | null>(null)
    const [alertType, setAlertType] = useState<Alert>("Tip")
    const [alertDeleteType, setAlertDeleteType] = useState<Alert>("Success")
    const {theme, setTheme} = useTheme();
    const navigate = useNavigate();
    const appEmail = import.meta.env.VITE_SUPPORT_EMAIL;
    const hasUppercase = /[A-Z]/; 
    const hasLowercase = /[a-z]/; 
    const hasNumber = /\d/;
    const hasSpecialChar = /[^A-Za-z0-9]/;
    
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    }

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                oldPassword : oldPassword,
                newPassword : newPassword
            }
            const response = await userApi.changePassword(payload as UserChangePasswordRequest);
            setAlertType("Success");
            setMessage(`${response.message} ${t("successPasswordChange", { ns: "settings" })}`);
            setTimeout(() => {
                useAuthStore.getState().logout();
            }, 3000);
        }
        catch (error : any) {
            setAlertType("Error")
            setMessage(error.details != undefined ? error.details : error.message)
        }
    }

    const handleDeleteAccount = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                email: email,
                password: currentPassword
            }
            const response = await userApi.deleteAccount(payload as UserDeleteAccountRequest);
            setAlertType("Success");
            setMessage(response.message);
            setTimeout(() => {
                useAuthStore.getState().logout();
            }, 5000);
        }
        catch (error: any) {
            setAlertDeleteType("Error")
            setDeleteMessage(error.details != undefined ? error.details : error.message)
        }
    }

    const checkPasswordRequirements = () => {
        setMessage("");
        let messages = []
        if(newPassword.length < 10) {
            messages.push(`• ${t("charactersValidation", { ns: "password" })}`);
        }
        if(!hasUppercase.test(newPassword)){
            messages.push(`• ${t("upperCaseValidation", { ns: "password" })}`);
        }
        if(!hasLowercase.test(newPassword)){
            messages.push(`• ${t("lowerCaseValidation", { ns: "password" })}`);
        }
        if(!hasNumber.test(newPassword)){
            messages.push(`• ${t("numberValidation", { ns: "password" })}`);
        }
        if(!hasSpecialChar.test(newPassword)){
            messages.push(`• ${t("specialCharValidation", { ns: "password" })}`);
        }
        if(messages.length > 0) {
            messages.push(`${t("passwordRequirements", { ns: "password" })}`);
        }
        setAlertType("Tip");
        setMessage(messages.reverse().join('\n'))
    }

    useEffect(() => {
        checkPasswordRequirements();
    }, [newPassword])

    return (
        <>
            <TitleHeader title={t("settings", { ns: "settings" })} />
            <div className="bg-neutral-50 dark:bg-slate-950 min-h-[calc(100vh-4rem)] h-100 px-2 py-6 lg:px-8 lg:py-8 overflow-y-auto">
                <article className="flex flex-col lg:gap-4 justify-center w-full h-auto bg-white dark:bg-gray-800 border border-gray-200 rounded-lg p-2 lg:p-4 mb-6">
                    <p className="text-xl font-bold text-black dark:text-gray-100">{t("generalSettings", { ns: "settings" })}</p>
                    <section className="flex flex-col gap-4 w-full border-t border-gray-300 mt-2 lg:mt-0 pt-4">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 w-full">
                            <div>
                                <p className="text-lg font-semibold text-black dark:text-gray-100">{t("language", { ns: "settings" })}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-200">{t("languageDescription", { ns: "settings" })}</p>
                            </div>
                            <select 
                                value={i18n.language}
                                onChange={(e) => changeLanguage(e.target.value)}
                                className="mt-2 w-full lg:w-1/8 border border-gray-300 rounded-md dark:bg-gray-800 p-2 text-black dark:text-gray-100">
                                <option value="en">{t("english", { ns: "common" })}</option>
                                <option value="es">{t("spanish", { ns: "common" })}</option>
                            </select>
                        </div>
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 w-full">
                            <div>
                                <p className="text-lg font-semibold text-black dark:text-gray-100">{t("theme", { ns: "settings" })}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-200">{t("themeDescription", { ns: "settings" })}</p>
                            </div>
                            <select 
                                value={theme}
                                onChange={(e) => setTheme(e.target.value as Theme)}
                                className="mt-2 w-full lg:w-1/8 border border-gray-300 dark:bg-gray-800 rounded-md p-2 text-black dark:text-gray-100">
                                <option value="light">
                                    {t("light", { ns: "settings" })}
                                </option>
                                <option value="dark">{t("dark", { ns: "settings" })}</option>
                            </select>
                        </div>
                    </section>
                </article>
                <article className="flex flex-col lg:gap-4 justify-center w-full h-auto bg-white dark:bg-gray-800 border border-gray-200 rounded-lg p-2 lg:p-4 mb-6">
                    <p className="text-xl font-bold text-black dark:text-gray-100">{t("privacyAndSecurity", { ns: "settings" })}</p>
                    <section className="flex flex-col gap-4 w-full border-t border-gray-300 pt-4 mt-2 lg:mt-0">
                        <SettingCard
                            iconBackground="bg-blue-200"
                            iconColor="blue-500"
                            icon={LucideKeyRound}
                            title={t("changePassword", { ns: "settings" })}
                            body={t("changePasswordDescription", { ns: "settings" })}
                            callback={() => { setOpenModalChangePassword(true) }}
                        />
                    </section>
                </article>
                <article className="flex flex-col lg:gap-4 justify-center w-full h-auto bg-white dark:bg-gray-800 border border-gray-200 rounded-lg p-2 lg:p-4 mb-6">
                    <p className="text-xl font-bold text-black dark:text-gray-100">{t("supportAndAbout", { ns: "settings" })}</p>
                    <section className="flex flex-col gap-4 w-full border-t border-gray-300 pt-4 mt-2 lg:mt-0">
                        <SettingCard
                            iconBackground="bg-orange-100"
                            iconColor="orange-500"
                            icon={LucideBadgeInfo}
                            title={t("contactSupport", { ns: "settings" })}
                            body={t("contactSupportDescription", { ns: "settings" })}
                            callback={() => { setOpenModalContactSupport(true) }}
                        />
                        <SettingCard
                            iconBackground="bg-green-100"
                            iconColor="green-500"
                            icon={LucideInfo}
                            title={t("about", { ns: "settings" })}
                            body={t("aboutDescription", { ns: "settings" })}
                            callback={() => { navigate("/app/about"); }}
                        />
                        <SettingCard
                            iconBackground="bg-indigo-100"
                            iconColor="gray-500"
                            icon={LucideHatGlasses}
                            title={t("privacyTerms", { ns: "settings" })}
                            body={t("privacyTermsDescription", { ns: "settings" })}
                            callback={() => { navigate("/privacy-terms"); }}
                        />
                    </section>
                </article>
                <article className="flex flex-col lg:gap-4 justify-center w-full h-auto bg-white dark:bg-gray-800 border border-gray-200 rounded-lg p-2 lg:p-4 mb-14 lg:mb-2">
                    <p className="text-xl font-bold text-black dark:text-gray-100">{t("account", { ns: "settings" })}</p>
                    <section className="flex flex-col gap-4 w-full border-t border-gray-300 pt-4 mt-2 lg:mt-0">
                        <SettingCard
                            iconBackground="bg-red-100"
                            iconColor="red-500"
                            icon={LucideUserRoundX}
                            title={t("deleteAccount", { ns: "settings" })}
                            body={t("deleteAccountDescription", { ns: "settings" })}
                            callback={() => { setOpenModalDeleteAccount(true) }}
                        />
                        <SettingCard
                            iconBackground="bg-red-100"
                            iconColor="red-500"
                            icon={LucideLogOut}
                            title={t("logout", { ns: "common" })}
                            body={""}
                            callback={() => { useAuthStore.getState().logout() }}
                        />
                    </section>
                </article>
            </div>

            <Transition show={openModalChangePassword} as={Fragment}>
                <Dialog as="div" onClose={setOpenModalChangePassword} className="relative z-2">
                    <div className="fixed inset-0 bg-black/30" />
                    <div className="fixed inset-0 flex items-center justify-center">
                        <DialogPanel className="w-80 max-w-md lg:w-full transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                            <DialogTitle className="text-xl font-bold text-black dark:text-gray-100">{t("changePassword", { ns: "settings" })}</DialogTitle>
                            <Description className="text-black dark:text-gray-100">{t("changePasswordMessage", { ns: "settings" })}</Description>
                            <form className="flex flex-col gap-4 mt-2 mb-4" onSubmit={handleChangePassword}>
                                <div className="flex flex-col gap-2">
                                    <IconInput inputId="oldPassword" onChange={(e) => setOldPassword(e.target.value)}
                                        icon={LucideLock} type="password" placeholder={t("passwordPlaceholder", { ns: "login" })} label={t("passwordLabel", { ns: "login" })}
                                        classname="pl-10 w-full p-2 mb-2 border border-gray-200 rounded text-gray-500 dark:text-gray-200" />
                                    <IconInput inputId="newPassword" onChange={(e) => setNewPassword(e.target.value)}
                                        icon={LucideLock} type="password" placeholder={t("newPasswordPlaceholder", { ns: "password" })} label={t("newPasswordLabel", { ns: "password" })}
                                        classname="pl-10 w-full p-2 mb-2 border border-gray-200 rounded text-gray-500 dark:text-gray-200" />
                                </div>
                                <IconButton label={t("changePassword", { ns: "settings" })} icon={LucideShield}
                                    classname="flex items-center justify-center text-white w-full gap-4 font-medium bg-linear-to-r from-sky-600 to-blue-800" />
                            </form>
                            {message && <AlertBlock icon={LucideShield}
                            title={""}
                            body={message}
                            type={alertType} />}
                        </DialogPanel>
                    </div>
                </Dialog>
            </Transition>

            <Transition show={openModalContactSupport} as={Fragment}>
                <Dialog as="div" onClose={setOpenModalContactSupport} className="relative z-2">
                    <div className="fixed inset-0 bg-black/30" />
                    <div className="fixed inset-0 flex items-center justify-center">
                        <DialogPanel className="w-80 max-w-md lg:w-full transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                            <DialogTitle className="text-xl font-bold text-black dark:text-gray-100">{t("contactSupport", { ns: "settings" })}</DialogTitle>
                            <div className="mt-2">
                                <p className="text-sm text-gray-600 dark:text-gray-100">{t("contactSupportMessage", { ns: "settings" })}</p>
                            </div>
                            <div className="flex justify-center mt-2">
                                <a href={`mailto:${appEmail}`} className="!text-orange-500">{appEmail}</a>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>
            </Transition>

            <Transition show={openModalDeleteAccount} as={Fragment}>
                <Dialog as="div" onClose={setOpenModalDeleteAccount} className="relative z-2">
                    <div className="fixed inset-0 bg-black/30" />
                    <div className="fixed inset-0 flex items-center justify-center">
                        <DialogPanel className="w-80 max-w-md lg:w-full transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                            <DialogTitle className="text-xl font-bold text-black dark:text-gray-100">{t("deleteAccount", { ns: "settings" })}</DialogTitle>
                            <Description className="text-black dark:text-gray-100">{t("confirmDeleteAccount", { ns: "settings" })}</Description>
                            <form className="flex flex-col gap-4 mt-2 mb-4" onSubmit={handleDeleteAccount}>
                                <div className="flex flex-col gap-2">
                                    <IconInput inputId="email" onChange={(e) => setEmail(e.target.value)}
                                        icon={LucideLock} type="email" placeholder={t("emailPlaceholder", { ns: "common" })} label={t("emailLabel", { ns: "common" })}
                                        classname="pl-10 w-full p-2 mb-2 border border-gray-200 rounded text-gray-500 dark:text-gray-200" />
                                    <IconInput inputId="password" onChange={(e) => setCurrentPassword(e.target.value)}
                                        icon={LucideLock} type="password" placeholder={t("passwordPlaceholder", { ns: "login" })} label={t("passwordLabel", { ns: "login" })}
                                        classname="pl-10 w-full p-2 mb-2 border border-gray-200 rounded text-gray-500 dark:text-gray-200" />
                                </div>
                                <IconButton label={t("deleteAccount", { ns: "settings" })} icon={LucideTrash}
                                    classname="flex items-center justify-center text-white w-full gap-4 font-medium bg-linear-to-r from-sky-600 to-blue-800" />
                            </form>
                            {deleteMessage && <AlertBlock icon={LucideTrash}
                            title={t("successDeleteAccount", { ns: "settings" })}
                            body={deleteMessage}
                            type={alertDeleteType} />}
                        </DialogPanel>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

export default Settings;