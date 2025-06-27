'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
    { label: 'Dashboard', href: '/super-admin/', icon: '/admin/dashboard/dashboard.svg' },
    { label: 'Stores', href: '/super-admin/stores', icon: '/admin/dashboard/store.svg' },
    { label: 'Products', href: '/super-admin/products', icon: '/admin/dashboard/product.svg' },
    { label: 'Buyers', href: '/super-admin/buyers', icon: '/admin/dashboard/buyer.svg' },
    { label: 'Orders', href: '/super-admin/orders', icon: '/admin/dashboard/order.svg' },
    { label: 'Complaints', href: '/super-admin/complaints', icon: '/admin/dashboard/complain.svg' },
    { label: 'Transactions', href: '/super-admin/transactions', icon: '/admin/dashboard/transaction.svg' },
    { label: 'Sales Analytics', href: '/super-admin/sales-analytics', icon: '/admin/dashboard/sales.svg' },
    { label: 'Account', href: '/super-admin/account', icon: '/admin/dashboard/account.svg' },
]

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname()

    return (
        <div className="flex h-screen ">
            {/* fixed sidebar */}
            <aside className="w-60 h-screen  flex-shrink-0 bg-card border-r border-border flex flex-col overflow-hidden">
                <div className="p-6 flex justify-center">
                    <Image src="/clogo.png" alt="PetBazzar Logo" width={120} height={40} />
                </div>
                <nav className="flex-1 space-y-1 px-2">
                    {NAV_ITEMS.map(({ label, href, icon }) => {
                        const isActive = pathname === href
                        return (
                            <Link key={href} href={href} passHref>
                                <p
                                    className={cn(
                                        'group flex items-center  rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-[#fa6610] hover:text-white',
                                        isActive
                                            ? 'bg-[#FA6910] text-white'
                                            : 'text-muted-foreground'
                                    )}
                                >
                                    <Image
                                        src={icon}
                                        alt={label}
                                        width={16}
                                        height={16}
                                        className="mr-2"
                                    />
                                    {label}
                                </p>
                            </Link>
                        )
                    })}
                </nav>
            </aside>

            {/* content area: note the min-h-0 */}
            <div className="flex flex-col  flex-1 border">
                <main className="flex-1  overflow-y-auto  bg-[#F7F7F7]">
                    {children}
                </main>
            </div>
        </div>
    )
}
