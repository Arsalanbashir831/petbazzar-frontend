'use client'

import React from 'react'

interface StepIndicatorProps {
    currentStep: number
    totalSteps: number
}

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
    return (
        <div className="absolute bottom-8 w-full flex justify-center">
            <div className="flex items-center space-x-1">
                {Array.from({ length: totalSteps }, (_, i) => {
                    const stepNumber = i + 1
                    const isCompleted = stepNumber < currentStep
                    const isCurrent = stepNumber === currentStep
                    
                    return (
                        <React.Fragment key={i}>
                            {/* Step dot */}
                            <div className="relative">
                                <span
                                    className={`
                                        w-3 h-3 rounded-full transition-colors duration-200
                                        ${isCompleted || isCurrent ? 'bg-white' : 'bg-white/50'}
                                    `}
                                />
                            </div>
                            
                            {/* Connector line (except for the last step) */}
                            {i < totalSteps - 1 && (
                                <div 
                                    className={`
                                        w-8 h-1 transition-colors duration-200
                                        ${isCompleted ? 'bg-white' : 'bg-white/50'}
                                    `}
                                />
                            )}
                        </React.Fragment>
                    )
                })}
            </div>
        </div>
    )
} 