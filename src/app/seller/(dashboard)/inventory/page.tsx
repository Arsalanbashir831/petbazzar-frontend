'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Plus, ShoppingBag, Heart, Eye } from 'lucide-react'
import Table, { Column } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import FilterBar from '@/components/common/filter-bar'
import PageHeader from '@/components/common/page-header'
import { products as MOCK_PRODUCTS } from '@/lib/mockStoreData'

interface InventoryItem {
    id: number
    name: string
    image: string
    orders: number
    likes: number
    views: number
    stock: number
}

// Build from shared mocks
const ITEMS: InventoryItem[] = MOCK_PRODUCTS.map((p) => ({
    id: p.id,
    name: p.name,
    image: p.image,
    orders: p.stats.sold,
    likes: p.stats.likes,
    views: p.stats.views,
    stock: p.stock,
}))

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
            <PageHeader
                title="Inventory"
                icon={{ src: '/seller/dashboard/seller.png', alt: 'Fluffy Petshop' }}
                actions={
                    <Link href="/seller/inventory/new" className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded">
                        <Plus className="h-4 w-4" /> <span>New Product</span>
                    </Link>
                }
            />

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

            <FilterBar
                className="pt-2"
                search={{ value: search, placeholder: 'Search Product by id or name', onChange: setSearch }}
                sort={{ value: sort, options: [...SORT_OPTIONS], onChange: (v) => setSort(v as typeof SORT_OPTIONS[number]), label: 'Sort By:' }}
            />

            {/* data table */}
            <Table columns={columns} data={sorted} />
        </div>
    )
}
