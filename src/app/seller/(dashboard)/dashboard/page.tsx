'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'

// Components
import PageHeader from '@/components/common/page-header'
import StatCard from '@/components/seller/dashboard/stat-card'
import AnalyticsOverview from '@/components/common/analytics/overview'
import OrdersTable, { mapSellerOrdersToRows } from '@/components/common/orders-table'
import type { Order } from '@/types/order'
import { sellerOrders as ALL_ORDERS } from '@/lib/mocks/orders'
import {
    analyticsProducts as PRODUCTS,
    inventoryStats as INVENTORY_STATS,
    topSellingStats as TOP_SELLING_STATS,
  } from '@/lib/mocks/analytics'

// Mock Data
const RECENT_ORDERS: Order[] = mapSellerOrdersToRows(ALL_ORDERS.slice(0, 5))


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
const MONTHLY_SALES = [
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



export default function DashboardPage() {
    const maxInventory = useMemo(() => Math.max(...INVENTORY_STATS.map((i) => i.value)), [])
    const totalOrders = RECENT_ORDERS.length
    const [period, setPeriod] = useState<'Monthly' | 'Yearly'>('Monthly')
    const [year, setYear] = useState(2025)
    const [selected, setSelected] = useState(PRODUCTS[0])

    const summaryData = period === 'Monthly' ? MONTHLY_SALES : [
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
                products={PRODUCTS}
                selectedProduct={selected}
                onProductChange={setSelected}
                quantityData={monthlyQuantity}
                inventoryItems={INVENTORY_STATS}
                maxInventory={maxInventory}
                topSellingItems={TOP_SELLING_STATS}
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
