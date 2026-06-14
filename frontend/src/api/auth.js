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
