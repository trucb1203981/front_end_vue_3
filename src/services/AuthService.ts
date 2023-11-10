import { removeCookie, setCookie } from 'typescript-cookie'
import apiClient from '@/plugins/axios'
import { RegisterForm } from '@/types/form/RegisterForm'
import { HTTP_OK, HTTP_UNAUTHORIZED } from '@/constants/http'
import { UserModel } from '@/interfaces/models/UserModel'

class AuthService {
    /**
     * @description Register user
     * @param user
     */
    async register(user: RegisterForm) {
        return await apiClient().post('/register', user)
    }
    
    /**
     * @description Login user
     * @param email
     * @param password
     * @return Promise<boolean>
     */
    async login(
        {
            email,
            password,
        }: {
            email: string;
            password: string;
        }): Promise<boolean> {
        return new Promise((resolve, reject) => {
            apiClient()
                .post('/login', {
                    email,
                    password,
                })
                .then((response) => {
                    if (response.status === HTTP_OK) {
                        const expires_at = new Date(response.data.expires_at)
                        setCookie('token', response.data.token, { expires: expires_at })
                        resolve(true)
                    }
                })
                .catch((error) => {
                    reject(error.response)
                })
        })
    }
    
    /**
     * @description Get authenticated user
     * @return Promise<UserModel>
     */
    async getAuthUser(): Promise<UserModel> {
        return new Promise((resolve, reject) => {
            apiClient()
                .get('/user')
                .then((response) => {
                    if (response.status === HTTP_OK) {
                        resolve(response.data as UserModel)
                    }
                })
                .catch((error) => {
                    if (error.response.status === HTTP_UNAUTHORIZED) {
                        removeCookie('token')
                        localStorage.removeItem('token')
                    }
                    reject(error.response)
                })
        })
    }
    
    /**
     * @description Logout user
     * @return Promise<boolean>
     */
    async logout(): Promise<boolean> {
        apiClient()
            .post('/logout')
            .then(async (response) => {
                if (response.status === 200) {
                    await removeCookie('token')
                    await localStorage.removeItem('token')
                }
            })
        return true
    }
}

export default new AuthService()
