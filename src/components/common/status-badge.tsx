'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { ORDER_STATUS_COLORS } from '@/constants/status'

interface StatusBadgeProps {
  status: keyof typeof ORDER_STATUS_COLORS | string
  className?: string
  size?: 'sm' | 'md'
}

export default function StatusBadge({ status, className, size = 'md' }: StatusBadgeProps) {
  const base = typeof status === 'string' && (ORDER_STATUS_COLORS as Record<string, string>)[status]
  const color = base || 'bg-gray-100 text-gray-800'
  const sizeCls = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm'
  return (
    <span className={cn('inline-block font-medium rounded', sizeCls, color, className)}>
      {status}
    </span>
  )
}


