'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Search, ChevronDown } from 'lucide-react'

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
        <div className="flex items-center flex-1 border border-orange-500 rounded-full overflow-hidden">
          <Search className="ml-3 text-orange-500" size={18} />
          <input
            type="text"
            placeholder={search.placeholder || 'Search'}
            value={search.value}
            onChange={(e) => search.onChange(e.target.value)}
            className="flex-1 px-3 py-2 focus:outline-none border-0"
          />
        </div>
      )}

      <div className="flex items-center gap-3">
        {sort && (
          <div className="flex items-center border border-orange-500 rounded-full px-3 py-2">
            {sort.label && <span className="text-sm text-gray-600 mr-2">{sort.label}</span>}
            <select
              value={sort.value}
              onChange={(e) => sort.onChange(e.target.value)}
              className="text-sm bg-transparent focus:outline-none"
            >
              {sort.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown className="ml-1 text-gray-500" size={16} />
          </div>
        )}

        {date && (
          <div className="border border-orange-500 rounded-full overflow-hidden">
            <input
              type="date"
              value={date.value}
              onChange={(e) => date.onChange(e.target.value)}
              className="h-10 w-36 px-3 text-sm border-none"
            />
          </div>
        )}

        {right}
      </div>
    </div>
  )
}


