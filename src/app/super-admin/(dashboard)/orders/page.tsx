'use client';

import React, { useState } from 'react';
import { orders as allOrders, Order } from '@/lib/mockStoreData';
import Table, { Column } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import FilterBar from '@/components/common/filter-bar';
import PageHeader from '@/components/common/page-header';
import { ORDER_STATUS_COLORS } from '@/constants/status';

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
            Cell: (r) => (
                <span className={`px-2 py-1 rounded-md font-medium ${ORDER_STATUS_COLORS[r.status] || 'bg-gray-100 text-gray-800'}`}>
                    {r.status}
                </span>
            ),
        },
    ];

    return (
        <div className="p-6 space-y-6">
           
            <PageHeader title='Orders' subtitle='Zawar Ahmed Farooqi' />

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
                    <FilterBar
                        className="px-4 mb-4"
                        search={{ value: search, placeholder: 'Search Product by id or name', onChange: setSearch }}
                        sort={{ value: sort, options: ['Latest', 'Oldest'], onChange: (v) => setSort(v as 'Latest' | 'Oldest'), label: 'Sort By:' }}
                        date={{ value: date, onChange: setDate }}
                    />

                    {/* Table */}
                    <Table columns={columns} data={filtered} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
