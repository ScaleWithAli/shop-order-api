import { useEffect, useState } from 'react'
import { getProducts } from '../api/products'
import ProductCard from '../components/ProductCard'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('')

  useEffect(() => {
    getProducts(category)
      .then((res) => setProducts(res.data.products))
      .finally(() => setLoading(false))
  }, [category])

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Our Collection</h2>
      <div style={styles.filters}>
        {['', 'clothing', 'fragrance'].map((c) => (
          <button key={c} onClick={() => setCategory(c)} style={{ ...styles.filter, ...(category === c ? styles.active : {}) }}>
            {c || 'All'}
          </button>
        ))}
      </div>
      {loading ? (
        <p style={styles.loading}>Loading...</p>
      ) : (
        <div style={styles.grid}>
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', background: '#0a0a0a', padding: '40px 32px' },
  title: { color: '#f0e6cc', fontSize: 28, fontWeight: 400, marginBottom: 24, letterSpacing: 2 },
  filters: { display: 'flex', gap: 12, marginBottom: 32 },
  filter: { background: '#141414', border: '0.5px solid #c9a84c33', color: '#888', padding: '8px 20px', borderRadius: 2, cursor: 'pointer', fontSize: 12, letterSpacing: 1, textTransform: 'uppercase' },
  active: { borderColor: '#c9a84c', color: '#c9a84c' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 },
  loading: { color: '#666', textAlign: 'center', marginTop: 80 }
}
