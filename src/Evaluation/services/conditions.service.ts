import axios from "axios";
import { TokenStorageService } from "../../Auth/services/token-storage.service";

const tokenStorageService = new TokenStorageService();
const token = tokenStorageService.getToken();
axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

export class ConditionsService {
  public getConditions(): any {
    return axios.get(`${import.meta.env.VITE_API_URL}/conditions`);
  }
}
