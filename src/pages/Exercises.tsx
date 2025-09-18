import { useTranslation } from "react-i18next";
import TitleHeader from "../components/Public/TitleHeader";
import IconInput from "../components/ui/IconInput";
import { LucideArrowBigLeftDash, LucideArrowBigRightDash, LucideSearch, LucideSlidersHorizontal } from "lucide-react";
import { GET_PAGINATE_EXERCISES } from "../api/graphql/queries/exercises";
import { useQuery } from "@apollo/client";
import Loading from "../components/Public/Loading";
import { useEffect, useState } from "react";
import { IconButton } from "../components/ui/IconButton";
import ExerciseCard from "../components/ui/ExerciseCard";

function Exercises() {
    const variables = {
        muscle: null,
        searchInput: "",
        firstElement: 12,
        after: null,
        lastElement: null,
        before: null
    };
    const {data, loading, error, refetch} = useQuery(GET_PAGINATE_EXERCISES, {variables});
    const {t} = useTranslation(["exercises"]);
    const [search, setSearch] = useState<string>("");
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const [muscle, setMuscle] = useState<number | null>(null);
    const [after, setAfter] = useState<string | null>(null);
    const [before, setBefore] = useState<string | null>(null);
    let errorMsg = "";

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
            firstElement: after ? 12 : null,
            after: after,
            lastElement: before ? 12 : null,
            before: before
        });
    }, [after, before, debouncedSearch, muscle]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        errorMsg = error.graphQLErrors.map((err) => err.extensions?.message).join(", ");
        console.error(errorMsg);
    }

    const handleMuscleChange = (value: number | null) => {
        setMuscle(value);
    }

    const baseClasses = "flex !rounded-3xl px-4 py-1 items-center justify-center cursor-pointer transition-colors duration-200";

    const getButtonClasses = (value: number | null) => {
        const isActive = muscle === value;
        return isActive
            ? `${baseClasses} bg-blue-700 text-white`
            : `${baseClasses} bg-gray-200 dark:bg-slate-900 text-gray-800 dark:text-gray-100`;
    };

    return (
        <>
            <TitleHeader title={t("title", { ns: "exercises" })} extraInfo={`${data?.exercises?.totalCount ?? 0} ${t("exercises",  { ns: "exercises" })}`}/>
            <div className="bg-neutral-50 dark:bg-slate-950 min-h-[calc(100vh-4rem)] h-100 px-2 py-6 lg:px-8 lg:py-8 overflow-y-auto">
                <article className="mb-6 mx-4 rounded-lg bg-white dark:bg-gray-800 flex flex-col h-auto min-h-20 border border-gray-200 relative">
                    <div className="flex border-gray-200 rounded-lg p-5">
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
                    <div className="flex flex-col border-gray-200 rounded-lg pr-5 pl-5 pb-3 gap-2">
                        <p className="block text-sm font-medium text-gray-700 dark:text-gray-200">{t("muscleGroup", { ns: "exercises" })}</p>
                        <div className="grid grid-cols-3 lg:flex gap-5">
                            <button
                                className={getButtonClasses(null)}
                                onClick={() => handleMuscleChange(null)}>
                                {t("all", { ns: "exercises" })}
                            </button>
                            <button
                                className={getButtonClasses(1)}
                                onClick={() => handleMuscleChange(1)}>
                                {t("chest", { ns: "exercises" })}
                            </button>
                            <button
                                className={getButtonClasses(2)}
                                onClick={() => handleMuscleChange(2)}>
                                {t("back", { ns: "exercises" })}
                            </button>
                            <button
                                className={getButtonClasses(3)}
                                onClick={() => handleMuscleChange(3)}>
                                {t("legs", { ns: "exercises" })}
                            </button>
                            <button
                                className={getButtonClasses(4)}
                                onClick={() => handleMuscleChange(4)}>
                                {t("arms", { ns: "exercises" })}
                            </button>
                            <button
                                className={getButtonClasses(5)}
                                onClick={() => handleMuscleChange(5)}>
                                {t("shoulders", { ns: "exercises" })}</button>
                            <button
                                className={getButtonClasses(6)}
                                onClick={() => handleMuscleChange(6)}>
                                {t("core", { ns: "exercises" })}
                            </button>
                            <button
                                className={getButtonClasses(7)}
                                onClick={() => handleMuscleChange(7)}>
                                {t("cardio", { ns: "exercises" })}
                            </button>
                        </div>
                    </div>
                </article>
                <section className={`relative grid ${data?.exercises?.edges?.length > 0 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-4 mx-4 mb-14 lg:mb-8`}>
                    {data?.exercises?.edges?.length > 0 ? data?.exercises?.edges?.map((item : any, index : number) => (
                        <ExerciseCard 
                            key={index}
                            name={item?.node?.name} 
                            description={item?.node?.description} 
                            muscleGroup={item?.node?.muscleGroup} 
                            muscleGroupName={item?.node?.muscleGroupName} 
                            label={t("viewDetails", { ns: "exercises" })} />
                    )) : <div className="flex flex-row items-center justify-center gap-5 w-full">
                            <LucideSlidersHorizontal className="w-8 h-8 text-blue-700"/>
                            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{t("noData", { ns: "exercises" })}</p>
                        </div>}
                    <div className="flex justify-center lg:justify-end w-full lg:absolute lg:-bottom-13 lg:right-10 flex gap-5">
                        <IconButton 
                            icon={LucideArrowBigLeftDash} 
                            label={t("prev", { ns: "exercises" })} 
                            classname={`flex flex-row items-center gap-2 ${data?.exercises?.pageInfo?.hasPreviousPage ? 'text-blue-700 dark:text-gray-200' : 'text-gray-300 dark:text-gray-800 pointer-events-none'}`} 
                            onClick={() => {
                                setBefore(data?.exercises?.pageInfo?.startCursor);
                                setAfter(null);
                            }}
                            />
                        <IconButton 
                            icon={LucideArrowBigRightDash} 
                            label={t("next", { ns: "exercises" })} 
                            classname={`flex flex-row-reverse items-center gap-2 ${data?.exercises?.pageInfo?.hasNextPage ? 'text-blue-700 dark:text-gray-200' : 'text-gray-300 dark:text-gray-800 pointer-events-none'}`} 
                            onClick={() => {
                                setBefore(null);
                                setAfter(data?.exercises?.pageInfo?.endCursor);
                            }}
                            />
                    </div>
                </section>
            </div>
        </>
    );
}

export default Exercises;