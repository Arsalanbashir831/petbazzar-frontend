'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
    { label: 'Dashboard', href: '/seller/dashboard', icon: '/seller/dashboard/grid.png' },
    { label: 'Inventory', href: '/seller/inventory', icon: '/seller/dashboard/Bag.png' },
    { label: 'Orders', href: '/seller/orders', icon: '/seller/dashboard/Package.png' },
    { label: 'Sales Analytics', href: '/seller/sales-analytics', icon: '/seller/dashboard/ShippingContainer.png' },
    { label: 'Store Setting', href: '/seller/store-setting', icon: '/seller/dashboard/Gear.png' },
    { label: 'Transactions', href: '/seller/transactions', icon: '/seller/dashboard/Wallet.png' },
    { label: 'Account', href: '/seller/account', icon: '/seller/dashboard/UserCircle.png' },
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
                                        'group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-[#fa6610] hover:text-white',
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
