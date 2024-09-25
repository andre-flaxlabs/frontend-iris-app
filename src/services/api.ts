import { useAuth } from '@/stores/auth'
import axios from 'axios'

const baseURL = import.meta.env.VITE_APP_BASE_URL
const useNgrok = import.meta.env.VITE_USE_NGROK === 'true'

const api = axios.create({
  baseURL: baseURL,
  headers: useNgrok ? { 'ngrok-skip-browser-warning': '1' } : {}
})

api.interceptors.request.use(
  (config) => {
    const authStore = useAuth()

    // Check if the accessToken exists in the auth store
    if (authStore.accessToken) {
      // Attach the access token in the Authorization header
      config.headers['Authorization'] = `Bearer ${authStore.accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle 401 errors and refresh the token
api.interceptors.response.use(
  (response) => {
    // Return the response directly if successful
    return response
  },
  async (error) => {
    const authStore = useAuth()
    const originalRequest = error.config

    // If error is 401 (Unauthorized) and the request hasn't already been retried
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        // Attempt to refresh the access token using the refresh token
        const refreshToken = localStorage.getItem('refresh')

        // If no refresh token is found, redirect to login
        if (!refreshToken) {
          // authStore.logout()
          // window.location.href = '/auth/signin'
          return Promise.reject(error)
        }

        // Call the refresh token endpoint
        const response = await axios.post(`${baseURL}/api/token/refresh/`, {
          refresh: refreshToken
        })

        // Update the access token in the store and cookies
        const newAccessToken = response.data.access

        authStore.accessToken = newAccessToken
        localStorage.setItem('refresh', refreshToken)

        // Retry the original request with the new access token
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
        return api(originalRequest) // Retry the request with the new token
      } catch (refreshError) {
        authStore.logout()
        // window.location.href = '/auth/signin'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api
