import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../api/auth'

export default function Register() {
  const [form, setForm] = useState({ email: '', username: '', password: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("BASE URL:", window._env_?.VITE_AUTH_URL)
    console.log("Form data:", form)
    try {
      await register(form)
      setSuccess('Account created! Redirecting...')
      setTimeout(() => navigate('/login'), 1500)
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed')
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.sub}>Join Aurum today</p>
        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input style={styles.input} type="text" placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
          <input style={styles.input} type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input style={styles.input} type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <button style={styles.btn} type="submit">Register</button>
        </form>
        <p style={styles.footer}>Already have an account? <Link to="/login" style={styles.link}>Login</Link></p>
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
  success: { background: '#00ff0022', border: '1px solid #00ff0044', color: '#66ff66', padding: '10px', borderRadius: 2, marginBottom: 16, fontSize: 13 },
  form: { display: 'flex', flexDirection: 'column', gap: 14 },
  input: { background: '#0a0a0a', border: '0.5px solid #c9a84c33', color: '#f0e6cc', padding: '12px 14px', borderRadius: 2, fontSize: 13, outline: 'none' },
  btn: { background: 'linear-gradient(135deg, #c9a84c, #e8c96a)', color: '#0a0a0a', border: 'none', padding: '13px', borderRadius: 2, cursor: 'pointer', fontWeight: 600, fontSize: 13, letterSpacing: 1 },
  footer: { color: '#444', fontSize: 12, marginTop: 20, textAlign: 'center' },
  link: { color: '#c9a84c', textDecoration: 'none' }
            }
