'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { NavItem } from '@/types/dashboard'

interface SidebarProps {
    navItems: NavItem[]
    logo?: {
        src: string
        alt: string
        width?: number
        height?: number
    }
    className?: string
}

export default function Sidebar({ 
    navItems, 
    logo = { src: "/clogo.png", alt: "PetBazzar Logo", width: 120, height: 40 },
    className 
}: SidebarProps) {
    const pathname = usePathname()

    return (
        <aside className={cn(
            "w-60 h-screen flex-shrink-0 bg-card border-r border-border flex flex-col overflow-hidden",
            className
        )}>
            {/* Logo */}
            <div className="p-6 flex justify-center">
                <Image 
                    src={logo.src} 
                    alt={logo.alt} 
                    width={logo.width} 
                    height={logo.height} 
                />
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-2">
                {navItems.map(({ label, href, icon: Icon, badge }) => {
                    const isActive = pathname === href
                    return (
                        <Link key={href} href={href} passHref>
                            <div
                                className={cn(
                                    'group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-[#fa6610] hover:text-white relative',
                                    isActive
                                        ? 'bg-[#FA6910] text-white'
                                        : 'text-muted-foreground'
                                )}
                            >
                                <div className="flex items-center">
                                    {Icon && <Icon className="w-4 h-4 mr-2" />}
                                    <span>{label}</span>
                                </div>
                                {badge && (
                                    <span className={cn(
                                        "inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full",
                                        isActive 
                                            ? "bg-white/20 text-white" 
                                            : "bg-muted text-muted-foreground"
                                    )}>
                                        {badge}
                                    </span>
                                )}
                            </div>
                        </Link>
                    )
                })}
            </nav>
        </aside>
    )
} 