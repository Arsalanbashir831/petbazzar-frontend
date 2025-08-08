'use client'

import { useState, useMemo } from 'react'
import PageHeader from '@/components/common/page-header'
import AnalyticsOverview from '@/components/common/analytics/overview'
import SalesSummaryCard from '@/components/common/analytics/sales-summary-card'
import {
  analyticsProducts as products,
  monthlySales,
  yearlySales,
  inventoryStats,
  topSellingStats,
} from '@/lib/mocks/analytics'


type Period = 'Monthly' | 'Yearly'

export default function SalesAnalyticsPage() {
    const [period, setPeriod] = useState<Period>('Monthly')
    const [year, setYear] = useState(2025)
   
    const [selected, setSelected] = useState(products[0])
 
    
    // choose data based on period
    const chartData = period === 'Monthly' ? monthlySales : yearlySales

    const maxInventory = useMemo(
        () => Math.max(...inventoryStats.map((i) => i.value)),
        []
    )

 

    // stub: generate data based on `selected`
    const monthlyQuantity = useMemo(() => {
        // pretend we fetch or compute by product
        const base = selected.length * 1
        return [
            { month: 'Jan', quantity: base + 5 },
            { month: 'Feb', quantity: base + 8 },
            { month: 'Mar', quantity: base + 3 },
            { month: 'Apr', quantity: base + 7 },
            { month: 'May', quantity: base + 2 },
            { month: 'Jun', quantity: base - 9 },
            { month: 'Jul', quantity: base + 1 },
            { month: 'Aug', quantity: base + 4 },
            { month: 'Sep', quantity: base + 6 },
            { month: 'Oct', quantity: base + 2 },
            { month: 'Nov', quantity: base + 11 },
            { month: 'Dec', quantity: base - 12 },
        ]
    }, [selected])




    return (
        <div className="space-y-6 px-6 py-4">
            <PageHeader
                title="Sales Analytics"
                icon={{ src: '/seller/dashboard/seller.png', alt: 'Fluffy Petshop' }}
            />

<SalesSummaryCard
        period={period}
        onPeriodChange={setPeriod}
        year={year}
        onYearChange={setYear}
        data={chartData}
      />

            <AnalyticsOverview
              period={period}
              onPeriodChange={setPeriod}
              year={year}
              onYearChange={setYear}
              summaryData={chartData}
              products={products}
              selectedProduct={selected}
              onProductChange={setSelected}
              quantityData={monthlyQuantity}
              inventoryItems={inventoryStats}
              maxInventory={maxInventory}
              topSellingItems={topSellingStats}
            />
        </div>
    )
}
