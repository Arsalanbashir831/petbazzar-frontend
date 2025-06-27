// app/super-admin/(dashboard)/stores/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from '@/components/ui/tabs';
import Table, { Column } from '@/components/Table';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Download } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';

interface Store {
    id: string;
    name: string;
    owner: string;
    submittedOn: string;
    status: 'Pending' | 'Active' | 'Suspended';
    cnicUrl: string;
}

const activeStores: Store[] = [
    { id: '#40', name: 'Pet Treats Hub', owner: 'Sarah Khan', submittedOn: '4/8/2024', status: 'Active', cnicUrl: '/cnics/40.pdf' },
    { id: '#39', name: 'Furry Bites', owner: 'Ali Raza', submittedOn: '4/8/2024', status: 'Active', cnicUrl: '/cnics/39.pdf' },
    { id: '#38', name: 'Pawfect Delights', owner: 'Ayesha Malik', submittedOn: '4/8/2024', status: 'Active', cnicUrl: '/cnics/38.pdf' },
    { id: '#37', name: 'Meow & Munch', owner: 'Hamza Sheikh', submittedOn: '4/8/2024', status: 'Active', cnicUrl: '/cnics/37.pdf' },
    { id: '#36', name: 'Canine Crunchers', owner: 'Maria Khan', submittedOn: '4/8/2024', status: 'Active', cnicUrl: '/cnics/36.pdf' },
    { id: '#35', name: 'Woof Box', owner: 'Usman Tariq', submittedOn: '4/8/2024', status: 'Active', cnicUrl: '/cnics/35.pdf' },
    { id: '#34', name: 'PetFeast', owner: 'Rida Rehman', submittedOn: '4/8/2024', status: 'Active', cnicUrl: '/cnics/34.pdf' },
    { id: '#33', name: 'TailTreats', owner: 'Nida Amin', submittedOn: '4/8/2024', status: 'Active', cnicUrl: '/cnics/33.pdf' },
];

const pendingStores: Store[] = [
    { id: '#40', name: 'Pet Treats Hub', owner: 'Sarah Khan', submittedOn: '4/8/2024', status: 'Pending', cnicUrl: '/cnics/40.pdf' },
    { id: '#39', name: 'Furry Bites', owner: 'Ali Raza', submittedOn: '4/8/2024', status: 'Pending', cnicUrl: '/cnics/39.pdf' },
    { id: '#38', name: 'Pawfect Delights', owner: 'Ayesha Malik', submittedOn: '4/8/2024', status: 'Pending', cnicUrl: '/cnics/38.pdf' },
    { id: '#37', name: 'Meow & Munch', owner: 'Hamza Sheikh', submittedOn: '4/8/2024', status: 'Pending', cnicUrl: '/cnics/37.pdf' },
    { id: '#36', name: 'Canine Crunchers', owner: 'Maria Khan', submittedOn: '4/8/2024', status: 'Pending', cnicUrl: '/cnics/36.pdf' },
    { id: '#35', name: 'Woof Box', owner: 'Usman Tariq', submittedOn: '4/8/2024', status: 'Pending', cnicUrl: '/cnics/35.pdf' },
    { id: '#34', name: 'PetFeast', owner: 'Rida Rehman', submittedOn: '4/8/2024', status: 'Pending', cnicUrl: '/cnics/34.pdf' },
    { id: '#33', name: 'TailTreats', owner: 'Nida Amin', submittedOn: '4/8/2024', status: 'Pending', cnicUrl: '/cnics/33.pdf' },
    { id: '#32', name: 'Bark & Bite', owner: 'Nida Amin', submittedOn: '4/8/2024', status: 'Pending', cnicUrl: '/cnics/32.pdf' },
    { id: '#31', name: 'Kitty Comforts', owner: 'Omer Javed', submittedOn: '4/8/2024', status: 'Pending', cnicUrl: '/cnics/31.pdf' },
    { id: '#30', name: 'Fur & Feed', owner: 'Bilal Asif', submittedOn: '4/8/2024', status: 'Pending', cnicUrl: '/cnics/30.pdf' },
    { id: '#29', name: 'TailTreats', owner: 'Bilal Asif', submittedOn: '4/8/2024', status: 'Pending', cnicUrl: '/cnics/29.pdf' },
];

