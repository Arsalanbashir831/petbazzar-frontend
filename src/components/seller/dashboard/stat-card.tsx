'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface StatCardProps {
    title: string
    value: string | number
    icon: string
    iconAlt?: string
    link?: {
        href: string
        text: string
    }
    className?: string
    trend?: {
        value: number
        isPositive: boolean
    }
}

export default function StatCard({
    title,
    value,
    icon,
    iconAlt = "",
    link,
    className,
    trend
}: StatCardProps) {
    return (
        <div className={cn(
            "bg-card flex flex-col justify-center rounded-lg shadow-sm p-4 space-y-2",
            className
        )}>
            <div className='flex gap-4 items-center justify-start mb-2'>
                <div className='bg-[#FA6910] rounded-lg p-4'>
                    <div className='relative h-8 w-8'>
                        <Image
                            src={icon}
                            alt={iconAlt}
                            fill
                        />
                    </div>
                </div>
                <div className='flex flex-col items-start justify-center'>
                    <p className="text-3xl font-bold">{value}</p>
                    <p className="text-sm text-muted-foreground">{title}</p>
                    {trend && (
                        <div className={cn(
                            "flex items-center text-xs font-medium",
                            trend.isPositive ? "text-green-600" : "text-red-600"
                        )}>
                            <span>{trend.isPositive ? '+' : ''}{trend.value}%</span>
                            <span className="ml-1">from last month</span>
                        </div>
                    )}
                </div>
            </div>

            <Separator />

            {link && (
                <Link
                    href={link.href}
                    className="text-md font-medium text-gray-500 flex justify-between items-center hover:text-gray-700 transition-colors"
                >
                    {link.text}
                    <ArrowRight className="ml-1" size={16} />
                </Link>
            )}
        </div>
    )
} 