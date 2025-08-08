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

