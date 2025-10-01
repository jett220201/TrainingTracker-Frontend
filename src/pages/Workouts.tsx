import { useTranslation } from "react-i18next";
import TitleHeader from "../components/Public/TitleHeader";
import { useQuery } from "@apollo/client";
import { GET_WORKOUTS } from "../api/graphql/queries/workouts";
import Loading from "../components/Public/Loading";
import { LucideBan, LucideCheckCheck, LucideDumbbell, LucidePlus, LucideSearch, LucideShield } from "lucide-react";
import IconInput from "../components/ui/IconInput";
import { useEffect, useState, Fragment } from "react";
import WorkoutCard from "../components/ui/WorkoutCard";
import { Dialog, DialogPanel, DialogTitle, Transition, Description } from "@headlessui/react";
import { IconButton } from "../components/ui/IconButton";
import { workoutApi } from "../api/rest/workoutApi";
import type { Alert } from "../types/general/AlertType";
import AlertBlock from "../components/ui/AlertBlock";

function Workouts() {
    const {t} = useTranslation(["workouts", "common"]);
    let errorMsg = "";
    const [message, setMessage] = useState<string | null>(null);
    const [alertType, setAlertType] = useState<Alert>("Tip");
    const [search, setSearch] = useState<string>("");
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const [currentWorkoutId, setCurrentWorkoutId] = useState<number>(0);
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
    const [openViewModal, setOpenViewModal] = useState<boolean>(false);
    const {data, loading, error, refetch} = useQuery(GET_WORKOUTS, {
        variables: {
            search: ""
        }
    });

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [search]);

    useEffect(() => {
        refetch({ search: debouncedSearch });
    }, [debouncedSearch]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        errorMsg = error.graphQLErrors.map((err) => err.extensions?.message).join(", ");
        console.error(errorMsg);
    }

    const handleDeleteClick = (id: number) => {
        setCurrentWorkoutId(id);
        setOpenDeleteModal(true);
    }

    const handleEditClick = (id: number) => {
        setCurrentWorkoutId(id);
        setOpenEditModal(true);
    }

    const handleDeleteWorkout = async () => {
        try {
            const payload = currentWorkoutId;

            const response = await workoutApi.delete(payload);
            setAlertType("Success");
            setMessage(response.message);

            // refresh data
            await refetch();

            // hide message
            setTimeout(() => {
                setMessage("");
                setOpenDeleteModal(false);
            }, 3000);
        }
        catch (error: any) {
            setAlertType("Error");
            setMessage(error.details != undefined ? error.details : error.message)
        }
    }

    const getMostCommonMuscle = (exercises: number[]): number => {
        if (exercises.length === 0) return 0;
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

        return maxItem;
    };

    return (
        <>
            <TitleHeader title={t("workouts", { ns: "common" })} extraInfo={`${data?.workoutsByUser?.totalWorkouts ?? 0} ${data?.workoutsByUser?.totalWorkouts > 1 ? t("workouts",  { ns: "workouts" }) : t("workout",  { ns: "workouts" })}`}/>
            <div className="bg-neutral-50 dark:bg-slate-950 min-h-[calc(100vh-4rem)] h-100 px-2 pt-2 pb-18 lg:px-8 lg:pt-8 lg:pb-8 overflow-y-auto relative flex flex-col gap-4">
                <section className="flex flex-col lg:flex-row gap-4 justify-between">
                    <IconInput
                        inputId="workoutSearch"
                        icon={LucideSearch}
                        type={"text"}
                        placeholder={t("searchPlaceholder", { ns: "workouts" })}
                        classname="pl-10 w-full p-2 border border-gray-200 rounded text-gray-500 dark:text-gray-200"
                        label={""}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <IconButton icon={LucidePlus} label={t("newWorkout", { ns: "workouts" })} onClick={() => setOpenCreateModal(true)}
                        classname={"flex items-center w-full lg:w-fit justify-center h-10 text-gray-100 whitespace-nowrap !rounded bg-blue-700 gap-2"} />
                </section>
                <section className={`grid ${data?.workoutsByUser?.workouts.length > 0 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : ''} gap-4`}>
                    {data?.workoutsByUser?.workouts.length > 0 ? data?.workoutsByUser?.workouts?.map((item: any, index: number) => (
                        <WorkoutCard key={index} name={item?.name} translate={t} onEdit={() => handleEditClick(item?.id)} 
                            onView={() => setOpenViewModal(true)} onStart={() => console.log("start")}
                            exercisesCount={item?.workoutExercises?.length ?? 0} onDelete={() => handleDeleteClick(item?.id)}
                            muscleGroup={getMostCommonMuscle(item?.workoutExercises?.map((x: { exercise: any }) => x?.exercise?.muscleGroup))}
                        />
                    )) :
                        <div className="flex flex-row items-center justify-center gap-5 w-full">
                            <LucideDumbbell className="w-8 h-8 text-blue-700"/>
                            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{t("noWorkouts", { ns: "workouts" })}</p>
                        </div>
                    }
                </section>
            </div>
            
            <Transition show={openDeleteModal} as={Fragment}>
                <Dialog as="div" onClose={setOpenDeleteModal} className="relative z-2">
                    <div className="fixed inset-0 bg-black/30" />
                    <div className="fixed inset-0 flex items-center justify-center">
                        <DialogPanel className="w-80 max-w-md lg:w-full transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                            <DialogTitle className="text-xl font-bold text-black dark:text-gray-100">{t("delete", { ns: "workouts" })}</DialogTitle>
                            <Description className="text-black dark:text-gray-100">{t("deleteDescription", { ns: "workouts" })}</Description>
                            <div className="flex flex-row mt-4 w-full justify-center items-center gap-4">
                                <IconButton
                                    icon={LucideCheckCheck}
                                    label={t("delete", { ns: "workouts" })}
                                    classname="flex justify-center items-center gap-2 !bg-blue-700 text-white"
                                    onClick={handleDeleteWorkout}
                                />
                                <IconButton
                                    icon={LucideBan}
                                    label={t("cancel", { ns: "workouts" })}
                                    classname="flex justify-center items-center gap-2 !bg-red-700 text-white"
                                    onClick={() => { setOpenDeleteModal(false) }}
                                />
                            </div>
                            {message && <AlertBlock icon={LucideShield}
                                title={""}
                                body={message}
                                type={alertType} />}
                        </DialogPanel>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

export default Workouts;