'use client'

import React from 'react'

interface StepIndicatorProps {
    currentStep: number
    totalSteps: number
}

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
    return (
        <div className="absolute bottom-8 w-full flex justify-center">
            <div className="flex items-center">
                {/* Connected progress bar for completed and current steps */}
                {currentStep > 0 && (
                    <div 
                        className="bg-white rounded-full h-3"
                        style={{ 
                            width: `${currentStep * 32 + (currentStep - 1) * 8}px` // 32px per pill + 8px gaps
                        }}
                    />
                )}
                
                {/* Gap after progress bar */}
                {currentStep < totalSteps && <div className="w-2" />}
                
                {/* Future steps as dots */}
                {Array.from({ length: totalSteps - currentStep }, (_, i) => (
                    <React.Fragment key={`future-${i}`}>
                        <span className="w-3 h-3 bg-white/50 rounded-full block" />
                        {i < totalSteps - currentStep - 1 && <div className="w-2" />}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
} 