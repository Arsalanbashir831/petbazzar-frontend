'use client'

import { useState, useMemo } from 'react'
import { SearchableSelect } from '@/components/seller/dashboard/SearchableSelect'
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    LineChart,
    Line,
} from 'recharts'


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
            <h2 className="text-2xl font-bold">Sales Analytics</h2>

            {/* Total Sales Card */}
            <div className="bg-card rounded-lg shadow-sm p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-col gap-3">
                        <h3 className="text-xl font-semibold">Total Sales</h3>
                        <div className='flex gap-2'>


                            <select
                                value={period}
                                onChange={(e) => setPeriod(e.target.value as Period)}
                                className="px-3 w-40 py-1 border border-border rounded-full text-sm focus:outline-none"
                            >
                                <option>Monthly</option>
                                <option>Yearly</option>
                            </select>

                            <select
                                value={year}
                                onChange={(e) => setYear(Number(e.target.value))}
                                className="px-3 w-40 py-1 border border-border rounded-full text-sm focus:outline-none"
                            >
                                {[2022, 2023, 2024, 2025].map((y) => (
                                    <option key={y} value={y}>
                                        {y}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-orange-500">
                        {Intl.NumberFormat().format(totalSales)} PKR
                    </div>
                </div>

                <div style={{ width: '100%', height: 400 }}>
                    <ResponsiveContainer>
                        <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                            <defs>
                                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#FFA500" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#FFA500" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} />
                            <YAxis tickFormatter={(v) => (v >= 1000 ? `${v / 1000}K` : v)} />
                            <Tooltip formatter={(value: number) => `${value.toLocaleString()} PKR`} />
                            <Bar dataKey="sales" fill="url(#salesGradient)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Bottom row: Quantity, Inventory & Top Selling */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Quantity Sold Per Month */}
                <div className="bg-card rounded-lg shadow-sm p-6">
                    <h3 className="text-base font-medium mb-4">Quantity Sold Per Month</h3>

                    {/* ← shadcn Combobox preset */}
                    <SearchableSelect
                        options={products}
                        value={selected}
                        onChange={setSelected}
                        placeholder="Search product"
                    />

                    {/* Your Recharts line chart */}
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <LineChart
                                data={monthlyQuantity}
                                margin={{ top: 10, right: 10, bottom: 10, left: 0 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                                <YAxis />
                                <Tooltip formatter={(v: number) => `${v}`} />
                                <Line
                                    type="monotone"
                                    dataKey="quantity"
                                    stroke="#FFA500"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Inventory & Top Selling */}
                <div className="flex gap-2">
                    {/* Inventory */}
                    <div className="bg-card rounded-lg shadow-sm w-1/2 px-3 py-6">
                        <h3 className="text-base font-medium mb-4">Inventory</h3>
                        <ul className="space-y-3">
                            {inventoryData.map((item) => {
                                const pct = (item.value / maxInventory) * 100
                                return (
                                    <li key={item.name} className="flex flex-col w-full gap-2  ">
                                        <span className="flex-1 text-sm">{item.name}</span>
                                        <div className='flex items-center justify-between w-full gap-2'>
                                            <div className="w-4/5 bg-muted h-2 flex gap-2 rounded overflow-hidden">
                                                <div
                                                    className="h-2 bg-orange-500"
                                                    style={{ width: `${pct}%` }}
                                                />
                                            </div>
                                            <span className=" text-right text-sm font-medium">
                                                {item.value}
                                            </span>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                    {/* Top Selling */}
                    <div className="bg-card w-1/2 rounded-lg shadow-sm p-6">
                        <h3 className="text-base font-medium mb-4">Top Selling</h3>
                        <ul className="space-y-2">
                            {topSellingData.map((item) => (
                                <li
                                    key={item.name}
                                    className="flex justify-between text-sm font-medium"
                                >
                                    <span className='w-32'>{item.name}</span>
                                    <span>{item.value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
