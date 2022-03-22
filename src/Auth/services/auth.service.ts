import axios from "axios";
import { TokenStorageService } from "./token-storage.service";

const tokenStorageService = new TokenStorageService();

export class AuthService {
  public async login(credentials: { username: string; password: string }) {
    return axios
      .post(`${import.meta.env.VITE_API_URL}/auth/login`, credentials)
      .then((response) => {
        if (response.data.token) {
          if (response?.data?.token) {
            tokenStorageService.saveToken(response.data.token);
            return response.data.token;
          } else {
            tokenStorageService.clearToken();
            throw Error("no-token");
          }
        }
        return response.data;
      });
  }

  public logout(): void {
    tokenStorageService.clearToken();
  }

  public isLoggedIn() {
    const token = tokenStorageService.getToken();
    return Boolean(token);
  }
}
