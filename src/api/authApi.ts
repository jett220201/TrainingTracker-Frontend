import axiosClient from "./axiosClient";
import type { ApiResponse } from "../types/dto/ApiResponse";
import type { LoginRequest } from "../types/dto/LoginRequest";
import type { UserChangeLanguageRequest } from "../types/dto/UserChangeLanguageRequest";
import type { UserBasicResponse } from "../types/dto/UserBasicResponse";

export const authApi = {
  login: (request : LoginRequest) => axiosClient.post<ApiResponse>("/auth/login", request),
  logout: async () => {
    await axiosClient.post<ApiResponse>("/auth/logout")
    window.location.href = "/login";
  },
  fetchUser: () => axiosClient.get<UserBasicResponse>("/auth/me"),
  changeLanguage: (request : UserChangeLanguageRequest) => axiosClient.post<ApiResponse>("/auth/lang-change", request),
};