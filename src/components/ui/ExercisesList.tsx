import { useQuery } from "@apollo/client";
import { GET_PAGINATE_EXERCISES } from "../../api/graphql/queries/exercises";
import Loading from "../Public/Loading";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import IconInput from "./IconInput";
import { LucideArrowBigLeftDash, LucideArrowBigRightDash, LucideSearch, LucideSlidersHorizontal } from "lucide-react";
import { IconButton } from "./IconButton";
import MinimalExerciseCard from "./MinimalExerciseCard";
import type { WorkoutExercise } from "../../types/dto/WorkoutsRequest";
import { useFormStore } from "../../store/FormStore";

interface ExercisesListProps {
    onAddExerciseToWorkout: (exercise: WorkoutExercise) => void;
    onRemoveExerciseToWorkout: (id: number) => void;
}

function ExercisesList({ onAddExerciseToWorkout, onRemoveExerciseToWorkout }: ExercisesListProps) {
    const variables = {
        muscle: null,
        searchInput: "",
        firstElement: 5,
        after: null,
        lastElement: null,
        before: null
    };
    const { items } = useFormStore(); 
    const { t } = useTranslation(["exercises"]);
    const { data, loading, error, refetch } = useQuery(GET_PAGINATE_EXERCISES, { variables });
    const [search, setSearch] = useState<string>("");
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const [muscle, setMuscle] = useState<number | null>(null);
    const [after, setAfter] = useState<string | null>(null);
    const [before, setBefore] = useState<string | null>(null);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [search]);

    useEffect(() => {
        refetch({
            muscle: muscle,
            searchInput: debouncedSearch,
            firstElement: after ? 5 : null,
            after: after,
            lastElement: before ? 5 : null,
            before: before
        });
    }, [after, before, debouncedSearch, muscle]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        console.error(error.graphQLErrors.map((err) => err.extensions?.message).join(", "));
    }

    const handleMuscleChange = (value: number | null) => {
        if (data?.exercises?.pageInfo?.hasPreviousPage) {
            setAfter(null);
            setBefore(null);
        }
        setMuscle(value);
    }

    const getButtonClasses = (value: number | null) => {
        const isActive = muscle === value;
        const baseClasses = "flex !rounded-3xl px-2 py-0 items-center justify-center !text-xs lg:!text-sm cursor-pointer transition-colors duration-200";
        return isActive
            ? `${baseClasses} bg-blue-700 text-white`
            : `${baseClasses} bg-gray-200 dark:bg-slate-900 text-gray-800 dark:text-gray-100`;
    };

    const handleAddExercise = (id: number, name: string, description: string) => {
        onAddExerciseToWorkout({
            exerciseId: id,
            name: name,
            description: description,
            sets: 1,
            repetitions: 1,
            weight: 0,
            restTimeInMinutes: 0
        } as WorkoutExercise);
    }

    const existsInWorkout = (id: number) => {
        return items.some(item => item.exerciseId === id);
    }

    return (
        <>
            <article className="flex flex-col items-center justify-start gap-5 w-full h-90 relative mb-5">
                <section className="flex flex-col gap-5 w-full items-center justify-between">
                    <div className="w-full">
                        <IconInput
                            inputId="exercisesSearch"
                            icon={LucideSearch}
                            type={"text"}
                            placeholder={t("search", { ns: "exercises" })}
                            classname="pl-10 w-full p-2 border border-gray-200 rounded text-gray-500 dark:text-gray-200"
                            label={""}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <p className="block text-sm font-medium text-gray-700 dark:text-gray-200">{t("muscleGroup", { ns: "exercises" })}</p>
                        <div className="grid grid-cols-4 gap-3">
                            <button
                                className={getButtonClasses(null)}
                                onClick={(e) => { e.preventDefault(); handleMuscleChange(null) }}>
                                {t("all", { ns: "exercises" })}
                            </button>
                            <button
                                className={getButtonClasses(1)}
                                onClick={(e) => { e.preventDefault(); handleMuscleChange(1) }}>
                                {t("chest", { ns: "exercises" })}
                            </button>
                            <button
                                className={getButtonClasses(2)}
                                onClick={(e) => { e.preventDefault(); handleMuscleChange(2) }}>
                                {t("back", { ns: "exercises" })}
                            </button>
                            <button
                                className={getButtonClasses(3)}
                                onClick={(e) => { e.preventDefault(); handleMuscleChange(3) }}>
                                {t("legs", { ns: "exercises" })}
                            </button>
                            <button
                                className={getButtonClasses(4)}
                                onClick={(e) => { e.preventDefault(); handleMuscleChange(4) }}>
                                {t("arms", { ns: "exercises" })}
                            </button>
                            <button
                                className={getButtonClasses(5)}
                                onClick={(e) => { e.preventDefault(); handleMuscleChange(5) }}>
                                {t("shoulders", { ns: "exercises" })}</button>
                            <button
                                className={getButtonClasses(6)}
                                onClick={(e) => { e.preventDefault(); handleMuscleChange(6) }}>
                                {t("core", { ns: "exercises" })}
                            </button>
                            <button
                                className={getButtonClasses(7)}
                                onClick={(e) => { e.preventDefault(); handleMuscleChange(7) }}>
                                {t("cardio", { ns: "exercises" })}
                            </button>
                        </div>
                    </div>
                </section>
                <section className="flex flex-col gap-5 w-full max-h-1/2 overflow-y-auto">
                    {data?.exercises?.edges?.length > 0 ? data?.exercises?.edges?.map((item: any, index: number) => (
                        <MinimalExerciseCard key={index} name={item?.node?.name} description={item?.node?.description} exists={existsInWorkout(item?.node?.id)}
                            muscleGroup={item?.node?.muscleGroup} translate={t} onRemove={(e) => { e.preventDefault(); onRemoveExerciseToWorkout(item?.node?.id) }}
                            onAdd={(e) => { e.preventDefault(); handleAddExercise(item?.node?.id, item?.node?.name, item?.node?.description) }}
                        />
                    )) : <div className="flex flex-row items-center justify-center gap-5 w-full">
                        <LucideSlidersHorizontal className="w-8 h-8 text-blue-700" />
                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{t("noData", { ns: "exercises" })}</p>
                    </div>}
                    <div className="flex justify-center lg:justify-end w-full lg:absolute lg:-bottom-11 lg:right-10 flex gap-5">
                        <IconButton
                            icon={LucideArrowBigLeftDash}
                            label={t("prev", { ns: "exercises" })}
                            classname={`flex flex-row items-center gap-2 ${data?.exercises?.pageInfo?.hasPreviousPage ? 'text-blue-700 dark:text-gray-200' : 'text-gray-300 dark:text-gray-500 pointer-events-none'}`}
                            onClickForm={(e) => {
                                e.preventDefault();
                                setBefore(data?.exercises?.pageInfo?.startCursor);
                                setAfter(null);
                            }}
                        />
                        <IconButton
                            icon={LucideArrowBigRightDash}
                            label={t("next", { ns: "exercises" })}
                            classname={`flex flex-row-reverse items-center gap-2 ${data?.exercises?.pageInfo?.hasNextPage ? 'text-blue-700 dark:text-gray-200' : 'text-gray-300 dark:text-gray-500 pointer-events-none'}`}
                            onClickForm={(e) => {
                                e.preventDefault();
                                setBefore(null);
                                setAfter(data?.exercises?.pageInfo?.endCursor);
                            }}
                        />
                    </div>
                </section>

            </article>
        </>
    );
}

export default ExercisesList;