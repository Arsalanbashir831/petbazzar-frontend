export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    SIGNUP: '/signup',
    ONBOARDING: '/onboarding',
    SELLER: {
        ACCOUNT: '/seller/account',
        DASHBOARD: '/seller/dashboard',
        INVENTORY: '/seller/inventory',
        NEW_INVENTORY: '/seller/new-inventory',
        ORDERS: '/seller/orders',
        ORDER_DETAILS: (id: string) => `/seller/orders/${id}`,
        SALES_ANALYTICS: '/seller/sales-analytics',
        STORE_SETTINGS: '/seller/store-settings',
        TRANSACTIONS: '/seller/transactions',
    },
}