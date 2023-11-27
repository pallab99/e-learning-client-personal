import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

interface IApi {
  http: AxiosInstance | undefined;
  token: string | undefined;
}

class Api implements IApi {
  http: AxiosInstance | undefined;
  token: string | undefined;

  constructor() {
    this.http = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
      withCredentials: true,
    });
    this.handleError = this.handleError.bind(this);

    this.http.interceptors.response.use(this.handleSuccess, this.handleError);
    this.token = Cookies.get("accessToken");
  }

  handleSuccess(response: any) {
    return response;
  }

  async handleError(error: any) {
    console.log("token", this.token);
    try {
      console.log(error);
      if (
        this.token &&
        error.config.url !== "/auth/sign-up" &&
        error.response.status === 401
      ) {
        console.log(error.response);
        await this.http!.post("/auth/refreshToken");
        return this.http!.request(error.config);
      }
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
    const errorObj = {
      response: error?.response?.data,
      statusCode: error?.response?.status,
    };
    return Promise.reject(errorObj);
  }
}

export default new Api();
