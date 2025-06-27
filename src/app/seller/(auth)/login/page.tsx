'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

export default function LoginPage() {
    const router = useRouter()

    const loginData = {
        title: 'Login',
        inputs: [
            { placeholder: 'Email or Phone number' },
            { placeholder: 'Password', type: 'password' },
        ],
        buttonText: 'Login',
        signupText: "Don't have an account?",
        signupLink: 'Signup',
    }

    const handleSignupClick = () => {
        router.push('/seller/signup')
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: call your login API here, then:
        // router.push('/dashboard')
    }

    return (
        <main className="flex min-h-screen bg-white">
            {/* ─── LEFT (form) ─── */}
            <div className="flex-1 flex items-center justify-center">
                <Card className="w-full max-w-md bg-transparent border-none shadow-none">
                    <CardContent className="space-y-6 p-8">
                        <h2 className="text-2xl font-bold">{loginData.title}</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {loginData.inputs.map((input, idx) => (
                                <Input
                                    key={idx}
                                    type={input.type ?? 'text'}
                                    placeholder={input.placeholder}
                                    className="w-full h-10 px-4 rounded-xl border border-gray-400"
                                />
                            ))}

                            <Button
                                type="submit"
                                className="w-full h-10 bg-[#f9690f] hover:bg-[#f9690f]/90 text-white"
                            >
                                {loginData.buttonText}
                            </Button>
                        </form>

                        <div className="flex items-center justify-center space-x-1">
                            <span className="text-sm text-gray-700">{loginData.signupText}</span>
                            <button
                                onClick={handleSignupClick}
                                className="text-sm text-[#f9690f] underline"
                            >
                                {loginData.signupLink}
                            </button>
                        </div>

                        <div className="flex items-center">
                            <Separator className="flex-1" />
                            <span className="px-2 text-sm text-[#98a2b3]">Or</span>
                            <Separator className="flex-1" />
                        </div>

                        <Button
                            variant="outline"
                            className="flex w-full h-10 items-center justify-center gap-2 bg-[#ffe2cc] rounded-lg hover:bg-[#ffe2cc]/90"
                        >
                            {/* <img
                                src="/icon-google---original.svg"
                                alt="Google icon"
                                className="w-5 h-5"
                            /> */}
                            <span className="text-[#545454]">Google</span>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* ─── RIGHT (orange panel) ─── */}
            <div className="w-1/3 relative hidden md:block">
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

                    {/* Tagline */}
                    <div className="px-8 text-center text-white text-2xl font-bold mt-8">
                        Let&apos;s sell to thousands of pet lovers at one place
                    </div>

                    {/* Main illustration */}
                    <div className="absolute bottom-0 w-full flex justify-center mb-20">
                        <Image
                            src="/seller/shop.png"
                            alt="Shop illustration"
                            width={500}
                            height={420}
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}
