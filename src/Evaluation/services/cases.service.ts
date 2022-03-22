import axios from "axios";
import { TokenStorageService } from "../../Auth/services/token-storage.service";

const tokenStorageService = new TokenStorageService();
const token = tokenStorageService.getToken();
axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

export class CasesService {
  public getNext(): any {
    return axios.get(`${import.meta.env.VITE_API_URL}/cases/next`);
  }

  public evaluate(
    id: string,
    data: { code: string; evaluatedBy: string }
  ): any {
    return axios.post(
      `${import.meta.env.VITE_API_URL}/cases/${id}/evaluate`,
      data
    );
  }
}
