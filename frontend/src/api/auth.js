import axios from 'axios'

const BASE = (window._env_?.VITE_AUTH_URL || import.meta.env.VITE_AUTH_URL) + '/auth'

export const register = (data) =>
  axios.post(`${BASE}/register`, data)

export const login = (data) =>
  axios.post(`${BASE}/login`, data)

export const getMe = (token) =>
  axios.get(`${BASE}/me`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const logout = (token) =>
  axios.post(`${BASE}/logout`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  })
