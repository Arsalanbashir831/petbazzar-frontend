'use client'

import React, { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Table, { Column } from '@/components/Table'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

import { useState } from 'react'
import {
    ResponsiveContainer,
   
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    LineChart,
    Line,
} from 'recharts'





const products = [
    'Trixie Dog Food',
    'Diamond Care Cat Food',
    'Dog House',
    'Collar',
    'Chewy Dog Stuff Toy',
    'Cat Food',
    // …
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


// 1) Define the shape of a recent order
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

// 2) Dummy data for recent orders (swap in your real fetch)
const RECENT_ORDERS: RecentOrder[] = [
    { id: '6548', order: '#6548', product: 'Nutrabold Cat 5kg', category: 'Cat Food', quantity: 1, stockQuantity: 20, price: 'RS 4200', date: '4/8/2024', status: 'Pending' },
    { id: '6549', order: '#6549', product: 'Dog collar (adjustable)', category: 'Dog Essentials', quantity: 1, stockQuantity: 7, price: 'RS 1200', date: '4/8/2024', status: 'Cancelled' },
    { id: '6550', order: '#6550', product: 'Diamond care dry Dog Food', category: 'Dog Food', quantity: 3, stockQuantity: 13, price: 'RS 3200', date: '4/8/2024', status: 'Confirmed' },
    { id: '6551', order: '#6551', product: 'Dog House', category: 'Dog Essentials', quantity: 2, stockQuantity: 5, price: 'RS 6000', date: '4/8/2024', status: 'Delivered' },
    { id: '6552', order: '#6552', product: 'Nutrabold Cat 2.7kg', category: 'Cat Food', quantity: 1, stockQuantity: 32, price: 'RS 1200', date: '4/8/2024', status: 'Shipped' },
]

// 3) Columns for the <Table>
const columns: Column<RecentOrder>[] = [
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
]

export default function DashboardPage() {

       
        const [selected] = useState(products[0])
     
        
        // choose data based on period
      
    
        
        const maxInventory = useMemo(
            () => Math.max(...inventoryData.map((i) => i.value)),
            []
        )
    
     
    
        // stub: generate data based on `selected`
        const monthlyQuantity = useMemo(() => {
            // pretend we fetch or compute by product
            const base = selected.length * 1
            return [
                { month: 'Jan', quantity: base + 5 },
                { month: 'Feb', quantity: base + 8 },
                { month: 'Mar', quantity: base + 3 },
                { month: 'Apr', quantity: base + 7 },
                { month: 'May', quantity: base + 2 },
                { month: 'Jun', quantity: base - 9 },
                { month: 'Jul', quantity: base + 1 },
                { month: 'Aug', quantity: base + 4 },
                { month: 'Sep', quantity: base + 6 },
                { month: 'Oct', quantity: base + 2 },
                { month: 'Nov', quantity: base + 11 },
                { month: 'Dec', quantity: base - 12 },
            ]
        }, [selected])
    
    
    
    // (Optional) derive any stats you need
    const totalOrders = RECENT_ORDERS.length
    

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

            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-card flex flex-col justify-center rounded-lg shadow-sm p-4 space-y-2">
                    <div className='flex gap-4 items-center justify-start mb-2'>
                        <Image src="/seller/dashboard/order.png" alt="" className='h-16 w-16' height={900} width={900} />
                        <div className='flex flex-col items-start justify-center'>
                            <p className="text-3xl font-bold">{totalOrders}</p>
                            <p className="text-sm text-muted-foreground">Total Orders</p>
                        </div>
                    </div>
                    
                    <Separator />
                  
                    <Link href="/seller/orders" className="text-md font-medium text-gray-500 flex justify-between items-center">
                        View Details
                        <ArrowRight className="ml-1" size={16} />
                    </Link>
                </div>
                <div className="bg-card flex flex-col justify-center rounded-lg shadow-sm p-4 space-y-2">
                    <div className='flex gap-4 items-center justify-start mb-2'>
                        <Image src="/seller/dashboard/sale.png" alt="" className='h-16 w-16' height={900} width={900} />
                        <div className='flex flex-col items-start justify-center'>
                            <p className="text-3xl font-bold">{totalOrders}</p>
                            <p className="text-sm text-muted-foreground">Total Sales</p>
                        </div>
                    </div>

                    <Separator />

                    <Link href="/seller/orders" className="text-md font-medium text-gray-500 flex justify-between items-center">
                        View Details
                        <ArrowRight className="ml-1" size={16} />
                    </Link>
                </div>

                <div className="bg-card flex flex-col justify-center rounded-lg shadow-sm p-4 space-y-2">
                    <div className='flex gap-4 items-center justify-start mb-2'>
                        <Image src="/seller/dashboard/product.png" alt="" className='h-16 w-16' height={900} width={900} />
                        <div className='flex flex-col items-start justify-center'>
                            <p className="text-3xl font-bold">{totalOrders}</p>
                            <p className="text-sm text-muted-foreground">Active Products</p>
                        </div>
                    </div>

                    <Separator />

                    <Link href="/seller/orders" className="text-md font-medium text-gray-500 flex justify-between items-center">
                        View Details
                        <ArrowRight className="ml-1" size={16} />
                    </Link>
                </div>

                <div className="bg-card flex flex-col justify-center rounded-lg shadow-sm p-4 space-y-2">
                    <div className='flex gap-4 items-center justify-start mb-2'>
                        <Image src="/seller/dashboard/low.png" alt="" className='h-16 w-16' height={900} width={900} />
                        <div className='flex flex-col items-start justify-center'>
                            <p className="text-3xl font-bold">{totalOrders}</p>
                            <p className="text-sm text-muted-foreground">Low Stock</p>
                        </div>
                    </div>

                    <Separator />

                    <Link href="/seller/orders" className="text-md font-medium text-gray-500 flex justify-between items-center">
                        View Details
                        <ArrowRight className="ml-1" size={16} />
                    </Link>
                </div>
            </div>

            {/* … here you can plug in your Sales Overview, Inventory & Top Selling cards … */}
             {/* Bottom row: Quantity, Inventory & Top Selling */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {/* Quantity Sold Per Month */}
                            <div className="bg-card rounded-lg shadow-sm p-6">
                                <h3 className="text-base font-medium mb-4">Quantity Sold Per Month</h3>
            
                               
            
                                {/* Your Recharts line chart */}
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
                                                stroke="#FFA500"
                                                strokeWidth={2}
                                                dot={false}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
            
                            {/* Inventory & Top Selling */}
                            <div className="flex gap-2">
                                {/* Inventory */}
                                <div className="bg-card rounded-lg shadow-sm w-1/2 px-3 py-6">
                                    <h3 className="text-base font-medium mb-4">Inventory</h3>
                                    <ul className="space-y-3">
                                        {inventoryData.map((item) => {
                                            const pct = (item.value / maxInventory) * 100
                                            return (
                                                <li key={item.name} className="flex flex-col w-full gap-2  ">
                                                    <span className="flex-1 text-sm">{item.name}</span>
                                                    <div className='flex items-center justify-between w-full gap-2'>
                                                        <div className="w-4/5 bg-muted h-2 flex gap-2 rounded overflow-hidden">
                                                            <div
                                                                className="h-2 bg-orange-500"
                                                                style={{ width: `${pct}%` }}
                                                            />
                                                        </div>
                                                        <span className=" text-right text-sm font-medium">
                                                            {item.value}
                                                        </span>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
            
                                {/* Top Selling */}
                                <div className="bg-card w-1/2 rounded-lg shadow-sm p-6">
                                    <h3 className="text-base font-medium mb-4">Top Selling</h3>
                                    <ul className="space-y-2">
                                        {topSellingData.map((item) => (
                                            <li
                                                key={item.name}
                                                className="flex justify-between text-sm font-medium"
                                            >
                                                <span className='w-32'>{item.name}</span>
                                                <span>{item.value}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

            

            {/* Recent Orders Table */}
            <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold">Recent Orders</h2>
                    <Link
                        href="/seller/orders"
                        className="text-sm border rounded-lg py-2 font-semibold px-3 text-muted-foreground hover:text-foreground flex items-center"
                    >
                        View all orders 
                    </Link>
                </div>
                <Table columns={columns} data={RECENT_ORDERS} />
            </div>
        </div>
    )
}
