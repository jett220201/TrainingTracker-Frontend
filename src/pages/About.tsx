import { useTranslation } from "react-i18next";
import TitleHeader from "../components/Public/TitleHeader";

function About() {
    const {t} = useTranslation(["about", "common"]);
    const linkedin = import.meta.env.VITE_LINKEDIN;
    const github = import.meta.env.VITE_GITHUB;
    return (
        <>
            <TitleHeader title={t("title", { ns: "about" })} />
            <div className="bg-neutral-50 dark:bg-slate-950 min-h-[calc(100vh-4rem)] h-100 px-2 py-6 lg:px-8 lg:py-8 overflow-y-auto">
                <article className="flex flex-col lg:gap-4 justify-center w-full h-auto bg-white dark:bg-gray-800 border border-gray-200 rounded-lg p-2 lg:p-4 mb-6">
                    <p className="text-xl font-bold text-black dark:text-gray-100">{t("what", { ns:"about" })}</p>
                    <section className="flex flex-col gap-4 w-full border-t border-gray-300 mt-2 lg:mt-0 pt-4">
                        <p className="">{t("whatContent", { ns: "about" })}</p>
                    </section>
                </article>
                <article className="flex flex-col lg:gap-4 justify-center w-full h-auto bg-white dark:bg-gray-800 border border-gray-200 rounded-lg p-2 lg:p-4 mb-6">
                    <p className="text-xl font-bold text-black dark:text-gray-100">{t("why", { ns:"about" })}</p>
                    <section className="flex flex-col gap-4 w-full border-t border-gray-300 mt-2 lg:mt-0 pt-4">
                        <p className="">{t("whyContent1", { ns: "about" })}</p>
                        <p className="">{t("whyContent2", { ns: "about" })}</p>
                    </section>
                </article>
                <article className="flex flex-col lg:gap-4 justify-center w-full h-auto bg-white dark:bg-gray-800 border border-gray-200 rounded-lg p-2 lg:p-4 mb-6">
                    <p className="text-xl font-bold text-black dark:text-gray-100">{t("who", { ns:"about" })}</p>
                    <section className="flex flex-col gap-4 w-full border-t border-gray-300 mt-2 lg:mt-0 pt-4">
                        <p className="">{t("whoContent", { ns: "about" })}</p>
                        <div className="flex flex-row gap-6">
                            <a href={linkedin} className="flex rounded bg-[#0077b5] w-fit p-4">
                                <p className="text-white">LinkedIn</p>
                            </a>
                            <a href={github} className="flex rounded bg-black w-fit p-4">
                                <p className="text-white">GitHub</p>
                            </a>
                        </div>
                    </section>
                </article>
                <article className="flex flex-col lg:gap-4 justify-center w-full h-auto bg-white dark:bg-gray-800 border border-gray-200 rounded-lg p-2 lg:p-4 mb-6">
                    <p className="text-xl font-bold text-black dark:text-gray-100">FitTracker</p>
                    <section className="flex flex-col gap-4 w-full border-t border-gray-300 mt-2 lg:mt-0 pt-4">
                        <p className="">{t("generalContent", { ns: "about" })}</p>
                    </section>
                </article>
            </div>
        </>
    );
}

export default About;