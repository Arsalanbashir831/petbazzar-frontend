'use client'

import { ReactNode } from 'react'
import Sidebar from '@/components/seller/dashboard/Sidebar'
import { SELLER_NAV_ITEMS } from '@/constants/dashboard'

interface DashboardLayoutProps {
    children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar navItems={SELLER_NAV_ITEMS} />
            
            {/* Main Content Area */}
            <div className="flex flex-col flex-1 min-h-0">
                <main className="flex-1 overflow-y-auto bg-[#F7F7F7]">
                    {children}
                </main>
            </div>
        </div>
    )
}
