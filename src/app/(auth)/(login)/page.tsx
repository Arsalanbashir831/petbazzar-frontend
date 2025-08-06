'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import AuthLayout from '../../../components/auth/auth-layout'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'
import { OAuthButtons } from '@/components/auth/oauth-buttons'

export default function LoginPage() {
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: call your login API here, then:
        router.push(ROUTES.SELLER.DASHBOARD)
    }

    return (
        <AuthLayout>
            <Card className="w-full bg-transparent border-none shadow-none">
                <CardContent className="space-y-6 p-8">
                    <h2 className="text-2xl font-bold">Login</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                                type="email"
                                placeholder="Email"
                                className="w-full h-10 px-4 rounded-xl border border-gray-400"
                            />
                            <Input
                                type="password"
                                placeholder="Password"
                                className="w-full h-10 px-4 rounded-xl border border-gray-400"
                            />
                        

                        <Button
                            type="submit"
                            className="w-full h-10 bg-[#f9690f] hover:bg-[#f9690f]/90 text-white"
                        >
                            Login
                        </Button>
                    </form>

                    <div className="flex items-center justify-center space-x-1">
                        <span className="text-sm text-gray-700">Don't have an account?</span>
                        <Link
                            href={ROUTES.SIGNUP}
                            className="text-sm text-[#f9690f] underline"
                        >
                            Signup
                        </Link>
                    </div>

                    <div className="flex items-center">
                        <Separator className="flex-1" />
                        <span className="px-2 text-sm text-[#98a2b3]">Or</span>
                        <Separator className="flex-1" />
                    </div>

                    <OAuthButtons />
                </CardContent>
            </Card>
        </AuthLayout>
    )
}
