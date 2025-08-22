import axios, { AxiosError, type AxiosResponse } from "axios";
import type { ErrorResponse } from "../types/dto/ErrorResponse";

const retriedRequests = new Set<string>();
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (response : AxiosResponse) => response,
  async (error: AxiosError<ErrorResponse>) => {
    const originalRequest = error.config as any;
    const isAuthEndpoint = originalRequest?.url?.includes("/auth/login");
    const requestKey = `${originalRequest.method}-${originalRequest.url}`;
    if (error.response?.status === 401 && !retriedRequests.has(requestKey) && !isAuthEndpoint) { // Handle unauthorized access
      retriedRequests.add(requestKey);
      try {
        await axiosClient.post("/auth/refresh");
        return axiosClient(originalRequest); // Retry the request
      }
      catch (refreshError) {
        console.error("Refresh token failed, redirecting to login", refreshError);
        window.location.href = "/login";
      }
    }

    switch (error.response?.status) {
      case 400:
        console.error("Bad Request:", error.response.data);
        break;
      case 500:
        console.error("Internal Server Error:", error.response.data);
        break;
      default:
        console.error("An error occurred:", error.response?.data);
        break;
    }

    return Promise.reject(error);
  }
);

export default axiosClient;