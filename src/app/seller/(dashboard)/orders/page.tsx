// src/app/(dashboard)/orders/page.tsx
'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Sliders } from 'lucide-react'
import Table, { Column } from '@/components/Table'
import { cn } from '@/lib/utils'

interface Order {
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

// — replace with your real fetch
const ORDERS: Order[] = [
    { id: '6548', order: '#6548', product: 'Nutrabold Cat 5kg', category: 'Cat Food', quantity: 1, stockQuantity: 20, price: 'RS 4200', date: '4/8/2024', status: 'Pending' },
    { id: '6549', order: '#6549', product: 'Dog collar in multiple size / adjustable', category: 'Dog Essentials', quantity: 1, stockQuantity: 7, price: 'RS 1200', date: '4/8/2024', status: 'Cancelled' },
    { id: '6550', order: '#6550', product: 'Diamond care dry Dog Food', category: 'Dog Food', quantity: 3, stockQuantity: 13, price: 'RS 3200', date: '4/8/2024', status: 'Confirmed' },
    { id: '6551', order: '#6551', product: 'Dog House', category: 'Dog Essentials', quantity: 2, stockQuantity: 5, price: 'RS 6000', date: '4/8/2024', status: 'Delivered' },
    { id: '6552', order: '#6552', product: 'Nutrabold Cat 5kg', category: 'Cat Food', quantity: 1, stockQuantity: 20, price: 'RS 4200', date: '4/8/2024', status: 'Shipped' },
    { id: '6553', order: '#6553', product: 'Nutrabold Cat 5kg', category: 'Cat Food', quantity: 2, stockQuantity: 20, price: 'RS 1200', date: '4/8/2024', status: 'Pending' },
    { id: '6554', order: '#6554', product: 'Nutrabold Cat 2.7kg', category: 'Cat Food', quantity: 1, stockQuantity: 32, price: 'RS 1200', date: '4/8/2024', status: 'Pending' },
    { id: '6555', order: '#6555', product: 'Dog collar in multiple size / adjustable', category: 'Dog Essentials', quantity: 1, stockQuantity: 7, price: 'RS 3200', date: '4/8/2024', status: 'Pending' },
]

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
        const parsePrice = (p: string) => parseFloat(p.replace(/[^0-9.]/g, ''))
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
                arr.sort((a, b) => parsePrice(a.price) - parsePrice(b.price))
                break
            case 'Price High to Low':
                arr.sort((a, b) => parsePrice(b.price) - parsePrice(a.price))
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
        { header: 'Price', accessor: 'price' },
        { header: 'Date', accessor: 'date' },
        {
            header: 'Status',
            accessor: 'status',
            Cell: (row) => {
                let bg = 'bg-yellow-100 text-yellow-800'
                if (row.status === 'Cancelled') bg = 'bg-red-100 text-red-800'
                if (row.status === 'Confirmed') bg = 'bg-blue-100 text-blue-800'
                if (row.status === 'Delivered') bg = 'bg-green-100 text-green-800'
                if (row.status === 'Shipped') bg = 'bg-orange-100 text-orange-800'
                return (
                    <span className={cn('inline-block px-2 py-1 text-xs font-medium rounded', bg)}>
                        {row.status}
                    </span>
                )
            },
        },
    ], [])

    return (
        <div className="space-y-6 px-6 py-4">
            {/* Header */}
            <div className="flex items-center space-x-2">
                <Image
                    src="/seller/dashboard/seller.png"
                    alt="Fluffy Petshop"
                    width={32}
                    height={32}
                    className="rounded-full"
                />
                <h1 className="text-2xl font-semibold">Fluffy Petshop</h1>
            </div>
            <h2 className="text-lg font-bold">Manage Orders</h2>

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

            {/* Search & Sort */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4">
                {/* Search */}
                <div className="flex items-center flex-1 border border-orange-500 rounded-lg overflow-hidden">
                    <input
                        type="text"
                        placeholder="Search Product by id or name"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="flex-1 px-4 py-2 focus:outline-none"
                    />
                    <button className="px-3">
                        <Search className="h-5 w-5 text-orange-500" />
                    </button>
                </div>
                {/* Sort */}
                <div className="flex items-center border border-orange-500 rounded-lg overflow-hidden">
                    <select
                        value={sort}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onChange={e => setSort(e.target.value as any)}
                        className="px-4 py-2 text-sm focus:outline-none"
                    >
                        {SORT_OPTIONS.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                    <div className="px-3">
                        <Sliders className="h-5 w-5 text-orange-500" />
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <Table columns={columns} data={sorted} />
        </div>
    )
}
