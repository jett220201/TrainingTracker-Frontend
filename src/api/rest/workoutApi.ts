import type { ErrorResponse } from "react-router-dom";
import axiosClient from "../axiosClient";
import type { WorkoutsRequest } from "../../types/dto/WorkoutsRequest";

export const workoutApi = {
    add: async (request: WorkoutsRequest) => {
        try {
            const response = await axiosClient.post("/workouts/add", request);
            return response.data;
        }
        catch (error: any) {
            const errorData = error.response?.data as ErrorResponse;
            throw errorData;
        }
    },
    edit: async (request: WorkoutsRequest) => {
        try {
            const response = await axiosClient.post("/workouts/edit", request);
            return response.data;
        }
        catch (error: any) {
            const errorData = error.response?.data as ErrorResponse;
            throw errorData;
        }
    },
    delete: async (request: number) => {
        try {
            const response = await axiosClient.post("/workouts/delete", request);
            return response.data;
        }
        catch (error: any) {
            const errorData = error.response?.data as ErrorResponse;
            throw errorData;
        }
    }
};