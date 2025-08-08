'use client'
import { useState, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'

interface SearchableSelectProps {
    options: string[]
    value: string
    onChange: (v: string) => void
    placeholder?: string
}

export function SearchableSelect({
    options,
    value,
    onChange,
    placeholder = 'Select…',
}: SearchableSelectProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [highlighted, setHighlighted] = useState<number>(-1)
    const containerRef = useRef<HTMLDivElement>(null)

    // Close on outside click
    useEffect(() => {
        function onClickOutside(e: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', onClickOutside)
        return () => document.removeEventListener('mousedown', onClickOutside)
    }, [])

    const filtered = query
        ? options.filter((opt) =>
            opt.toLowerCase().includes(query.toLowerCase())
        )
        : options

    // reset highlight when list changes
    useEffect(() => {
        setHighlighted(-1)
    }, [filtered.length, isOpen])

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <div ref={containerRef} className="relative w-full">
                <PopoverTrigger asChild>
                    <Input
                        type="text"
                        className="w-full border border-border rounded-full py-2 px-3 text-sm focus-visible:ring-0"
                        placeholder={placeholder}
                        value={isOpen ? query : value}
                        onFocus={() => {
                            setIsOpen(true)
                            setQuery('')
                        }}
                        onChange={(e) => {
                            setQuery(e.target.value)
                            setIsOpen(true)
                        }}
                        onKeyDown={(e) => {
                            if (!isOpen) return
                            if (e.key === 'ArrowDown') {
                                e.preventDefault()
                                setHighlighted((h) => Math.min(h + 1, filtered.length - 1))
                            }
                            if (e.key === 'ArrowUp') {
                                e.preventDefault()
                                setHighlighted((h) => Math.max(h - 1, 0))
                            }
                            if (e.key === 'Enter' && highlighted >= 0) {
                                e.preventDefault()
                                onChange(filtered[highlighted])
                                setIsOpen(false)
                            }
                            if (e.key === 'Escape') {
                                setIsOpen(false)
                            }
                        }}
                    />
                </PopoverTrigger>

                <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start" sideOffset={4}>
                    <Command>
                        <CommandList className="max-h-60 overflow-auto">
                            {filtered.length === 0 && (
                                <CommandEmpty>No results</CommandEmpty>
                            )}
                            <CommandGroup>
                                {filtered.map((opt, idx) => (
                                    <CommandItem
                                        key={opt}
                                        value={opt}
                                        className={idx === highlighted ? 'bg-muted text-foreground' : ''}
                                        onMouseEnter={() => setHighlighted(idx)}
                                        onSelect={() => {
                                            onChange(opt)
                                            setIsOpen(false)
                                        }}
                                    >
                                        {opt}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </div>
        </Popover>
    )
}
