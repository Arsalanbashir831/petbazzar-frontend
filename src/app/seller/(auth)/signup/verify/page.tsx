/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { PlusIcon } from 'lucide-react'

export default function IdentityPage() {
    const router = useRouter()

    // form state
    const [cnic, setCnic] = useState('')
    const [expiry, setExpiry] = useState('')   // format YYYY-MM
    const [frontFile, setFrontFile] = useState<File | null>(null)
    const [backFile, setBackFile] = useState<File | null>(null)
    const [frontPreview, setFrontPreview] = useState<string | null>(null)
    const [backPreview, setBackPreview] = useState<string | null>(null)

    const onFileChange = (
        e: ChangeEvent<HTMLInputElement>,
        which: 'front' | 'back'
    ) => {
        const file = e.target.files?.[0] ?? null
        const url = file ? URL.createObjectURL(file) : null
        if (which === 'front') {
            setFrontFile(file)
            setFrontPreview(url)
        } else {
            setBackFile(file)
            setBackPreview(url)
        }
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        // TODO: send CNIC, expiry, and files to your API
        router.push('/seller/dashboard')  // or wherever you go next
    }

    return (
        <div className="flex w-full h-full items-center justify-center">
            <Card className="max-w-md w-full bg-transparent border-none shadow-none">
                <CardContent className="space-y-6 p-8">
                    {/* Heading */}
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold">Signup</h2>
                        <p className="text-sm text-gray-600">Finalizing…</p>
                    </div>

                    {/* Identity Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* CNIC Number */}
                        <Input
                            value={cnic}
                            onChange={(e) => setCnic(e.target.value)}
                            placeholder="Enter your CNIC"
                            className="w-full h-10 px-4 rounded-xl border border-gray-400"
                        />

                        {/* CNIC Expiry */}
                        <div className="relative">
                            <Input
                                value={expiry}
                                onChange={(e) => setExpiry(e.target.value)}
                                type="month"
                                placeholder="CNIC Expiry Date"
                                className="w-full h-10 pl-4 pr-10 rounded-xl border border-gray-400 appearance-none"
                            />
                            {/* date icon if desired */}
                        </div>

                        {/* Upload Front CNIC */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Upload Front of your CNIC
                            </label>
                            <div className="relative">
                                <div className="h-24 rounded-xl border border-gray-400 flex items-center justify-center overflow-hidden">
                                    {frontPreview ? (
                                        <img
                                            src={frontPreview}
                                            alt="Front CNIC"
                                            className="h-full object-contain"
                                        />
                                    ) : (
                                        <PlusIcon className="w-6 h-6 text-gray-400" />
                                    )}
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => onFileChange(e, 'front')}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* Upload Back CNIC */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Upload Back of your CNIC
                            </label>
                            <div className="relative">
                                <div className="h-24 rounded-xl border border-gray-400 flex items-center justify-center overflow-hidden">
                                    {backPreview ? (
                                        <img
                                            src={backPreview}
                                            alt="Back CNIC"
                                            className="h-full object-contain"
                                        />
                                    ) : (
                                        <PlusIcon className="w-6 h-6 text-gray-400" />
                                    )}
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => onFileChange(e, 'back')}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* Done Button */}
                        <Button
                            type="submit"
                            className="w-full h-10 bg-[#f9690f] hover:bg-[#f9690f]/90 text-white"
                        >
                            Done
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
