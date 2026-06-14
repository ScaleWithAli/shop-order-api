import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { useAuthStore } from '../store/authStore'
import { createOrder } from '../api/orders'

export default function Cart() {
  const { items, removeItem, clearCart, total } = useCartStore()
  const token = useAuthStore((s) => s.token)
  const navigate = useNavigate()

  const handleCheckout = async () => {
    try {
      await createOrder({ items: items.map((i) => ({ product_id: i.product_id, quantity: i.quantity })) }, token)
      clearCart()
      navigate('/orders')
    } catch (err) {
      alert(err.response?.data?.detail || 'Order failed')
    }
  }

  if (items.length === 0) return (
    <div style={styles.empty}>
      <p style={styles.emptyText}>Your cart is empty</p>
      <button style={styles.btn} onClick={() => navigate('/products')}>Shop Now</button>
    </div>
  )

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Your Cart</h2>
      <div style={styles.items}>
        {items.map((item) => (
          <div key={item.product_id} style={styles.item}>
            <div>
              <p style={styles.name}>{item.name}</p>
              <p style={styles.qty}>Qty: {item.quantity}</p>
            </div>
            <div style={styles.right}>
              <span style={styles.price}>${(item.price * item.quantity).toFixed(2)}</span>
              <button style={styles.remove} onClick={() => removeItem(item.product_id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div style={styles.total}>
        <span style={styles.totalLabel}>Total</span>
        <span style={styles.totalVal}>${total().toFixed(2)}</span>
      </div>
      <button style={styles.checkout} onClick={handleCheckout}>Place Order</button>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', background: '#0a0a0a', padding: '40px 32px', maxWidth: 600, margin: '0 auto' },
  title: { color: '#f0e6cc', fontSize: 28, fontWeight: 400, marginBottom: 32, letterSpacing: 2 },
  items: { display: 'flex', flexDirection: 'column', gap: 12 },
  item: { background: '#141414', border: '0.5px solid #c9a84c22', borderRadius: 4, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  name: { color: '#d4c4a0', fontSize: 14 },
  qty: { color: '#666', fontSize: 12, marginTop: 4 },
  right: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 },
  price: { color: '#c9a84c', fontSize: 16, fontWeight: 600 },
  remove: { background: 'transparent', border: '1px solid #ff000044', color: '#ff6666', padding: '4px 10px', borderRadius: 2, cursor: 'pointer', fontSize: 11 },
  total: { display: 'flex', justifyContent: 'space-between', padding: '20px 0', borderTop: '0.5px solid #c9a84c33', marginTop: 20 },
  totalLabel: { color: '#888', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' },
  totalVal: { color: '#c9a84c', fontSize: 22, fontWeight: 600 },
  checkout: { width: '100%', background: 'linear-gradient(135deg, #c9a84c, #e8c96a)', color: '#0a0a0a', border: 'none', padding: '14px', borderRadius: 2, cursor: 'pointer', fontWeight: 600, fontSize: 13, letterSpacing: 1, marginTop: 8 },
  empty: { minHeight: '100vh', background: '#0a0a0a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 },
  emptyText: { color: '#666', fontSize: 16 },
  btn: { background: 'linear-gradient(135deg, #c9a84c, #e8c96a)', color: '#0a0a0a', border: 'none', padding: '12px 32px', borderRadius: 2, cursor: 'pointer', fontWeight: 600, fontSize: 13 }
}
