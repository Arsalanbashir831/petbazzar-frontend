'use client'

import React, { useMemo } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    LineChart,
    Line,
} from 'recharts'

// Components
import PageHeader from '@/components/common/page-header'
import HeaderStat from '@/components/common/header-stat'
import { CreditCard } from 'lucide-react'
import { formatCurrencyPKR } from '@/lib/format'
import StatCard from '@/components/seller/dashboard/stat-card'
import ChartCard from '@/components/seller/dashboard/chart-card'
import ProgressBar from '@/components/seller/dashboard/progress-bar'
import DataTable from '@/components/common/data-table'
import { Column } from '@/components/ui/table'

// Constants
import { CHART_COLORS } from '@/constants/dashboard'
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

    return (
        <div className="space-y-6 px-6 py-4">
            {/* Page Header */}
            <PageHeader
                title="Fluffy Petshop"
                icon={{ src: "/seller/dashboard/seller.png", alt: "Fluffy Petshop" }}
            >
                <HeaderStat icon={<CreditCard className="h-5 w-5 text-gray-600" />} label="Balance:" value={formatCurrencyPKR(54000)} />
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

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Quantity Sold Per Month */}
                <ChartCard title="Quantity Sold Per Month">
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <LineChart
                                data={monthlyQuantity}
                                margin={{ top: 10, right: 10, bottom: 10, left: 0 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                                <YAxis />
                                <Tooltip formatter={(v: number) => `${v}`} />
                                <Line
                                    type="monotone"
                                    dataKey="quantity"
                                    stroke={CHART_COLORS.primary}
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>

                {/* Inventory & Top Selling */}
                <div className="flex gap-2">
                    {/* Inventory */}
                    <ChartCard title="Inventory" className="w-1/2 px-3 py-6">
                        <ul className="space-y-3">
                            {inventoryData.map((item) => (
                                <li key={item.name}>
                                    <ProgressBar
                                        label={item.name}
                                        value={item.value}
                                        maxValue={maxInventory}
                                        size="sm"
                                    />
                                </li>
                            ))}
                        </ul>
                    </ChartCard>

                    {/* Top Selling */}
                    <ChartCard title="Top Selling" className="w-1/2 p-6">
                        <ul className="space-y-2">
                            {topSellingData.map((item) => (
                                <li key={item.name} className="flex justify-between text-sm font-medium">
                                    <span className='w-32 truncate'>{item.name}</span>
                                    <span>{item.value}</span>
                                </li>
                            ))}
                        </ul>
                    </ChartCard>
                </div>
            </div>

            {/* Recent Orders Table */}
            <DataTable
                title="Recent Orders"
                data={RECENT_ORDERS}
                columns={columns}
                viewAllLink={{ href: "/seller/orders", text: "View all orders" }}
            />
        </div>
    )
}
