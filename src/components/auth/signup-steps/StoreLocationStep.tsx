'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface StoreLocationStepProps {
    formData: {
        building: string
        street: string
        area: string
        city: string
        province: string
        postalCode: string
    }
    updateFormData: (field: 'building' | 'street' | 'area' | 'city' | 'province' | 'postalCode', value: string) => void
    onNext: () => void
    onPrevious: () => void
}

export default function StoreLocationStep({ formData, updateFormData, onNext, onPrevious }: StoreLocationStepProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onNext()
    }

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h2 className="text-2xl font-bold">Onboarding</h2>
                <p className="text-sm text-gray-600">Store Location</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    value={formData.building}
                    onChange={(e) => updateFormData('building', e.target.value)}
                    placeholder="Building / House No. / Floor"
                    className="w-full h-10 px-4 rounded-xl border border-gray-400"
                    required
                />
                <Input
                    value={formData.street}
                    onChange={(e) => updateFormData('street', e.target.value)}
                    placeholder="Street No."
                    className="w-full h-10 px-4 rounded-xl border border-gray-400"
                    required
                />
                <Input
                    value={formData.area}
                    onChange={(e) => updateFormData('area', e.target.value)}
                    placeholder="Area"
                    className="w-full h-10 px-4 rounded-xl border border-gray-400"
                    required
                />
                <Input
                    value={formData.city}
                    onChange={(e) => updateFormData('city', e.target.value)}
                    placeholder="City"
                    className="w-full h-10 px-4 rounded-xl border border-gray-400"
                    required
                />
                <Input
                    value={formData.province}
                    onChange={(e) => updateFormData('province', e.target.value)}
                    placeholder="Province"
                    className="w-full h-10 px-4 rounded-xl border border-gray-400"
                    required
                />
                <Input
                    value={formData.postalCode}
                    onChange={(e) => updateFormData('postalCode', e.target.value)}
                    placeholder="Postal Code"
                    className="w-full h-10 px-4 rounded-xl border border-gray-400"
                    required
                />

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