'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SearchableSelect } from '@/components/ui/searchable-select'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

export interface QuantityPoint {
  month: string
  quantity: number
}

interface QuantityByProductCardProps {
  title?: string
  products: string[]
  selected: string
  onChange: (product: string) => void
  data: QuantityPoint[]
  className?: string
}

function QuantityByProductCardComponent({
  title = 'Quantity Sold Per Month',
  products,
  selected,
  onChange,
  data,
  className,
}: QuantityByProductCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <SearchableSelect options={products} value={selected} onChange={onChange} placeholder="Search product" />
        <div className='w-full h-[300px] mt-4'>
          <ResponsiveContainer>
            <LineChart data={data} margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis />
              <Tooltip formatter={(v: number) => `${v}`} />
              <Line type="monotone" dataKey="quantity" stroke="#FFA500" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

const QuantityByProductCard = React.memo(QuantityByProductCardComponent)
export default QuantityByProductCard


