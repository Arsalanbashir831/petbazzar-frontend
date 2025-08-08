'use client'

import React, { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

export type PeriodOption = 'Monthly' | 'Yearly'

export interface SalesPoint {
  month: string
  sales: number
}

interface SalesSummaryCardProps {
  title?: string
  period: PeriodOption
  onPeriodChange: (p: PeriodOption) => void
  year: number
  onYearChange: (y: number) => void
  data: SalesPoint[]
  className?: string
}

function SalesSummaryCardComponent({
  title = 'Total Sales',
  period,
  onPeriodChange,
  year,
  onYearChange,
  data,
  className,
}: SalesSummaryCardProps) {
  const totalSales = useMemo(() => data.reduce((sum, d) => sum + d.sales, 0), [data])

  return (
    <Card className={className + ''}>
      <CardHeader className="pb-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex flex-col gap-3">
            <CardTitle className="text-xl">{title}</CardTitle>
            <div className="flex gap-2">
              {/* Period select */}
              <div className="w-40 border border-border rounded-full px-3">
                <Select value={period} onValueChange={(v) => onPeriodChange(v as PeriodOption)}>
                  <SelectTrigger className="h-8 bg-transparent border-none shadow-none outline-none p-0 focus:ring-0 focus-visible:ring-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border border-border bg-card">
                    {(['Monthly', 'Yearly'] as const).map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Year select */}
              <div className="w-40 border border-border rounded-full px-3">
                <Select value={String(year)} onValueChange={(v) => onYearChange(Number(v))}>
                  <SelectTrigger className="h-8 bg-transparent border-none shadow-none outline-none p-0 focus:ring-0 focus-visible:ring-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border border-border bg-card">
                    {[2022, 2023, 2024, 2025].map((y) => (
                      <SelectItem key={y} value={String(y)}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="text-2xl font-bold text-orange-500">
            {Intl.NumberFormat().format(totalSales)} PKR
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFA500" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FFA500" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => (v >= 1000 ? `${v / 1000}K` : v)} />
              <Tooltip formatter={(value: number) => `${(value as number).toLocaleString()} PKR`} />
              <Bar dataKey="sales" fill="url(#salesGradient)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

const SalesSummaryCard = React.memo(SalesSummaryCardComponent)
export default SalesSummaryCard


