import { useTranslation } from "react-i18next";
import TitleHeader from "../components/Public/TitleHeader";
import InfoCard from "../components/ui/InfoCard";
import { LucideAnvil, LucideBicepsFlexed, LucideBookOpenText, LucideChartLine, LucideChartPie, LucideCircleAlert, LucideFlame, LucideFootprints, LucideFrown, LucideHeart, LucidePersonStanding, LucidePlus, LucideShirt, LucideUser, LucideWeight, LucideZap, type LucideIcon } from "lucide-react";
import { Tooltip } from "react-tooltip";
import { useQuery } from "@apollo/client";
import { GET_HOME_DATA } from "../api/graphql/queries/home";
import { Link } from "react-router-dom";
import WorkoutMinimalCard from "../components/ui/WorkoutMinimalCard";
import { getRangeBMI, getRangeBFP } from "../utils/fitnessHelper";
import type { MuscleGroup } from "../types/general/MuscleGroupType";
import 'react-tooltip/dist/react-tooltip.css'

function Home() {
    const {t} = useTranslation([ "common", "home"]);
    let errorMsg = "";
    const {data, loading, error} = useQuery(GET_HOME_DATA);
    const muscleGroupMap: Record<MuscleGroup, number> = {
        None: 0,
        Chest: 1,
        Back: 2,
        Legs: 3,
        Arms: 4,
        Shoulders: 5,
        Core: 6,
        Cardio: 7
    };

    const reverseMuscleGroupMap: Record<number, MuscleGroup> = Object.fromEntries(
        Object.entries(muscleGroupMap).map(([key, value]) => [value, key])
    ) as Record<number, MuscleGroup>;

    const getMostCommonMuscle = (exercises: number[]): MuscleGroup => {
        if (exercises.length === 0) return "None";
        const counter = new Map<number, number>();
        for (const item of exercises) {
            counter.set(item, (counter.get(item) ?? 0) + 1);
        }

        let maxItem = 0;
        let maxCount = 0;
        for (const [item, count] of counter.entries()) {
            if (count > maxCount) {
                maxCount = count;
                maxItem = item;
            }
        }

        return reverseMuscleGroupMap[maxItem];
    };

    const getIconByMuscleGroup = (group : MuscleGroup) : LucideIcon => {
        switch(group) {
            case "None": return LucideCircleAlert;
            case "Chest": return LucideShirt;
            case "Back": return LucideZap;
            case "Legs": return LucideFootprints;
            case "Arms": return LucideBicepsFlexed;
            case "Shoulders": return LucideAnvil;
            case "Core": return LucidePersonStanding;
            case "Cardio": return LucideHeart;
            default: return LucideCircleAlert;
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        errorMsg = error.graphQLErrors.map((err) => err.extensions?.message).join(", ");
        console.error(errorMsg);
    }

    return (
        <>
            <TitleHeader title={t("dashboard", { ns: "common" })} />
            <div className="bg-neutral-50 min-h-[calc(100vh-4rem)] h-100 p-8 overflow-y-auto">
                <article className="mb-6 mx-4 p-8 bg-linear-to-r from-blue-600 to-orange-500 rounded-lg flex flex-col gap-2">
                    <p className="text-white font-bold text-2xl">{t("greeting", { ns: "home" })}, {data.userInfo?.userName}!</p>
                    <p className="text-white">{t("readyMessage", { ns: "home" })}</p>
                    {data.userInfo?.workouts?.length > 0 && <div className="flex flex-row items-center gap-2 w-fit rounded-lg">
                        <LucideBicepsFlexed className="w-6 h-6 text-orange-600"/>
                        <p>{t("workoutCount", { ns: "home", count: data.userInfo?.workouts?.length})}</p>
                    </div>}
                </article>
                <p className="text-2xl font-bold p-4 text-black">{t("quickOverview", { ns: "home" })}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 mb-6">
                    <InfoCard title={t("currentWeight", { ns: "home" })} titleColor="gray-500"
                        body={`${data.userInfo?.currentWeight} kg`} bodyColor="black" footer=""
                        footerColor="green-500" icon={LucideWeight} iconBgColor="green-100" 
                        iconColor="green-500"/>
                    
                    <InfoCard tooltipId="tooltipBMI" tooltipContent={t("BMI", { ns: "home" })}
                        title={t("currentBMI", { ns: "home" })} titleColor="gray-500"
                        body={data.userInfo?.currentBodyMassIndex} bodyColor="black" footer={getRangeBMI(data.userInfo?.currentBodyMassIndex, t)}
                        footerColor="blue-500" icon={LucideChartPie} iconBgColor="blue-100" 
                        iconColor="blue-500"/>
                    <Tooltip id="tooltipBMI" place="top" style={{ backgroundColor: "#1447e6", color: "white", fontWeight: 500 }} />
                    
                    <InfoCard tooltipId="tooltipBFP" tooltipContent={t("BFP", { ns: "home" })}
                        title={t("currentBFP", { ns: "home" })} titleColor="gray-500"
                        body={data.userInfo?.currentBodyFatPercentage} bodyColor="black" footer={getRangeBFP(data.userInfo?.currentBodyFatPercentage, t)}
                        footerColor="orange-500" icon={LucideFlame} iconBgColor="orange-100" 
                        iconColor="orange-500"/>
                    <Tooltip id="tooltipBFP" place="top" style={{ backgroundColor: "#1447e6", color: "white", fontWeight: 500 }} />
                </div>
                <p className="text-2xl font-bold p-4 text-black">{t("quickActions", { ns: "home" })}</p>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 mb-6">
                    <Link to="/app/workouts" className="flex flex-col items-center justify-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:cursor-pointer">
                        <div className="grid place-items-center w-12 h-12 bg-blue-100 rounded-full">
                            <LucidePlus className="w-6 h-6 text-blue-500" />
                        </div>
                        <p className="text-black text-center">{t("startWorkout", { ns: "home" })}</p>
                    </Link>
                    <Link to="/app/progress" className="flex flex-col items-center justify-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:cursor-pointer">
                        <div className="grid place-items-center w-12 h-12 bg-orange-100 rounded-full">
                            <LucideChartLine className="w-6 h-6 text-orange-500" />
                        </div>
                        <p className="text-black text-center">{t("viewProgress", { ns: "home" })}</p>
                    </Link>
                    <Link to="/app/exercises" className="flex flex-col items-center justify-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:cursor-pointer">
                        <div className="grid place-items-center w-12 h-12 bg-green-100 rounded-full">
                            <LucideBookOpenText className="w-6 h-6 text-green-500" />
                        </div>
                        <p className="text-black text-center">{t("exerciseLibrary", { ns: "home" })}</p>
                    </Link>
                    <Link to="/app/profile" className="flex flex-col items-center justify-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:cursor-pointer">
                        <div className="grid place-items-center w-12 h-12 bg-purple-100 rounded-full">
                            <LucideUser className="w-6 h-6 text-purple-500" />
                        </div>
                        <p className="text-black text-center">{t("editProfile", { ns: "home" })}</p>
                    </Link>
                </div>
                <p className="text-2xl font-bold p-4 text-black">{t("recentWorkouts", { ns: "home" })}</p>
                <div className="flex gap-4 px-4 mb-6">
                    {data.userInfo?.workouts?.length > 0 ? (
                        data.userInfo?.workouts?.slice(0, 4).map((workout: any, index: number) => (
                        <WorkoutMinimalCard 
                            key={index}
                            title={workout?.name}
                            description={`${workout?.workoutExercises.length} ${t("exercises", { ns: "home" })}`}
                            icon={
                                getIconByMuscleGroup(
                                    getMostCommonMuscle(workout?.workoutExercises?.map((x: { exercise: any }) => x?.exercise?.muscleGroup))
                                )
                            }
                            iconBgColor="blue-100"
                            iconColor="blue-500"
                        />
                    ))
                    ) : (
                        <WorkoutMinimalCard 
                            title={t("noWorkouts", { ns: "home" })}
                            description=""
                            icon={LucideFrown}
                            iconBgColor="gray-100"
                            iconColor="gray-500"
                        />
                    )}
                </div>
                <div className="flex flex-col gap-4 mx-4 p-4 mb-12 lg:mb-2 rounded-lg border border-gray-200">
                    <p className="text-2xl font-bold text-black">{t("weightProgress", { ns: "home" })}</p>
                    {data.userInfo?.weightProgress?.length > 1 ? (
                        <div></div>
                    ) : (
                        <div className="flex flex-col lg:gap-4 items-center justify-center w-full h-48 bg-neutral-100 rounded-lg p-2 lg:p-4">
                            <LucideChartLine className="w-10 lg:w-16 h-10 lg:h-16 text-gray-400 m-4 lg:m-0"/>
                            <p className="p-4 lg:p-0 text-gray-500 text-sm lg:text-lg text-center">{t("noWeightProgress", { ns: "home" })}</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Home;