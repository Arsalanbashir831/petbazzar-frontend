'use client'

import { ReactNode } from 'react'
import Sidebar from '@/components/seller/dashboard/sidebar'
import { cn } from '@/lib/utils'
import { ADMIN_NAV_ITEMS } from '@/constants/nav'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar navItems={ADMIN_NAV_ITEMS} logo={{ src: '/clogo.png', alt: 'PetBazzar Logo', width: 120, height: 40 }} />
      <div className="flex flex-col flex-1 min-h-0">
        <main className={cn('flex-1 overflow-y-auto bg-[#F7F7F7]')}>{children}</main>
      </div>
    </div>
  )
}
