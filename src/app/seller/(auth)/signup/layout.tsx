// app/auth/signup/layout.tsx
'use client'

import React, { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

type Step = {
    path: string
    title: string
    imageSrc: string
}

const STEPS: Step[] = [
    {
        path: '/auth/signup',
        title: "Let's sell to thousands of pet lovers at one place",
        imageSrc: '/seller/shop.png',
    },
    {
        path: '/auth/signup/details',
        title: 'Store Details',
        imageSrc: '/seller/shop.png',
    },
    {
        path: '/auth/signup/location',
        title: 'Store Location',
        imageSrc: '/seller/shop.png',
    },
    {
        path: '/auth/signup/payment',
        title: 'Payment Information',
        imageSrc: '/seller/shop.png',
    },
    {
        path: '/auth/signup/identity',
        title: 'Identity Verification',
        imageSrc: '/seller/shop.png',
    },
]

export default function SignupLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname() || ''
    // find which step we’re on (default to step 0)
    const currentIndex =
        STEPS.findIndex((s) => s.path === pathname) >= 0
            ? STEPS.findIndex((s) => s.path === pathname)
            : 0

    const { title, imageSrc } = STEPS[currentIndex]

    return (
        <main className="flex min-h-screen bg-white">
            {/* ─── LEFT (form goes here) ─── */}
            <div className="flex-1 w-full flex items-center justify-center">
                {children}
            </div>

            {/* ─── RIGHT (orange sidebar) ─── */}
            <aside className="w-1/3 relative hidden md:block">
                <div
                    className="
            absolute inset-0
            rounded-tl-[50px] rounded-bl-[50px]
            overflow-hidden
            bg-[linear-gradient(135deg,rgba(250,105,16,1)_0%,rgba(249,155,97,1)_100%)]
          "
                >
                    {/* Logo */}
                    <div className="pt-12 flex items-center justify-center">
                        <Image
                            src="/logo.svg"
                            alt="Pet Bazzar logo"
                            width={163}
                            height={120}
                        />
                    </div>

                    {/* Dynamic Title */}
                    <h2 className="mt-8 px-8 text-center text-white text-2xl font-bold">
                        {title}
                    </h2>

                    {/* Dynamic Illustration */}
                    <div className="absolute bottom-16 w-full flex justify-center">
                        <Image
                            src={imageSrc}
                            alt=""
                            width={500}
                            height={420}
                            className="object-contain"
                        />
                    </div>

                    {/* Step-dots */}
                    <div className="absolute bottom-8 w-full flex justify-center space-x-2">
                        {STEPS.map((_, idx) => (
                            <span
                                key={idx}
                                className={`
                  w-3 h-3 rounded-full
                  ${idx === currentIndex ? 'bg-white' : 'bg-white/50'}
                `}
                            />
                        ))}
                    </div>
                </div>
            </aside>
        </main>
    )
}
