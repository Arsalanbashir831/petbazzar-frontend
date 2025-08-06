'use client'

import React from 'react'
import Image from 'next/image'
import StepIndicator from './onboarding/step-indicator'

interface AuthLayoutProps {
    children: React.ReactNode
    imageSrc?: string
    imageAlt?: string
    tagline?: string
    showLogo?: boolean
    currentStep?: number
    totalSteps?: number
    showStepIndicator?: boolean
}

export default function AuthLayout({
    children,
    imageSrc = "/seller/shop.png",
    imageAlt = "Authentication illustration",
    tagline = "Let's sell to thousands of pet lovers at one place",
    showLogo = true,
    currentStep,
    totalSteps,
    showStepIndicator = false
}: AuthLayoutProps) {
    return (
        <main className="flex min-h-screen bg-white">
            {/* ─── LEFT SIDE (Form) ─── */}
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </div>

            {/* ─── RIGHT SIDE (Image) ─── */}
            <div className="w-1/3 relative hidden md:block">
                <div className="absolute inset-0 rounded-tl-[50px] rounded-bl-[50px] overflow-hidden bg-[linear-gradient(135deg,rgba(250,105,16,1)_0%,rgba(249,155,97,1)_100%)]">
                    {/* Logo */}
                    {showLogo && (
                        <div className="pt-12 flex items-center justify-center">
                            <Image
                                src="/logo.svg"
                                alt="Pet Bazzar logo"
                                width={163}
                                height={120}
                                priority
                            />
                        </div>
                    )}

                    {/* Tagline */}
                    <div className="px-8 text-center text-white text-2xl font-bold mt-8">
                        {tagline}
                    </div>

                    {/* Main illustration */}
                    <div className="absolute bottom-16 w-full flex justify-center">
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            width={500}
                            height={420}
                            className="object-contain"
                            priority
                        />
                    </div>

                    {/* Step Indicator */}
                    {showStepIndicator && currentStep && totalSteps && (
                        <StepIndicator 
                            currentStep={currentStep} 
                            totalSteps={totalSteps} 
                        />
                    )}
                </div>
            </div>
        </main>
    )
}