import { LucideBotOff } from "lucide-react";
import { useTranslation } from "react-i18next";

function NotFoundPage() {
    const {t} = useTranslation();
    return (
        <>
            <div className="bg-neutral-50 dark:bg-slate-950 w-screen h-screen flex flex-col lg:flex-row justify-center gap-10 items-center">
                <section className="flex flex-col lg:flex-row justify-center items-center gap-5 lg:w-1/2">
                    <LucideBotOff className="w-20 h-20 text-blue-700"/>
                    <p className="text-blue-700 text-9xl text-shadow-lg">404</p>
                </section>
                <section className="flex flex-col items-center text-center gap-5 w-full lg:w-1/2">
                    <p className="text-gray-800 dark:text-white text-4xl lg:text-8xl text-shadow-lg">{':('}</p>
                    <p className="text-gray-800 dark:text-white lg:line-clamp-2 text-2xl lg:text-5xl text-shadow-lg">{t("404Message")}</p>
                </section>
            </div>
        </>
    );
}

export default NotFoundPage;