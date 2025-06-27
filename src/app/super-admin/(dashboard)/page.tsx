'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import Table from '@/components/Table';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import {
    ResponsiveContainer,
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Line,
} from 'recharts';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';
import { PageHeader } from '@/components/PageHeader';

export default function SuperAdminDashboard() {
    // === Top‐level stats ===
    const stats = [
        { icon: '/admin/store.png', value: 40, label: 'Stores', href: '/admin/stores' },
        { icon: '/admin/user.png', value: 7600, label: 'Users', href: '/admin/users' },
        { icon: '/admin/order.png', value: 267, label: 'Active Orders', href: '/admin/orders' },
        { icon: '/admin/clear.png', value: 112, label: 'Pending Clearance', href: '/admin/clearance' },
    ];

    // === Earnings chart data ===
    const monthlyEarnings = [
        { month: 'Jan', revenue: 250_000 },
        { month: 'Feb', revenue: 300_000 },
        { month: 'Mar', revenue: 350_000 },
        { month: 'Apr', revenue: 400_000 },
        { month: 'May', revenue: 450_000 },
        { month: 'Jun', revenue: 300_000 },
        { month: 'Jul', revenue: 200_000 },
        { month: 'Aug', revenue: 280_000 },
        { month: 'Sep', revenue: 320_000 },
        { month: 'Oct', revenue: 150_000 },
        { month: 'Nov', revenue: 180_000 },
        { month: 'Dec', revenue: 500_000 },
    ];

    // === Pending clearance by store ===
    const clearanceData = [
        { name: 'Pet Care', amount: 32000 },
        { name: 'Paws', amount: 12560 },
        { name: 'Furry Bites', amount: 10030 },
        { name: 'Meow & Munch', amount: 9800 },
        { name: 'Canine Crunchers', amount: 27000 },
    ];

    // === “New Store Requests” table ===
    const newStoreRequests = [
        { id: '#40', store: 'Pet Treats Hub', owner: 'Sarah Khan', date: '4/8/2024', status: 'Pending', cnic: '/cnic/40.pdf' },
        { id: '#39', store: 'Furry Bites', owner: 'Ali Raza', date: '4/8/2024', status: 'Pending', cnic: '/cnic/39.pdf' },
        { id: '#38', store: 'Pawfect Delights', owner: 'Ayesha Malik', date: '4/8/2024', status: 'Pending', cnic: '/cnic/38.pdf' },
        { id: '#37', store: 'Meow & Munch', owner: 'Hamza Sheikh', date: '4/8/2024', status: 'Pending', cnic: '/cnic/37.pdf' },
        { id: '#36', store: 'Canine Crunchers', owner: 'Maria Khan', date: '4/8/2024', status: 'Pending', cnic: '/cnic/36.pdf' },
    ];

    const columnsRequests = [
        { header: 'ID', accessor: 'id' },
        { header: 'Store Name', accessor: 'store' },
        { header: 'Owner Name', accessor: 'owner' },
        { header: 'Submitted On', accessor: 'date' },
        {
            header: 'Status',
            accessor: 'status',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Cell: (row: { status: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
                <span className={
                    row.status === 'Pending'
                        ? 'px-2 py-1 rounded-full bg-yellow-100 text-yellow-800'
                        : 'px-2 py-1 rounded-full bg-green-100 text-green-800'
                }>
                    {row.status}
                </span>
            ),
        },
        {
            header: 'CNIC',
            accessor: 'cnic',
            Cell: (row: { cnic: string | undefined; }) => (
                <a href={row.cnic} download>
                    <Image src="/download.png" alt="Download CNIC" width={16} height={16} className="inline-block mr-1" />
                </a>
            ),
            className: 'text-center',
        },
        {
            header: '',
            accessor: '',
            Cell: (row: { id: string; }) => (
                <Link href={`/admin/stores/${row.id.replace('#', '')}`} className="text-orange-600 whitespace-nowrap underline">
                    All Actions
                </Link>
            ),
        },
    ];

    // === “Complaints” table ===
    const complaints = [
        { id: '#40', status: 'Pending' },
        { id: '#39', status: 'Pending' },
        { id: '#38', status: 'Pending' },
        { id: '#37', status: 'Resolving' },
        { id: '#36', status: 'Pending' },
    ];

    const columnsComplaints = [
        { header: 'ID', accessor: 'id' },
        {
            header: 'Status',
            accessor: 'status',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Cell: (row: { status: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<unknown>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
                <span className={
                    row.status === 'Resolving'
                        ? 'px-2 py-1 rounded-full bg-blue-100 text-blue-800'
                        : 'px-2 py-1 rounded-full bg-yellow-100 text-yellow-800'
                }>
                    {row.status}
                </span>
            ),
        },
        {
            header: 'View',
            accessor: '',
            Cell: (row: { id: string; }) => (
                <Link href={`/admin/complaints/${row.id.replace('#', '')}`} className="text-blue-600 underline">
                    View
                </Link>
            ),
            className: 'text-center',
        },
    ];

    return (
        <div className="space-y-8 p-6">
           
            
            <PageHeader title='Dashboard' userName='Zawar Ahmed Farooqi' />
            
            {/* === Top Stat Cards === */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s) => (
                    <div key={s.label} className="bg-card rounded-lg shadow-sm p-4 flex flex-col justify-between">
                        <div className="flex items-center gap-4">
                            <Image src={s.icon} alt={s.label} width={48} height={48} />
                            <div>
                                <p className="text-3xl font-bold">{s.value}</p>
                                <p className="text-sm text-muted-foreground">{s.label}</p>
                            </div>
                        </div>
                        <Separator className="my-3" />
                        <Link href={s.href} className="text-sm font-medium text-gray-500 flex items-center">
                            View Details <ArrowRight className="ml-1" size={16} />
                        </Link>
                    </div>
                ))}
            </div>

            {/* === Earnings & Pending Clearance === */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className=" bg-card rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-center ">
                        <h3 className="text-3xl font-medium mb-2">Earnings</h3>
                        <p className="text-3xl font-bold mb-4 text-orange-500">575,000 <span className='text-gray-500 text-base font-normal'>pkr</span></p>
                    </div>
                    <div className="flex justify-between items-center space-x-4 border w-62 mb-7 border-gray-300 rounded-full px-4 py-2">
                        <button
                           
                            className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-300"
                            aria-label="Previous Year"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <span className="text-lg font-medium text-gray-600">
                            2025
                        </span>

                        <button
                            
                            className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-300"
                            aria-label="Next Year"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                    <div style={{ width: '100%', height: 200 }}>
                        <ResponsiveContainer>
                            <LineChart
                                data={monthlyEarnings}
                                margin={{ top: 5, right: 10, bottom: 5, left: 0 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                                <YAxis />
                                <Tooltip formatter={(v: number) => `Rs ${v.toLocaleString()}`} />
                                <Line
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#FFA500"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="bg-card rounded-lg w-full shadow-sm p-6">
                    <h3 className="text-xl font-medium mb-4">Pending Clearance Amount</h3>
                    <ul className="space-y-2">
                        {clearanceData.map((c) => (
                            <li key={c.name} className="flex justify-between">
                                <span>{c.name}</span>
                                <span className="font-medium">Rs {c.amount.toLocaleString()}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* === New Requests & Complaints === */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold">New Store Requests</h2>
                    </div>
                    <Table columns={columnsRequests} data={newStoreRequests} />
                </div>
                <div>
                    <h2 className="text-lg font-bold mb-4">Complaints</h2>
                    <Table columns={columnsComplaints} data={complaints} />
                </div>
            </div>
        </div>
    );
}
