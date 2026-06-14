import axios from 'axios'

const BASE = import.meta.env.VITE_PRODUCT_URL

export const getProducts = (category) =>
  axios.get(`${BASE}/products`, { params: category ? { category } : {} })

export const getProduct = (id) =>
  axios.get(`${BASE}/products/${id}`)
