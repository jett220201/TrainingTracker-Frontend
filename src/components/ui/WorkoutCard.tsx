import { LucideAnvil, LucideBicepsFlexed, LucideCircleAlert, LucideCirclePlay, LucideCircleQuestionMark,
    LucideEye,
    LucideFootprints, LucideHeart, LucidePersonStanding, LucideShirt, 
    LucideSquarePen, 
    LucideTrash, 
    LucideZap, type LucideIcon } from "lucide-react";
import { IconButton } from "./IconButton";

interface WorkoutCardProps {
    name: string
    exercisesCount: number
    muscleGroup: number
    translate: (key: string) => string
    onDelete?: () => void
    onEdit?: () => void
    onView?: () => void
    onStart?: () => void
}

function WorkoutCard({name, exercisesCount, muscleGroup, translate, onDelete, onEdit, onStart, onView} : WorkoutCardProps) {
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
            <article className="flex flex-col rounded-xl border border-gray-200 p-5 bg-white dark:bg-gray-800 gap-4">
                <section className="flex justify-between items-center">
                    <div className={`h-12 w-12 ${backgroundColor} flex justify-center items-center rounded-xl`}>
                        <Icon className={`${iconColor} w-8 h-8`} />
                    </div>
                    <div className="flex justify-start flex-1 px-5 w-1/2">
                        <p className="text-black line-clamp-2 dark:text-white">{name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center justify-center w-12 !p-2 rounded !border !border-gray-200 hover:!border-amber-400 group" onClick={onEdit}>
                            <LucideSquarePen className="w-5 h-5 text-gray-400 group-hover:text-amber-400" />
                        </button>
                        <button className="flex items-center justify-center w-12 !p-2 rounded !border !border-gray-200 hover:!border-red-400 group" onClick={onDelete}>
                            <LucideTrash className="w-5 h-5 text-gray-400 group-hover:text-red-400" />
                        </button>
                    </div>
                </section>
                <section>
                    <p className="text-gray-500 dark:text-gray-200 flex gap-1">{`${translate("exercises")}:`}<span className="font-semibold text-black dark:text-gray-100">{exercisesCount}</span></p>
                </section>
                <section className="flex gap-2">
                    <IconButton 
                        icon={LucideCirclePlay}
                        label={translate("start")}
                        classname="flex items-center w-full justify-center gap-2 p-2 text-white bg-blue-700 rounded-lg hover:bg-blue-800"
                        onClick={onStart}
                    />
                    <IconButton 
                        icon={LucideEye}
                        label={translate("view")}
                        classname="flex items-center w-full justify-center gap-2 p-2 text-gray-500 bg-gray-50 rounded-lg border !border-gray-300 hover:bg-gray-200"
                        onClick={onView}
                    />
                </section>
            </article>
        </>   
    );
}

export default WorkoutCard;