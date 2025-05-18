import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IUser } from '../types/store/IUser'
import type { LoginDTO, RegistrationDTO } from '../types/api/AuthResponse'
import AuthApi from '../api/AuthApi'
import axios from 'axios';
import type { AuthResponse } from '../types/api/AuthResponse';

export const useUserStore = defineStore('user', () => {
  const user = ref<IUser>({} as IUser)
  const isAuth = ref(false)

	const setUser = (userData: IUser) => {
		user.value = userData
	}

	const setIsAuth = (val: boolean) => {
		isAuth.value = val
	}

	const login = async (dto: LoginDTO) => {
		try {
			const response = await AuthApi.login({ ...dto })
			console.log(response)
			if (response.status === 200) {
				localStorage.setItem('token', response.data.accessToken)
				setIsAuth(true)
				setUser(response.data.user)
			}
		} catch (error: any) {
			console.log(error.response?.data?.message)
		}
	}

	const registration = async (dto: RegistrationDTO) => {
			try {
			const response = await AuthApi.registration({ ...dto })
			console.log(response)
			if (response.status === 200) {
				localStorage.setItem('token', response.data.accessToken)
				setIsAuth(true)
				setUser(response.data.user)
			}
		} catch (error: any) {
			console.log(error.response?.data?.message)
		}
	}

	const logout = async () => {
		try {
			await AuthApi.logout()
			localStorage.removeItem('token')
			setIsAuth(false)
			setUser({} as IUser)
		} catch (error: any) {
			console.log(error.response?.data?.message)
		}
	}

	const checkAuth = async () => {
		try {
			const response = await axios.get<AuthResponse>(`${import.meta.env.VITE_API_URL}/refresh`,{
				 withCredentials: true
			})
			console.log(response)
			if (response.status === 200) {
			localStorage.setItem('token', response.data.accessToken)
			setIsAuth(true)
			setUser(response.data.user)
			}
		} catch (error: any) {
			console.log(error.response?.data?.message)
		}
	}

  return { user, isAuth, setUser, setIsAuth, login, registration, logout, checkAuth }
})
