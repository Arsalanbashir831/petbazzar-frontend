'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog'

interface OtpVerificationProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (e: React.FormEvent) => void
    phoneNumber: string
}

export default function OtpVerification({ isOpen, onClose, onSubmit, phoneNumber }: OtpVerificationProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-xl w-full p-6 bg-white rounded-lg">
                <DialogHeader className="space-y-2">
                    <DialogTitle className="text-center text-xl font-bold">
                        OTP Verification
                    </DialogTitle>
                    <DialogDescription className="text-center text-lg text-gray-600">
                        Enter 6 digit OTP code sent to{' '} <br />
                        <span className="font-medium">{phoneNumber}</span>
                    </DialogDescription>
                    <button
                        onClick={onClose}
                        className="block mx-auto text-xs text-[#f9690f] underline"
                    >
                        Change phone number
                    </button>
                </DialogHeader>

                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="flex items-center justify-center space-x-2">
                        {[0, 1, 2].map((i) => (
                            <Input
                                key={`otp-${i}`}
                                type="text"
                                maxLength={1}
                                className="h-12 w-12 text-center text-lg font-medium border border-gray-300 rounded"
                            />
                        ))}
                        <span className="text-2xl text-[#f9690f]">-</span>
                        {[3, 4, 5].map((i) => (
                            <Input
                                key={`otp-${i}`}
                                type="text"
                                maxLength={1}
                                className="h-12 w-12 text-center text-lg font-medium border border-gray-300 rounded"
                            />
                        ))}
                    </div>

                    <p className="text-center text-sm text-gray-600">
                        Haven't received the code?{' '}
                        <button
                            type="button"
                            onClick={() => {
                                /* TODO: resend logic */
                            }}
                            className="text-[#f9690f] underline"
                        >
                            Resend
                        </button>
                    </p>

                    <Button
                        type="submit"
                        className="w-full h-10 bg-[#f9690f] hover:bg-[#f9690f]/90 text-white"
                    >
                        Next
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
} 