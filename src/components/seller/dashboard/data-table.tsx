'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Table, { Column } from '@/components/Table'

interface DataTableProps<T> {
    title: string
    data: T[]
    columns: Column<T>[]
    viewAllLink?: {
        href: string
        text: string
    }
    className?: string
    emptyMessage?: string
    loading?: boolean
}

export default function DataTable<T>({ 
    title, 
    data, 
    columns, 
    viewAllLink,
    className,
    emptyMessage = "No data available",
    loading = false
}: DataTableProps<T>) {
    return (
        <div className={cn("mt-6", className)}>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">{title}</h2>
                {viewAllLink && (
                    <Link
                        href={viewAllLink.href}
                        className="text-sm border rounded-lg py-2 font-semibold px-3 text-muted-foreground hover:text-foreground flex items-center transition-colors"
                    >
                        {viewAllLink.text}
                    </Link>
                )}
            </div>
            
            {loading ? (
                <div className="bg-card rounded-lg p-8 text-center">
                    <div className="animate-pulse">
                        <div className="h-4 bg-muted rounded w-1/4 mx-auto mb-2"></div>
                        <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
                    </div>
                </div>
            ) : data.length === 0 ? (
                <div className="bg-card rounded-lg p-8 text-center">
                    <p className="text-muted-foreground">{emptyMessage}</p>
                </div>
            ) : (
                <Table columns={columns} data={data} />
            )}
        </div>
    )
} 