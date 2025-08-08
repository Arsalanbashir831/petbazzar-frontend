'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Plus, ShoppingBag, Heart, Eye } from 'lucide-react'
import DataTableRT from '@/components/common/data-table-rt'
import type { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import FilterBar from '@/components/common/filter-bar'
import PageHeader from '@/components/common/page-header'
import { sellerProducts as MOCK_PRODUCTS } from '@/lib/mocks/products'
import TabsBar from '@/components/common/tabs-bar'
import TabsDropdown from '@/components/common/tabs-dropdown'
import type { InventoryItem } from '@/types/inventory'


// Build from shared mocks
const ITEMS: InventoryItem[] = MOCK_PRODUCTS.map((p) => ({
    id: p.id,
    name: p.name,
    image: p.image,
    orders: p.orders,
    likes: p.likes,
    views: p.views,
    stock: p.stock,
    status: p.status,
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
                return (item.status || 'Active') === activeTab
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
    const columns = useMemo<ColumnDef<InventoryItem>[]>(() => [
        { accessorKey: 'id', header: 'ID', cell: ({ row }) => row.original.id },
        {
            accessorKey: 'name',
            header: 'Details',
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <Image
                        src={row.original.image}
                        alt={row.original.name}
                        width={48}
                        height={48}
                        className="rounded-md"
                    />
                    <span className="font-medium">{row.original.name}</span>
                </div>
            ),
        },
        {
            accessorKey: 'stats',
            header: 'Stats',
            cell: ({ row }) => (
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <span className="flex items-center space-x-4 gap-1">
                        <ShoppingBag className="w-4 h-4 text-orange-500" />
                        {row.original.orders}
                    </span>
                    <span className="flex items-center space-x-2 gap-1">
                        <Heart className="w-4 h-4 text-orange-500" />
                        {row.original.likes}
                    </span>
                    <span className="flex items-center space-x-2 gap-1">
                        <Eye className="w-4 h-4 text-orange-500" />
                        {row.original.views}
                    </span>
                </div>
            ),
        },
        { accessorKey: 'stock', header: 'Stock', cell: ({ row }) => row.original.stock },
        {
            id: 'action',
            header: 'action',
            cell: () => (
                <button className="px-4 py-1 border rounded-lg text-sm">Edit Inventory</button>
            ),
        },
    ], [])

    return (
        <div className="space-y-6 px-6 py-4">
            <PageHeader
                title="Inventory"
                icon={{ src: '/seller/dashboard/seller.png', alt: 'Fluffy Petshop' }}
                actions={
                    <Link href="/seller/inventory/new" className="flex items-center space-x-2 px-2 py-2 md:px-4 bg-orange-500 text-white rounded text-sm md:text-base">
                        <Plus className="h-4 w-4" /> <span>New Product</span>
                    </Link>
                }
            />

            <div className="hidden md:block">
                <TabsBar
                    value={activeTab}
                    onValueChange={(v) => setActiveTab(v as typeof TABS[number])}
                    items={TABS.map((tab) => ({ value: tab, label: tab }))}
                    listClassName="pl-8"
                />
            </div>

            <FilterBar
                className="pt-2"
                search={{ value: search, placeholder: 'Search Product by id or name', onChange: setSearch }}
                sort={{ value: sort, options: [...SORT_OPTIONS], onChange: (v) => setSort(v as typeof SORT_OPTIONS[number]), label: 'Sort By:' }}
                right={
                    <div className='md:hidden'>
                        <TabsDropdown value={activeTab} onValueChange={(v) => setActiveTab(v as typeof TABS[number])} items={TABS.map((tab) => ({
                            value: tab,
                            label: tab,
                            badge: tab === 'Active' ? ITEMS.filter(o => o.status === 'Active').length : tab === 'Inactive' ? ITEMS.filter(o => o.status === 'Inactive').length : tab === 'Pending' ? ITEMS.filter(o => o.status === 'Pending').length : tab === 'Violation' ? ITEMS.filter(o => o.status === 'Violation').length : tab === 'Deleted' ? ITEMS.filter(o => o.status === 'Deleted').length : undefined,
                        }))} />
                    </div>
                }
            />

            {/* data table */}
            <DataTableRT columns={columns} data={sorted} />
        </div>
    )
}
