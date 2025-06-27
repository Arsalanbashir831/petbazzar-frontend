'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
   
} from '@/components/ui/dialog'

export default function SignupPage() {
    const router = useRouter()
    const [otpOpen, setOtpOpen] = useState(false)

    const handleSignupSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // instead of router.push, open the OTP dialog:
        setOtpOpen(true)
    }

    const handleOtpSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setOtpOpen(false)
        // proceed to next step
        router.push('/seller/signup/details')
    }

    return (
        <main className="flex w-full min-h-screen bg-white">
            {/* LEFT (signup form) */}
            <div className="flex-1 flex items-center justify-center">
                <Card className="max-w-md w-full  bg-transparent border-none shadow-none">
                    <CardContent className="space-y-6 p-8">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-bold">Signup</h2>
                            <p className="text-sm text-gray-600">Getting you onboard :)</p>
                        </div>

                        <form onSubmit={handleSignupSubmit} className="space-y-4">
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
                            <Input
                                type="tel"
                                placeholder="+92 Phone Number"
                                className="w-full h-10 px-4 rounded-xl border border-gray-400"
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
                            <button
                                onClick={() => router.push('/auth/login')}
                                className="text-[#f9690f] underline"
                            >
                                Login
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
                            <img
                                src="/icon-google---original.svg"
                                alt="Google"
                                className="w-5 h-5"
                            />
                            <span className="text-[#545454]">Google</span>
                        </Button>
                    </CardContent>
                </Card>
            </div>


            {/* OTP Dialog */}
            <Dialog open={otpOpen} onOpenChange={setOtpOpen}>
                <DialogContent className="sm:max-w-xl w-full p-6 bg-white rounded-lg">
                    {/* Header */}
                    <DialogHeader className="space-y-2">
                        <DialogTitle className="text-center text-xl font-bold">
                            OTP Verification
                        </DialogTitle>
                        <DialogDescription className="text-center text-lg text-gray-600">
                            Enter 6 digit OTP code sent to{' '} <br />
                            <span className="font-medium">+92 321 1234567</span>
                        </DialogDescription>
                        <button
                            onClick={() => setOtpOpen(false)}
                            className="block mx-auto text-xs text-[#f9690f] underline"
                        >
                            Change phone number
                        </button>
                    </DialogHeader>

                    {/* Inputs */}
                    <form onSubmit={handleOtpSubmit} className="space-y-6">
                        <div className="flex items-center justify-center space-x-2">
                            {/* first 2 digits */}
                            {[0, 1,2].map((i) => (
                                <Input
                                    key={`otp-${i}`}
                                    type="text"
                                    maxLength={1}
                                    className="h-12 w-12 text-center text-lg font-medium border border-gray-300 rounded"
                                />
                            ))}
                            {/* dash */}
                            <span className="text-2xl text-[#f9690f]">-</span>
                            {/* last 4 digits */}
                            {[ 3, 4, 5].map((i) => (
                                <Input
                                    key={`otp-${i}`}
                                    type="text"
                                    maxLength={1}
                                    className="h-12 w-12 text-center text-lg font-medium border border-gray-300 rounded"
                                />
                            ))}
                        </div>

                        {/* Resend line */}
                        <p className="text-center text-sm text-gray-600">
                            Haven’t received the code?{' '}
                            <button
                                type="button"
                                onClick={() => {
                                    /* TODO: resend logic */
                                }}
                                className="text-[#f9690f] underline"
                            >
                                Resend
                            </button>
                        </p>

                        {/* Next button */}
                        <Button
                            type="submit"
                            className="w-full h-10 bg-[#f9690f] hover:bg-[#f9690f]/90 text-white"
                        >
                            Next
                        </Button>

                       
                    </form>
                </DialogContent>
            </Dialog>

        </main>
    )
}
