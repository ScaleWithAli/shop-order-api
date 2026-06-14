import axios from 'axios'

const BASE = window._env_?.VITE_NOTIF_URL || import.meta.env.VITE_NOTIF_URL

export const getNotifications = (token) =>
  axios.get(`${BASE}/notifications`, {
    headers: { Authorization: `Bearer ${token}` }
  })
