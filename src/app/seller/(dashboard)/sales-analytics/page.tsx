'use client'

import { useState, useMemo } from 'react'
import PageHeader from '@/components/common/page-header'
import AnalyticsOverview from '@/components/common/analytics/overview'


type Period = 'Monthly' | 'Yearly'

// dummy data — replace with your real fetch
const monthlySales = [
    { month: 'Jan', sales: 50000 },
    { month: 'Feb', sales: 45000 },
    { month: 'Mar', sales: 120000 },
    { month: 'Apr', sales: 60000 },
    { month: 'May', sales: 65000 },
    { month: 'June', sales: 55000 },
    { month: 'July', sales: 110000 },
    { month: 'Aug', sales: 50000 },
    { month: 'Sep', sales: 20000 },
    { month: 'Oct', sales: 30000 },
    { month: 'Nov', sales: 105000 },
    { month: 'Dec', sales: 50000 },
]

const products = [
    'Trixie Dog Food',
    'Diamond Care Cat Food',
    'Dog House',
    'Collar',
    'Chewy Dog Stuff Toy',
    'Cat Food',
    // …
]



const inventoryData = [
    { name: 'Diamond Care Cat Food 2.7kg', value: 35 },
    { name: 'Chewy Dog Stuff Toy', value: 20 },
    { name: 'Dog Food', value: 17 },
    { name: 'Cat Food', value: 12 },
    { name: 'Diamond Care Cat Food 5kg', value: 12 },
]

const topSellingData = [
    { name: 'Diamond Care Cat Food 2.7kg', value: 35 },
    { name: 'Chewy Dog Stuff Toy', value: 20 },
    { name: 'Dog Food', value: 17 },
    { name: 'Cat Food', value: 12 },
    { name: 'Diamond Care Cat Food 5kg', value: 10 },
]

export default function SalesAnalyticsPage() {
    const [period, setPeriod] = useState<Period>('Monthly')
    const [year, setYear] = useState(2025)
   
    const [selected, setSelected] = useState(products[0])
 
    
    // choose data based on period
    const chartData = period === 'Monthly' ? monthlySales : [
        // you’d replace this with actual yearly aggregates
        { month: '2021', sales: 1_200_000 },
        { month: '2022', sales: 1_800_000 },
        { month: '2023', sales: 2_400_000 },
        { month: '2024', sales: 3_100_000 },
        { month: '2025', sales: 575_000 },
    ]

    const totalSales = useMemo(
        () => chartData.reduce((sum, d) => sum + d.sales, 0),
        [chartData]
    )

    const maxInventory = useMemo(
        () => Math.max(...inventoryData.map((i) => i.value)),
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
              inventoryItems={inventoryData}
              maxInventory={maxInventory}
              topSellingItems={topSellingData}
            />
        </div>
    )
}
