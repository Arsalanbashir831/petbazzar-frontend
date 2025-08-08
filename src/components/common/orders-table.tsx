'use client'

import React, { useMemo } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import DataTableRT from '@/components/common/data-table-rt'
import Link from 'next/link'
import StatusBadge from '@/components/common/status-badge'
import type { Order, SellerOrderRow } from '@/types/order'

export function mapSellerOrdersToRows(orders: SellerOrderRow[]): Order[] {
  return orders.map((o) => ({
    ...o,
    order: o.id,
    stockQuantity: o.stock,
    priceLabel: `RS ${o.price.toLocaleString()}`,
  }))
}

export function createOrdersColumns(opts?: { withLink?: boolean }): ColumnDef<Order, any>[] {
  const withLink = opts?.withLink !== false
  return [
    {
      accessorKey: 'order',
      header: () => 'Order',
      cell: ({ row }) => row.original.order,
      enableSorting: true,
    },
    {
      accessorKey: 'product',
      header: 'Product',
      cell: ({ row }) =>
        withLink ? (
          <Link href={`/seller/orders/${row.original.id}`} className="hover:no-underline">
            {row.original.product}
          </Link>
        ) : (
          row.original.product
        ),
    },
    { accessorKey: 'category', header: 'Category', enableSorting: true },
    { accessorKey: 'quantity', header: 'Quantity', enableSorting: true },
    { accessorKey: 'stockQuantity', header: 'Stock Quantity', enableSorting: true },
    { accessorKey: 'priceLabel', header: 'Price', enableSorting: false },
    { accessorKey: 'date', header: 'Date', enableSorting: true },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={row.original.status} size="sm" />,
    },
  ]
}

interface OrdersTableProps {
  rows: Order[]
  className?: string
  withLink?: boolean
}

function OrdersTableComponent({ rows, className, withLink = true }: OrdersTableProps) {
  const columns = useMemo(() => createOrdersColumns({ withLink }), [withLink])
  return <DataTableRT columns={columns} data={rows} className={className} />
}

const OrdersTable = React.memo(OrdersTableComponent)
export default OrdersTable


