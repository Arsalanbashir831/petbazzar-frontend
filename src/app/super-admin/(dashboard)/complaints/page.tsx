'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Table, { Column } from '@/components/Table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, ChevronDown } from 'lucide-react';
import {
    adminComplaints,
    AdminComplaint,
} from '@/lib/mockStoreData';
import { PageHeader } from '@/components/PageHeader';

export default function ComplaintsPage() {
    const [tab, setTab] = useState<'all' | 'pending' | 'refund' | 'completed'>('pending');
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState<'Latest' | 'Oldest'>('Latest');

    // 1) filter by tab
    const byTab = adminComplaints.filter((c) => {
        if (tab === 'all') return true;
        return c.status.toLowerCase() === tab;
    });

    // 2) filter by search (complaint id or product)
    const filtered = byTab.filter(
        (c) =>
            c.id.toLowerCase().includes(search.toLowerCase()) ||
            c.product.toLowerCase().includes(search.toLowerCase())
    );

    // 3) optionally sort (omitted here, but you could sort by date or id)

    // — table columns —
    const columns: Column<AdminComplaint>[] = [
        {
            header: 'Complaint ID',
            accessor: 'id',
            Cell: (row) => (
                <Link
                    href={`/super-admin/complaints/${row.id}`}
                    className="font-medium text-orange-600 hover:underline"
                >
                    {row.id}
                </Link>
            ),
        },
        { header: 'Customer ID', accessor: 'customerId' },
        { header: 'Date', accessor: 'date' },
        { header: 'Product', accessor: 'product' },
        { header: 'Store', accessor: 'store' },
        { header: 'Order ID', accessor: 'orderId' },
        { header: 'Issue Summary', accessor: 'issue' },
        {
            header: 'Status',
            accessor: 'status',
            Cell: (row) => {
                const map: Record<AdminComplaint['status'], { bg: string; text: string }> = {
                    Pending: { bg: 'bg-yellow-50', text: 'text-yellow-600' },
                    Refund: { bg: 'bg-blue-50', text: 'text-blue-500' },
                    Completed: { bg: 'bg-green-50', text: 'text-green-500' },
                };
                const { bg, text } = map[row.status];
                return (
                    <Badge className={`${bg} ${text} rounded-full w-20 px-2 py-1 text-sm font-medium`}>
                        {row.status}
                    </Badge>
                );
            },
        },
    ];

    return (
        <div className="p-6 space-y-6">
            {/* ─── Page Header ───────────────────────────────────────── */}
           
            
            <PageHeader title='Complaints' userName='Zawar Ahmed Farooqi' />
            

            {/* ─── Tabs + Controls ────────────────────────────────────── */}
            <Tabs
                value={tab}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onValueChange={(v) => setTab(v as any)}
                className="space-y-4 bg-white"
            >
               
                    <TabsList className="flex space-x-6 px-6 border-b-0 bg-white">
                        {[
                            { value: 'all', label: 'All' },
                            { value: 'pending', label: 'Pending' },
                            { value: 'refund', label: 'Refund' },
                            { value: 'completed', label: 'Completed' },
                        ].map((tab) => (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                className={`
                                rounded-none px-4 pb-2 text-sm font-medium
                                text-gray-600 hover:text-gray-800
                                data-[state=active]:text-orange-600
                                data-[state=active]:border-b-2
                                data-[state=active]:border-b-orange-500
                                bg-white
                                `}
                            >
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                {(['all', 'pending', 'refund', 'completed'] as const).map((value) => (
                    <TabsContent key={value} value={value} className="p-0 pt-6">
                        <div className="flex items-center justify-between px-6 mb-4">
                            {/* Search */}
                            <div className="flex-1 max-w-lg flex items-center border border-orange-400 rounded-full overflow-hidden">
                                <Input
                                    placeholder="Search by complaint ID or product"
                                    className="flex-1 border-none ring-0 focus:ring-0 px-4 py-2"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Button variant="ghost" className="p-2 text-orange-600">
                                    <Search size={18} />
                                </Button>
                            </div>

                            {/* Sort */}
                            <div className="flex items-center border border-orange-400 rounded-full px-3 py-2 ml-6">
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
                        </div>

                        {/* ─── Table ─────────────────────────────────────────────── */}
                        <Table columns={columns} data={filtered as AdminComplaint[]} />
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}
