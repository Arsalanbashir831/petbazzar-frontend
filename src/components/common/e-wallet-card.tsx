'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { CreditCard, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EWalletCardProps {
  className?: string
  availableAmountLabel?: string
  amount: string
  onWithdraw?: () => void
}

function EWalletCardComponent({ className, availableAmountLabel = 'Available for Withdrawal', amount, onWithdraw }: EWalletCardProps) {
  return (
    <Card className={cn('max-w-xs w-56 rounded-lg bg-orange-500 text-white', className)}>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <CreditCard className="h-10 w-10" />
          <div>
            <div className="text-2xl font-bold">{amount}</div>
            <div className="text-xs">{availableAmountLabel}</div>
          </div>
        </div>
        <Separator className="my-3 border-white/40" />
        <button
          type="button"
          onClick={onWithdraw}
          className="flex w-full items-center justify-between text-left"
        >
          <span>Withdraw</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </CardContent>
    </Card>
  )
}

const EWalletCard = React.memo(EWalletCardComponent)
export default EWalletCard


