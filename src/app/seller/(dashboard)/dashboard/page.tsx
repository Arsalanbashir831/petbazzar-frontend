'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

// Components
import PageHeader from '@/components/common/page-header'
import StatCard from '@/components/seller/dashboard/stat-card'
import AnalyticsOverview from '@/components/common/analytics/overview'
import { Column } from '@/components/ui/table'
import OrdersTable, { mapSellerOrdersToRows } from '@/components/common/orders-table'

// Constants
import { ORDER_STATUS_COLORS } from '@/constants/status'

// Types
interface RecentOrder {
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

// Mock Data
const RECENT_ORDERS: RecentOrder[] = [
    { id: '6548', order: '#6548', product: 'Nutrabold Cat 5kg', category: 'Cat Food', quantity: 1, stockQuantity: 20, price: 'RS 4200', date: '4/8/2024', status: 'Pending' },
    { id: '6549', order: '#6549', product: 'Dog collar (adjustable)', category: 'Dog Essentials', quantity: 1, stockQuantity: 7, price: 'RS 1200', date: '4/8/2024', status: 'Cancelled' },
    { id: '6550', order: '#6550', product: 'Diamond care dry Dog Food', category: 'Dog Food', quantity: 3, stockQuantity: 13, price: 'RS 3200', date: '4/8/2024', status: 'Confirmed' },
    { id: '6551', order: '#6551', product: 'Dog House', category: 'Dog Essentials', quantity: 2, stockQuantity: 5, price: 'RS 6000', date: '4/8/2024', status: 'Delivered' },
    { id: '6552', order: '#6552', product: 'Nutrabold Cat 2.7kg', category: 'Cat Food', quantity: 1, stockQuantity: 32, price: 'RS 1200', date: '4/8/2024', status: 'Shipped' },
]

const inventoryData = [
    { name: 'Diamond Care Cat Food 2.7kg', value: 35 },
    { name: 'Chewy Dog Stuff Toy', value: 20 },
    { name: 'Dog Food', value: 17 },
    { name: 'Cat Food', value: 12 },
    { name: 'Diamond Care Cat Food 5kg', value: 12 },
]

const topSellingData = [
    { name: 'Diamond Care Cat Food 2.7kg', value: 35 },
    { name: 'Chewy Dog Stuff Toy', value: 20 },
    { name: 'Dog Food', value: 17 },
    { name: 'Cat Food', value: 12 },
    { name: 'Diamond Care Cat Food 5kg', value: 10 },
]

const monthlyQuantity = [
    { month: 'Jan', quantity: 15 },
    { month: 'Feb', quantity: 18 },
    { month: 'Mar', quantity: 13 },
    { month: 'Apr', quantity: 17 },
    { month: 'May', quantity: 12 },
    { month: 'Jun', quantity: 1 },
    { month: 'Jul', quantity: 11 },
    { month: 'Aug', quantity: 14 },
    { month: 'Sep', quantity: 16 },
    { month: 'Oct', quantity: 12 },
    { month: 'Nov', quantity: 21 },
    { month: 'Dec', quantity: -2 },
]

// Sales data for summary card
const monthlySales = [
    { month: 'Jan', sales: 50000 },
    { month: 'Feb', sales: 45000 },
    { month: 'Mar', sales: 120000 },
    { month: 'Apr', sales: 60000 },
    { month: 'May', sales: 65000 },
    { month: 'June', sales: 55000 },
    { month: 'July', sales: 110000 },
    { month: 'Aug', sales: 50000 },
    { month: 'Sep', sales: 20000 },
    { month: 'Oct', sales: 30000 },
    { month: 'Nov', sales: 105000 },
    { month: 'Dec', sales: 50000 },
]

const products = [
    'Trixie Dog Food',
    'Diamond Care Cat Food',
    'Dog House',
    'Collar',
    'Chewy Dog Stuff Toy',
    'Cat Food',
]

// Table Columns
const columns: Column<RecentOrder>[] = [
    { header: 'Order', accessor: 'order' },
    { 
        header: 'Product', 
        accessor: 'product', 
        Cell: (row) => (
            <Link href={`/seller/orders/${row.id}`} className="hover:no-underline">
                {row.product}
            </Link>
        )
    },
    { header: 'Category', accessor: 'category' },
    { header: 'Quantity', accessor: 'quantity' },
    { header: 'Stock Quantity', accessor: 'stockQuantity' },
    { header: 'Price', accessor: 'price' },
    { header: 'Date', accessor: 'date' },
    {
        header: 'Status',
        accessor: 'status',
        Cell: (row) => (
            <span className={cn('inline-block px-2 py-1 text-xs font-medium rounded', ORDER_STATUS_COLORS[row.status])}>
                {row.status}
            </span>
        ),
    },
]

export default function DashboardPage() {
    const maxInventory = useMemo(() => Math.max(...inventoryData.map((i) => i.value)), [])
    const totalOrders = RECENT_ORDERS.length
    const [period, setPeriod] = useState<'Monthly' | 'Yearly'>('Monthly')
    const [year, setYear] = useState(2025)
    const [selected, setSelected] = useState(products[0])

    const summaryData = period === 'Monthly' ? monthlySales : [
        { month: '2021', sales: 1200000 },
        { month: '2022', sales: 1800000 },
        { month: '2023', sales: 2400000 },
        { month: '2024', sales: 3100000 },
        { month: '2025', sales: 575000 },
    ]

    return (
        <div className="space-y-6 px-6 py-4">
            {/* Page Header */}
            <PageHeader
                title="Fluffy Petshop"
                icon={{ src: "/seller/dashboard/seller.png", alt: "Fluffy Petshop" }}
            >
            </PageHeader>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total Orders"
                    value={totalOrders}
                    icon='/icons/bag.svg'
                    link={{ href: "/seller/orders", text: "View all orders" }}
                    trend={{ value: 12, isPositive: true }}
                />
                <StatCard
                    title="Total Sales"
                    value="RS 45,200"
                    icon='/icons/coin.svg'
                    link={{ href: "/seller/sales", text: "View all sales" }}
                    trend={{ value: 8, isPositive: true }}
                />
                <StatCard
                    title="Total Products"
                    value={24}
                    icon='/icons/box.svg'
                    link={{ href: "/seller/products", text: "View all products" }}
                    trend={{ value: 3, isPositive: true }}
                />  
                <StatCard
                    title="Low Stock Products"
                    value={5}
                    icon='/icons/warning.svg'
                    link={{ href: "/seller/low-stock", text: "View all low stock products" }}
                    trend={{ value: 2, isPositive: false }}
                />
            </div>

            {/* Analytics Overview reused from Sales Analytics */}
            <AnalyticsOverview
                period={period}
                onPeriodChange={setPeriod}
                year={year}
                onYearChange={setYear}
                summaryData={summaryData}
                products={products}
                selectedProduct={selected}
                onProductChange={setSelected}
                quantityData={monthlyQuantity}
                inventoryItems={inventoryData}
                maxInventory={maxInventory}
                topSellingItems={topSellingData}
            />

            {/* Recent Orders Table (TanStack + shared columns) */}
            <div className="bg-card rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between px-2 pb-2">
                    <h3 className="text-base font-medium">Recent Orders</h3>
                    <Link href="/seller/orders" className="text-sm text-orange-500">View all orders</Link>
                </div>
                <OrdersTable rows={mapSellerOrdersToRows(RECENT_ORDERS as any).slice(0, 5)} />
            </div>
        </div>
    )
}
