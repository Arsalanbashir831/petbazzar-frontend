'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import AuthLayout from '@/components/auth/auth-layout'
import { ROUTES } from '@/contants/routes'

// Import step components
import StoreDetailsStep from '@/components/auth/signup-steps/StoreDetailsStep'
import StoreLocationStep from '@/components/auth/signup-steps/StoreLocationStep'
import IdentityStep from '@/components/auth/signup-steps/IdentityStep'

// Step configurations
const ONBOARDING_STEPS = [
    {
        id: 1,
        title: 'Store Details',
    },
    {
        id: 2,
        title: 'Store Location',
    },
    {
        id: 3,
        title: 'Identity Verification',
    }
]

// Onboarding form data interface
interface OnboardingFormData {
    // Step 1: Store Details
    name: string
    storeName: string
    storeLogo: string
    
    // Step 2: Store Location
    building: string
    street: string
    area: string
    city: string
    province: string
    postalCode: string
    
    // Step 3: Identity Verification
    cnic: string
    cnicExpiry: string
    cnicFront: string
    cnicBack: string
}

export default function OnboardingPage() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState<OnboardingFormData>({
        // Step 1
        name: '',
        storeName: '',
        storeLogo: '',
        
        // Step 2
        building: '',
        street: '',
        area: '',
        city: '',
        province: '',
        postalCode: '',
        
        // Step 3
        cnic: '',
        cnicExpiry: '',
        cnicFront: '',
        cnicBack: ''
    })

    const updateFormData = (field: keyof OnboardingFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    // Wrapper functions for type safety
    const updateStoreDetails = (field: 'name' | 'storeName' | 'storeLogo', value: string) => {
        updateFormData(field, value)
    }

    const updateStoreLocation = (field: 'building' | 'street' | 'area' | 'city' | 'province' | 'postalCode', value: string) => {
        updateFormData(field, value)
    }

    const updateIdentity = (field: 'cnic' | 'cnicExpiry' | 'cnicFront' | 'cnicBack', value: string) => {
        updateFormData(field, value)
    }

    const handleNext = () => {
        if (currentStep < ONBOARDING_STEPS.length) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const handleFinalSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: Submit all onboarding data to API
        console.log('Final onboarding data:', formData)
        router.push(ROUTES.SELLER.DASHBOARD)
    }

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <StoreDetailsStep
                        formData={{
                            name: formData.name,
                            storeName: formData.storeName,
                            storeLogo: formData.storeLogo
                        }}
                        updateFormData={updateStoreDetails}
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                    />
                )
            case 2:
                return (
                    <StoreLocationStep
                        formData={{
                            building: formData.building,
                            street: formData.street,
                            area: formData.area,
                            city: formData.city,
                            province: formData.province,
                            postalCode: formData.postalCode
                        }}
                        updateFormData={updateStoreLocation}
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                    />
                )
            case 3:
                return (
                    <IdentityStep
                        formData={{
                            cnic: formData.cnic,
                            cnicExpiry: formData.cnicExpiry,
                            cnicFront: formData.cnicFront,
                            cnicBack: formData.cnicBack
                        }}
                        updateFormData={updateIdentity}
                        onSubmit={handleFinalSubmit}
                        onPrevious={handlePrevious}
                    />
                )
            default:
                return null
        }
    }

    return (
        <AuthLayout
            tagline='Making your Online Store in just few clicks'
            showLogo={true}
            currentStep={currentStep}
            totalSteps={ONBOARDING_STEPS.length}
            showStepIndicator={true}
        >
            <Card className="w-full bg-transparent border-none shadow-none">
                <CardContent className="space-y-6 p-8">
                    {renderCurrentStep()}
                </CardContent>
            </Card>
        </AuthLayout>
    )
} 