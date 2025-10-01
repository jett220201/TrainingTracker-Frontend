interface WorkoutExerciseAssociation {
    exerciseId: number;
    sets: number;
    repetitions: number;
    weight: number;
    restTimeInMinutes: number;
}

export interface WorkoutsRequest {
    id? : number;
    name: string;
    exercisesAssociation: WorkoutExerciseAssociation[];
}