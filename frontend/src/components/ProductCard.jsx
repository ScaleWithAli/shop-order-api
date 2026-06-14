import { useCartStore } from '../store/cartStore'

export default function ProductCard({ product }) {
  const addItem = useCartStore((s) => s.addItem)

  return (
    <div style={styles.card}>
      <div style={styles.badge}>{product.category}</div>
      <h3 style={styles.name}>{product.name}</h3>
      <p style={styles.desc}>{product.description}</p>
      <div style={styles.bottom}>
        <span style={styles.price}>${product.price}</span>
        <span style={styles.stock}>Stock: {product.stock}</span>
      </div>
      <button style={styles.btn} onClick={() => addItem(product)}>
        Add to Cart
      </button>
    </div>
  )
}

const styles = {
  card: { background: '#141414', border: '0.5px solid #c9a84c33', borderRadius: 4, padding: 20, display: 'flex', flexDirection: 'column', gap: 10 },
  badge: { background: '#c9a84c22', color: '#c9a84c', fontSize: 10, letterSpacing: 2, padding: '3px 8px', borderRadius: 2, width: 'fit-content', textTransform: 'uppercase' },
  name: { color: '#f0e6cc', fontSize: 15, fontWeight: 500 },
  desc: { color: '#666', fontSize: 12, lineHeight: 1.6 },
  bottom: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  price: { color: '#c9a84c', fontSize: 18, fontWeight: 600 },
  stock: { color: '#444', fontSize: 11 },
  btn: { background: 'linear-gradient(135deg, #c9a84c, #e8c96a)', color: '#0a0a0a', border: 'none', padding: '10px', borderRadius: 2, cursor: 'pointer', fontWeight: 600, fontSize: 12, letterSpacing: 1 }
}
