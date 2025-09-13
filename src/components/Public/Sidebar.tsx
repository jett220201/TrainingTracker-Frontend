import { LucideBookOpenText, LucideChartLine, LucideDumbbell, LucideGoal, LucideHouse, LucideLogOut, LucideSettings, LucideUser } from "lucide-react";
import IconLink from "../ui/IconLink";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../../store/AuthStore";
import { useEffect, useRef, useState } from "react";
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css'
import { Link } from "react-router-dom";

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const {t} = useTranslation();
    const user = useAuthStore((state) => state.user);
    const imgSrc = user?.gender == "Male"? "/src/assets/male.png" : "/src/assets/female.png";

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="hidden lg:block" ref={sidebarRef}>
            {isOpen ?
                (<div className="transition-all duration-300 bg-white dark:bg-slate-950 w-64 min-h-screen p-2 border-r border-gray-200 relative">
                    <div className="flex flex-row items-center gap-4 mb-2 p-2 w-80">
                        <img src="/src/assets/logo.png" alt="FitTracker Logo" className="w-12 h-12 " />
                        <p className="text-xl font-bold text-black dark:text-white">FitTracker</p>
                    </div>
                    <hr className="mb-4 bg-gray-500 dark:bg-black" />
                    <ul className="flex flex-col gap-1 p-2">
                        <li className="mb-2 hover:cursor-pointer">
                            <IconLink to="/app/home" icon={LucideHouse} label={t("dashboard")} classname="!text-gray-700 dark:!text-gray-200 overflow-hidden whitespace-nowrap group-hover:!text-white" />
                        </li>
                        <li className="mb-2 hover:cursor-pointer">
                            <IconLink to="/app/workouts" icon={LucideDumbbell} label={t("workouts")} classname="!text-gray-700 dark:!text-gray-200 overflow-hidden whitespace-nowrap group-hover:!text-white" />
                        </li>
                        <li className="mb-2 hover:cursor-pointer">
                            <IconLink to="/app/progress" icon={LucideChartLine} label={t("progress")} classname="!text-gray-700 dark:!text-gray-200 overflow-hidden whitespace-nowrap group-hover:!text-white" />
                        </li>
                        <li className="mb-2 hover:cursor-pointer">
                            <IconLink to="/app/goals" icon={LucideGoal} label={t("achievements")} classname="!text-gray-700 dark:!text-gray-200 overflow-hidden whitespace-nowrap group-hover:!text-white" />
                        </li>
                        <li className="mb-2 hover:cursor-pointer">
                            <IconLink to="/app/exercises" icon={LucideBookOpenText} label={t("exercises")} classname="!text-gray-700 dark:!text-gray-200 overflow-hidden whitespace-nowrap group-hover:!text-white" />
                        </li>
                        <li className="mb-2 hover:cursor-pointer">
                            <IconLink to="/app/profile" icon={LucideUser} label={t("profile")} classname="!text-gray-700 dark:!text-gray-200 overflow-hidden whitespace-nowrap group-hover:!text-white" />
                        </li>
                        <li className="mb-2 hover:cursor-pointer">
                            <IconLink to="/app/settings" icon={LucideSettings} label={t("settings")} classname="!text-gray-700 dark:!text-gray-200 overflow-hidden whitespace-nowrap group-hover:!text-white" />
                        </li>
                    </ul>
                    <footer className="absolute bottom-0 w-full">
                        <Link to="login" className="flex items-center justify-between p-2 w-60 rounded-t group hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => useAuthStore.getState().logout()}>
                            <p className="text-gray-700 dark:text-gray-200 dark:group-hover:text-gray-200">{t("logout")}</p>
                            <LucideLogOut className="w-6 h-6 text-gray-800 dark:text-gray-200 dark:group-hover:text-gray-200 m-2 hover:cursor-pointer" />
                        </Link>
                        <hr className="mb-2 bg-gray-500 w-60" />
                        <div className="flex flex-row items-center gap-4 p-2 w-50">
                            <img src={imgSrc} alt="Profile image" className="w-12 h-12 mb-2 rounded-lg" />
                            <p className="text-md font-semibold mb-2 text-black dark:text-white whitespace-pre-line">{user?.fullName}</p>
                        </div>
                    </footer>
                </div>)
                : (<div onClick={toggleSidebar} className="transition-all duration-300 bg-white dark:bg-slate-950 w-16 min-h-screen p-2 border-r border-gray-200 relative">
                    <div className="flex flex-row items-center w-80">
                        <img src="/src/assets/logo.png" alt="FitTracker Logo" className="w-12 h-12 mb-4 mt-2" />
                    </div>
                    <hr className="mb-4 bg-gray-500" />
                    <ul className="flex flex-col gap-6 p-2 pt-4">
                        <li className="mb-2 hover:cursor-pointer" data-tooltip-id="tooltipDashboard" data-tooltip-content={t("dashboard")}>
                            <LucideHouse className="w-6 h-6 text-gray-800 dark:text-gray-200"/>
                        </li>
                        <Tooltip id="tooltipDashboard" place="right" style={{ backgroundColor: "#1447e6", color: "white", fontWeight: 500, zIndex: 2 }} />
                        <li className="mb-2 hover:cursor-pointer" data-tooltip-id="tooltipWorkouts" data-tooltip-content={t("workouts")}>
                            <LucideDumbbell className="w-6 h-6 text-gray-800 dark:text-gray-200"/>
                        </li>
                        <Tooltip id="tooltipWorkouts" place="right" style={{ backgroundColor: "#1447e6", color: "white", fontWeight: 500, zIndex: 2 }} />
                        <li className="mb-2 hover:cursor-pointer" data-tooltip-id="tooltipProgress" data-tooltip-content={t("progress")}>
                            <LucideChartLine className="w-6 h-6 text-gray-800 dark:text-gray-200"/>
                        </li>
                        <Tooltip id="tooltipProgress" place="right" style={{ backgroundColor: "#1447e6", color: "white", fontWeight: 500, zIndex: 2 }} />
                        <li className="mb-2 hover:cursor-pointer" data-tooltip-id="tooltipAchievements" data-tooltip-content={t("achievements")}>
                            <LucideGoal className="w-6 h-6 text-gray-800 dark:text-gray-200"/>
                        </li>
                        <Tooltip id="tooltipAchievements" place="right" style={{ backgroundColor: "#1447e6", color: "white", fontWeight: 500, zIndex: 2 }} />
                        <li className="mb-2 hover:cursor-pointer" data-tooltip-id="tooltipExercises" data-tooltip-content={t("exercises")}>
                            <LucideBookOpenText className="w-6 h-6 text-gray-800 dark:text-gray-200"/>
                        </li>
                        <Tooltip id="tooltipExercises" place="right" style={{ backgroundColor: "#1447e6", color: "white", fontWeight: 500, zIndex: 2 }} />
                        <li className="mb-2 hover:cursor-pointer" data-tooltip-id="tooltipProfile" data-tooltip-content={t("profile")}>
                            <LucideUser className="w-6 h-6 text-gray-800 dark:text-gray-200"/>
                        </li>
                        <Tooltip id="tooltipProfile" place="right" style={{ backgroundColor: "#1447e6", color: "white", fontWeight: 500, zIndex: 2 }} />
                        <li className="mb-2 hover:cursor-pointer" data-tooltip-id="tooltipSettings" data-tooltip-content={t("settings")}>
                            <LucideSettings className="w-6 h-6 text-gray-800 dark:text-gray-200"/>
                        </li>
                        <Tooltip id="tooltipSettings" place="right" style={{ backgroundColor: "#1447e6", color: "white", fontWeight: 500, zIndex: 2 }} />
                    </ul>
                </div>)
            }
        </div>
    );
}

export default Sidebar;