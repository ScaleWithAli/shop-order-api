import axios from 'axios'

const BASE = import.meta.env.VITE_AUTH_URL

export const register = (data) =>
  axios.post(`${BASE}/auth/register`, data)

export const login = (data) =>
  axios.post(`${BASE}/auth/login`, data)

export const getMe = (token) =>
  axios.get(`${BASE}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const logout = (token) =>
  axios.post(`${BASE}/auth/logout`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  })
