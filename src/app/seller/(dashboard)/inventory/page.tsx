'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Sliders, Plus, ShoppingBag, Heart, Eye } from 'lucide-react'
import Table, { Column } from '@/components/Table'
import { cn } from '@/lib/utils'

interface InventoryItem {
    id: number
    name: string
    image: string
    orders: number
    likes: number
    views: number
    stock: number
}

// — replace with your real fetch
const ITEMS: InventoryItem[] = [
    {
        id: 44,
        name: 'DIAMOND Care Urinary Support Formula For Adult Cats',
        image: '/seller/dashboard/petCard.png',
        orders: 32,
        likes: 112,
        views: 1000,
        stock: 29,
    },
    {
        id: 43,
        name: 'Double Plaster Bowls',
        image: '/seller/dashboard/petCard.png',
        orders: 12,
        likes: 400,
        views: 3200,
        stock: 30,
    },
    {
        id: 42,
        name: 'Double Steel Bowls',
        image: '/seller/dashboard/petCard.png',
        orders: 4,
        likes: 100,
        views: 500,
        stock: 5,
    },
    {
        id: 41,
        name: 'Homie Adult Cat Food',
        image: '/seller/dashboard/petCard.png',
        orders: 35,
        likes: 347,
        views: 4322,
        stock: 7,
    },
    {
        id: 40,
        name: 'DIAMOND Care Urinary Support Formula For Adult Cats',
        image: '/seller/dashboard/petCard.png',
        orders: 32,
        likes: 112,
        views: 1000,
        stock: 29,
    },
    {
        id: 39,
        name: 'Double Steel Bowls',
        image: '/seller/dashboard/petCard.png',
        orders: 4,
        likes: 100,
        views: 500,
        stock: 5,
    },
]

const TABS = ['All', 'Active', 'Inactive', 'Pending', 'Violation', 'Deleted'] as const
const SORT_OPTIONS = [
    'Latest',
    'Oldest',
    'Low Stock',
    'Low Selling',
    'High Stock',
    'High Selling',
] as const

export default function InventoryPage() {
    const [activeTab, setActiveTab] = useState<typeof TABS[number]>('All')
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState<typeof SORT_OPTIONS[number]>('Latest')

    // 1) filter by tab & search
    const filtered = useMemo(() => {
        return ITEMS.filter((item) => {
            if (activeTab !== 'All') {
                // stub: you can refine this by item.status if you have one
                return true
            }
            if (search) {
                const q = search.toLowerCase()
                return (
                    item.name.toLowerCase().includes(q) ||
                    item.id.toString().includes(q)
                )
            }
            return true
        })
    }, [activeTab, search])

    // 2) sort
    const sorted = useMemo(() => {
        const arr = [...filtered]
        switch (sort) {
            case 'Oldest':
                arr.sort((a, b) => a.id - b.id)
                break
            case 'Low Stock':
                arr.sort((a, b) => a.stock - b.stock)
                break
            case 'High Stock':
                arr.sort((a, b) => b.stock - a.stock)
                break
            case 'Low Selling':
                arr.sort((a, b) => a.orders - b.orders)
                break
            case 'High Selling':
                arr.sort((a, b) => b.orders - a.orders)
                break
            case 'Latest':
            default:
                arr.sort((a, b) => b.id - a.id)
        }
        return arr
    }, [filtered, sort])

    // 3) columns
    const columns = useMemo<Column<InventoryItem>[]>(() => [
        { header: 'ID', accessor: 'id' },
        {
            header: 'Details',
            accessor: 'name',
            Cell: (row) => (
                <div className="flex items-center space-x-3">
                    <Image
                        src={row.image}
                        alt={row.name}
                        width={48}
                        height={48}
                        className="rounded-md"
                    />
                    <span className="font-medium">{row.name}</span>
                </div>
            ),
        },
        {
            header: 'Stats',
            accessor: 'stats',
            Cell: (row) => (
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <span className="flex items-center space-x-4 gap-1">
                        <ShoppingBag className="w-4 h-4 text-orange-500" />
                        {row.orders}
                    </span>
                    <span className="flex items-center space-x-2 gap-1">
                        <Heart className="w-4 h-4 text-orange-500" />
                        {row.likes}
                    </span>
                    <span className="flex items-center space-x-2 gap-1">
                        <Eye className="w-4 h-4 text-orange-500" />
                        {row.views}
                    </span>
                </div>
            ),
        },
        { header: 'Stock', accessor: 'stock' },
        {
            header: 'action',
            accessor: 'action',
            Cell: () => (
                <button className="px-4 py-1 border rounded-lg text-sm">
                    Edit Inventory
                </button>
            ),
        },
    ], [])

    return (
        <div className="space-y-6 px-6 py-4">
            {/* header + New Product */}
            <div className="flex items-center justify-between">
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
                
            </div>

            <div className='w-full flex justify-between items-center '>
                <h2 className="text-lg font-bold">Inventory</h2>
                <Link href="/seller/inventory/new">
                    <button className="flex items-center space-x-2 px-4 py-1 bg-orange-500 text-white rounded">
                        <Plus className='h-4 w-4' /> <span>New Product</span>
                    </button>
                </Link>
            </div>

            {/* tabs */}
            <div className="flex items-center space-x-8 gap-8 border-b border-border pl-8">
                {TABS.map((tab) => {
                    const isActive = tab === activeTab
                    return (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                'pb-2 text-sm font-medium transition',
                                isActive
                                    ? 'border-b-2 w-20 border-orange-500 text-orange-500'
                                    : 'text-muted-foreground hover:text-foreground'
                            )}
                        >
                            {tab}
                        </button>
                    )
                })}
            </div>

            {/* search & sort */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4">
                <div className="flex items-center flex-1 border border-orange-500 rounded-full overflow-hidden">
                    <input
                        type="text"
                        placeholder="Search Product by id or name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 px-4 py-2 focus:outline-none"
                    />
                    <button className="px-3">
                        <Search className="h-5 w-5 text-orange-500" />
                    </button>
                </div>
                <div className="flex items-center border border-orange-500 rounded-full overflow-hidden">
                    <select
                        value={sort}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onChange={(e) => setSort(e.target.value as any)}
                        className="px-4 py-2 text-sm focus:outline-none"
                    >
                        {SORT_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                    <div className="px-3">
                        <Sliders className="h-5 w-5 text-orange-500" />
                    </div>
                </div>
            </div>

            {/* data table */}
            <Table columns={columns} data={sorted} />
        </div>
    )
}
