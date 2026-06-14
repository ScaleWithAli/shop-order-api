import { useEffect, useState } from 'react'
import { getMyOrders, cancelOrder } from '../api/orders'
import { useAuthStore } from '../store/authStore'

export default function Orders() {
  const token = useAuthStore((s) => s.token)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMyOrders(token)
      .then((res) => setOrders(res.data.orders))
      .finally(() => setLoading(false))
  }, [])

  const handleCancel = async (id) => {
    try {
      await cancelOrder(id, token)
      setOrders(orders.map((o) => o.id === id ? { ...o, status: 'cancelled' } : o))
    } catch (err) {
      alert(err.response?.data?.detail || 'Cannot cancel')
    }
  }

  if (loading) return <div style={styles.center}><p style={styles.loading}>Loading...</p></div>

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>My Orders</h2>
      {orders.length === 0 ? (
        <p style={styles.empty}>No orders yet</p>
      ) : (
        <div style={styles.list}>
          {orders.map((order) => (
            <div key={order.id} style={styles.card}>
              <div style={styles.header}>
                <span style={styles.id}>Order #{order.id}</span>
                <span style={{ ...styles.status, ...(order.status === 'cancelled' ? styles.cancelled : styles.pending) }}>
                  {order.status}
                </span>
              </div>
              <p style={styles.total}>Total: <span style={styles.amt}>${order.total}</span></p>
              {order.status === 'pending' && (
                <button style={styles.cancelBtn} onClick={() => handleCancel(order.id)}>Cancel Order</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', background: '#0a0a0a', padding: '40px 32px' },
  title: { color: '#f0e6cc', fontSize: 28, fontWeight: 400, marginBottom: 32, letterSpacing: 2 },
  list: { display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 600 },
  card: { background: '#141414', border: '0.5px solid #c9a84c22', borderRadius: 4, padding: '20px 24px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  id: { color: '#d4c4a0', fontSize: 15, fontWeight: 500 },
  status: { fontSize: 11, letterSpacing: 1, padding: '4px 10px', borderRadius: 2, textTransform: 'uppercase' },
  pending: { background: '#c9a84c22', color: '#c9a84c' },
  cancelled: { background: '#ff000022', color: '#ff6666' },
  total: { color: '#666', fontSize: 13 },
  amt: { color: '#c9a84c', fontWeight: 600 },
  cancelBtn: { background: 'transparent', border: '1px solid #ff000044', color: '#ff6666', padding: '6px 14px', borderRadius: 2, cursor: 'pointer', fontSize: 12, marginTop: 12 },
  center: { minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  loading: { color: '#666' },
  empty: { color: '#666', fontSize: 14 }
}
