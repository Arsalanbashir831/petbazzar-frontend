// app/super-admin/(dashboard)/products/[id]/page.tsx
'use client';

import React, { useState, use } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { productDetails, ProductDetail } from '@/lib/mockStoreData';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { PageHeader } from '@/components/PageHeader';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function ProductDetailPage(props: PageProps) {
    // 🚀 unwrap params promise
    const { id } = use(props.params);
    const detail: ProductDetail = productDetails[id];

    // dialog state
    const [approveOpen, setApproveOpen] = useState(false);
    const [suspendOpen, setSuspendOpen] = useState(false);
    const [reason, setReason] = useState('');

    if (!detail) {
        return notFound();
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header + Actions */}
          
            
            <PageHeader title='Product Details' userName={detail.storeName} />
            
            <div className="w-full flex justify-end gap-2">
                <div className='w-1/2 space-x-2'>
                    {/* Solid orange “Approve” */}
                    <Button
                        onClick={() => setApproveOpen(true)}
                        className="flex-1 w-58 h-10 rounded-md bg-orange-500 hover:bg-orange-600 text-white"
                    >
                        Approve
                    </Button>

                    {/* Orange-outline “Suspend” */}
                    <Button
                        className="flex-1 w-58 h-10 rounded-md border border-orange-500 text-orange-500 hover:bg-orange-50"
                        variant="outline"  // you can omit variant if outline is your default outline style
                        onClick={() => setSuspendOpen(true)}
                    >
                        Suspend
                    </Button>
                </div>
                
            </div>

            {/* Main Content */}
            <div className="bg-card p-6 rounded-lg grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Image Gallery */}
                <div className="flex gap-4">
                    <div className="flex flex-col gap-2">
                        {detail.images.map((src: string | StaticImport, i: React.Key | null | undefined) => (
                            <Image
                                key={i}
                                src={src}
                                alt={detail.name}
                                width={64}
                                height={64}
                                className="rounded-md border"
                            />
                        ))}
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        <Image
                            src={detail.images[0]}
                            alt={detail.name}
                            width={300}
                            height={300}
                            className="rounded-md"
                        />
                    </div>
                </div>

                {/* Key Info */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">{detail.name}</h2>
                    <p className="text-sm text-muted-foreground">{detail.brand}</p>

                    {/* Sizes & Stock */}
                    <div className="flex items-center gap-2">
                        {detail.sizes.map((s) => (
                            <button
                                key={s.label}
                                className={`
                  px-3 py-1 border rounded-md
                  ${!s.inStock ? 'opacity-50 cursor-not-allowed' : ''}
                  ${detail.selectedSize === s.label ? 'bg-orange-500 text-white' : ''}
                `}
                            >
                                {s.label}
                            </button>
                        ))}
                        <span className="ml-auto text-green-600 font-medium">
                            {detail.sizes.find((s) => s.label === detail.selectedSize)?.inStock
                                ? 'In Stock'
                                : 'Out of Stock'}
                        </span>
                    </div>

                    {/* Price */}
                    <p className="text-2xl font-bold text-orange-600">
                        PKR {detail.price.toLocaleString()}
                    </p>

                   
                </div>
                <div className="space-y-4 flex flex-col">
                    {/* Brand & Shop */}
                    <div className="space-y-1">
                        <p className="font-semibold">Brand</p>
                        <p>{detail.brand}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="font-semibold">Shop Details</p>
                        <p className="text-sm whitespace-pre-wrap">{detail.shopDetails}</p>
                    </div>
                </div>


                {/* Full Description */}
                <div className="lg:col-span-2 bg-white p-4 rounded-md border">
                    <h3 className="text-lg font-semibold mb-2">Product Details</h3>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {detail.description}
                    </p>
                </div>
            </div>

            {/* Approve Dialog */}
            <Dialog open={approveOpen} onOpenChange={setApproveOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <div className="flex justify-between items-center">
                            <DialogTitle>Product Approved</DialogTitle>
                            <button onClick={() => setApproveOpen(false)}>
                                
                            </button>
                        </div>
                        <DialogDescription className="mt-4 space-y-2">
                            <div className="flex justify-between">
                                <span>Product ID:</span>
                                <span>PROD{detail.id}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Upload Date:</span>
                                <span>{detail.submissionDate}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Product Name:</span>
                                <span>{detail.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Store Name:</span>
                                <span>{detail.storeName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Product Price:</span>
                                <span>Rs {detail.price.toLocaleString()}</span>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button className='bg-orange-500' onClick={() => setApproveOpen(false)}>OK</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Suspend Dialog */}
            <Dialog open={suspendOpen} onOpenChange={setSuspendOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <div className="flex justify-between items-center">
                            <DialogTitle>Suspend Product</DialogTitle>
                           
                        </div>
                        <DialogDescription className="mt-4 space-y-2">
                            <div className="flex justify-between">
                                <span>Product ID:</span>
                                <span>PROD{detail.id}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Upload Date:</span>
                                <span>{detail.submissionDate}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Product Name:</span>
                                <span>{detail.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Store Name:</span>
                                <span>{detail.storeName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Product Price:</span>
                                <span>Rs {detail.price.toLocaleString()}</span>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <form>
                        <Textarea
                            placeholder="Things to improve or reason for suspend"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="mt-4"
                        />
                        <DialogFooter>
                            <Button type="submit" className="w-40 bg-orange-500  mt-8">
                                Suspend
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
