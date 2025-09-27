import type { ErrorResponse } from "react-router-dom";
import axiosClient from "../axiosClient";
import type { UserGoalRequest } from "../../types/dto/UserGoalRequest";

export const userGoalsApi = {
    add: async (request: UserGoalRequest) => {
        try {
            const response = await axiosClient.post("/usergoal/add", request);
            return response.data;
        }
        catch (error: any) {
            const errorData = error.response?.data as ErrorResponse;
            throw errorData;
        }
    },
    edit: async (request: UserGoalRequest) => {
        try {
            const response = await axiosClient.post("/usergoal/edit", request);
            return response.data;
        }
        catch (error: any) {
            const errorData = error.response?.data as ErrorResponse;
            throw errorData;
        }
    },
    delete: async (request: number) => {
        try {
            const response = await axiosClient.post("/usergoal/delete", request);
            return response.data;
        }
        catch (error: any) {
            const errorData = error.response?.data as ErrorResponse;
            throw errorData;
        }
    }
}