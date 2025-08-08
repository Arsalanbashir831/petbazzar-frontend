// src/app/(dashboard)/orders/page.tsx
'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import Table, { Column } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { ORDER_STATUS_COLORS } from '@/constants/status'
import { sellerOrders as ALL_ORDERS } from '@/lib/mocks/orders'
import FilterBar from '@/components/common/filter-bar'
import PageHeader from '@/components/common/page-header'
import StatusBadge from '@/components/common/status-badge'

type Order = (typeof ALL_ORDERS)[number] & {
    order: string
    stockQuantity: number
    priceLabel: string
}

// Build from shared mocks
const ORDERS: Order[] = ALL_ORDERS.map((o) => ({
    ...o,
    order: o.id,
    stockQuantity: o.stock,
    priceLabel: `RS ${o.price.toLocaleString()}`,
}))

const TABS = ['All', 'New', 'Confirmed', 'Shipped', 'Completed', 'Cancelled'] as const
const SORT_OPTIONS = ['Latest', 'Oldest', 'Low Stock', 'High Stock', 'Price Low to High', 'Price High to Low'] as const

export default function OrdersPage() {
    const [activeTab, setActiveTab] = useState<typeof TABS[number]>('All')
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState<typeof SORT_OPTIONS[number]>('Latest')

    // 1) Filter by tab & search
    const filtered = useMemo(() => {
        return ORDERS.filter(o => {
            if (activeTab !== 'All') {
                // “New” = Pending
                if (activeTab === 'New') return o.status === 'Pending'
                return o.status === activeTab
            }
            if (search) {
                const s = search.toLowerCase()
                return (
                    o.order.toLowerCase().includes(s) ||
                    o.product.toLowerCase().includes(s)
                )
            }
            return true
        })
    }, [activeTab, search])

    // 2) Sort
    const sorted = useMemo(() => {
        const arr = [...filtered]
        switch (sort) {
            case 'Oldest':
                arr.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                break
            case 'Low Stock':
                arr.sort((a, b) => a.stockQuantity - b.stockQuantity)
                break
            case 'High Stock':
                arr.sort((a, b) => b.stockQuantity - a.stockQuantity)
                break
            case 'Price Low to High':
                arr.sort((a, b) => a.price - b.price)
                break
            case 'Price High to Low':
                arr.sort((a, b) => b.price - a.price)
                break
            case 'Latest':
            default:
                arr.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        }
        return arr
    }, [filtered, sort])

    // 3) Columns + Link on Order
    const columns = useMemo<Column<Order>[]>(() => [
        {
            header: 'Order',
            accessor: 'order',
            
        },
        {
            header: 'Product', accessor: 'product', Cell: (row) => (
                <Link
                    href={`/seller/orders/${row.id}`}
                    className="  hover:no-underline"
                >
                    {row.product}
                </Link>
            ), },
        { header: 'Category', accessor: 'category' },
        { header: 'Quantity', accessor: 'quantity' },
        { header: 'Stock Quantity', accessor: 'stockQuantity' },
        { header: 'Price', accessor: 'priceLabel' },
        { header: 'Date', accessor: 'date' },
        {
            header: 'Status',
            accessor: 'status',
            Cell: (row) => (<StatusBadge status={row.status} size="sm" />),
        },
    ], [])

    return (
        <div className="space-y-6 px-6 py-4">
            <PageHeader title="Manage Orders" icon={{ src: '/seller/dashboard/seller.png', alt: 'Fluffy Petshop' }} />

            {/* Tabs */}
            <div className="flex items-center space-x-8 border-b border-border">
                {TABS.map(tab => {
                    const isActive = tab === activeTab
                    const badge = tab === 'New'
                        ? ORDERS.filter(o => o.status === 'Pending').length
                        : null

                    return (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                'relative pb-2 text-sm font-medium transition',
                                isActive
                                    ? 'border-b-2 border-orange-500 text-orange-500'
                                    : 'text-muted-foreground hover:text-foreground'
                            )}
                        >
                            {tab}
                            {badge && (
                                <span className="ml-1 inline-block rounded-full bg-orange-500 px-2 py-0.5 text-xs font-semibold text-white">
                                    {badge}
                                </span>
                            )}
                        </button>
                    )
                })}
            </div>

            <FilterBar
                className="pt-4"
                search={{ value: search, placeholder: 'Search Product by id or name', onChange: setSearch }}
                sort={{ value: sort, options: [...SORT_OPTIONS], onChange: (v) => setSort(v as typeof SORT_OPTIONS[number]), label: 'Sort By:' }}
            />

            {/* Orders Table */}
            <Table columns={columns} data={sorted} />
        </div>
    )
}
