'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { PlusIcon } from 'lucide-react'

export default function StoreDetailsPage() {
    const router = useRouter()

    const [name, setName] = useState('')
    const [storeName, setStoreName] = useState('')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [logoFile, setLogoFile] = useState<File | null>(null)
    const [logoPreview, setLogoPreview] = useState<string | null>(null)

    const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null
        setLogoFile(file)
        if (file) {
            const url = URL.createObjectURL(file)
            setLogoPreview(url)
        } else {
            setLogoPreview(null)
        }
    }

    const handleNext = (e: FormEvent) => {
        e.preventDefault()
        // TODO: persist name, storeName, logoFile in context or API
        router.push('/seller/signup/location')
    }

    return (
        <div className="flex w-full h-full items-center justify-center">
            <Card className="max-w-md w-full bg-transparent border-none shadow-none">
                <CardContent className="space-y-6 p-8">
                    {/* Heading */}
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold">Signup</h2>
                        <p className="text-sm text-gray-600">Getting you onboard ;)</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleNext} className=" space-y-4">
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your Name"
                            className="w-full h-10 px-4 rounded-xl border border-gray-400"
                        />
                        <Input
                            value={storeName}
                            onChange={(e) => setStoreName(e.target.value)}
                            placeholder="Your Store Name"
                            className="w-full h-10 px-4 rounded-xl border border-gray-400"
                        />

                        {/* Logo / Picture Upload */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Logo or Picture
                            </label>
                            <div className="relative">
                                <div className="h-24 rounded-xl border border-gray-400 flex items-center justify-center overflow-hidden">
                                    {logoPreview ? (
                                        <img
                                            src={logoPreview}
                                            alt="Logo preview"
                                            className="h-full object-contain"
                                        />
                                    ) : (
                                        <PlusIcon className="w-6 h-6 text-gray-400" />
                                    )}
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* Next Button */}
                        <Button
                            type="submit"
                            className="w-full h-10 bg-[#f9690f] hover:bg-[#f9690f]/90 text-white"
                        >
                            Next
                        </Button>
                    </form>

                    {/* Login link */}
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

                    {/* Google button */}
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
