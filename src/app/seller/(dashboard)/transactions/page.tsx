'use client'

import { useState, useMemo } from 'react'
import { CreditCard, ArrowRight, Sliders, Search } from 'lucide-react'
import Image from 'next/image'
import Table, { Column } from '@/components/Table'
import { Separator } from '@/components/ui/separator'

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



export default function TransactionsPage() {
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState<'All' | Transaction['status']>('All')

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
    const columns = useMemo<Column<Transaction>[]>(() => [
        { header: 'Order', accessor: 'order' },
        { header: 'Date', accessor: 'date' },
        { header: 'Product', accessor: 'product' },
        { header: 'Quantity', accessor: 'quantity' },
        { header: 'Amount To Receive', accessor: 'amount' },
        {
            header: 'Status',
            accessor: 'status',
            Cell: (row) => {
                let color = 'bg-yellow-100 text-yellow-800'
                if (row.status === 'E Wallet') color = 'bg-blue-100 text-blue-800'
                if (row.status === 'Withdrawn') color = 'bg-green-100 text-green-800'
                return (
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${color}`}>
                        {row.status}
                    </span>
                )
            },
        },
        {
            header: 'Action',
            accessor: 'action',
            Cell: (row) => (
                <div className="text-sm space-x-4">
                    <a href={`/seller/orders/${row.order.slice(1)}`} className="underline text-orange-500">
                        View Order
                    </a>
                    <a href={`/seller/invoice/${row.order.slice(1)}`} className="underline text-orange-500">
                        Download Invoice
                    </a>
                </div>
            ),
        },
    ], [])

    return (
        <div className="space-y-8 px-6 py-4">
            {/* header + balance */}
            <div className="w-full flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Image
                        src="/seller/dashboard/seller.png"
                        alt="Fluffy Petshop Logo"
                        width={32}
                        height={32}
                        className="object-cover rounded-full"
                    />
                    <h1 className="text-2xl font-semibold">Fluffy Petshop</h1>
                </div>
                <div className="inline-flex items-center space-x-2 rounded-lg bg-white px-5 py-3 shadow-sm">
                    <CreditCard className="h-5 w-5 text-gray-600" />
                    <span className="text-sm font-medium">Balance:</span>
                    <span className="text-lg font-semibold text-orange-500">54,000</span>
                </div>
            </div>

            {/* E-Wallet card */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="flex-1 space-y-2">
                    <h2 className="text-xl font-bold">E-Wallet</h2>
                    <p className="text-sm text-muted-foreground">
                        All payments received from buyers will be added to your E-Wallet and will be available for withdrawal within 2–3 working days clearance.
                    </p>
                    <div className="mt-4  max-w-xs w-56 rounded-lg bg-orange-500 p-4 text-white">
                        <div className="flex items-center space-x-4">
                            <CreditCard className="h-10 w-10" />
                            <div>
                                <div className="text-2xl font-bold">30,000 PKR</div>
                                <div className="text-xs">Available for Withdrawal</div>
                            </div>
                        </div>
                        <Separator className="my-3 border-white/40" />
                        <div className="flex items-center justify-between">
                            <span>Withdraw</span>
                            <ArrowRight className="h-5 w-5" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Search + Sort controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Search */}
                <div className="flex items-center flex-1 border border-orange-500 rounded-lg overflow-hidden">
                    <input
                        type="text"
                        placeholder="Search Order by id"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 px-4 py-2 focus:outline-none"
                    />
                    <button className="px-3">
                        <Search className="w-5 h-5 text-orange-500" />
                    </button>
                </div>

                {/* Status Filter */}
                <div className="flex items-center border border-orange-500 rounded-lg overflow-hidden">
                    <div className="pl-2 flex justify-center items-center gap-2 text-gray-400">
                        <Sliders className="w-4 h-4 text-orange-500" /> Sort By:
                    </div>
                    <select
                        value={statusFilter}
                        
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onChange={(e) => setStatusFilter(e.target.value as any)}
                        className="px-4 py-2 text-sm focus:outline-none"
                    >
                        
                        Sort:
                        <option value="All">All</option>
                        <option value="Pending">Pending</option>
                        <option value="E Wallet">E Wallet</option>
                        <option value="Withdrawn">Withdrawn</option>
                    </select>

                </div>
            </div>

            {/* Table */}
            <section className="space-y-2">
                <h3 className="text-lg font-medium">Transaction History Table</h3>
                <Table columns={columns} data={filtered} />
            </section>
        </div>
    )
}
