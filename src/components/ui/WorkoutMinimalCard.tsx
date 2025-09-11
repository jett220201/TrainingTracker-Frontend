import type { LucideIcon } from "lucide-react";

interface WorkoutMinimalCardProps {
    icon: LucideIcon;
    iconBgColor?: string;
    iconColor?: string;
    title: string;
    description: string;
}

function WorkoutMinimalCard({title, description, icon: Icon, iconBgColor, iconColor}: WorkoutMinimalCardProps) {
    return (
        <article className="bg-white dark:bg-gray-800 text-white p-4 rounded-lg border border-gray-200 flex w-full gap-8 items-center">
            <section>
                <div className={`w-14 h-14 flex items-center justify-center bg-${iconBgColor ?? 'gray-100'} p-3 rounded-full`}>
                    <Icon className={`text-${iconColor ?? 'gray-500'} w-6 h-6`}/>
                </div>
            </section>
            <section>
                <p className="text-black font-semibold text-lg dark:text-gray-100">{title}</p>
                <p className="text-gray-600 dark:text-gray-200">{description}</p>
            </section>
        </article>
    );
}

export default WorkoutMinimalCard;