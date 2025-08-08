'use client'

import React from 'react'
import SalesSummaryCard, { PeriodOption, type SalesPoint } from '@/components/common/analytics/sales-summary-card'
import QuantityByProductCard, { type QuantityPoint } from '@/components/common/analytics/quantity-by-product-card'
import ListStatsCard from '@/components/common/analytics/list-stats-card'

export interface StatItem {
  name: string
  value: number
}

interface AnalyticsOverviewProps {
  className?: string

  // Summary
  period: PeriodOption
  onPeriodChange: (p: PeriodOption) => void
  year: number
  onYearChange: (y: number) => void
  summaryData: SalesPoint[]

  // Quantity by product
  products: string[]
  selectedProduct: string
  onProductChange: (v: string) => void
  quantityData: QuantityPoint[]

  // Inventory list
  inventoryItems: StatItem[]
  maxInventory?: number

  // Top selling
  topSellingItems: StatItem[]
}

function AnalyticsOverviewComponent({
  className,
  period,
  onPeriodChange,
  year,
  onYearChange,
  summaryData,
  products,
  selectedProduct,
  onProductChange,
  quantityData,
  inventoryItems,
  maxInventory,
  topSellingItems,
}: AnalyticsOverviewProps) {
  return (
    <div className={className}>
      <div className="grid grid-cols-1 lg:grid-cols-[1.75fr_1fr_1fr] gap-4 mt-6">
        <QuantityByProductCard
          products={products}
          selected={selectedProduct}
          onChange={onProductChange}
          data={quantityData}
        />

        <ListStatsCard
          className="px-3 py-6"
          title="Inventory"
          items={inventoryItems}
          maxValue={maxInventory}
          showBar
        />

        <ListStatsCard
          className="p-6"
          title="Top Selling"
          items={topSellingItems}
        />
      </div>
    </div>
  )
}

const AnalyticsOverview = React.memo(AnalyticsOverviewComponent)
export default AnalyticsOverview


