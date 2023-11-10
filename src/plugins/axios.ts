// noinspection TypeScriptValidateTypes

import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { getCookie, removeCookie } from 'typescript-cookie'

const apiClient = (): AxiosInstance => {
    const baseURL = process.env.VUE_APP_SERVER_URL
    const bearerPrefix = 'Bearer '
    const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: '',
    }
    
    const token = localStorage.getItem('token') || getCookie('token')
    if (token) {
        headers.Authorization = `${bearerPrefix}${token}`
    }
    
    const instance: AxiosInstance = axios.create({
        baseURL: `${baseURL}/api`,
        headers,
    })
    
    instance.interceptors.response.use(
        (response: AxiosResponse) => {
            const authToken = response.headers['Authorization'] || response.data['token']
            // Handling when authorization token is received
            if (authToken && authToken.startsWith(bearerPrefix)) {
                authToken.substring(bearerPrefix.length).trim()
            }
            authToken && window.localStorage.setItem('token', authToken)
            return response
        }, // simply return the response
        (error: AxiosError) => {
            // Handling when receiving a response with error code 401 (Unauthorized)
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('token')
                removeCookie('token')
            }
            return Promise.reject(error)
        },
    )
    return instance
}

export default apiClient