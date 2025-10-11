import type { GoalType } from "../types/general/GoalType";

export const goalTypeMap: Record<GoalType, number> = {
    NONE: 0,
    WEIGHT: 1,
    BFP: 2,
    BMI: 3
};