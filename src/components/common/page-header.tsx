'use client'

import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import SidebarTrigger from './sidebar-trigger'

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
  children?: React.ReactNode
  className?: string
  showSidebarTrigger?: boolean
  childrenClassName?: string
}

export default function PageHeader({
  title,
  subtitle,
  icon,
  actions,
  children,
  className,
  childrenClassName,
  showSidebarTrigger = true,
}: PageHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between mb-6', className)}>
      <div className="flex items-center space-x-3">
        {showSidebarTrigger && (
           <SidebarTrigger />
          )}
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
      <div className={cn("flex items-center space-x-4", childrenClassName)}>
        {children}
        {actions}
      </div>
    </div>
  )
}


