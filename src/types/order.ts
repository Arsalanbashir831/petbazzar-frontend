export type OrderStatus = 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Completed'

export interface SellerOrderRow {
  id: string
  product: string
  category: string
  quantity: number
  stock: number
  price: number
  date: string
  status: OrderStatus
}

export interface ProductRow {
  id: number
  name: string
  image: string
  orders: number
  likes: number
  views: number
  stock: number
  status?: 'Active' | 'Inactive' | 'Pending' | 'Violation' | 'Deleted'
}


