'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Search, Filter, SlidersHorizontal } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface FilterBarProps {
  className?: string
  search?: {
    value: string
    placeholder?: string
    onChange: (v: string) => void
  }
  sort?: {
    value: string
    options: string[]
    onChange: (v: string) => void
    label?: string
  }
  date?: {
    value: string
    onChange: (v: string) => void
  }
  right?: React.ReactNode
}

export default function FilterBar({ className, search, sort, date, right }: FilterBarProps) {
  return (
    <div className={cn('flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4', className)}>
      {search && (
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500" size={18} />
          <Input
            type="text"
            placeholder={search.placeholder || 'Search'}
            value={search.value}
            onChange={(e) => search.onChange(e.target.value)}
            className="pl-9 rounded-full border border-orange-500 focus-visible:ring-0"
          />
        </div>
      )}

      <div className="flex items-center gap-3">
        {sort && (
          <div className="flex items-center border border-orange-500 rounded-full px-3">
            <Select value={sort.value} onValueChange={sort.onChange}>
              <div className="relative flex items-center">
                <SelectTrigger
                  aria-label={sort.label || 'Sort By'}
                  showIcon={false}
                  className="h-10 bg-transparent border-none shadow-none outline-none focus:ring-0 focus-visible:ring-0 pr-8 pl-0 gap-2"
                >
                  {sort.label && (
                    <>
                  <span className="text-gray-400 text-xl">▾</span>
                    <span className="text-sm text-gray-600">{sort.label}</span>
                    </>
                  )}
                  <SelectValue className="text-sm font-semibold" />
                </SelectTrigger>
                <SlidersHorizontal className="absolute right-0 text-orange-500" size={16} />
              </div>
              <SelectContent className="rounded-xl border border-border bg-card px-2">
                {sort.options.map((opt, idx) => (
                  <SelectItem
                    key={opt}
                    value={opt}
                    className="pr-8 py-2 rounded-none border-b last:border-b-0 border-border data-[state=checked]:font-semibold data-[state=checked]:text-foreground"
                  >
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {date && (
          <Input
            type="date"
            value={date.value}
            onChange={(e) => date.onChange(e.target.value)}
            className="h-10 w-36 px-3 text-sm rounded-full border border-orange-500 focus-visible:ring-0"
          />
        )}

        {right}
      </div>
    </div>
  )
}


