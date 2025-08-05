import React from 'react'
import { Card, CardContent } from '@/components/ui/card'

interface AuthFormWrapperProps {
    children: React.ReactNode
    className?: string
}

export default function AuthFormWrapper({ children, className = '' }: AuthFormWrapperProps) {
    return (
        <Card className={`w-full bg-transparent border-none shadow-none ${className}`}>
            <CardContent className="space-y-6 p-8">
                {children}
            </CardContent>
        </Card>
    )
} 