import type { ErrorResponse } from "../types/dto/ErrorResponse";
import type { UserRecoveryPasswordRequest } from "../types/dto/UserRecoveryPasswordRequest";
import axiosClient from "./axiosClient";

export const userApi = {
    register: async () => {

    },
    changePassword: async () => {

    },
    changePasswordRecovery: async () => {

    },
    recoveryPassword: async (request : UserRecoveryPasswordRequest) => {
        try {
            const response = await axiosClient.post("/user/recover-password", request);
            return response.data;
        }
        catch (error : any) {
            const errorData = error.response?.data as ErrorResponse;
            throw errorData;
        }
    },
    deleteAccount: async () => {

    }
}