import { create } from "zustand";
import type { WorkoutExercise } from "../types/dto/WorkoutsRequest";

interface FormState {
  name: string;
  items: WorkoutExercise[];
  setName: (name: string) => void;
  addItem: (item: WorkoutExercise) => void;
  editItem: (index: number, newItem: WorkoutExercise) => void;
  removeItem: (index: number) => void;
  removeItemById: (id: number) => void;
  reset: () => void;
}

export const useFormStore = create<FormState>((set) => ({
    name: "",
    items: [],
    setName: (name) => set({ name }),
    addItem: (item) =>
        set((state) => ({ items: [...state.items, item] })),
    editItem: (index, newItem) =>
        set((state) => ({
            items: state.items.map((item, i) => (i === index ? newItem : item)),
        })),
    removeItem: (index) =>
        set((state) => ({
            items: state.items.filter((_, i) => i !== index),
        })),
    removeItemById: (id) =>
        set((state) => ({
            items: state.items.filter((item) => item.exerciseId !== id),
        })),
    reset: () => set({ name: "", items: [] }),
}));