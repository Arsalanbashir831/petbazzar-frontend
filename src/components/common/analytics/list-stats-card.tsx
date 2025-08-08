'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ListItem {
  name: string
  value: number
}

interface ListStatsCardProps {
  title: string
  items: ListItem[]
  maxValue?: number
  showBar?: boolean
  className?: string
}

function ListStatsCardComponent({ title, items, maxValue, showBar = false, className }: ListStatsCardProps) {
  const computedMax = maxValue || Math.max(...items.map((i) => i.value), 1)

  return (
    <Card className={className}>
      <CardHeader className="pb-2 px-0">
        <CardTitle className="text-base px-6">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-6">
        <ul className="space-y-3">
          {items.map((item) => {
            const pct = Math.min(100, Math.round((item.value / computedMax) * 100))
            return (
              <li key={item.name} className="flex flex-col w-full gap-2">
                <div className="flex items-center justify-between w-full gap-2">
                <span className="flex-1 text-sm">{item.name}</span>
                <span className="text-right text-sm font-medium">{item.value}</span>
                </div>
                  {showBar ? (
                    <div className="w-4/5 bg-muted h-2 flex gap-2 rounded overflow-hidden">
                      <div className="h-2 bg-orange-500" style={{ width: `${pct}%` }} />
                    </div>
                  ) : (
                    <div />
                  )}
                 
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}

const ListStatsCard = React.memo(ListStatsCardComponent)
export default ListStatsCard


