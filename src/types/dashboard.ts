import { LucideIcon } from 'lucide-react'

// Order Types
export interface RecentOrder {
    id: string
    order: string
    product: string
    category: string
    quantity: number
    stockQuantity: number
    price: string
    date: string
    status: 'Pending' | 'Cancelled' | 'Confirmed' | 'Delivered' | 'Shipped' | 'Completed'
}

// Inventory Types
export interface InventoryItem {
    id: number
    name: string
    image: string
    orders: number
    likes: number
    views: number
    stock: number
    status?: 'Active' | 'Inactive' | 'Pending' | 'Violation' | 'Deleted'
}

// Chart Data Types
export interface ChartDataPoint {
    name: string
    value: number
}

export interface MonthlyData {
    month: string
    quantity: number
}

// Stats Types
export interface DashboardStats {
    orders: number
    sales: string
    products: number
    lowStock: number
}

// Navigation Types
export interface NavItem {
    label: string
    href: string
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    badge?: number
}

// Status Types
export type OrderStatus = RecentOrder['status']
export type InventoryStatus = InventoryItem['status'] 