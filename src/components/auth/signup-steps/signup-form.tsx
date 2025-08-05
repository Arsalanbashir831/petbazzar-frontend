'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { OAuthButtons } from '@/components/auth/oauth-buttons'
import Link from 'next/link'
import { ROUTES } from '@/contants/routes'

interface SignupFormProps {
    formData: {
        email: string
        password: string
        phoneNumber: string
    }
    updateFormData: (field: 'email' | 'password' | 'phoneNumber', value: string) => void
    onSubmit: (e: React.FormEvent) => void
}

export default function SignupForm({ formData, updateFormData, onSubmit }: SignupFormProps) {
    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h2 className="text-2xl font-bold">Sign Up</h2>
                <p className="text-sm text-gray-600">Getting you onboard :)</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
                <Input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    className="w-full h-10 px-4 rounded-xl border border-gray-400"
                    required
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => updateFormData('password', e.target.value)}
                    className="w-full h-10 px-4 rounded-xl border border-gray-400"
                    required
                />
                <Input
                    type="tel"
                    placeholder="+92 Phone Number"
                    value={formData.phoneNumber}
                    onChange={(e) => updateFormData('phoneNumber', e.target.value)}
                    className="w-full h-10 px-4 rounded-xl border border-gray-400"
                    required
                />

                <Button
                    type="submit"
                    className="w-full h-10 bg-[#f9690f] hover:bg-[#f9690f]/90 text-white"
                >
                    Verify Phone Number
                </Button>
            </form>

            <div className="flex justify-center space-x-1 text-sm">
                <span className="text-gray-700">Already have an account?</span>
                <Link
                    href={ROUTES.LOGIN}
                    className="text-[#f9690f] underline"
                >
                    Login
                </Link>
            </div>

            <div className="flex items-center">
                <Separator className="flex-1" />
                <span className="px-2 text-sm text-[#98a2b3]">Or</span>
                <Separator className="flex-1" />
            </div>

            <OAuthButtons />
        </div>
    )
} 