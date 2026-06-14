import axios from 'axios'

const BASE = window._env_?.VITE_PRODUCT_URL || import.meta.env.VITE_PRODUCT_URL

export const getProducts = (category) =>
  axios.get(`${BASE}/products`, { params: category ? { category } : {} })

export const getProduct = (id) =>
  axios.get(`${BASE}/products/${id}`)
