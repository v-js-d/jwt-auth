import type { IUser } from "../store/IUser";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface LoginDTO {
	email: string;
	password: string;
}

export interface RegistrationDTO {
	email: string;
	password: string;
}