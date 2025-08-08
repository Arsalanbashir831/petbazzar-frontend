// src/app/(dashboard)/orders/page.tsx
'use client'

import React, { useState, useMemo } from 'react'
import OrdersTable, { mapSellerOrdersToRows } from '@/components/common/orders-table'
import type { ColumnDef } from '@tanstack/react-table'
import { sellerOrders as ALL_ORDERS } from '@/lib/mocks/orders'
import FilterBar from '@/components/common/filter-bar'
import PageHeader from '@/components/common/page-header'
import TabsBar from '@/components/common/tabs-bar'
import TabsDropdown from '@/components/common/tabs-dropdown'
import type { Order } from '@/types/order'


// Build from shared mocks
const ORDERS: Order[] = mapSellerOrdersToRows(ALL_ORDERS)

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
    const columns = useMemo<ColumnDef<Order>[]>(() => ({} as any), [])

    return (
        <div className="space-y-6 px-6 py-4">
            <PageHeader title="Manage Orders" icon={{ src: '/seller/dashboard/seller.png', alt: 'Fluffy Petshop' }} />

            {/* Desktop: TabsBar + FilterBar */}
            <div className="hidden md:block">
                <TabsBar
                    value={activeTab}
                    onValueChange={(v) => setActiveTab(v as typeof TABS[number])}
                    items={TABS.map((tab) => ({
                        value: tab,
                        label: tab,
                        badge: tab === 'New' ? ORDERS.filter(o => o.status === 'Pending').length : undefined,
                    }))}
                />
                    </div>
                <FilterBar
                    className="pt-4"
                    search={{ value: search, placeholder: 'Search Product by id or name', onChange: setSearch }}
                    sort={{ value: sort, options: [...SORT_OPTIONS], onChange: (v) => setSort(v as typeof SORT_OPTIONS[number]), label: 'Sort By:' }}
                    right={
                    <div className='md:hidden'>
                    <TabsDropdown value={activeTab} onValueChange={(v) => setActiveTab(v as typeof TABS[number])} items={TABS.map((tab) => ({
                        value: tab,
                        label: tab,
                        badge: tab === 'New' ? ORDERS.filter(o => o.status === 'Pending').length : undefined,
                    }))} />
                    </div>
                    }
                />

            {/* Orders Table */}
            <OrdersTable rows={sorted} />
        </div>
    )
}
