import type { GoalType } from "../types/general/GoalType";

export const goalTypeMap: Record<GoalType, number> = {
    None: 0,
    Weight: 1,
    BFP: 2,
    BMI: 3
};