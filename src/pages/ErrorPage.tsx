import { LucideBug } from "lucide-react";
import { useTranslation } from "react-i18next";

function ErrorPage() {
    const {t} = useTranslation();
    return (
        <>
            <div className="bg-neutral-50 dark:bg-slate-950 h-full flex flex-col lg:flex-row justify-center gap-10 items-center">
                <section className="flex flex-col items-center text-center gap-5 w-full lg:w-1/2">
                    <LucideBug className="w-20 h-20 text-red-700"/>
                    <p className="text-gray-800 dark:text-white lg:line-clamp-2 text-2xl lg:text-5xl text-shadow-lg">{t("errorMessage")}</p>
                </section>
            </div>
        </>
    );
}

export default ErrorPage;