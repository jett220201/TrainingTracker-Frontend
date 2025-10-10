import { LucideAnvil, LucideBicepsFlexed, LucideCircleAlert, LucideCircleChevronLeft, LucideCircleChevronRight, LucideCirclePause, LucideCirclePlay, LucideCircleQuestionMark, LucideFootprints, LucideHeart, LucideInfo, LucidePersonStanding, LucideShirt, LucideX, LucideZap, type LucideIcon } from "lucide-react";
import { IconButton } from "./IconButton";
import { useWorkoutStore } from "../../store/WorkoutStore";
import { useTranslation } from "react-i18next";
import { useState } from "react";

function WorkoutPlayerBar() {
    const {workout, isPlaying, currentExerciseIndex, currentSeries, 
        togglePlay, nextExercise, previousExercise, finishSeries, resetWorkout} = useWorkoutStore();
    const {t} = useTranslation(["workouts"]);
    const [showDetails, setShowDetails] = useState<boolean>(false);
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
    const [Icon, backgroundColor, iconColor] = getIconByMuscleGroup(workout?.muscleGroup ?? -1);
    return (
        <>
            <article className="absolute bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-gray-700 pt-0 lg:pt-4 p-4 flex items-center justify-between shadow-lg h-38 lg:h-32">
                <div className="hidden lg:flex w-full">
                    <section className="flex flex-col justify-center gap-2 w-2/9">
                        <div className={`h-12 w-12 ${backgroundColor} hidden lg:flex justify-center items-center rounded-xl`}>
                            <Icon className={`${iconColor} w-8 h-8`} />
                        </div>
                        <p className="text-lg font-semibold text-black dark:text-white">{workout?.workoutName}</p>
                    </section>
                    <section className="flex items-center w-2/9">
                        <IconButton
                            icon={LucideCircleChevronLeft}
                            label={""}
                            onClick={() => {
                                if (currentExerciseIndex > 0 && isPlaying) {
                                    previousExercise();
                                }
                            }}
                            classname={`${isPlaying ? '' : '!cursor-not-allowed'} group`}
                            iconClassname={"w-8 h-8 text-gray-500 dark:text-white group-hover:text-blue-500 group-hover:scale-110 transition-transform duration-200"}
                        />
                        <IconButton
                            icon={isPlaying ? LucideCirclePause : LucideCirclePlay}
                            label={""}
                            onClick={() => togglePlay()}
                            classname={"group"}
                            iconClassname={"w-10 h-10 text-gray-500 dark:text-white group-hover:text-blue-500 group-hover:scale-110 transition-transform duration-200"}
                        />
                        <IconButton
                            icon={LucideCircleChevronRight}
                            label={""}
                            onClick={() => {
                                if (isPlaying) {
                                    if (currentSeries <= (workout?.exercises[currentExerciseIndex].sets ?? 1)) {
                                        finishSeries();
                                    } else {
                                        nextExercise();
                                    }
                                }
                            }}
                            classname={`${isPlaying ? '' : '!cursor-not-allowed'} group`}
                            iconClassname={"w-8 h-8 text-gray-500 dark:text-white group-hover:text-blue-500 group-hover:scale-110 transition-transform duration-200"}
                        />
                    </section>
                    <section className="w-5/9">
                        <p className="text-black dark:text-white font-bold">{workout?.exercises[currentExerciseIndex].name}</p>
                        <p className="text-black line-clamp-2 dark:text-white font-semibold">{workout?.exercises[currentExerciseIndex].description}</p>
                        <div className="flex gap-4">
                            <p className="text-gray-500 dark:text-gray-200 flex gap-1">{`${t("sets")}:`}<span className="font-semibold text-black dark:text-gray-100">{currentSeries} / {workout?.exercises[currentExerciseIndex].sets}</span></p>
                            <p className="text-gray-500 dark:text-gray-200 flex gap-1">{`${t("reps")}:`}<span className="font-semibold text-black dark:text-gray-100">{workout?.exercises[currentExerciseIndex].repetitions}</span></p>
                            <p className="text-gray-500 dark:text-gray-200 flex gap-1">{`${t("weight")}:`}<span className="font-semibold text-black dark:text-gray-100">{workout?.exercises[currentExerciseIndex].weight} kg</span></p>
                            <p className="text-gray-500 dark:text-gray-200 flex gap-1">{`${t("rest")}:`}<span className="font-semibold text-black dark:text-gray-100">{workout?.exercises?.[currentExerciseIndex]?.restTimeInMinutes} {workout?.exercises?.[currentExerciseIndex]?.restTimeInMinutes && workout?.exercises?.[currentExerciseIndex]?.restTimeInMinutes > 1 ? t("minutes") : t("minute")}</span></p>
                        </div>
                    </section>
                </div>
                <div className="flex flex-col justify-center items-start w-full lg:hidden">
                    <section className="flex flex-col gap-2">
                        <p className="text-black dark:text-white font-bold">{workout?.exercises[currentExerciseIndex].name}</p>
                        <p className="text-gray-500 dark:text-gray-200 flex gap-1">{`${t("sets")}:`}<span className="font-semibold text-black dark:text-gray-100">{currentSeries} / {workout?.exercises[currentExerciseIndex].sets}</span></p>
                    </section>
                    <section className="flex items-center justify-around w-full">
                        <IconButton
                            icon={LucideCircleChevronLeft}
                            label={""}
                            onClick={() => {
                                if (currentExerciseIndex > 0 && isPlaying) {
                                    previousExercise();
                                }
                            }}
                            classname={`${isPlaying ? '' : '!cursor-not-allowed'} group`}
                            iconClassname={"w-8 h-8 text-gray-500 dark:text-white group-hover:text-blue-500 group-hover:scale-110 transition-transform duration-200"}
                        />
                        <IconButton
                            icon={isPlaying ? LucideCirclePause : LucideCirclePlay}
                            label={""}
                            onClick={() => togglePlay()}
                            classname={"group"}
                            iconClassname={"w-10 h-10 text-gray-500 dark:text-white group-hover:text-blue-500 group-hover:scale-110 transition-transform duration-200"}
                        />
                        <IconButton
                            icon={LucideCircleChevronRight}
                            label={""}
                            onClick={() => {
                                if (isPlaying) {
                                    if (currentSeries <= (workout?.exercises[currentExerciseIndex].sets ?? 1)) {
                                        finishSeries();
                                    } else {
                                        nextExercise();
                                    }
                                }
                            }}
                            classname={`${isPlaying ? '' : '!cursor-not-allowed'} group`}
                            iconClassname={"w-8 h-8 text-gray-500 dark:text-white group-hover:text-blue-500 group-hover:scale-110 transition-transform duration-200"}
                        />
                    </section>
                </div>
                <div className={`fixed md:hidden bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-b border-t p-2 transition-all duration-300 ease-in-out transform ${showDetails ? "translate-y-0 opacity-100 bottom-48" : "translate-y-full opacity-0 pointer-events-none"}`}>
                    <section className="flex items-center justify-center gap-5 mb-2">
                        <div className={`h-12 w-12 ${backgroundColor} flex justify-center items-center rounded-xl`}>
                            <Icon className={`${iconColor} w-8 h-8`} />
                        </div>
                        <p className="text-lg font-semibold text-black dark:text-white">{workout?.workoutName}</p>
                    </section>
                    <section className="flex flex-col gap-2">
                        <p className="text-black dark:text-white font-bold">{workout?.exercises[currentExerciseIndex].name}</p>
                        <p className="text-black dark:text-white font-semibold">{workout?.exercises[currentExerciseIndex].description}</p>
                        <div className="grid grid-cols-2 gap-4">
                            <p className="text-gray-500 dark:text-gray-200 flex gap-1">{`${t("sets")}:`}<span className="font-semibold text-black dark:text-gray-100">{currentSeries} / {workout?.exercises[currentExerciseIndex].sets}</span></p>
                            <p className="text-gray-500 dark:text-gray-200 flex gap-1">{`${t("reps")}:`}<span className="font-semibold text-black dark:text-gray-100">{workout?.exercises[currentExerciseIndex].repetitions}</span></p>
                            <p className="text-gray-500 dark:text-gray-200 flex gap-1">{`${t("weight")}:`}<span className="font-semibold text-black dark:text-gray-100">{workout?.exercises[currentExerciseIndex].weight} kg</span></p>
                            <p className="text-gray-500 dark:text-gray-200 flex gap-1">{`${t("rest")}:`}<span className="font-semibold text-black dark:text-gray-100">{workout?.exercises?.[currentExerciseIndex]?.restTimeInMinutes} {workout?.exercises?.[currentExerciseIndex]?.restTimeInMinutes && workout?.exercises?.[currentExerciseIndex]?.restTimeInMinutes > 1 ? t("minutes") : t("minute")}</span></p>
                        </div>
                    </section>
                </div>
                <IconButton
                    icon={LucideInfo}
                    label={""}
                    onClick={() => setShowDetails(!showDetails)}
                    classname={"block lg:hidden absolute top-2 right-15 bg-gray-200 dark:bg-slate-950 text-gray-500 dark:text-white !p-1 !rounded-full hover:scale-110 transition-transform duration-200"}
                />
                <IconButton
                    icon={LucideX}
                    label={""}
                    onClick={() => resetWorkout()}
                    classname={"absolute top-2 right-5 bg-gray-200 dark:bg-slate-950 text-gray-500 dark:text-white !p-1 !rounded-full hover:scale-110 transition-transform duration-200"}
                />
                <progress value={currentSeries} max={workout?.exercises[currentExerciseIndex].sets} className="absolute bottom-6 lg:bottom-0 left-0 right-0 h-1.5 w-full" />
            </article>
        </>
    );
}

export default WorkoutPlayerBar;