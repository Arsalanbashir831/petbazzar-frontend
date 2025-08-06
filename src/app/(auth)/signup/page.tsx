'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import AuthLayout from '../../../components/auth/auth-layout'
import { ROUTES } from '@/contants/routes'

// Import step components
import SignupForm from '@/components/auth/signup-form'
import OtpVerification from '@/components/auth/onboarding/otp-verification'

// Signup form data interface
interface SignupFormData {
    email: string
    password: string
    phoneNumber: string
}

export default function SignupPage() {
    const router = useRouter()
    const [otpOpen, setOtpOpen] = useState(false)
    const [formData, setFormData] = useState<SignupFormData>({
        email: '',
        password: '',
        phoneNumber: ''
    })

    const updateFormData = (field: keyof SignupFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSignupSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: Call signup API here
        console.log('Signup data:', formData)
        setOtpOpen(true)
    }

    const handleOtpSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setOtpOpen(false)
        // TODO: Verify OTP with API
        console.log('OTP verified, redirecting to onboarding')
        router.push(ROUTES.ONBOARDING)
    }

    return (
        <>
            <AuthLayout
                imageSrc="/seller/shop.png"
                tagline="Let's sell to thousands of pet lovers at one place"
                showLogo={true}
            >
                <Card className="w-full bg-transparent border-none shadow-none">
                    <CardContent className="space-y-6 p-8">
                        <SignupForm
                            formData={formData}
                            updateFormData={updateFormData}
                            onSubmit={handleSignupSubmit}
                        />
                    </CardContent>
                </Card>
            </AuthLayout>

            {/* OTP Verification Dialog */}
            <OtpVerification
                isOpen={otpOpen}
                onClose={() => setOtpOpen(false)}
                onSubmit={handleOtpSubmit}
                phoneNumber={formData.phoneNumber}
            />
        </>
    )
}