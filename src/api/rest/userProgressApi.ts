import type { ErrorResponse } from "react-router-dom";
import type { UserProgressRequest } from "../../types/dto/UserProgressRequest";
import axiosClient from "../axiosClient";

export const userProgressApi = {
    add: async (request : UserProgressRequest) => {
        try {
            const response = await axiosClient.post("/userprogress/add", request);
            return response.data;
        }
        catch (error : any) {
            const errorData = error.response?.data as ErrorResponse;
            throw errorData;
        }
    }
}