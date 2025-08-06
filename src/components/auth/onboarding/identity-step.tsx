'use client'

import React, { useState, ChangeEvent } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'

interface IdentityStepProps {
    formData: {
        cnic: string
        cnicExpiry: string
        cnicFront: string
        cnicBack: string
    }
    updateFormData: (field: 'cnic' | 'cnicExpiry' | 'cnicFront' | 'cnicBack', value: string) => void
    onSubmit: (e: React.FormEvent) => void
    onPrevious: () => void
}

export default function IdentityStep({ formData, updateFormData, onSubmit, onPrevious }: IdentityStepProps) {
    const [frontPreview, setFrontPreview] = useState<string | null>(null)
    const [backPreview, setBackPreview] = useState<string | null>(null)

    const onFileChange = (
        e: ChangeEvent<HTMLInputElement>,
        which: 'front' | 'back'
    ) => {
        const file = e.target.files?.[0] ?? null
        const url = file ? URL.createObjectURL(file) : null
        if (which === 'front') {
            setFrontPreview(url)
            updateFormData('cnicFront', file?.name || '')
        } else {
            setBackPreview(url)
            updateFormData('cnicBack', file?.name || '')
        }
    }

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h2 className="text-2xl font-bold">Identity Verification</h2>
                <p className="text-sm text-gray-600">Verify your identity</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
                {/* CNIC Number */}
                <Input
                    value={formData.cnic}
                    onChange={(e) => updateFormData('cnic', e.target.value)}
                    placeholder="Enter your CNIC"
                    className="w-full h-10 px-4 rounded-xl border border-gray-400"
                    required
                />

                {/* CNIC Expiry */}
                <div className="relative">
                    <Input
                        value={formData.cnicExpiry}
                        onChange={(e) => updateFormData('cnicExpiry', e.target.value)}
                        type="month"
                        placeholder="CNIC Expiry Date"
                        className="w-full h-10 pl-4 pr-10 rounded-xl border border-gray-400 appearance-none"
                        required
                    />
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
                            required
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
                            required
                        />
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button
                        type="button"
                        onClick={onPrevious}
                        variant="outline"
                        className="flex-1 h-10"
                    >
                        Previous
                    </Button>
                    <Button
                        type="submit"
                        className="flex-1 h-10 bg-[#f9690f] hover:bg-[#f9690f]/90 text-white"
                    >
                        Create Account
                    </Button>
                </div>
            </form>
        </div>
    )
} 