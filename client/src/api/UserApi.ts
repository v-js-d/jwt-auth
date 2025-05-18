import $api from "../http/axios";
import type { AxiosResponse } from "axios";
import type { IUser } from "../types/store/IUser";

export default class UserApi {
  static async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>("/users");
  }
}