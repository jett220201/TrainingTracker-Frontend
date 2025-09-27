import type { GoalDirection } from "../types/general/GoalDirectionType";

export const goalDirectionMap: Record<GoalDirection, number> = {
    "None": 0,
    "Increase": 1,
    "Decrease": 2,
    "Maintain": 3
};