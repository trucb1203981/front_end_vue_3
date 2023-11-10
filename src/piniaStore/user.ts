import { defineStore } from 'pinia'
import { AuthState } from './types/userTypes'
import { UserModel } from '@/interfaces/models/UserModel'
import { getCookie } from 'typescript-cookie'
import AuthService from '@/services/AuthService'

const inBrowser = typeof window !== 'undefined'

export const useUserStore = defineStore('user', {
    // state
    state: (): AuthState => {
        return {
            isAuthenticated: (!!inBrowser && !!localStorage.getItem('token')) || !!getCookie('token'),
            user: null,
        }
    },
    // getters
    getters: {},
    // actions
    actions: {
        /**
         * @description Get authenticated user
         * @return Promise<UserModel>
         */
        async getAuthUser(): Promise<UserModel> {
            return new Promise((resolve, reject) => {
                AuthService.getAuthUser().then((user) => {
                        this.user = user
                        this.isAuthenticated = true
                        resolve(user)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        /**
         * @description Logout user
         * @return Promise<boolean>
         */
        async logout(): Promise<boolean> {
            AuthService.logout()
            this.user = null
            this.isAuthenticated = await false
            return true
        },
    },
})