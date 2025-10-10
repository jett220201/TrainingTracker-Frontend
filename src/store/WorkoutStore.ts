import { create } from "zustand";
import type { WorkoutExercise } from "../types/dto/WorkoutsRequest";

interface Exercise extends Omit<WorkoutExercise, 'exerciseId'> { };

interface Workout {
    workoutName: string;
    muscleGroup: number;
    exercises: Exercise[];
}

interface WorkoutState {
    // Variables
    workout: Workout | null;
    currentExerciseIndex: number;
    currentSeries: number;
    isPlaying: boolean;
    // Actions
    setWorkout: (workout: Workout) => void;
    finishSeries: () => void;
    nextExercise: () => void;
    previousExercise: () => void;
    togglePlay: () => void;
    resetWorkout: () => void;
}

export const useWorkoutStore = create<WorkoutState>((set, get) => ({
    workout: null,
    currentExerciseIndex: 0,
    currentSeries: 1,
    isPlaying: false,
    setWorkout: (workout) =>
        set({
            workout,
            currentExerciseIndex: 0,
            currentSeries: 1,
            isPlaying: false
        }),
    finishSeries: () => {
        const { workout, currentExerciseIndex, currentSeries, resetWorkout } = get();
        if (!workout) return;
        const currentExercise = workout.exercises[currentExerciseIndex];
        if (currentSeries < currentExercise.sets) {
            set({ currentSeries: currentSeries + 1 });
        } else {
            if (currentExerciseIndex < workout.exercises.length - 1) {
                set({ currentExerciseIndex: currentExerciseIndex + 1, currentSeries: 1 });
            } else {
                // Workout finished
                set({ isPlaying: false });
                resetWorkout();
            }
        }
    },
    nextExercise: () => {
        const { workout, currentExerciseIndex } = get();
        if (!workout) return;
        if (currentExerciseIndex < workout.exercises.length - 1) {
            set({ currentExerciseIndex: currentExerciseIndex + 1, currentSeries: 1 });
        }
    },
    previousExercise: () => {
        const { currentExerciseIndex } = get();
        if (currentExerciseIndex > 0) {
            set({ currentExerciseIndex: currentExerciseIndex - 1, currentSeries: 1 });
        }
    },
    togglePlay: () => {
        const { isPlaying } = get();
        set({ isPlaying: !isPlaying });
    },
    resetWorkout: () => set({ workout: null, currentExerciseIndex: 0, currentSeries: 1, isPlaying: false }),
}));