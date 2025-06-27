// app/super-admin/stores/[id]/page.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
    storeDetails,
    products,
    orders,
    transactions,
    complaints,
    reviews,
} from '@/lib/mockStoreData';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Table, { Column } from '@/components/Table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ShoppingCart, Heart, Eye, ChevronDown } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';

export default function StoreDetailPage() {
    const store = storeDetails;

    // which main tab is active
    const [mainTab, setMainTab] = useState<
        'products' | 'orders' | 'transactions' | 'complaints' | 'reviews'
    >('products');

    // sub-tab states
    const [prodTab, setProdTab] = useState<'all' | 'active' | 'inactive' | 'pending' | 'violation' | 'deleted'>('all');
    const [orderTab, setOrderTab] = useState<'all' | 'new' | 'confirmed' | 'shipped' | 'completed' | 'cancelled'>('all');
    const [txTab, setTxTab] = useState<'all' | 'pending' | 'completed'>('all');
    const [compTab, setCompTab] = useState<'all' | 'pending' | 'refund' | 'completed'>('all');

    // search boxes
    const [prodSearch, setProdSearch] = useState('');
    const [orderSearch, setOrderSearch] = useState('');

    // filter data for each section
    const displayedProducts = products.filter(p => {
        if (prodSearch && !`${p.id}`.includes(prodSearch) && !p.name.toLowerCase().includes(prodSearch.toLowerCase()))
            return false;
        // you could also filter by prodTab here…
        return true;
    });

    const displayedOrders = orders
        .filter(o => {
            if (orderTab === 'new') return o.status === 'Pending';
            if (orderTab === 'confirmed') return o.status === 'Confirmed';
            if (orderTab === 'shipped') return o.status === 'Shipped';
            if (orderTab === 'completed') return o.status === 'Completed';
            if (orderTab === 'cancelled') return o.status === 'Cancelled';
            return true; // 'all'
        })
        .filter(o => {
            if (!orderSearch) return true;
            return (
                o.id.includes(orderSearch) ||
                o.product.toLowerCase().includes(orderSearch.toLowerCase())
            );
        });

    const displayedTx = transactions.filter(tx => {
        if (txTab === 'pending') return tx.paymentStatus === 'Pending';
        if (txTab === 'completed') return tx.paymentStatus === 'Paid';
        return true;
    });

    const displayedComp = complaints.filter(c => {
        if (compTab === 'pending') return c.status === 'Pending';
        if (compTab === 'refund') return c.status === 'Refund';
        if (compTab === 'completed') return c.status === 'Completed';
        return true;
    });

    // --- Columns definitions ---

    const productColumns: Column<typeof products[number]>[] = [
        { header: 'ID', accessor: 'id', className:'font-semibold text-black' },
        {
            header: 'Details',
            accessor: '',
            Cell: (row) => (
                <div className="flex items-center gap-2">
                    <Image
                        src={row.image}
                        alt={row.name}
                        width={40}
                        height={40}
                        className="rounded-md"
                    />
                    <span>{row.name}</span>
                </div>
            ),
        },
        {
            header: 'Stats',
            accessor: '',
            Cell: (row) => (
                <div className="flex items-center space-x-4">
                    <span className="flex items-center gap-1">
                        <ShoppingCart size={16} className='text-orange-500' />{row.stats.sold}
                    </span>
                    <span className="flex items-center gap-1">
                        <Heart size={16} className='text-orange-500' />{row.stats.likes}
                    </span>
                    <span className="flex items-center gap-1">
                        <Eye size={16} className='text-orange-500' />{row.stats.views}
                    </span>
                </div>
            ),
        },
        { header: 'Stock', accessor: 'stock', className: 'font-semibold text-black' },
        {
            header: '',
            accessor: '',
            Cell: () => <Button variant="outline" className='w-40' size="sm">View</Button>,
            className: 'text-center whitespace-nowrap',
        },
    ];

    const orderColumns: Column<typeof orders[number]>[] = [
        { header: 'Order', accessor: 'id' },
        { header: 'Product', accessor: 'product' },
        { header: 'Category', accessor: 'category' },
        { header: 'Quantity', accessor: 'quantity' },
        { header: 'Stock Qty', accessor: 'stock' },
        {
            header: 'Price',
            accessor: 'price',
            Cell: (r) => <>Rs {r.price.toLocaleString()}</>,
        },
        { header: 'Date', accessor: 'date' },
        {
            header: 'Status',
            accessor: 'status',
            Cell: (r) => {
                const map: Record<string, string> = {
                    Pending: 'bg-yellow-100 text-yellow-800',
                    Cancelled: 'bg-red-100 text-red-800',
                    Confirmed: 'bg-blue-100 text-blue-800',
                    Delivered: 'bg-green-100 text-green-800',
                    Shipped: 'bg-orange-100 text-orange-800',
                };
                const classes = map[r.status] || 'bg-gray-100 text-gray-800';
                return (
                    <span className={`px-2 py-1 rounded-md font-medium ${classes}`}>
                        {r.status}
                    </span>
                );
            }
        },

    ];

    const txColumns: Column<typeof transactions[number]>[] = [
        { header: 'Order', accessor: 'id' },
        { header: 'Product', accessor: 'product' },
        { header: 'Quantity', accessor: 'quantity' },
        {
            header: 'Price',
            accessor: 'price',
            Cell: (r) => <>Rs {r.price.toLocaleString()}</>,
        },
        { header: 'Date', accessor: 'date' },
        // inside your transactionColumns definition:

        {
            header: 'Order Status',
            accessor: 'orderStatus',
            Cell: (r) => {
                const map: Record<string, string> = {
                    Shipped: 'bg-blue-100 text-blue-800',
                    Completed: 'bg-green-100 text-green-800',
                    Pending: 'bg-yellow-100 text-yellow-800',
                    Cancelled: 'bg-red-100 text-red-800',
                    Confirmed: 'bg-blue-100 text-blue-800',
                };
                const classes = map[r.orderStatus] || 'bg-gray-100 text-gray-800';
                return (
                    <span className={`px-2 py-1 rounded-md font-medium ${classes}`}>
                        {r.orderStatus}
                    </span>
                );
            },
        },
        {
            header: 'Payment Status',
            accessor: 'paymentStatus',
            Cell: (r) => {
                const map: Record<string, string> = {
                    Pending: 'bg-yellow-100 text-yellow-800',
                    Paid: 'bg-green-100 text-green-800',
                };
                const classes = map[r.paymentStatus] || 'bg-gray-100 text-gray-800';
                return (
                    <span className={`px-2 py-1 rounded-md font-medium ${classes}`}>
                        {r.paymentStatus}
                    </span>
                );
            },
        },

    ];

    const compColumns: Column<typeof complaints[number]>[] = [
        { header: 'Complaint ID', accessor: 'id' },
        { header: 'Customer ID', accessor: 'customerId' },
        { header: 'Date', accessor: 'date' },
        { header: 'Product', accessor: 'product' },
        { header: 'Store', accessor: 'store' },
        { header: 'Order ID', accessor: 'orderId' },
        { header: 'Issue Summary', accessor: 'issue' },
        {
            header: 'Status',
            accessor: 'status',
            Cell: (r) => (
                <Badge variant={r.status === 'Pending' ? 'secondary' : 'destructive'}>
                    {r.status}
                </Badge>
            ),
        },
    ];

    const reviewColumns: Column<typeof reviews[number]>[] = [
        { header: 'Review ID', accessor: 'id' },
        { header: 'Customer', accessor: 'customer' },
        { header: 'Date', accessor: 'date' },
        {
            header: 'Rating',
            accessor: 'rating',
            Cell: (r) => <>{r.rating} ⭐</>,
        },
        { header: 'Comment', accessor: 'comment' },
    ];

    return (
        <div className="p-6 space-y-6">
            {/* Title / Breadcrumb */}
           
            
            <PageHeader title='Store Details' userName={store.ownerName} />

            {/* Store Header */}
            <div className="bg-card p-4 rounded-lg flex gap-6">
                <Image
                    src="/seller/dashboard/seller.png"
                    alt="store logo"
                    width={94}
                    height={94}
                    className="flex-shrink-0"
                />
                <div className="flex-1 flex flex-col md:flex-row md:justify-between">
                    <div className="space-y-2">
                        <p>
                            <span className="font-semibold">Store Name:</span> {store.name}
                        </p>
                        <p>
                            <span className="font-semibold">Created on:</span> {store.createdOn}
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="font-semibold">Status:</span>
                            <Badge className='bg-green-300 text-green-600' variant={store.status === 'Active' ? 'secondary' : 'default'}>
                                {store.status}
                            </Badge>
                        </p>
                    </div>
                    <div className="space-y-2 text-right">
                        <p>
                            <span className="font-semibold">Owner Name:</span> {store.ownerName}
                        </p>
                        <p>
                            <span className="font-semibold">Owner Phone:</span> {store.ownerPhone}
                        </p>
                        <p>
                            <span className="font-semibold">Owner Email:</span> {store.ownerEmail}
                        </p>
                    </div>
                </div>
            </div>

            {/* Performance */}
            <div className="bg-card p-6 rounded-lg">
                <h2 className="text-lg font-medium mb-4">Performance</h2>
                <div className="grid grid-cols-2 gap-x-24 gap-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Products :</span>
                        <span className="font-semibold">{store.stats.totalProducts}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Orders Received :</span>
                        <span className="font-semibold">{store.stats.totalOrders}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Products Sold :</span>
                        <span className="font-semibold">{store.stats.productsSold}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Earnings (Rs) :</span>
                        <span className="font-semibold">{store.stats.totalEarnings.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Uncleared Amount (Rs) :</span>
                        <span className="font-semibold">{store.stats.unclearedAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Average Rating :</span>
                        <span className="font-semibold">{store.stats.avgRating}</span>
                    </div>
                </div>
            </div>

            {/* Main Tabs */}
            <Tabs value={mainTab} onValueChange={(value: string) => setMainTab(value as typeof mainTab)} className="bg-white pt-0">
                <TabsList className="flex space-x-8 px-6 border-b-0 bg-white">
                    {[
                        { v: 'products', l: 'View Products' },
                        { v: 'orders', l: 'View Orders' },
                        { v: 'transactions', l: 'Transactions' },
                        { v: 'complaints', l: 'Complaints' },
                        { v: 'reviews', l: 'View Reviews' },
                    ].map(({ v, l }) => (
                        <TabsTrigger
                            key={v}
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            value={v as any}
                            className={`
                rounded-none px-0 pb-2 text-base font-medium text-gray-700
                data-[state=active]:text-orange-600
                data-[state=active]:border-b-2
                data-[state=active]:border-b-orange-500
                hover:text-orange-600
              `}
                        >
                            {l}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {/* PRODUCTS */}
                <TabsContent value="products" className="p-0 pt-6">
                    <div className="space-y-4">
                        {/* product subtabs */}
                        <Tabs value={prodTab} onValueChange={(value) => setProdTab(value as typeof prodTab)} className="bg-white">
                            <TabsList className="flex space-x-6 px-6 border-b-0 bg-white">
                                {['all', 'active', 'inactive', 'pending', 'violation', 'deleted'].map((t) => (
                                    <TabsTrigger
                                        key={t}
                                        value={t}
                                        className="
                      rounded-none px-4 pb-2 text-sm font-medium text-gray-600
                      data-[state=active]:text-orange-500
                      data-[state=active]:border-b-2
                      data-[state=active]:border-b-orange-500
                      hover:text-orange-500
                    "
                                    >
                                        {t.charAt(0).toUpperCase() + t.slice(1)}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>

                        {/* search & sort */}
                        <div className="flex items-center justify-between px-6">
                            <div className="flex-1 max-w-lg flex items-center border border-orange-400 rounded-full overflow-hidden">
                                <Input
                                    placeholder="Search Product by id or name"
                                    className="flex-1 border-none ring-0 focus:ring-0 px-4 py-2"
                                    value={prodSearch}
                                    onChange={(e) => setProdSearch(e.target.value)}
                                />
                                <Button variant="ghost" className="p-2 text-orange-600">
                                    <Search size={18} />
                                </Button>
                            </div>
                            <div className="ml-4">
                                <div className="flex items-center border border-orange-400 rounded-full px-3 py-2">
                                    <span className="text-sm text-gray-600">Sort By:</span>
                                    <select className="ml-2 bg-transparent focus:outline-none text-sm">
                                        <option>Latest</option><option>Oldest</option>
                                    </select>
                                    <Image src="/sort.png" alt="sort icon" width={16} height={16} className="ml-2" />
                                </div>
                            </div>
                        </div>

                        <Table columns={productColumns} data={displayedProducts} />
                    </div>
                </TabsContent>

                {/* ORDERS */}
                <TabsContent value="orders" className="p-0 pt-6">
                    <div className="space-y-4">
                        <Tabs value={orderTab} onValueChange={(value: string) => setOrderTab(value as typeof orderTab)} className="bg-white">
                            <TabsList className="flex space-x-6 px-6 border-b-0 bg-white">
                                {['all', 'new', 'confirmed', 'shipped', 'completed', 'cancelled'].map((t) => (
                                    <TabsTrigger
                                        key={t}
                                        value={t}
                                        className="
                      rounded-none px-4 pb-2 text-sm font-medium text-gray-600
                      data-[state=active]:text-orange-500
                      data-[state=active]:border-b-2
                      data-[state=active]:border-b-orange-500
                      hover:text-orange-500
                    "
                                    >
                                        {t.charAt(0).toUpperCase() + t.slice(1)}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>

                        <div className="flex items-center justify-between px-6">
                            <div className="flex-1 max-w-lg flex items-center border border-orange-400 rounded-full overflow-hidden">
                                <Input
                                    placeholder="Search Order by id or product"
                                    className="flex-1 border-none ring-0 focus:ring-0 px-4 py-2"
                                    value={orderSearch}
                                    onChange={(e) => setOrderSearch(e.target.value)}
                                />
                                <Button variant="ghost" className="p-2 text-orange-600">
                                    <Search size={18} />
                                </Button>
                            </div>
                            <div className="ml-4">
                                <div className="flex items-center border border-orange-400 rounded-full px-3 py-2">
                                    <span className="text-sm text-gray-600">Sort By:</span>
                                    <select className="ml-2 bg-transparent focus:outline-none text-sm">
                                        <option>Latest</option><option>Oldest</option>
                                    </select>
                                    <ChevronDown size={16} className="ml-1 text-gray-500" />
                                </div>
                            </div>
                        </div>

                        <Table columns={orderColumns} data={displayedOrders} />
                    </div>
                </TabsContent>

                {/* TRANSACTIONS */}
                <TabsContent value="transactions" className="p-0 pt-6">
                    <div className="space-y-4 px-6">
                        <Tabs value={txTab} onValueChange={(value: string) => setTxTab(value as typeof txTab)} className="bg-white">
                            <TabsList className="flex space-x-6 border-b-0 bg-white">
                                {['all', 'pending', 'completed'].map((t) => (
                                    <TabsTrigger
                                        key={t}
                                        value={t}
                                        className="
                      rounded-none px-4 pb-2 text-sm font-medium text-gray-600
                      data-[state=active]:text-orange-500
                      data-[state=active]:border-b-2
                      data-[state=active]:border-b-orange-500
                      hover:text-orange-500
                    "
                                    >
                                        {t.charAt(0).toUpperCase() + t.slice(1)}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>

                        <div className="flex justify-start">
                            <div className="flex items-center border border-orange-400 rounded-full px-3 py-2">
                                <span className="text-sm text-gray-600">Sort By:</span>
                                <select className="ml-2 bg-transparent focus:outline-none text-sm">
                                    <option>Latest</option><option>Oldest</option>
                                </select>
                                
                            </div>
                        </div>

                        <Table columns={txColumns} data={displayedTx} />
                    </div>
                </TabsContent>

                {/* COMPLAINTS */}
                <TabsContent value="complaints" className="p-0 pt-6">
                    <div className="space-y-4 px-6">
                        <Tabs value={compTab} onValueChange={(value: string) => setCompTab(value as typeof compTab)} className="bg-white">
                            <TabsList className="flex space-x-6 border-b-0 bg-white">
                                {['all', 'pending', 'refund', 'completed'].map((t) => (
                                    <TabsTrigger
                                        key={t}
                                        value={t}
                                        className="
                      rounded-none px-4 pb-2 text-sm font-medium text-gray-600
                      data-[state=active]:text-orange-500
                      data-[state=active]:border-b-2
                      data-[state=active]:border-b-orange-500
                      hover:text-orange-500
                    "
                                    >
                                        {t.charAt(0).toUpperCase() + t.slice(1)}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>

                        <Table columns={compColumns} data={displayedComp} />
                    </div>
                </TabsContent>

                {/* REVIEWS */}
                <TabsContent value="reviews" className="p-6">
                    <Table columns={reviewColumns} data={reviews} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
