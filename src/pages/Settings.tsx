import { useTranslation } from "react-i18next";
import "../i18n";
import TitleHeader from "../components/Public/TitleHeader";
import SettingCard from "../components/ui/SettingCard";
import { LucideBadgeInfo, LucideHatGlasses, LucideInfo, LucideKeyRound, LucideLogOut, LucideUserRoundX } from "lucide-react";
import { useAuthStore } from "../store/AuthStore";
import { useTheme } from "../hooks/useTheme";
import type { Theme } from "../types/general/ThemeType";

function Settings() {
    const {t, i18n} = useTranslation(["settings", "common"]);
    const {theme, setTheme} = useTheme();
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    }

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
                            callback={() => { window.location.href = "/change-password"; }}
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
                            callback={() => { window.location.href = "/change-password"; }}
                        />
                        <SettingCard
                            iconBackground="bg-green-100"
                            iconColor="green-500"
                            icon={LucideInfo}
                            title={t("about", { ns: "settings" })}
                            body={t("aboutDescription", { ns: "settings" })}
                            callback={() => { window.location.href = "/change-password"; }}
                        />
                        <SettingCard
                            iconBackground="bg-indigo-100"
                            iconColor="gray-500"
                            icon={LucideHatGlasses}
                            title={t("privacyTerms", { ns: "settings" })}
                            body={t("privacyTermsDescription", { ns: "settings" })}
                            callback={() => { window.location.href = "/change-password"; }}
                        />
                    </section>
                </article>
                <article className="flex flex-col lg:gap-4 justify-center w-full h-auto bg-white dark:bg-gray-800 border border-gray-200 rounded-lg p-2 lg:p-4 mb-14 lg:mb-2">
                    <p className="text-xl font-bold text-black text-white">{t("account", { ns: "settings" })}</p>
                    <section className="flex flex-col gap-4 w-full border-t border-gray-300 pt-4 mt-2 lg:mt-0">
                        <SettingCard
                            iconBackground="bg-red-100"
                            iconColor="red-500"
                            icon={LucideUserRoundX}
                            title={t("deleteAccount", { ns: "settings" })}
                            body={t("deleteAccountDescription", { ns: "settings" })}
                            callback={() => { window.location.href = "/change-password"; }}
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
        </>
    );
}

export default Settings;