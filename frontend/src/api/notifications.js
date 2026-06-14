import axios from 'axios'

const BASE = import.meta.env.VITE_NOTIF_URL

export const getNotifications = (token) =>
  axios.get(`${BASE}/notifications`, {
    headers: { Authorization: `Bearer ${token}` }
  })
