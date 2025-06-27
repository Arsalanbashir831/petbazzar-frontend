// app/super-admin/(dashboard)/complaints/[id]/page.tsx
'use client';

import React, { useState, use } from 'react';
import { notFound } from 'next/navigation';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { X, ChevronDown } from 'lucide-react';
import { adminComplaints } from '@/lib/mockStoreData';
import { PageHeader } from '@/components/PageHeader';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function ComplaintDetailPage({ params }: PageProps) {
    // dialog state
    const [actionOpen, setActionOpen] = useState(false);
    const [refundOpen, setRefundOpen] = useState(false);

    // 1) unwrap params promise
    const { id } = use(params);
    // 2) find the complaint
    const complaint = adminComplaints.find((c) => c.id === id);
    if (!complaint) return notFound();

    // badge colors map
    const statusMap = {
        Pending: { bg: 'bg-yellow-50', text: 'text-yellow-600' },
        Refund: { bg: 'bg-blue-50', text: 'text-blue-500' },
        Completed: { bg: 'bg-green-50', text: 'text-green-500' },
    } as const;

    const { bg, text } = statusMap[complaint.status];

    return (
        <div className="p-6 space-y-6">
            {/* ─── Header + Actions ───────────────────────────────────── */}
            <PageHeader title='Complaint Details' userName='Zawar Ahmed Farooqi' />


            <div className="flex justify-end gap-2">
                <Button
                    className="bg-orange-500"
                    onClick={() => {
                        /* navigate to order detail page */
                        window.location.href = `/super-admin/orders/${complaint.orderId}`;
                    }}
                >
                    View Order Details
                </Button>
                <DropdownMenu open={actionOpen} onOpenChange={setActionOpen}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex w-40 items-center gap-1">
                            Action <ChevronDown size={16} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => setRefundOpen(true)}>
                            Refund
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => alert('Replacement…')}>
                            Replacement
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>


            {/* ─── Complaint Info ─────────────────────────────────────── */}
            <div className="bg-card p-4 rounded-lg space-y-3 text-sm">
                <h2 className="font-semibold">Complaint :</h2>
                <div className='flex justify-center w-full'>
                    <div className="flex flex-col w-1/2  gap-x-8 gap-y-2">
                        <div className="flex justify-between">
                            <span>Complaint ID :</span>
                            <span className="font-semibold">CMP-{complaint.id}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Date Filed :</span>
                            <span className="font-semibold">{complaint.dateFiled}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Filed By :</span>
                            <span className="font-semibold">{complaint.filedBy}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Against :</span>
                            <span className="font-semibold">{complaint.against}</span>
                        </div>
                        <div className="flex justify-between sm:col-span-2">
                            <span>Status :</span>
                            <Badge className={`${bg} ${text} rounded-full px-2 py-1`}>
                                {complaint.status}
                            </Badge>
                        </div>
                    </div>
                </div>

            </div>

            {/* ─── Order Info ────────────────────────────────────────── */}
            <div className="bg-card p-4 rounded-lg space-y-3 text-sm">
                <h2 className="font-semibold">Order Details :</h2>

                <div className='flex justify-center w-full'>
                    <div className="flex flex-col w-1/2 gap-x-8 gap-y-2">
                        <div className="flex justify-between">
                            <span>Order ID :</span>
                            <span className="font-semibold">{complaint.orderId}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Order Date :</span>
                            <span className="font-semibold">{complaint.orderDate}</span>
                        </div>
                        <div className="flex justify-between sm:col-span-2">
                            <span>Product Name :</span>
                            <span className="font-semibold">{complaint.product}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Price :</span>
                            <span className="font-semibold">Rs {complaint.price.toLocaleString()}</span>
                        </div>
                    </div>

                </div>


            </div>

            {/* ─── Description + Images ───────────────────────────────── */}
            <div className="bg-card p-4 rounded-lg space-y-3">
                <h3 className="font-semibold">Complaint Description :</h3>
                <div className='flex justify-center w-full'>
                    <div className='flex w-2/3  flex-col items-center'>
                        <Textarea
                            readOnly
                            value={complaint.description}
                            className="bg-white h-48 w-full"
                        />
                        <div className=" w-full flex justify-start flex-col space-x-2 mt-2">
                            <h3 className="font-semibold text-gray-500">Attached Images :</h3>
                            <div className='flex flex-wrap gap-2'>
                                {complaint.images.map((src, i) => (
                                    <Image
                                        key={i}
                                        src={src}
                                        alt={`Attachment ${i + 1}`}
                                        width={64}
                                        height={64}
                                        className="rounded-md border bg-muted"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            {/* ─── Reply Box ─────────────────────────────────────────── */}
            <div className="bg-card p-4 rounded-lg space-y-2">
                <h3 className="font-semibold">Reply :</h3>
                <div className='flex flex-col justify-items-center justify-center w-full '>
                    <div className='  flex flex-col justify-end items-center p-4 space-y-2'>
                        <Textarea className='w-2/3 h-40' placeholder="Enter your message to the buyer…" />
                        <div className="flex w-full justify-end">
                            <Button className='bg-orange-500 w-40'>Send</Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── Refund Dialog ─────────────────────────────────────── */}
            <DropdownMenu open={refundOpen} onOpenChange={setRefundOpen}>
                <DropdownMenuTrigger asChild>
                    {/* dummy trigger, we open via state */}
                    <div />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="!p-6 max-w-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Refund to</h2>
                        <button onClick={() => setRefundOpen(false)}><X /></button>
                    </div>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span>Order ID :</span>
                            <span className="font-semibold">{complaint.orderId}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Order Date :</span>
                            <span className="font-semibold">{complaint.orderDate}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Product Name :</span>
                            <span className="font-semibold">{complaint.product}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Store Name :</span>
                            <span className="font-semibold">{complaint.store}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Product Price :</span>
                            <span className="font-semibold">Rs {complaint.price.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Store Balance :</span>
                            <span className="font-semibold">Rs {complaint.storeBalance.toLocaleString()}</span>
                        </div>
                    </div>
                    <p className="text-sm text-center mt-4">
                        Amount will be transferred from your store’s e-wallet to the buyer
                    </p>
                    <div className="mt-6">
                        <Button className="w-full" onClick={() => setRefundOpen(false)}>
                            Confirm
                        </Button>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
