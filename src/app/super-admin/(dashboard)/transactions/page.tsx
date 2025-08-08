// app/super-admin/(dashboard)/transactions/page.tsx
'use client';

import React, { useState } from 'react';
import Table, { Column } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, ChevronDown, Calendar } from 'lucide-react';
import {
    adminTransactions,
    AdminTransaction,
} from '@/lib/mockStoreData';
import { cn } from '@/lib/utils';
import PageHeader from '@/components/common/page-header';
import { ORDER_STATUS_COLORS } from '@/constants/status';
import FilterBar from '@/components/common/filter-bar';

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
            Cell: (row) => (
                <Badge
                    className={cn(
                        ORDER_STATUS_COLORS[row.status] || 'bg-gray-100 text-gray-800',
                        'rounded-full w-24 px-2 py-1 text-sm font-medium text-center'
                    )}
                >
                    {row.status}
                </Badge>
            ),
        },
        
    ];

    return (
        <div className="p-6 space-y-6">
            {/* Page Header */}
            
            
            <PageHeader title='Transactions' subtitle='Zawar Ahmed Farooqi' />

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
                        <FilterBar
                            className="px-6 mb-4"
                            search={{ value: search, placeholder: 'Search transactions by id', onChange: setSearch }}
                            sort={{ value: sort, options: ['Latest', 'Oldest'], onChange: (v) => setSort(v as 'Latest' | 'Oldest'), label: 'Sort By:' }}
                            date={{ value: dateFilter, onChange: setDateFilter }}
                            right={<Button variant="ghost" className="p-2 text-orange-600"><Search size={18} /></Button>}
                        />

                        {/* Table */}
                        <Table columns={columns} data={filtered as AdminTransaction[]} />
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}
