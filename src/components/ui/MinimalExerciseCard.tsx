import {
    LucideAnvil, LucideBicepsFlexed, LucideCircleAlert, LucideCircleQuestionMark,
    LucideFootprints, LucideHeart, LucidePersonStanding, LucideShirt,
    LucideZap, type LucideIcon
} from "lucide-react";
interface MinimalExerciseCardProps {
    name: string
    description: string
    muscleGroup: number
    reps: number
    sets: number
    restTime: number
    weight: number
    translate: (key: string) => string
}

function MinimalExerciseCard({name, description, muscleGroup, reps, sets, restTime, weight, translate} : MinimalExerciseCardProps) {
    const getIconByMuscleGroup = (group : number) : [LucideIcon, string, string] => {
        switch(group) {
            case 0: return [LucideCircleAlert, 'bg-linear-to-r from-gray-400 to-gray-600', 'text-white'];
            case 1: return [LucideShirt, 'bg-linear-to-r from-sky-600 to-blue-800', 'text-white'];
            case 2: return [LucideZap, 'bg-linear-to-r from-yellow-600 to-yellow-800', 'text-white'];
            case 3: return [LucideFootprints, 'bg-linear-to-r from-green-600 to-green-800', 'text-white'];
            case 4: return [LucideBicepsFlexed, 'bg-linear-to-r from-red-600 to-red-800', 'text-white'];
            case 5: return [LucideAnvil, 'bg-linear-to-r from-orange-600 to-orange-800', 'text-white'];
            case 6: return [LucidePersonStanding, 'bg-linear-to-r from-purple-600 to-purple-800', 'text-white'];
            case 7: return [LucideHeart, 'bg-linear-to-r from-indigo-600 to-indigo-800', 'text-white'];
            default: return [LucideCircleQuestionMark, 'bg-linear-to-r from-teal-600 to-teal-800', 'text-white'];
        }
    };
    const [Icon, backgroundColor, iconColor] = getIconByMuscleGroup(muscleGroup);
    return (
        <>
            <article className="flex flex-col rounded-xl border border-gray-200 p-5 bg-gray-100 dark:bg-gray-800 gap-4">
                <section className="flex gap-4">
                    <div className="w-1/8 hidden lg:flex items-center justify-center">
                        <div className={`h-12 w-12 ${backgroundColor} hidden lg:flex justify-center items-center rounded-xl`}>
                            <Icon className={`${iconColor} w-8 h-8`} />
                        </div>
                    </div>
                    <div className="w-7/8 lg:w-full flex flex-col gap-2 lg:gap-0">
                        <p className="text-black font-semibold dark:text-gray-200 flex gap-1">{name}</p>
                        <p className="text-gray-500 dark:text-gray-200 flex gap-1 w-full">{description}</p>
                    </div>
                </section>
                <section className="grid grid-cols-1 lg:flex gap-4 justify-center">
                    <p className="text-gray-500 dark:text-gray-200 flex gap-1">{`${translate("sets")}:`}<span className="font-semibold text-black dark:text-gray-100">{sets}</span></p>
                    <p className="text-gray-500 dark:text-gray-200 flex gap-1">{`${translate("reps")}:`}<span className="font-semibold text-black dark:text-gray-100">{reps}</span></p>
                    <p className="text-gray-500 dark:text-gray-200 flex gap-1">{`${translate("weight")}:`}<span className="font-semibold text-black dark:text-gray-100">{weight} kg</span></p>
                    <p className="text-gray-500 dark:text-gray-200 flex gap-1">{`${translate("rest")}:`}<span className="font-semibold text-black dark:text-gray-100">{restTime} {translate("minutes")}</span></p>
                </section>
            </article>
        </>
    );
}

export default MinimalExerciseCard;