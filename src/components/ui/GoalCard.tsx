import { LucideSquarePen, LucideTrash } from "lucide-react"
import type { GoalDirection } from "../../types/general/GoalDirectionType"
import type { GoalStatus } from "../../types/general/GoalStatus"
import type { GoalType } from "../../types/general/GoalType"

interface GoalCardsProps {
    createdAt: string
    currentValue: number
    description: string
    goalDate: string
    goalDirection: GoalDirection
    goalStatus: GoalStatus
    goalType: GoalType
    progressPercent: number
    targetValue: number
    translate: (key: string) => string
    onDelete?: () => void
    onEdit?: () => void
}

function GoalCard({ createdAt, currentValue, description, goalDate, goalDirection,
    goalStatus, goalType, progressPercent, targetValue, translate, onDelete, onEdit }: GoalCardsProps) {

    let unit : string;
    let goalStatusBgColor : string;
    let goalStatusTextColor : string;
    let goalProgressColor : string;
    switch (goalType.toLocaleLowerCase()) {
        case "weight":
            unit = "kg";
            goalProgressColor = "bg-green-500";
            break;
        case "bfp":
            unit = "%";
            goalProgressColor = "bg-orange-500";
            break;
        case "bmi":
            unit = "";
            goalProgressColor = "bg-blue-500";
            break;
        default:
            unit = "";
            goalProgressColor = "bg-red-500";
            break;
    }

    switch (goalStatus.toLocaleLowerCase()) {
        case "active":
            goalStatusBgColor = "bg-blue-200";
            goalStatusTextColor = "text-blue-800";
            break;
        case "overdue":
            goalStatusBgColor = "bg-orange-400";
            goalStatusTextColor = "text-orange-800";
            break;
        default: // completed
            goalStatusBgColor = "bg-green-400";
            goalStatusTextColor = "text-green-800";
            break;
    }

    if(progressPercent > 100) {
        progressPercent = 100;
    }

    return (
        <article className="flex flex-col gap-2 bg-white dark:bg-gray-800 border border-gray-200 rounded-lg p-2 lg:p-4 mb-12 lg:mb-6">
            <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-4">
                    <p className="text-black dark:text-white font-bold text-xl max-w-30 lg:max-w-fit">{description}</p>
                    <p className={`${goalStatusBgColor} rounded-xl px-3 ${goalStatusTextColor}`}>{translate(goalStatus.toLocaleLowerCase())}</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center justify-center w-12 !p-2 rounded !border !border-gray-200 hover:!border-amber-400 group" onClick={onEdit}>
                        <LucideSquarePen className="w-5 h-5 text-gray-400 group-hover:text-amber-400" />
                    </button>
                    <button className="flex items-center justify-center w-12 !p-2 rounded !border !border-gray-200 hover:!border-red-400 group" onClick={onDelete}>
                        <LucideTrash className="w-5 h-5 text-gray-400 group-hover:text-red-400" />
                    </button>
                </div>
            </div>
            <div className="hidden lg:flex items-center justify-around w-full">
                <p className="text-gray-500 dark:text-gray-200 flex gap-1">{`${translate("type")}:`}<span className="font-semibold text-black dark:text-gray-100">{translate(goalType.toLocaleLowerCase())}</span></p>
                <p className="text-gray-500 dark:text-gray-200 flex gap-1">{`${translate("direction")}:`}<span className="font-semibold text-black dark:text-gray-100">{translate(goalDirection.toLocaleLowerCase())}</span></p>
                <p className="text-gray-500 dark:text-gray-200 flex gap-1">{`${translate("currentValue")}:`}<span className="font-semibold text-black dark:text-gray-100">{currentValue} {unit}</span></p>
                <p className="text-gray-500 dark:text-gray-200 flex gap-1">{`${translate("target")}:`}<span className="font-semibold text-black dark:text-gray-100">{targetValue} {unit}</span></p>
                <p className="text-gray-500 dark:text-gray-200 flex gap-1">{`${translate("dateCreated")}:`}<span className="font-semibold text-black dark:text-gray-100">{createdAt}</span></p>
                <p className="text-gray-500 dark:text-gray-200 flex gap-1">{`${translate("dateDue")}:`}<span className="font-semibold text-black dark:text-gray-100">{goalDate}</span></p>
            </div>
            <div className="flex lg:hidden flex-col items-start gap-2 w-full">
                <p className="text-gray-500 dark:text-gray-200 flex gap-1">{`${translate("type")}:`}<span className="font-semibold text-black dark:text-gray-100">{translate(goalType.toLocaleLowerCase())}</span></p>
                <p className="text-gray-500 dark:text-gray-200 flex gap-1">{`${translate("direction")}:`}<span className="font-semibold text-black dark:text-gray-100">{translate(goalDirection.toLocaleLowerCase())}</span></p>
                <section className="flex gap-4">
                    <p className="text-gray-500 dark:text-gray-200 flex gap-1">{`${translate("currentValue")}:`}<span className="font-semibold text-black dark:text-gray-100">{currentValue} {unit}</span></p>
                    <p className="text-gray-500 dark:text-gray-200 flex gap-1">{`${translate("target")}:`}<span className="font-semibold text-black dark:text-gray-100">{targetValue} {unit}</span></p>
                </section>
                <p className="text-gray-500 dark:text-gray-200 flex gap-1">{`${translate("dateCreated")}:`}<span className="font-semibold text-black dark:text-gray-100">{createdAt}</span></p>
                <p className="text-gray-500 dark:text-gray-200 flex gap-1">{`${translate("dateDue")}:`}<span className="font-semibold text-black dark:text-gray-100">{goalDate}</span></p>
            </div>
            <div className="flex flex-col gap-1">
                <div className="flex w-full justify-between items-center">
                    <p className="text-gray-500 dark:text-gray-200">{translate("progress")}</p>
                    <p className="text-gray-500 dark:text-gray-200">{`${progressPercent.toFixed(2)} % (${currentValue} ${unit} → ${targetValue} ${unit})`}</p>
                </div>
                <div className="w-full bg-gray-300 h-2 rounded">
                    <div className={`${goalProgressColor} h-2 rounded`} style={{ width: `${progressPercent}%` }} />
                </div>
            </div>

        </article>
    );
}

export default GoalCard;