'use client'

import React, { useState, ChangeEvent } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { PlusIcon } from 'lucide-react'

interface StoreDetailsStepProps {
    formData: {
        name: string
        storeName: string
        storeLogo: string
    }
    updateFormData: (field: 'name' | 'storeName' | 'storeLogo', value: string) => void
    onNext: () => void
    onPrevious: () => void
}

export default function StoreDetailsStep({ formData, updateFormData, onNext, onPrevious }: StoreDetailsStepProps) {
    const [logoPreview, setLogoPreview] = useState<string | null>(null)

    const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null
        if (file) {
            const url = URL.createObjectURL(file)
            setLogoPreview(url)
            updateFormData('storeLogo', file.name)
        } else {
            setLogoPreview(null)
            updateFormData('storeLogo', '')
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onNext()
    }

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h2 className="text-2xl font-bold">Onboarding</h2>
                <p className="text-sm text-gray-600">Getting you onboard ;)</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    className="w-full h-10 px-4 rounded-xl border border-gray-400"
                    required
                />
                <Input
                    type="text"
                    placeholder="Your Store Name"
                    value={formData.storeName}
                    onChange={(e) => updateFormData('storeName', e.target.value)}
                    className="w-full h-10 px-4 rounded-xl border border-gray-400"
                    required
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
                        Next
                    </Button>
                </div>
            </form>
        </div>
    )
} 