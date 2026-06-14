import { create } from 'zustand'

export const useCartStore = create((set, get) => ({
  items: [],
  addItem: (product) => {
    const items = get().items
    const existing = items.find((i) => i.product_id === product.id)
    if (existing) {
      set({
        items: items.map((i) =>
          i.product_id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      })
    } else {
      set({ items: [...items, { product_id: product.id, name: product.name, price: product.price, quantity: 1 }] })
    }
  },
  removeItem: (product_id) =>
    set({ items: get().items.filter((i) => i.product_id !== product_id) }),
  clearCart: () => set({ items: [] }),
  total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0)
}))
