'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function PaymentPage() {
    const router = useRouter()

    const [cardNumber, setCardNumber] = useState('')
    const [expiry, setExpiry] = useState('')      // format YYYY-MM
    const [cvc, setCvc] = useState('')
    const [holderName, setHolderName] = useState('')

    const handleNext = (e: FormEvent) => {
        e.preventDefault()
        // TODO: validate & save payment info
        router.push('/seller/signup/verify')
    }

    return (
        <div className="flex w-full h-full items-center justify-center">
            <Card className="max-w-md w-full bg-transparent border-none shadow-none">
                <CardContent className="space-y-6 p-8">
                    {/* Heading */}
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold">Signup</h2>
                        <p className="text-sm text-gray-600">Card Details</p>
                    </div>

                    {/* Payment Form */}
                    <form onSubmit={handleNext} className="space-y-4">
                        {/* Card Number */}
                        <Input
                            value={cardNumber}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setCardNumber(e.target.value)
                            }
                            placeholder="Card No."
                            className="w-full h-10 px-4 rounded-xl border border-gray-400"
                        />

                        {/* Expiry + CVC */}
                        <div className="flex gap-4">
                            {/* Expiry as month picker */}
                            <div className="relative flex-1">
                                <Input
                                    value={expiry}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setExpiry(e.target.value)
                                    }
                                    type="month"
                                    placeholder="MM/YYYY"
                                    className="w-full h-10 pl-4 pr-10 rounded-xl border border-gray-400 appearance-none"
                                />
                                {/* <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" /> */}
                            </div>

                            {/* CVC */}
                            <Input
                                value={cvc}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setCvc(e.target.value)
                                }
                                placeholder="CVC"
                                maxLength={4}
                                className="flex-1 h-10 px-4 rounded-xl border border-gray-400"
                            />
                        </div>

                        {/* Card Holder Name */}
                        <Input
                            value={holderName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setHolderName(e.target.value)
                            }
                            placeholder="Card Holder Name"
                            className="w-full h-10 px-4 rounded-xl border border-gray-400"
                        />

                        {/* Next button */}
                        <Button
                            type="submit"
                            className="w-full h-10 bg-[#f9690f] hover:bg-[#f9690f]/90 text-white"
                        >
                            Next
                        </Button>
                    </form>

                    {/* Already have an account? */}
                    <div className="flex justify-center space-x-1 text-sm">
                        <span className="text-gray-700">Already have an account?</span>
                        <button
                            onClick={() => router.push('/auth/login')}
                            className="text-[#f9690f] underline"
                        >
                            Login
                        </button>
                    </div>

                    {/* Or separator */}
                    <div className="flex items-center">
                        <Separator className="flex-1" />
                        <span className="px-2 text-sm text-[#98a2b3]">Or</span>
                        <Separator className="flex-1" />
                    </div>

                    {/* Google sign-in */}
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
    )
}
