import { LucideBookOpenText, LucideChartLine, LucideDumbbell, LucideGoal, LucideHouse, LucideSettings, LucideUser } from "lucide-react";
import { Link } from "react-router-dom";

function MobileSidebar() {
    return (
        <div className="block lg:hidden transition-all duration-300 bg-white dark:bg-slate-950 min-w-screen h-16 p-2 border-t border-gray-200 absolute bottom-0 w-full z-2">
            <ul className="flex flex-row overflow-x-auto scrollbar-hide h-full gap-2">
                <li className="hover:cursor-pointer w-1/4 flex justify-center items-center flex-shrink-0">
                    <Link to="/app/home">
                        <LucideHouse className="w-6 h-6 text-blue-700 dark:text-gray-200" />
                    </Link>
                </li>
                <li className="hover:cursor-pointer w-1/4 flex justify-center items-center flex-shrink-0">
                    <Link to="/app/workouts">
                        <LucideDumbbell className="w-6 h-6 text-blue-700 dark:text-gray-200" />
                    </Link>
                </li>
                <li className="hover:cursor-pointer w-1/4 flex justify-center items-center flex-shrink-0">
                    <Link to="/app/progress">
                        <LucideChartLine className="w-6 h-6 text-blue-700 dark:text-gray-200" />
                    </Link>
                </li>
                <li className="hover:cursor-pointer w-1/4 flex justify-center items-center flex-shrink-0">
                    <Link to="/app/goals">
                        <LucideGoal className="w-6 h-6 text-blue-700 dark:text-gray-200" />
                    </Link>
                </li>
                <li className="hover:cursor-pointer w-1/4 flex justify-center items-center flex-shrink-0">
                    <Link to="/app/exercises">
                        <LucideBookOpenText className="w-6 h-6 text-blue-700 dark:text-gray-200" />
                    </Link>
                </li>
                <li className="hover:cursor-pointer w-1/4 flex justify-center items-center flex-shrink-0">
                    <Link to="/app/profile">
                        <LucideUser className="w-6 h-6 text-blue-700 dark:text-gray-200" />
                    </Link>
                </li>
                <li className="hover:cursor-pointer w-1/4 flex justify-center items-center flex-shrink-0">
                    <Link to="/app/settings">
                        <LucideSettings className="w-6 h-6 text-blue-700 dark:text-gray-200" />
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default MobileSidebar;