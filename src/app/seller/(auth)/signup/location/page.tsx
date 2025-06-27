'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function StoreLocationPage() {
    const router = useRouter()

    // form state
    const [building, setBuilding] = useState('')
    const [street, setStreet] = useState('')
    const [area, setArea] = useState('')
    const [city, setCity] = useState('')
    const [province, setProvince] = useState('')
    const [postalCode, setPostalCode] = useState('')

    const handleNext = (e: FormEvent) => {
        e.preventDefault()
        // TODO: save location data to context or API
        router.push('/seller/signup/payment')
    }

    return (
        <div className="flex w-full h-full items-center justify-center">
            <Card className="max-w-md w-full bg-transparent border-none shadow-none">
                <CardContent className="space-y-6 p-8">
                    {/* Heading */}
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold">Signup</h2>
                        <p className="text-sm text-gray-600">Store Location</p>
                    </div>

                    {/* Location Form */}
                    <form onSubmit={handleNext} className="space-y-4">
                        <Input
                            value={building}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setBuilding(e.target.value)
                            }
                            placeholder="Building / House No. / Floor"
                            className="w-full h-10 px-4 rounded-xl border border-gray-400"
                        />
                        <Input
                            value={street}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setStreet(e.target.value)
                            }
                            placeholder="Street No."
                            className="w-full h-10 px-4 rounded-xl border border-gray-400"
                        />
                        <Input
                            value={area}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setArea(e.target.value)
                            }
                            placeholder="Area"
                            className="w-full h-10 px-4 rounded-xl border border-gray-400"
                        />
                        <Input
                            value={city}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setCity(e.target.value)
                            }
                            placeholder="City"
                            className="w-full h-10 px-4 rounded-xl border border-gray-400"
                        />
                        <Input
                            value={province}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setProvince(e.target.value)
                            }
                            placeholder="Province"
                            className="w-full h-10 px-4 rounded-xl border border-gray-400"
                        />
                        <Input
                            value={postalCode}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setPostalCode(e.target.value)
                            }
                            placeholder="Postal Code"
                            className="w-full h-10 px-4 rounded-xl border border-gray-400"
                        />

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
