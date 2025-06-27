// src/app/(dashboard)/orders/[id]/page.tsx
'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ChevronDown, Download } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Order {
    id: string
    order: string
    product: string
    category: string
    weight: string
    quantity: number
    stock: number
    price: number
    status: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled'
    customer: {
        name: string
        email: string
        phone: string
        address: string
        note?: string
    }
    shipping: {
        method: string
        cost: number
    }
}

// — replace with your real fetch (or move this into a shared data file)
const ORDERS: Order[] = [
    {
        id: '6548',
        order: '6548',
        product: 'DIAMOND Care Urinary Support Formula For Adult Cats',
        category: 'Cat Food',
        weight: '2.7 kg',
        quantity: 2,
        stock: 30,
        price: 2100,
        status: 'Pending',
        customer: {
            name: 'Alice Bob',
            email: 'alice.b123@gmail.com',
            phone: '+92 3341234567',
            address: 'h no 123, st no. 345, area, city',
            note: 'Please provide the right version.',
        },
        shipping: {
            method: 'COD',
            cost: 100,
        },
    },
    // …other orders…
]

export default function OrderPage({
    params,
}: {
    params: { id: string }
}) {
    const router = useRouter()
    const order = ORDERS.find((o) => o.id === params.id)

    const [menuOpen, setMenuOpen] = useState(false)

    if (!order) {
        return (
            <div className="px-6 py-4">
                <p>Order not found.</p>
                <button
                    onClick={() => router.back()}
                    className="mt-4 px-4 py-2 border rounded"
                >
                    Go Back
                </button>
            </div>
        )
    }

    // helper to pick badge styles
    const statusStyles = {
        Pending: 'bg-yellow-100 text-yellow-800',
        Confirmed: 'bg-blue-100 text-blue-800',
        Shipped: 'bg-orange-100 text-orange-800',
        Delivered: 'bg-green-100 text-green-800',
        Cancelled: 'bg-red-100 text-red-800',
    } as const

    const total = order.price * order.quantity + order.shipping.cost

    return (
        <div className="px-6 py-4 space-y-6">
            {/* ← Back + Logo */}
            <div className="flex items-center space-x-4">
                
                <Image
                    src="/seller/dashboard/seller.png"
                    alt="Fluffy Petshop"
                    width={32}
                    height={32}
                    className="rounded-lg"
                />
                <h1 className="text-2xl font-semibold">Fluffy Petshop</h1>
            </div>
            <button
                onClick={() => router.back()}
                className="text-foreground hover:text-foreground/80"
            >
                <ArrowLeft size={30} />
            </button>

            {/* Title + Status + Actions */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <h2 className="text-3xl text-gray-500 font-bold">Order #{order.order}</h2>
                    <span
                        className={cn(
                            'inline-block px-3 py-1 text-sm font-medium rounded',
                            statusStyles[order.status]
                        )}
                    >
                        {order.status}
                    </span>
                </div>
                <div className="flex items-center space-x-3">
                    {/* Update Status Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setMenuOpen((o) => !o)}
                            className="flex items-center px-4 py-2 bg-orange-500 text-white rounded"
                        >
                            Update Status <ChevronDown className="ml-2" />
                        </button>
                        {menuOpen && (
                            <ul className="absolute right-0 mt-2 w-40 bg-white border rounded shadow">
                                {(
                                    [
                                        'Pending',
                                        'Confirmed',
                                        'Shipped',
                                        'Delivered',
                                        'Cancelled',
                                    ] as const
                                ).map((s) => (
                                    <li key={s}>
                                        <button
                                            onClick={() => {
                                                /* TODO: call your update API */
                                                setMenuOpen(false)
                                            }}
                                            className="block w-full text-left px-4 py-2 hover:bg-muted"
                                        >
                                            {s}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <button className="px-4 py-2 border border-orange-500 rounded text-orange-500">
                        Cancel Order
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <section className="space-y-2">
                <h3 className="text-lg font-semibold">Product Info</h3>
                <div className="overflow-x-auto bg-card rounded-lg shadow-sm">
                    <table className="min-w-full ">
                        <thead className="bg-muted/20 text-black ">
                            <tr>
                                <th> </th>
                                <th className="px-4 py-2 text-left text-xs font-medium uppercase ">
                                    Name
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium uppercase ">
                                    Product id
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium uppercase ">
                                    Category
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium uppercase ">
                                    Weight
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium uppercase ">
                                    Quantity
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium uppercase ">
                                    Stock
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium uppercase ">
                                    Total
                                </th>
                            </tr>
                        </thead>
                        <tbody className="border-0 bg-background">
                            <tr>
                                <td className="px-4 py-2 ">
                                    {/* put your real product image here */}
                                    <Image
                                        src={`/seller/dashboard/seller.png`}
                                        alt={order.product}
                                        width={48}
                                        height={48}
                                        className="rounded"
                                    />
                                </td>
                                <td className="px-4 py-2 ">
                                    {order.product}
                                </td>
                                <td className="px-4 py-2">{order.id}</td>
                                <td className="px-4 py-2">{order.category}</td>
                                <td className="px-4 py-2">{order.weight}</td>
                                <td className="px-4 py-2">{order.quantity}</td>
                                <td className="px-4 py-2">{order.stock}</td>
                              
                                <td className="px-4 py-2 text-right text-sm text-muted-foreground">
                                    Rs {order.price} × {order.quantity}
                                </td>
                            </tr>
                        </tbody>
                        <tfoot className='w-full'>
                            <tr className=" w-full  ">
                                {/* span all columns except the last */}
                                <td colSpan={7} className="px-4 py-2 text-right font-medium">
                                    
                                </td>
                                <td className="px-4  flex py-2 text-right font-medium text-orange-500">
                                  
                                    Rs {order.price * order.quantity}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </section>

            {/* Customer Info */}
            <section className="space-y-2 bg-card rounded-lg p-4">
                <h3 className="text-lg font-semibold">Customer Info</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <span className="font-medium text-gray-500">Customer Name:</span>{' '}
                        {order.customer.name}
                    </div>
                    <div>
                        <span className="font-medium text-gray-500">Email:</span>{' '}
                        {order.customer.email}
                    </div>
                    <div>
                        <span className="font-medium text-gray-500">Phone:</span>{' '}
                        {order.customer.phone}
                    </div>
                    <div>
                        <span className="font-medium text-gray-500">Address:</span>{' '}
                        {order.customer.address}
                    </div>
                    {order.customer.note && (
                        <div className="sm:col-span-2">
                            <span className="font-medium text-gray-500">Note by customer:</span>{' '}
                            {order.customer.note}
                        </div>
                    )}
                </div>
            </section>

            {/* Payment Info */}
            <section className="space-y-2 bg-card rounded-lg p-4">
                <h3 className="text-lg font-semibold">Payment Info</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <span className="font-medium text-gray-500">Subtotal:</span> Rs{' '}
                        {order.price} × {order.quantity}
                    </div>
                    <div>
                        <span className="font-medium text-gray-500">Delivery Method:</span>{' '}
                        {order.shipping.method}
                    </div>
                    <div>
                        <span className="font-medium  text-gray-500">Shipping:</span> Rs{' '}
                        {order.shipping.cost}
                    </div>
                    <div className="sm:col-span-2 text-lg font-bold">
                        Total:{' '}
                        <span className="text-orange-500">Rs {total}</span>
                    </div>
                </div>
            </section>

            {/* Download Invoice */}
            <button className="flex items-center px-4 py-2 border border-orange-500 rounded space-x-2">
                <Download />
                <span className='text-orange-500'>Download Invoice</span>
            </button>
        </div>
    )
}
