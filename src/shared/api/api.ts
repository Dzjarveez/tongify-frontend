import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/'

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = cookies.get('access')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (
      error.response?.status === 401 &&
      !originalRequest._isRetry &&
      cookies.get('refresh')
    ) {
      originalRequest._isRetry = true
      try {
        const response = await axios.post(`${BASE_URL}user/token/`, {
          refresh: cookies.get('refresh'),
        })

        cookies.set('access', response.data.access, {
          path: '/',
          maxAge: 15 * 60,
        })

        return api.request(originalRequest);
      } catch (e) {
        console.warn('Refresh token failed', e);
      }
    }

    return Promise.reject(error);
  }
)