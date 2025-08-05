import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import AuthLayout from '@/components/auth/auth-layout'
import AuthFormWrapper from './AuthFormWrapper'

// Example 1: Basic Login Form
export function LoginFormExample() {
    return (
        <AuthLayout
            imageSrc="/seller/shop.png"
            tagline="Let's sell to thousands of pet lovers at one place"
            showLogo={true}
        >
            <AuthFormWrapper>
                <h2 className="text-2xl font-bold">Login</h2>
                
                <form className="space-y-4">
                    <Input
                        type="email"
                        placeholder="Email or Phone number"
                        className="w-full h-10 px-4 rounded-xl border border-gray-400"
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        className="w-full h-10 px-4 rounded-xl border border-gray-400"
                    />
                    
                    <Button
                        type="submit"
                        className="w-full h-10 bg-[#f9690f] hover:bg-[#f9690f]/90 text-white"
                    >
                        Login
                    </Button>
                </form>

                <div className="flex items-center justify-center space-x-1">
                    <span className="text-sm text-gray-700">Don't have an account?</span>
                    <button className="text-sm text-[#f9690f] underline">
                        Signup
                    </button>
                </div>

                <div className="flex items-center">
                    <Separator className="flex-1" />
                    <span className="px-2 text-sm text-[#98a2b3]">Or</span>
                    <Separator className="flex-1" />
                </div>

                <Button
                    variant="outline"
                    className="flex w-full h-10 items-center justify-center gap-2 bg-[#ffe2cc] rounded-lg hover:bg-[#ffe2cc]/90"
                >
                    <span className="text-[#545454]">Google</span>
                </Button>
            </AuthFormWrapper>
        </AuthLayout>
    )
}

// Example 2: Signup Form with Different Image
export function SignupFormExample() {
    return (
        <AuthLayout
            imageSrc="/seller/laptop.png"
            tagline="Join thousands of successful pet sellers"
            showLogo={true}
        >
            <AuthFormWrapper>
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold">Signup</h2>
                    <p className="text-sm text-gray-600">Getting you onboard :)</p>
                </div>

                <form className="space-y-4">
                    <Input
                        type="email"
                        placeholder="Email"
                        className="w-full h-10 px-4 rounded-xl border border-gray-400"
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        className="w-full h-10 px-4 rounded-xl border border-gray-400"
                    />
                    <Input
                        type="tel"
                        placeholder="+92 Phone Number"
                        className="w-full h-10 px-4 rounded-xl border border-gray-400"
                    />

                    <Button
                        type="submit"
                        className="w-full h-10 bg-[#f9690f] hover:bg-[#f9690f]/90 text-white"
                    >
                        Verify Phone Number
                    </Button>
                </form>

                <div className="flex justify-center space-x-1 text-sm">
                    <span className="text-gray-700">Already have an account?</span>
                    <button className="text-[#f9690f] underline">
                        Login
                    </button>
                </div>
            </AuthFormWrapper>
        </AuthLayout>
    )
}

// Example 3: Password Reset Form (No Logo)
export function PasswordResetExample() {
    return (
        <AuthLayout
            imageSrc="/seller/paw.png"
            tagline="We'll help you get back to selling"
            showLogo={false}
        >
            <AuthFormWrapper>
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold">Reset Password</h2>
                    <p className="text-sm text-gray-600">Enter your email to receive reset instructions</p>
                </div>

                <form className="space-y-4">
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full h-10 px-4 rounded-xl border border-gray-400"
                    />
                    
                    <Button
                        type="submit"
                        className="w-full h-10 bg-[#f9690f] hover:bg-[#f9690f]/90 text-white"
                    >
                        Send Reset Link
                    </Button>
                </form>

                <div className="flex justify-center space-x-1 text-sm">
                    <span className="text-gray-700">Remember your password?</span>
                    <button className="text-[#f9690f] underline">
                        Back to Login
                    </button>
                </div>
            </AuthFormWrapper>
        </AuthLayout>
    )
} 