import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../api/auth'
import { useAuthStore } from '../store/authStore'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const setToken = useAuthStore((s) => s.setToken)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await login(form)
      setToken(res.data.access_token)
      navigate('/products')
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed')
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.sub}>Sign in to your Aurum account</p>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input style={styles.input} type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input style={styles.input} type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <button style={styles.btn} type="submit">Login</button>
        </form>
        <p style={styles.footer}>Don't have an account? <Link to="/register" style={styles.link}>Register</Link></p>
      </div>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  card: { background: '#141414', border: '0.5px solid #c9a84c33', borderRadius: 4, padding: 40, width: 380 },
  title: { color: '#f0e6cc', fontSize: 24, fontWeight: 500, marginBottom: 6 },
  sub: { color: '#666', fontSize: 13, marginBottom: 24 },
  error: { background: '#ff000022', border: '1px solid #ff000044', color: '#ff6666', padding: '10px', borderRadius: 2, marginBottom: 16, fontSize: 13 },
  form: { display: 'flex', flexDirection: 'column', gap: 14 },
  input: { background: '#0a0a0a', border: '0.5px solid #c9a84c33', color: '#f0e6cc', padding: '12px 14px', borderRadius: 2, fontSize: 13, outline: 'none' },
  btn: { background: 'linear-gradient(135deg, #c9a84c, #e8c96a)', color: '#0a0a0a', border: 'none', padding: '13px', borderRadius: 2, cursor: 'pointer', fontWeight: 600, fontSize: 13, letterSpacing: 1 },
  footer: { color: '#444', fontSize: 12, marginTop: 20, textAlign: 'center' },
  link: { color: '#c9a84c', textDecoration: 'none' }
}
