import axiosClient from "./axiosClient";
import type { ApiResponse } from "../types/dto/ApiResponse";
import type { LoginRequest } from "../types/dto/LoginRequest";
import type { UserChangeLanguageRequest } from "../types/dto/UserChangeLanguageRequest";
import type { UserBasicResponse } from "../types/dto/UserBasicResponse";
import type { ErrorResponse } from "../types/dto/ErrorResponse";

export const authApi = {
  login: async (request : LoginRequest) => {
    try {
      const response = await axiosClient.post<ApiResponse>("/auth/login", request);
      return response.data;
    }
    catch (error : any) {
      const errorData = error.response?.data as ErrorResponse;
      throw errorData;
    }
  },
  logout: async () => {
    await axiosClient.post<ApiResponse>("/auth/logout")
    window.location.href = "/login";
  },
  fetchUser: async () => {
    const response = await axiosClient.get<UserBasicResponse>("/auth/me");
    return response;
  },
  changeLanguage: (request : UserChangeLanguageRequest) => axiosClient.post<ApiResponse>("/auth/lang-change", request),
};