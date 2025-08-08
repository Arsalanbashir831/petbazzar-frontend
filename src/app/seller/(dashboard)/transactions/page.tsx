'use client'

import { useState, useMemo } from 'react'
import { CreditCard } from 'lucide-react'
import DataTableRT from '@/components/common/data-table-rt'
import type { ColumnDef } from '@tanstack/react-table'
import FilterBar from '@/components/common/filter-bar'
import { formatCurrencyPKR } from '@/lib/format'
import PageHeader from '@/components/common/page-header'
import EWalletCard from '@/components/seller/transactions/e-wallet-card'


interface Transaction {
    order: string
    date: string
    product: string
    quantity: number
    amount: string
    status: 'Pending' | 'E Wallet' | 'Withdrawn'
}

// dummy data – replace this with your real fetch
const TRANSACTIONS: Transaction[] = [
    { order: '#6548', date: '4/8/2024', product: 'Nutrabold Cat 5kg', quantity: 1, amount: 'RS 4200', status: 'Pending' },
    { order: '#6549', date: '4/8/2024', product: 'Dog collar…', quantity: 1, amount: 'RS 1200', status: 'E Wallet' },
    { order: '#6550', date: '4/8/2024', product: 'Diamond care dry Dog', quantity: 3, amount: 'RS 3200', status: 'E Wallet' },
    { order: '#6551', date: '4/8/2024', product: 'Dog House', quantity: 2, amount: 'RS 6000', status: 'E Wallet' },
    { order: '#6552', date: '4/8/2024', product: 'Nutrabold Cat 5kg', quantity: 1, amount: 'RS 4200', status: 'Pending' },
    { order: '#6553', date: '4/8/2024', product: 'Dog collar…', quantity: 2, amount: 'RS 1200', status: 'Pending' },
    { order: '#6554', date: '4/8/2024', product: 'Nutrabold Cat 2.7kg', quantity: 1, amount: 'RS 1200', status: 'Pending' },
    { order: '#6555', date: '4/8/2024', product: 'Dog collar…', quantity: 1, amount: 'RS 3200', status: 'Withdrawn' },
]

const SORT_OPTIONS = [
    { label: 'Pending', value: 'Pending' },
    { label: 'E Wallet', value: 'E Wallet' },
    { label: 'Withdrawn', value: 'Withdrawn' },
]

export default function TransactionsPage() {
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState<'All' | Transaction['status']>('All')
    const [sort, setSort] = useState<typeof SORT_OPTIONS[number]['value']>(SORT_OPTIONS[0].value)

    // filter by order id and status
    const filtered = useMemo(() => {
        return TRANSACTIONS.filter((tx) => {
            const matchesSearch = tx.order.toLowerCase().includes(search.toLowerCase())
            const matchesStatus =
                statusFilter === 'All' || tx.status === statusFilter
            return matchesSearch && matchesStatus
        })
    }, [search, statusFilter])

    // define columns for the Table component
    const columns = useMemo<ColumnDef<Transaction>[]>(() => [
        { accessorKey: 'order', header: 'Order', cell: ({ row }) => row.original.order },
        { accessorKey: 'date', header: 'Date', cell: ({ row }) => row.original.date },
        { accessorKey: 'product', header: 'Product', cell: ({ row }) => row.original.product },
        { accessorKey: 'quantity', header: 'Quantity', cell: ({ row }) => row.original.quantity },
        { accessorKey: 'amount', header: 'Amount To Receive', cell: ({ row }) => row.original.amount },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => {
                const v = row.original.status
                let color = 'bg-yellow-100 text-yellow-800'
                if (v === 'E Wallet') color = 'bg-blue-100 text-blue-800'
                if (v === 'Withdrawn') color = 'bg-green-100 text-green-800'
                return (
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${color}`}>
                        {v}
                    </span>
                )
            },
        },
        {
            id: 'action',
            header: 'Action',
            cell: ({ row }) => (
                <div className="text-sm space-x-4">
                    <a href={`/seller/orders/${row.original.order.slice(1)}`} className="underline text-orange-500">
                        View Order
                    </a>
                    <a href={`/seller/invoice/${row.original.order.slice(1)}`} className="underline text-orange-500">
                        Download Invoice
                    </a>
                </div>
            ),
        },
    ], [])

    return (
        <div className="space-y-8 px-6 py-4">
            <PageHeader
                title="Transactions"
                icon={{ src: '/seller/dashboard/seller.png', alt: 'Fluffy Petshop Logo' }}
                className="flex-col md:flex-row items-start md:items-center gap-2"
                childrenClassName="self-end"
            >
                <div className="inline-flex items-center space-x-2 rounded-lg bg-white px-2 py-1 md:px-5 md:py-3 shadow-sm">
                    <CreditCard className="h-5 w-5 text-gray-600" />
                    <span className="text-xs md:text-base font-medium">Balance:</span>
                    <span className="text-xs md:text-lg font-semibold text-orange-500">{formatCurrencyPKR(54000)}</span>
                </div>
            </PageHeader>

            {/* E-Wallet card */}
            <div className="space-y-2">
              <h2 className="text-xl font-bold">E-Wallet</h2>
              <p className="text-sm text-muted-foreground">
                All payments received from buyers will be added to your E-Wallet and will be available for withdrawal within 2–3 working days clearance.
              </p>
              <EWalletCard amount={formatCurrencyPKR(30000)} />
            </div>

            <FilterBar
              search={{ value: search, placeholder: 'Search Order by id', onChange: setSearch }}
              sort={{ value: sort, options: SORT_OPTIONS.map(o => o.value), onChange: (v) => setSort(v as typeof SORT_OPTIONS[number]['value']), label: 'Sort By:' }}   
            />

            {/* Table */}
            <section className="space-y-2">
                <h3 className="text-lg font-medium">Transaction History Table</h3>
                <DataTableRT columns={columns} data={filtered} />
            </section>
        </div>
    )
}
