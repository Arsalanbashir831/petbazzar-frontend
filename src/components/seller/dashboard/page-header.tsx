'use client'

import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
    title: string
    subtitle?: string
    icon?: {
        src: string
        alt: string
        width?: number
        height?: number
    }
    actions?: React.ReactNode
    className?: string
}

export default function PageHeader({ 
    title, 
    subtitle, 
    icon, 
    actions, 
    className 
}: PageHeaderProps) {
    return (
        <div className={cn("flex items-center justify-between mb-6", className)}>
            <div className="flex items-center space-x-3">
                {icon && (
                    <Image
                        src={icon.src}
                        alt={icon.alt}
                        width={icon.width || 32}
                        height={icon.height || 32}
                        className="rounded-full"
                    />
                )}
                <div>
                    <h1 className="text-2xl font-semibold">{title}</h1>
                    {subtitle && (
                        <p className="text-sm text-muted-foreground">{subtitle}</p>
                    )}
                </div>
            </div>
            {actions && (
                <div className="flex items-center space-x-2">
                    {actions}
                </div>
            )}
        </div>
    )
} 