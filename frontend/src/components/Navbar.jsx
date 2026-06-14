import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useCartStore } from '../store/cartStore'

export default function Navbar() {
  const { token, logout } = useAuthStore()
  const items = useCartStore((s) => s.items)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>AURUM</Link>
      <div style={styles.links}>
        <Link to="/products" style={styles.link}>Products</Link>
        {token && <Link to="/orders" style={styles.link}>Orders</Link>}
        {token && <Link to="/cart" style={styles.link}>Cart ({items.length})</Link>}
        {token ? (
          <button onClick={handleLogout} style={styles.btn}>Logout</button>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}

const styles = {
  nav: { background: '#0f0f0f', borderBottom: '0.5px solid #c9a84c44', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  logo: { color: '#c9a84c', fontSize: 20, fontWeight: 600, letterSpacing: 4, textDecoration: 'none' },
  links: { display: 'flex', gap: 24, alignItems: 'center' },
  link: { color: '#888', textDecoration: 'none', fontSize: 13, letterSpacing: 1 },
  btn: { background: 'transparent', border: '1px solid #c9a84c', color: '#c9a84c', padding: '6px 16px', borderRadius: 2, cursor: 'pointer', fontSize: 12 }
}
