import { LucideAnvil, LucideBicepsFlexed, LucideCircleAlert, LucideCircleQuestionMark,
    LucideEye, LucideFootprints, LucideHeart, LucidePersonStanding, LucideShirt, 
    LucideZap, type LucideIcon } from "lucide-react";
import { IconButton } from "./IconButton";

interface ExerciseCardProps {
    name: string;
    description: string;
    muscleGroup: number;
    muscleGroupName: string;
    label: string;
    onClick?: () => void;
}

function ExerciseCard({name, description, muscleGroup, muscleGroupName, label, onClick} : ExerciseCardProps) {
    const getIconByMuscleGroup = (group : number) : [LucideIcon, string, string] => {
        switch(group) {
            case 0: return [LucideCircleAlert, 'bg-gray-100', 'text-gray-500'];
            case 1: return [LucideShirt, 'bg-blue-100', 'text-blue-500'];
            case 2: return [LucideZap, 'bg-yellow-100', 'text-yellow-500'];
            case 3: return [LucideFootprints, 'bg-green-100', 'text-green-500'];
            case 4: return [LucideBicepsFlexed, 'bg-red-100', 'text-red-500'];
            case 5: return [LucideAnvil, 'bg-orange-100', 'text-orange-500'];
            case 6: return [LucidePersonStanding, 'bg-purple-100', 'text-purple-500'];
            case 7: return [LucideHeart, 'bg-indigo-100', 'text-indigo-500'];
            default: return [LucideCircleQuestionMark, 'bg-teal-100', 'text-teal-500'];
        }
    };

    const [Icon, backgroundColor, iconColor] = getIconByMuscleGroup(muscleGroup);

    return (
        <>
            <article className="flex flex-col rounded-xl border border-gray-200 h-100" onClick={onClick}>
                <section className={`h-1/2 ${backgroundColor} flex justify-center items-center rounded-xl rounded-b-none`}>
                    <Icon className={`${iconColor} w-15 h-15`}/>
                </section>
                <section className="flex flex-col p-5 h-1/2 bg-white dark:bg-gray-800 rounded-xl rounded-t-none">
                    <div className="flex justify-between mb-5">
                        <p className="text-black dark:text-gray-200 font-bold">{name}</p>
                        <div className={`text-gray-500 dark:text-gray-800 rounded-2xl ${backgroundColor} px-3`}>{muscleGroupName}</div>
                    </div>
                    <p className="text-gray-500 mb-2 line-clamp-2 min-h-12">{description}</p>
                    <IconButton icon={LucideEye} label={label} classname="flex items-center w-full justify-center gap-2 p-2 text-white bg-blue-700 rounded-lg" />
                </section>
            </article>
        </>
    );
}

export default ExerciseCard;