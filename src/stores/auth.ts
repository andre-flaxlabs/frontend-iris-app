import api from '@/services/api'
import axios from 'axios'
import { defineStore } from 'pinia'

const baseURL = import.meta.env.VITE_APP_BASE_URL

interface UserAuth {
  accessToken: string
  user: string
}

export const useAuth = defineStore('auth', {
  state: (): UserAuth => {
    return {
      accessToken: '',
      user: ''
    }
  },
  actions: {
    async login(
      username: string,
      password: string
    ): Promise<{ success: boolean; message?: string }> {
      try {
        const response = await axios.post(`${baseURL}/api/token/`, {
          username: username,
          password: password
        })

        const token = response.data
        localStorage.setItem('refresh', token.refresh)

        this.accessToken = token.access
        this.user = username

        axios.defaults.headers.common['Authorization'] = `Bearer ${token.access}`

        return { success: true }
      } catch (error: any) {
        console.error('Login Error', error)
        const message = error.response?.data?.detail || error.message || 'An error has occurred'
        return { success: false, message }
      }
    },
    logout() {
      localStorage.removeItem('refresh')
      this.accessToken = ''
      this.user = ''
    }
  }
})
