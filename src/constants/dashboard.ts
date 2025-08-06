import { ROUTES } from '@/constants/routes'
import { NavItem } from '@/types/dashboard'
import { Box, LayoutDashboard, UserCircle, Package, Settings, Wallet, Warehouse } from 'lucide-react'

export const SELLER_NAV_ITEMS: NavItem[] = [
    { 
        label: 'Dashboard', 
        href: ROUTES.SELLER.DASHBOARD, 
        icon: LayoutDashboard,
    },
    { 
        label: 'Inventory', 
        href: ROUTES.SELLER.INVENTORY, 
        icon: Warehouse,
    },
    { 
        label: 'Orders', 
        href: ROUTES.SELLER.ORDERS, 
        icon: Package,
    },
    { 
        label: 'Sales Analytics', 
        href: ROUTES.SELLER.SALES_ANALYTICS, 
        icon: Box,
    },
    { 
        label: 'Store Setting', 
        href: ROUTES.SELLER.STORE_SETTINGS, 
        icon: Settings,
    },
    { 
        label: 'Transactions', 
        href: ROUTES.SELLER.TRANSACTIONS, 
        icon: Wallet,
    },
    { 
        label: 'Account', 
        href: ROUTES.SELLER.ACCOUNT, 
        icon: UserCircle,
    },
]

export const CHART_COLORS = {
    primary: '#FFA500',
    secondary: '#FF6B35',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#3B82F6'
}

export const ORDER_STATUS_COLORS = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Cancelled: 'bg-red-100 text-red-800',
    Confirmed: 'bg-blue-100 text-blue-800',
    Delivered: 'bg-green-100 text-green-800',
    Shipped: 'bg-orange-100 text-orange-800',
    Completed: 'bg-green-100 text-green-800'
} as const 