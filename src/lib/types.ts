export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  compare_at_price: number | null
  images: string[]
  model_url: string | null
  stock: number
  weight_grams: number | null
  tags: string[]
  category_id: string
  is_active: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  order_number: string
  customer_email: string
  customer_name: string
  customer_phone: string | null
  shipping_address: {
    street: string
    city: string
    county: string
    zip: string
  }
  items: Array<{
    product_id: string
    name: string
    qty: number
    price: number
  }>
  subtotal: number
  shipping_cost: number
  total: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
}
