'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
    label: string
    value: number
    maxValue: number
    showValue?: boolean
    className?: string
    barClassName?: string
    valueClassName?: string
    size?: 'sm' | 'md' | 'lg'
}

export default function ProgressBar({ 
    label, 
    value, 
    maxValue, 
    showValue = true,
    className,
    barClassName,
    valueClassName,
    size = 'md'
}: ProgressBarProps) {
    const percentage = (value / maxValue) * 100
    
    const sizeClasses = {
        sm: 'h-1.5',
        md: 'h-2',
        lg: 'h-3'
    }

    return (
        <div className={cn("flex flex-col w-full gap-2", className)}>
            <div className="flex items-center justify-between">
                <span className="flex-1 text-sm truncate">{label}</span>
                {showValue && (
                    <span className={cn(
                        "text-right text-sm font-medium ml-2",
                        valueClassName
                    )}>
                        {value}
                    </span>
                )}
            </div>
            <div className={cn(
                "w-full bg-muted rounded overflow-hidden",
                sizeClasses[size]
            )}>
                <div
                    className={cn(
                        "h-full bg-orange-500 transition-all duration-300 ease-in-out",
                        barClassName
                    )}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    )
} 