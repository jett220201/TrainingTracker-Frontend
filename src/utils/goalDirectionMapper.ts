import type { GoalDirection } from "../types/general/GoalDirectionType";

export const goalDirectionMap: Record<GoalDirection, number> = {
    "NONE": 0,
    "INCREASE": 1,
    "DECREASE": 2,
    "MAINTAIN": 3
};