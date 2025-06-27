// app/super-admin/(dashboard)/transactions/page.tsx
'use client';

import React, { useState } from 'react';
import Table, { Column } from '@/components/Table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, ChevronDown, Calendar } from 'lucide-react';
import {
    adminTransactions,
    AdminTransaction,
} from '@/lib/mockStoreData';
import { cn } from '@/lib/utils';
import { PageHeader } from '@/components/PageHeader';

export default function TransactionsPage() {
    const [tab, setTab] = useState<'all' | 'pending' | 'completed'>('all');
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState<'Latest' | 'Oldest'>('Latest');
    const [dateFilter, setDateFilter] = useState('2024-04-08');

    // 1) filter by tab
    const byTab = adminTransactions.filter((tx) => {
        if (tab === 'all') return true;
        if (tab === 'pending') return tx.status === 'Pending';
        if (tab === 'completed') return tx.status === 'Completed';
        return true;
    });

    // 2) filter by search
    const filtered = byTab.filter((tx) =>
        tx.id.toLowerCase().includes(search.toLowerCase()),
    );

    // — columns —
    const columns: Column<AdminTransaction>[] = [
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
            Cell: (row) => {
                // map each status to its exact bg/text color
                const colorMap: Record<
                    AdminTransaction['status'],
                    { bg: string; text: string }
                > = {
                    Pending: { bg: 'bg-yellow-50', text: 'text-yellow-600' },
                    Cancelled: { bg: 'bg-red-50', text: 'text-red-500' },
                    Confirmed: { bg: 'bg-blue-50', text: 'text-blue-500' },
                    Delivered: { bg: 'bg-green-50', text: 'text-green-500' },
                    Shipped: { bg: 'bg-orange-50', text: 'text-orange-500' },
                    Completed: { bg: 'bg-green-50', text: 'text-green-500' },
                };

                const { bg, text } = colorMap[row.status];
                return (
                    <Badge
                        className={cn(
                            bg,
                            text,
                            'rounded-full w-20 px-2 py-1 text-sm font-medium'
                        )}
                    >
                        {row.status}
                    </Badge>
                );
            },
        },
        
    ];

    return (
        <div className="p-6 space-y-6">
            {/* Page Header */}
            
            
            <PageHeader title='Transactions' userName='Zawar Ahmed Farooqi' />

            {/* Tabs + Controls */}
            <Tabs
                value={tab}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onValueChange={(v) => setTab(v as any)}
                className="space-y-4 bg-white"
            >
                <TabsList className="flex space-x-4 px-2 border-b-0 bg-transparent w-1/2">
                    <TabsTrigger
                        value="all"
                        className={`
      rounded-none px-4 pb-2 text-sm font-medium text-gray-600 hover:text-gray-800
      data-[state=active]:text-orange-600
      data-[state=active]:border-b-2
      data-[state=active]:border-b-orange-500
     
    `}
                    >
                        All
                    </TabsTrigger>
                    <TabsTrigger
                        value="pending"
                        className={`
      rounded-none px-4 pb-2 text-sm font-medium text-gray-600 hover:text-gray-800
      data-[state=active]:text-orange-600
      data-[state=active]:border-b-2
      data-[state=active]:border-b-orange-500
     
    `}
                    >
                        Pending
                    </TabsTrigger>
                    <TabsTrigger
                        value="completed"
                        className={`
      rounded-none px-4 pb-2 text-sm font-medium text-gray-600 hover:text-gray-800
      data-[state=active]:text-orange-600
      data-[state=active]:border-b-2
      data-[state=active]:border-b-orange-500
     
    `}
                    >
                        Completed
                    </TabsTrigger>
                </TabsList>

                {['all', 'pending', 'completed'].map((value) => (
                    <TabsContent key={value} value={value} className="p-0 pt-6">
                        <div className="flex items-center justify-between px-6 mb-4">
                            {/* Search */}
                            <div className="flex-1 max-w-lg flex items-center border border-orange-400 rounded-full overflow-hidden">
                                <Input
                                    placeholder="Search transactions by id"
                                    className="flex-1 border-none ring-0 focus:ring-0 px-4 py-2"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Button variant="ghost" className="p-2 text-orange-600">
                                    <Search size={18} />
                                </Button>
                            </div>

                            {/* Sort & Date */}
                            <div className="flex items-center space-x-4 ml-6">
                                {/* Sort */}
                                <div className="flex items-center border border-orange-400 rounded-full px-3 py-2">
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
                                    <ChevronDown size={16} className="ml-1 text-gray-500" />
                                </div>

                                {/* Date */}
                                <div className="flex items-center border border-orange-400 rounded-full px-3 py-2">
                                    <Calendar size={16} className="text-gray-500 mr-2" />
                                    <input
                                        type="date"
                                        value={dateFilter}
                                        onChange={(e) => setDateFilter(e.target.value)}
                                        className="text-sm bg-transparent focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <Table columns={columns} data={filtered as AdminTransaction[]} />
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}
