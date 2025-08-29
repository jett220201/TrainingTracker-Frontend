import type { ErrorResponse } from "../../types/dto/ErrorResponse";
import type { UserChangePasswordRecoveryRequest } from "../../types/dto/UserChangePasswordRecoveryRequest";
import type { UserRecoveryPasswordRequest } from "../../types/dto/UserRecoveryPasswordRequest";
import type { UserRegistrationRequest } from "../../types/dto/UserRegistrationRequest";
import axiosClient from "../axiosClient";

export const userApi = {
    register: async (request : UserRegistrationRequest) => {
        try {
            const response = await axiosClient.post("/user/register", request);
            return response.data;
        }
        catch (error : any) {
            const errorData = error.response?.data as ErrorResponse;
            throw errorData;
        }
    },
    changePassword: async () => {

    },
    changePasswordRecovery: async (request : UserChangePasswordRecoveryRequest ) => {
        try {
            const response = await axiosClient.post("/user/change-password-recovery", request);
            return response.data;
        }
        catch (error : any) {
            const errorData = error.response?.data as ErrorResponse;
            throw errorData;
        }
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