'use client'
import { useState, useRef, useEffect } from 'react'

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
        <div ref={containerRef} className="relative w-full">
            <input
                type="text"
                className="w-full border border-border rounded-full py-2 px-3 text-sm focus:outline-none"
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
                        setHighlighted((h) =>
                            Math.min(h + 1, filtered.length - 1)
                        )
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

            {isOpen && (
                <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white border shadow">
                    {filtered.map((opt, idx) => (
                        <li
                            key={opt}
                            className={`px-4 py-2 text-sm cursor-pointer ${idx === highlighted
                                    ? 'bg-muted text-foreground'
                                    : 'hover:bg-muted'
                                }`}
                            onMouseEnter={() => setHighlighted(idx)}
                            onClick={() => {
                                onChange(opt)
                                setIsOpen(false)
                            }}
                        >
                            {opt}
                        </li>
                    ))}
                    {filtered.length === 0 && (
                        <li className="px-4 py-2 text-sm text-muted-foreground">
                            No results
                        </li>
                    )}
                </ul>
            )}
        </div>
    )
}
