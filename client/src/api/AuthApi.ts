import $api from "../http/axios";
import type { AxiosResponse } from "axios";
import type { AuthResponse, LoginDTO, RegistrationDTO } from "../types/api/AuthResponse";

export default class AuthApi {
  static async login(dto: LoginDTO): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/login", { ...dto });
  }

	static async registration(dto: RegistrationDTO): Promise<AxiosResponse<AuthResponse>> {
		return $api.post<AuthResponse>("/registration", { ...dto });
	}

	static async logout(): Promise<void> {
		return $api.post("/logout");
	}
}