'use client'

import React from 'react'
import { cn } from '@/lib/utils'

export interface Column<T> {
    /** Column header text */
    header: string
    /** Key of `T` or arbitrary string (Cell renderer will override if provided) */
    accessor: keyof T | string
    /** Optional custom cell renderer (row → ReactNode) */
    Cell?: (row: T) => React.ReactNode
    /** Add extra classes on this column’s `<th>` & `<td>` */
    className?: string
}

export interface TableProps<T> {
    /** Array of column definitions */
    columns: Column<T>[]
    /** Array of row data */
    data: T[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Table<T extends Record<string, any>>({
    columns,
    data,
}: TableProps<T>) {
    return (
        <div className="w-full overflow-x-auto bg-card rounded-lg shadow-sm">
            <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted/20">
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.header}
                                className={cn(
                                    'px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground',
                                    col.className
                                )}
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((col) => (
                                <td
                                    key={col.header}
                                    className={cn(
                                        'px-4 py-3 text-sm text-foreground',
                                        col.className
                                    )}
                                >
                                    {col.Cell
                                        ? col.Cell(row)
                                        : row[col.accessor as keyof T]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
