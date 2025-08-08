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

export type InventoryStatus = InventoryItem['status'] 