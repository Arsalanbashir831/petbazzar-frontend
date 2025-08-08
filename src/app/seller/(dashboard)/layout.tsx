'use client'

import { ReactNode } from 'react'
import Sidebar from '@/components/seller/dashboard/sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { SELLER_NAV_ITEMS } from '@/constants/nav'

interface DashboardLayoutProps {
    children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <SidebarProvider>
            <div className="flex h-screen w-full">
                {/* Sidebar */}
                <Sidebar navItems={SELLER_NAV_ITEMS} />

                {/* Main Content Area */}
                    <main className="w-full flex-1 overflow-y-auto bg-[#F7F7F7]">
                        {children}
                    </main>
                </div>
        </SidebarProvider>
    )
}
