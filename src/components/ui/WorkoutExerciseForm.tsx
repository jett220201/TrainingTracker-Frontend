import { LucideTrash } from "lucide-react"
import { IconButton } from "./IconButton"
import type { WorkoutExercise } from "../../types/dto/WorkoutsRequest"
import { useEffect, useState } from "react"

interface WorkoutExerciseFormProps {
    id: number
    index: number
    name: string
    description: string
    reps: number
    sets: number
    restTime: number
    weight: number
    translate: (key: string) => string
    onDelete: (event: React.FormEvent) => void
    onEdit: (index: number, newItem: WorkoutExercise) => void
}
function WorkoutExerciseForm({id, index, name, description, reps, sets, restTime, weight, translate, onDelete, onEdit}: WorkoutExerciseFormProps) {
    const [setsValue, setSetsValue] = useState<number>(sets);
    const [repsValue, setRepsValue] = useState<number>(reps);
    const [restTimeValue, setRestTimeValue] = useState<number>(restTime);
    const [weightValue, setWeightValue] = useState<number>(weight);

    useEffect(() => {
        onEdit(index, {
            exerciseId: id,
            sets: setsValue ?? 1,
            repetitions: repsValue ?? 1,
            weight: weightValue ?? 0,
            restTimeInMinutes: restTimeValue ?? 0,
            name: name,
            description: description
        });
    }, [setsValue, repsValue, restTimeValue, weightValue]);

    return (
        <>
            <article className="flex flex-col rounded-xl border border-gray-200 p-5 bg-gray-100 dark:bg-gray-800 gap-4">
                    <section className="flex gap-4">
                        <div className="w-full flex flex-col gap-2 lg:gap-0">
                            <p className="text-black font-semibold dark:text-gray-200 flex gap-1">{name}</p>
                            <p className="text-gray-500 dark:text-gray-200 flex gap-1 w-full">{description}</p>
                        </div>
                        <IconButton icon={LucideTrash} label="" classname="w-8 h-8 text-gray-400 hover:text-red-400" onClickForm={onDelete} />
                    </section>
                    <section className="grid grid-cols-1 lg:flex gap-4 justify-center">
                        <p className="text-gray-500 dark:text-gray-200 flex gap-1">
                            {`${translate("sets")}:`}
                            <input type="number" value={setsValue} onChange={(e) => setSetsValue(parseInt(e.target.value))} className="w-16 bg-gray-200 dark:bg-gray-700 text-center rounded-md"/>
                        </p>
                        <p className="text-gray-500 dark:text-gray-200 flex gap-1">
                            {`${translate("reps")}:`}
                            <input type="number" value={repsValue} onChange={(e) => setRepsValue(parseInt(e.target.value))} className="w-16 bg-gray-200 dark:bg-gray-700 text-center rounded-md"/>
                        </p>
                        <p className="text-gray-500 dark:text-gray-200 flex gap-1">
                            {`${translate("weight")}:`}
                            <input type="number" value={weightValue} onChange={(e) => setWeightValue(parseInt(e.target.value))} className="w-16 bg-gray-200 dark:bg-gray-700 text-center rounded-md"/>
                        </p>
                        <p className="text-gray-500 dark:text-gray-200 flex gap-1">
                            {`${translate("rest")}:`}
                            <input type="number" value={restTimeValue} onChange={(e) => setRestTimeValue(parseInt(e.target.value))} className="w-16 bg-gray-200 dark:bg-gray-700 text-center rounded-md"/>
                        </p>
                    </section>
                </article>
        </>
    );
}

export default WorkoutExerciseForm;