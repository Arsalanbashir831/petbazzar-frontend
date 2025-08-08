import { ROUTES } from '@/constants/routes'
import { NavItem } from '@/types/dashboard'
import { Box, LayoutDashboard, UserCircle, Package, Settings, Wallet, Warehouse } from 'lucide-react'

export const SELLER_NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: ROUTES.SELLER.DASHBOARD, icon: LayoutDashboard },
  { label: 'Inventory', href: ROUTES.SELLER.INVENTORY, icon: Warehouse },
  { label: 'Orders', href: ROUTES.SELLER.ORDERS, icon: Package },
  { label: 'Sales Analytics', href: ROUTES.SELLER.SALES_ANALYTICS, icon: Box },
  { label: 'Store Setting', href: ROUTES.SELLER.STORE_SETTINGS, icon: Settings },
  { label: 'Transactions', href: ROUTES.SELLER.TRANSACTIONS, icon: Wallet },
  { label: 'Account', href: ROUTES.SELLER.ACCOUNT, icon: UserCircle },
]

export const ADMIN_NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: ROUTES.SUPER_ADMIN.DASHBOARD, icon: LayoutDashboard },
  { label: 'Stores', href: ROUTES.SUPER_ADMIN.STORES, icon: Warehouse },
  { label: 'Products', href: ROUTES.SUPER_ADMIN.PRODUCTS, icon: Box },
  { label: 'Buyers', href: ROUTES.SUPER_ADMIN.BUYERS, icon: UserCircle },
  { label: 'Orders', href: ROUTES.SUPER_ADMIN.ORDERS, icon: Package },
  { label: 'Complaints', href: ROUTES.SUPER_ADMIN.COMPLAINTS, icon: Package },
  { label: 'Transactions', href: ROUTES.SUPER_ADMIN.TRANSACTIONS, icon: Wallet },
  { label: 'Sales Analytics', href: ROUTES.SUPER_ADMIN.SALES_ANALYTICS, icon: Box },
  { label: 'Account', href: ROUTES.SUPER_ADMIN.ACCOUNT, icon: UserCircle },
]


