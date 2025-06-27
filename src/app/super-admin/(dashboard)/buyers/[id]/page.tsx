// app/super-admin/(dashboard)/buyers/[id]/page.tsx
'use client';

import React from 'react';
import { use } from 'react';
import { notFound } from 'next/navigation';
import { buyerDetails, BuyerDetail } from '@/lib/mockStoreData';
import Table, { Column } from '@/components/Table';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/PageHeader';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function BuyerDetailPage(props: PageProps) {
    const { id } = use(props.params);
    const detail: BuyerDetail = buyerDetails[`#${id}`];
    if (!detail) return notFound();

    // define order‐history cols
    const orderCols: Column<BuyerDetail['orders'][number]>[] = [
        { header: 'Order', accessor: 'id' },
        { header: 'Product', accessor: 'product' },
        { header: 'Category', accessor: 'category' },
        { header: 'Quantity', accessor: 'quantity' },
        { header: 'Store Name', accessor: 'storeName' },
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
                    Delivered: 'bg-green-100 text-green-800',
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

    // define complaints cols
    const complaintCols: Column<BuyerDetail['complaints'][number]>[] = [
        { header: 'Complaint ID', accessor: 'id' },
        { header: 'Date', accessor: 'date' },
        { header: 'Product', accessor: 'product' },
        { header: 'Store', accessor: 'store' },
        { header: 'Order ID', accessor: 'orderId' },
        { header: 'Issue Summary', accessor: 'issue' },
        {
            header: 'Status',
            accessor: 'status',
            Cell: (r) => {
                const map: Record<string, string> = {
                    Pending: 'bg-yellow-100 text-yellow-800',
                    Refund: 'bg-red-100 text-red-800',
                    Completed: 'bg-green-100 text-green-800',
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
            <PageHeader title='Buyers' userName={detail.name} />
            {/* Header */}
            <div className="bg-card p-4 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Personal Information</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="space-y-1">
                        <p><span className="font-semibold">Full Name :</span> {detail.name}</p>
                        <p><span className="font-semibold">Phone :</span>     {detail.phone}</p>
                        <p><span className="font-semibold">Email :</span>     {detail.email}</p>
                    </div>
                    <div className="space-y-1 text-sm">
                        <p><span className="font-semibold">Account Created on :</span> {detail.signupDate}</p>
                        <p><span className="font-semibold">Status :</span>
                            <Badge variant={detail.status === 'Active' ? 'default' : 'destructive'}>
                                {detail.status}
                            </Badge>
                        </p>
                    </div>
                </div>
            </div>

            {/* Order History */}
            <div className="space-y-2">
                <h2 className="text-lg font-medium">Order History</h2>
                <Table columns={orderCols} data={detail.orders} />
            </div>

            {/* Complaints */}
            <div className="space-y-2">
                <h2 className="text-lg font-medium">Complaints</h2>
                <Table columns={complaintCols} data={detail.complaints} />
            </div>
        </div>
    );
}
