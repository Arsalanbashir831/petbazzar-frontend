import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

type Props = {
    value: string
    onValueChange: (value: string) => void
    items: {
        value: string
        label: string
        badge?: number
    }[]
}

export default function TabsDropdown({value, onValueChange, items}: Props) {
  return (
    <Select value={value} onValueChange={onValueChange}>
                        <SelectTrigger className="rounded-full border border-orange-500 focus:ring-0 focus:outline-none justify-between">
                            <span className="text-sm text-gray-600">Status</span>
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border border-border bg-card">
                            {items.map((item) => (
                                <SelectItem key={item.value} value={item.value} className="pr-8">
                                    {item.label}
                                    {item.badge && (
                                        <span className="ml-2 inline-block rounded-full bg-orange-500 px-2 py-0.5 text-xs font-semibold text-white">
                                            {item.badge}
                                        </span>
                                    )}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
  )
}