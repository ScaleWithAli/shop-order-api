import axios from 'axios'

const BASE = import.meta.env.VITE_ORDER_URL

const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
})

export const createOrder = (data, token) =>
  axios.post(`${BASE}/orders`, data, authHeader(token))

export const getMyOrders = (token) =>
  axios.get(`${BASE}/orders/my`, authHeader(token))

export const getOrder = (id, token) =>
  axios.get(`${BASE}/orders/${id}`, authHeader(token))

export const cancelOrder = (id, token) =>
  axios.patch(`${BASE}/orders/${id}/cancel`, {}, authHeader(token))
