'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface ChartCardProps {
    title: string
    children: React.ReactNode
    className?: string
    headerActions?: React.ReactNode
    footer?: React.ReactNode
}

export default function ChartCard({ 
    title, 
    children, 
    className, 
    headerActions,
    footer 
}: ChartCardProps) {
    return (
        <div className={cn(
            "bg-card rounded-lg shadow-sm p-6",
            className
        )}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-medium">{title}</h3>
                {headerActions && (
                    <div className="flex items-center space-x-2">
                        {headerActions}
                    </div>
                )}
            </div>
            
            <div className="flex-1">
                {children}
            </div>
            
            {footer && (
                <div className="mt-4 pt-4 border-t">
                    {footer}
                </div>
            )}
        </div>
    )
} 