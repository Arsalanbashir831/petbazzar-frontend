// app/super-admin/(dashboard)/buyers/page.tsx
'use client';

import React, { useState } from 'react';
import { buyerRows, BuyerRow } from '@/lib/mockStoreData';
import Table, { Column } from '@/components/Table';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import Image from 'next/image';

export default function BuyersPage() {
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState<'Latest' | 'Oldest'>('Latest');

    const filtered = buyerRows.filter(b =>
        b.id.includes(search) ||
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.email.toLowerCase().includes(search.toLowerCase())
    );

    const columns: Column<BuyerRow>[] = [
        { header: 'ID', accessor: 'id' },
        {
            header: 'Owner Name',
            accessor: 'name',
            Cell: (r) => (
                <Link
                    href={`/super-admin/buyers/${r.id.slice(1)}`}
                    className="text-orange-600 hover:underline max-w-xs truncate"
                >
                    {r.name}
                </Link>
            ),
        },
        { header: 'Email', accessor: 'email' },
        { header: 'Phone No', accessor: 'phone' },
        { header: 'Signup Date', accessor: 'signupDate' },
        { header: 'Total Orders', accessor: 'totalOrders' },
        {
            header: 'Total Spent',
            accessor: 'totalSpent',
            Cell: (r) => <>Rs {r.totalSpent.toLocaleString()}</>,
        },
        { header: 'Active Complaints', accessor: 'activeComplaints' },
    ];

    return (
        <div className="p-6 space-y-6">
            {/* Title */}
           
            
            <PageHeader title='Buyers' userName='Zawar Ahmed Farooqi' />

            {/* Search & Sort */}
            <div className="flex items-center gap-4">
                <div className="w-4/5 flex items-center border border-orange-400 rounded-full overflow-hidden">
                    <Search className="ml-3 text-orange-500" size={18} />
                    <Input
                        placeholder="Search by name, email or id"
                        className="flex-1 border-none ring-0 focus:ring-0"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
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
                    <Image src="/sort.png" alt="sort icon" width={16} height={16} className="ml-2" />
                </div>
            </div>

            {/* Table */}
            <Table columns={columns} data={filtered} />
        </div>
    );
}
