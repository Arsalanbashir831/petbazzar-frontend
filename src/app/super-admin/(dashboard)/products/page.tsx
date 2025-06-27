'use client';

import React from 'react';
import Image from 'next/image';
import {
    pendingProducts,
    activeProducts,
    suspendedProducts,
    ProductRow
} from '@/lib/mockStoreData';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Table, { Column } from '@/components/Table';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';

export default function ProductsPage() {
    // columns definition
    const columns: Column<ProductRow>[] = [
        { header: 'ID', accessor: 'id' },
        {
            header: 'Details',
            accessor: '',
            Cell: (row) => (
                <div className="flex items-center gap-3">
                    <Image
                        src="/seller/dashboard/petCard.png"
                        alt={row.name}
                        width={48}
                        height={48}
                        className="rounded-md"
                    />
                    <Link
                        href={`/super-admin/products/${row.id}`}
                        className="max-w-xs truncate"
                    >
                        {row.name}
                    </Link>
                </div>
            ),
        },
        { header: 'Store Name', accessor: 'storeName' },
        { header: 'Category', accessor: 'category' },
        {
            header: 'Price',
            accessor: 'price',
            Cell: (r) => <>Rs {r.price.toLocaleString()}</>,
        },
        { header: 'Submission Date', accessor: 'submissionDate' },
        {
            header: 'Status',
            accessor: 'status',
            Cell: (r) => {
                const map: Record<string, string> = {
                    Pending: 'bg-yellow-100 text-yellow-800',
                    Active: 'bg-green-100 text-green-800',
                    Suspended: 'bg-red-100 text-red-800',
                };
                const classes = map[r.status] || 'bg-gray-100 text-gray-800';
                return (
                    <span className={`px-3 py-1 rounded-md font-medium ${classes}`}>
                        {r.status}
                    </span>
                );
            },
        },
    ];

    return (
        <div className="p-6 space-y-6">
            {/* Page header */}
           
            
            <PageHeader title='Products' userName='Zawar Ahmed Farooqi' />

            {/* Tabs */}
            <Tabs defaultValue="pending" className="space-y-4">
               

                <TabsList className="inline-flex bg-gray-100 rounded-full p-1">
                                    {[
                                        { value: 'active', label: 'Active' },
                                        { value: 'pending', label: 'Pending Approval' },
                                        { value: 'suspended', label: 'Suspended' },
                                    ].map(tab => (
                                        <TabsTrigger
                                            key={tab.value}
                                            value={tab.value}
                                            className={`
                                            px-4 py-2 text-base font-medium  rounded-none shadow-none 
                                            text-gray-600 hover:text-gray-800
                                            bg-gray-100
                                            data-[state=active]:text-orange-600
                                            data-[state=active]:border-b-2
                                            data-[state=active]:border-b-orange-500
                                            data-[state=active]:bg-gray-100
                                            `}
                                        >
                                            {tab.label}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>

                <TabsContent value="pending">
                    <Table columns={columns} data={pendingProducts} />
                </TabsContent>

                <TabsContent value="active">
                    <Table columns={columns} data={activeProducts} />
                </TabsContent>

                <TabsContent value="suspended">
                    <Table columns={columns} data={suspendedProducts} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
