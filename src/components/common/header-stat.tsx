'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface HeaderStatProps {
  icon?: React.ReactNode
  label?: string
  value: string
  className?: string
}

export default function HeaderStat({ icon, label, value, className }: HeaderStatProps) {
  return (
    <div className={cn('inline-flex items-center space-x-2 rounded-lg bg-white px-5 py-3 shadow-sm', className)}>
      {icon}
      {label && <span className="text-sm font-medium">{label}</span>}
      <span className="text-lg font-semibold text-orange-500">{value}</span>
    </div>
  )
}


