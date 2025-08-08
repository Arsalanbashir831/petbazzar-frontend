'use client'

import * as React from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

export interface TabsBarItem {
  value: string
  label: string
  badge?: number
}

interface TabsBarProps {
  value: string
  onValueChange: (value: string) => void
  items: TabsBarItem[]
  className?: string
  listClassName?: string
  triggerClassName?: string
}

export default function TabsBar({
  value,
  onValueChange,
  items,
  className,
  listClassName,
  triggerClassName,
}: TabsBarProps) {
  return (
    <Tabs value={value} onValueChange={onValueChange} className={className}>
      <TabsList className={cn('w-full justify-start bg-transparent p-0 rounded-none', listClassName)}>
        {items.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            className={cn(
              'rounded-none mr-8 pb-2 text-sm font-medium',
              'bg-transparent data-[state=active]:bg-transparent',
              'text-muted-foreground hover:text-foreground',
              'border-0 border-b-4 data-[state=active]:shadow-none data-[state=active]:text-orange-500 data-[state=active]:border-orange-500',
              triggerClassName
            )}
          >
            <span>{item.label}</span>
            {typeof item.badge === 'number' && item.badge > 0 ? (
              <span className="ml-1 inline-block rounded-full bg-orange-500 px-2 py-0.5 text-xs font-semibold text-white">
                {item.badge}
              </span>
            ) : null}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}


