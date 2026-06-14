import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div style={styles.page}>
      <div style={styles.hero}>
        <p style={styles.tag}>New Collection 2026</p>
        <h1 style={styles.title}>Crafted for the<br />Discerning Few</h1>
        <p style={styles.sub}>Luxury redefined. Timeless pieces.</p>
        <Link to="/products" style={styles.btn}>Explore Collection</Link>
      </div>
      <div style={styles.features}>
        {['Free Shipping', 'Authentic Products', '24/7 Support'].map((f) => (
          <div key={f} style={styles.feature}>
            <span style={styles.featureText}>{f}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', background: '#0a0a0a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 60 },
  hero: { textAlign: 'center', padding: '0 20px' },
  tag: { color: '#c9a84c', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 16 },
  title: { color: '#f0e6cc', fontSize: 48, fontWeight: 400, lineHeight: 1.2, marginBottom: 16 },
  sub: { color: '#666', fontSize: 15, letterSpacing: 1, marginBottom: 32 },
  btn: { background: 'linear-gradient(135deg, #c9a84c, #e8c96a)', color: '#0a0a0a', padding: '14px 36px', borderRadius: 2, textDecoration: 'none', fontWeight: 600, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase' },
  features: { display: 'flex', gap: 40 },
  feature: { borderTop: '1px solid #c9a84c44', paddingTop: 16 },
  featureText: { color: '#888', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase' }
}
