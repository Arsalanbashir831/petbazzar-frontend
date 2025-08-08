'use client'

import React from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

interface DataTableRTProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  className?: string
}

export default function DataTableRT<TData, TValue>({ columns, data, className }: DataTableRTProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  })

  return (
    <ScrollArea className={cn('w-full max-w-full bg-card rounded-lg shadow-sm', className)}>
      <div className="min-w-[720px] md:min-w-full">
        <table className="w-full divide-y divide-border">
          <thead className="bg-muted/20">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                    className={cn(
                      'px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground select-none',
                      header.column.getCanSort() && 'cursor-pointer'
                    )}
                  >
                    <div className="inline-flex items-center gap-1">
                      {header.isPlaceholder ? null : (
                        <>{flexRender(header.column.columnDef.header, header.getContext())}</>
                      )}
                      {header.column.getCanSort() && (
                        <span className="inline-flex items-center">
                          {header.column.getIsSorted() === 'asc' && <ArrowUp className="h-3 w-3" />}
                          {header.column.getIsSorted() === 'desc' && <ArrowDown className="h-3 w-3" />}
                          {!header.column.getIsSorted() && <ArrowUpDown className="h-3 w-3 opacity-60" />}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-border">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={cn('px-4 py-3 text-sm text-foreground')}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}