const suspendedStores: Store[] = [
    {
        id: '#22', name: 'Old Furries', owner: 'Bilal Asif', submittedOn: '4/1/2024', status: 'Suspended', cnicUrl: '/cnics/22.pdf'
    },
    {
        id: '#21', name: 'Pet Paradise', owner: 'Ayesha Malik', submittedOn: '4/1/2024', status: 'Suspended', cnicUrl: '/cnics/21.pdf'
    },
    {
        id: '#20', name: 'Furry Friends', owner: 'Hamza Sheikh', submittedOn: '4/1/2024', status: 'Suspended', cnicUrl: '/cnics/20.pdf'
    },
    {
        id: '#19', name: 'Paws & Claws', owner: 'Maria Khan', submittedOn: '4/1/2024', status: 'Suspended', cnicUrl: '/cnics/19.pdf'
    },
    {
        id: '#18', name: 'Pet Haven', owner: 'Usman Tariq', submittedOn: '4/1/2024', status: 'Suspended', cnicUrl: '/cnics/18.pdf'
    },
    {
        id: '#17', name: 'Furry Delights', owner: 'Rida Rehman', submittedOn: '4/1/2024', status: 'Suspended', cnicUrl: '/cnics/17.pdf'
    },
    {
        id: '#16', name: 'Pet Kingdom', owner: 'Nida Amin', submittedOn: '4/1/2024', status: 'Suspended', cnicUrl: '/cnics/16.pdf'
    },
    {
        id: '#15', name: 'Pawfect Pets', owner: 'Omer Javed', submittedOn: '4/1/2024', status: 'Suspended', cnicUrl: '/cnics/15.pdf'
    },
    {
        id: '#14', name: 'Pet Lovers', owner: 'Bilal Asif', submittedOn: '4/1/2024', status: 'Suspended', cnicUrl: '/cnics/14.pdf'
    },
    {
        id: '#13', name: 'Furry Tails', owner: 'Ayesha Malik', submittedOn: '4/1/2024', status: 'Suspended', cnicUrl: '/cnics/13.pdf'
    },
    {
        id: '#12', name: 'Pawsitive Vibes', owner: 'Hamza Sheikh', submittedOn: '4/1/2024', status: 'Suspended', cnicUrl: '/cnics/12.pdf'
    },
    {
        id: '#11', name: 'Pet Paradise', owner: 'Maria Khan', submittedOn: '4/1/2024', status: 'Suspended', cnicUrl: '/cnics/11.pdf'
    },
];

// stubbed handlers
const handleSuspend = (id: string) => alert(`Suspend ${id}`);
const handleApprove = (id: string) => alert(`Approve ${id}`);
const handleReject = (id: string) => alert(`Reject ${id}`);
const handleReactivate = (id: string) => alert(`Reactivate ${id}`);

export default function StoresPage() {
    // generate our columns, injecting the right dropdown
    const makeColumns = (actions: (row: Store) => React.ReactNode): Column<Store>[] => [
        { header: 'ID', accessor: 'id' },
        { header: 'Store Name', accessor: 'name' },
        { header: 'Owner Name', accessor: 'owner' },
        { header: 'Submitted On', accessor: 'submittedOn' },
        {
            header: 'Status',
            accessor: 'status',
            Cell: (r) => {
                return (
                    <span
                        className={`px-3 py-1 rounded-md font-medium ${r.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : r.status === 'Active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-200 text-gray-800'
                            }`}
                    >
                        {r.status}
                    </span>
                );
            },
        },
        {
            header: 'CNIC',
            accessor: 'cnicUrl',
            Cell: (r) => (
                <a href={r.cnicUrl} download>
                    <Download className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                </a>
            ),
            className: 'text-center',
        },
        {
            header: '',
            accessor: '',
            Cell: actions,
            className: 'text-right',
        },
    ];

    const columnsActive = makeColumns((row) => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="inline-flex items-center gap-1 text-orange-600 hover:underline whitespace-nowrap">
                    All Actions <ChevronDown size={16} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <Link href={`/super-admin/stores/${row.id.slice(1)}`}>View Details</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleSuspend(row.id)}>
                    Suspend
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    ));

    const columnsPending = makeColumns((row) => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="inline-flex items-center gap-1 text-orange-600 hover:underline whitespace-nowrap">
                    All Actions <ChevronDown size={16} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => handleApprove(row.id)}>
                    Approve
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleReject(row.id)}>
                    Reject
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    ));

    const columnsSuspended = makeColumns((row) => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="inline-flex items-center gap-1 text-orange-600 hover:underline whitespace-nowrap">
                    All Actions <ChevronDown size={16} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => handleReactivate(row.id)}>
                    Reactivate
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    ));

    return (
        <div className="p-6 space-y-6">
            {/* Page title */}


            <PageHeader title='Stores' userName='Zawar Ahmed Farooqi' />

            {/* Tabbed table */}
            <Tabs defaultValue="active" className="space-y-4">
                <TabsList className="inline-flex bg-gray-100 rounded-full p-1">
                    {[
                        { value: 'active', label: 'Active' },
                        { value: 'pending', label: 'Pending Approval' },
                        { value: 'suspended', label: 'Suspended' },
                    ].map(tab => (
                        <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            className={`
                            px-4 py-2 text-base font-medium  rounded-none shadow-none 
                            text-gray-600 hover:text-gray-800
                            bg-gray-100
                            data-[state=active]:text-orange-600
                            data-[state=active]:border-b-2
                            data-[state=active]:border-b-orange-500
                            data-[state=active]:bg-gray-100
                            `}
                        >
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="active">
                    <Table columns={columnsActive} data={activeStores} />
                </TabsContent>

                <TabsContent value="pending">
                    <Table columns={columnsPending} data={pendingStores} />
                </TabsContent>

                <TabsContent value="suspended">
                    <Table columns={columnsSuspended} data={suspendedStores} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
