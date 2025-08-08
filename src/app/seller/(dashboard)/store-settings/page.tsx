'use client'

import { useMemo, useState } from 'react'
import { ProductCard } from '@/components/common/product-card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import PageHeader from '@/components/common/page-header'
import { sellerProducts } from '@/lib/mocks/products'
import { formatCurrencyPKR } from '@/lib/format'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'

export default function StoreSettingPage() {
    const SORT_OPTIONS = [
        { label: 'Latest', value: 'latest' },
        { label: 'Name (A-Z)', value: 'name' },
        { label: 'Orders', value: 'orders' },
        { label: 'Likes', value: 'likes' },
        { label: 'Views', value: 'views' },
        { label: 'Stock', value: 'stock' },
        { label: 'Status', value: 'status' },
    ] as const

    type SortValue = typeof SORT_OPTIONS[number]['value']
    const [sortBy, setSortBy] = useState<SortValue>('latest')

    const computePrice = (id: number, base = 1200) => {
        const price = base + ((id * 37) % 4500)
        return formatCurrencyPKR(price)
    }

    const sorted = useMemo(() => {
        const rows = [...sellerProducts]
        switch (sortBy) {
            case 'name':
                rows.sort((a, b) => a.name.localeCompare(b.name))
                break
            case 'orders':
                rows.sort((a, b) => b.orders - a.orders)
                break
            case 'likes':
                rows.sort((a, b) => b.likes - a.likes)
                break
            case 'views':
                rows.sort((a, b) => b.views - a.views)
                break
            case 'stock':
                rows.sort((a, b) => b.stock - a.stock)
                break
            case 'status':
                rows.sort((a, b) => (a.status || '').localeCompare(b.status || ''))
                break
            case 'latest':
            default:
                rows.sort((a, b) => b.id - a.id)
                break
        }
        return rows
    }, [sortBy])
    return (
        <div className="flex flex-col">
            <div className='bg-yellow w-full relative'>
                <Image
                    src="/seller/dashboard/seller.png"
                    alt="Fluffy Petshop Logo"
                    width={900}
                    height={900}
                    className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-4 text-center">
                    <p className='text-white text-2xl md:text-4xl font-medium'>Replace Cover Image</p>
                    <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto items-center justify-center'>
                        <Button className='w-full sm:w-40 h-10 bg-transparent hover:bg-transparent text-white border-[1px] border-orange-500'>Remove</Button>
                        <Button className='w-full sm:w-40 h-10 bg-orange-500 hover:bg-orange-500 text-white border-[1px] border-orange-500'>Edit Cover</Button>
                    </div>
                </div>
            </div>

            <div className='p-6 pt-0 -mt-12'>
                <div className='bg-white relative z-10 rounded-xl'>
                    <PageHeader
                        title="Store Settings"
                        icon={{ src: '/seller/dashboard/seller.png', alt: 'Fluffy Petshop Logo' }}
                        className="px-4 pt-3 md:px-8 md:pt-6 flex-col md:flex-row items-start md:items-center gap-2"
                        childrenClassName="self-end"
                    >
                        <div>
                            <Button variant='outline' className='w-32 md:w-40 border-black px-4 py-2 '>Edit Profile</Button>
                        </div>
                    </PageHeader>

                    <Separator />

                    {/* Products Grid */}
                    <div className="w-full flex flex-col gap-4 md:flex-row md:items-center justify-between pt-4 bg-white px-4 md:px-10">
                        <h1 className="text-4xl font-bold">Products</h1>
                        <div className='flex items-center gap-4'>
                            <Label className='font-bold text-2xl'>Sort</Label>
                            <div className='w-40'>
                                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortValue)}>
                                    <SelectTrigger className="rounded-full border border-black h-9 px-4 bg-white hover:bg-white text-left w-full">
                                        <SelectValue placeholder="Latest" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border border-border bg-card">
                                        {SORT_OPTIONS.map((opt) => (
                                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-10 py-4 bg-white">
                        {sorted.map((p) => (
                            <ProductCard
                                key={p.id}
                                imageSrc={p.image}
                                title={p.name}
                                price={computePrice(p.id)}
                                stockLeft={p.stock}
                                onAddToCart={() => { }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
