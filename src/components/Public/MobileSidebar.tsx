import { LucideBookOpenText, LucideChartLine, LucideDumbbell, LucideGoal, LucideHouse, LucideSettings, LucideUser } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function MobileSidebar() {
    const {t} = useTranslation();

    return (
        <div className="block lg:hidden transition-all duration-300 bg-white dark:bg-slate-950 min-w-screen h-16 p-2 border-t border-gray-200 absolute bottom-0 w-full z-2">
            <ul className="flex flex-row overflow-x-auto scrollbar-hide h-full gap-2">
                <li className="hover:cursor-pointer w-1/4 flex justify-center items-center flex-shrink-0">
                    <Link to="/app/home" className="flex flex-col items-center">
                        <LucideHouse className="w-6 h-6 text-blue-700 dark:text-gray-200" />
                        <p className="!text-gray-700 dark:!text-gray-200 text-sm">{t("dashboard")}</p>
                    </Link>
                </li>
                <li className="hover:cursor-pointer w-1/4 flex justify-center items-center flex-shrink-0">
                    <Link to="/app/workouts" className="flex flex-col items-center">
                        <LucideDumbbell className="w-6 h-6 text-blue-700 dark:text-gray-200" />
                        <p className="!text-gray-700 dark:!text-gray-200 text-sm">{t("workouts")}</p>
                    </Link>
                </li>
                <li className="hover:cursor-pointer w-1/4 flex justify-center items-center flex-shrink-0">
                    <Link to="/app/progress" className="flex flex-col items-center">
                        <LucideChartLine className="w-6 h-6 text-blue-700 dark:text-gray-200" />
                        <p className="!text-gray-700 dark:!text-gray-200 text-sm">{t("progress")}</p>
                    </Link>
                </li>
                <li className="hover:cursor-pointer w-1/4 flex justify-center items-center flex-shrink-0">
                    <Link to="/app/goals" className="flex flex-col items-center">
                        <LucideGoal className="w-6 h-6 text-blue-700 dark:text-gray-200" />
                        <p className="!text-gray-700 dark:!text-gray-200 text-sm">{t("achievements")}</p>
                    </Link>
                </li>
                <li className="hover:cursor-pointer w-1/4 flex justify-center items-center flex-shrink-0">
                    <Link to="/app/exercises" className="flex flex-col items-center">
                        <LucideBookOpenText className="w-6 h-6 text-blue-700 dark:text-gray-200" />
                        <p className="!text-gray-700 dark:!text-gray-200 text-sm">{t("exercisesShort")}</p>
                    </Link>
                </li>
                <li className="hover:cursor-pointer w-1/4 flex justify-center items-center flex-shrink-0">
                    <Link to="/app/profile" className="flex flex-col items-center">
                        <LucideUser className="w-6 h-6 text-blue-700 dark:text-gray-200" />
                        <p className="!text-gray-700 dark:!text-gray-200 text-sm">{t("profile")}</p>
                    </Link>
                </li>
                <li className="hover:cursor-pointer w-1/4 flex justify-center items-center flex-shrink-0">
                    <Link to="/app/settings" className="flex flex-col items-center">
                        <LucideSettings className="w-6 h-6 text-blue-700 dark:text-gray-200" />
                        <p className="!text-gray-700 dark:!text-gray-200 text-sm">{t("settings")}</p>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default MobileSidebar;