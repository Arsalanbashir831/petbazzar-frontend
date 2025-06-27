'use client';

import React, { useState } from 'react';
import { orders as allOrders, Order } from '@/lib/mockStoreData';
import Table, { Column } from '@/components/Table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, ChevronDown } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';

export default function OrdersPage() {
    const [subTab, setSubTab] = useState<
        'all' | 'new' | 'confirmed' | 'shipped' | 'completed' | 'cancelled'
    >('all');
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState<'Latest' | 'Oldest'>('Latest');
    const [date, setDate] = useState('');

    // filter by status
    const byStatus = allOrders.filter((o) => {
        if (subTab === 'new') return o.status === 'Pending';
        if (subTab === 'confirmed') return o.status === 'Confirmed';
        if (subTab === 'shipped') return o.status === 'Shipped';
        if (subTab === 'completed') return o.status === 'Completed';
        if (subTab === 'cancelled') return o.status === 'Cancelled';
        return true;
    });

    // filter by search & date
    const filtered = byStatus
        .filter(
            (o) =>
                search === '' ||
                o.id.includes(search) ||
                o.product.toLowerCase().includes(search.toLowerCase())
        )
        .filter((o) => (date === '' ? true : o.date === date));

    // simple sort by date string
    filtered.sort((a, b) => {
        if (sort === 'Latest') return b.date.localeCompare(a.date);
        return a.date.localeCompare(b.date);
    });

    // table columns
    const columns: Column<Order>[] = [
        { header: 'Order', accessor: 'id' },
        { header: 'Product', accessor: 'product' },
        { header: 'Category', accessor: 'category' },
        { header: 'Quantity', accessor: 'quantity' },
        { header: 'Store', accessor: 'store' },
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
                    Confirmed: 'bg-blue-100 text-blue-800',
                    Shipped: 'bg-orange-100 text-orange-800',
                    Completed: 'bg-green-100 text-green-800',
                    Cancelled: 'bg-red-100 text-red-800',
                };
                const cls = map[r.status] || 'bg-gray-100 text-gray-800';
                return (
                    <span className={`px-2 py-1 rounded-md font-medium ${cls}`}>
                        {r.status}
                    </span>
                );
            },
        },
    ];

    return (
        <div className="p-6 space-y-6">
           
            <PageHeader title='Orders' userName='Zawar Ahmed Farooqi' />

            {/* Tabs */}
            <Tabs defaultValue="all" className="space-y-4 bg-white">
                <TabsList className="bg-white border-b-0 w-2/3">
                    {['all', 'new', 'confirmed', 'shipped', 'completed', 'cancelled'].map((v) => (
                        <TabsTrigger
                            key={v}
                            value={v}
                            className={`
                rounded-none px-4 pb-2 text-sm font-medium text-gray-600
                data-[state=active]:text-orange-500
                data-[state=active]:border-b-2
                data-[state=active]:border-b-orange-500
                hover:text-orange-500
              `}
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            onClick={() => setSubTab(v as any)}
                        >
                            {v.charAt(0).toUpperCase() + v.slice(1)}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value={subTab}>
                    {/* Search / Sort / Date */}
                    <div className="flex w-full items-center gap-4 px-4 mb-4">
                        {/* Search */}
                        <div className="w-3/5 flex items-center border border-orange-400 rounded-full overflow-hidden">
                            <Search className="ml-3 text-orange-500" size={18} />
                            <Input
                                placeholder="Search Product by id or name"
                                className="flex-1 border-none ring-0"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        {/* Sort */}
                        <div className="w-1/5 flex items-center border border-orange-400 rounded-full px-3 py-2">
                            <span className="text-sm text-gray-600">Sort By:</span>
                            <select
                                className="ml-2 text-sm bg-transparent focus:outline-none"
                                value={sort}
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                onChange={(e) => setSort(e.target.value as any)}
                            >
                                <option>Latest</option>
                                <option>Oldest</option>
                            </select>
                            <ChevronDown className="ml-1 text-gray-500" size={16} />
                        </div>
                        {/* Date filter */}
                        <div className="w-1/5 border border-orange-400 rounded-full overflow-hidden">
                            <Input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="h-10 w-36 border-none"
                            />
                            
                        </div>
                    </div>

                    {/* Table */}
                    <Table columns={columns} data={filtered} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
