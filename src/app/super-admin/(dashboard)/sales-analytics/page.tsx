'use client';

import React, { useState } from 'react';
import {
    ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import { monthlySales, topStores, categoryShare } from '@/lib/mockStoreData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';

export default function SalesAnalyticsPage() {
    const [period, setPeriod] = useState<'Monthly' | 'Yearly'>('Monthly');
    const [year] = useState(2025);

    // compute total:
    const total = monthlySales.reduce((sum, m) => sum + m.sales, 0);

    return (
        <div className="p-6 space-y-6">
            {/* ─── Header Bar ───────────────────────────────────────────── */}
            
            
            <PageHeader title='Sales Analytics' userName='Zawar Ahmed Farooqi' />

            {/* ─── Total + Chart Card ──────────────────────────────────── */}
            <div className="bg-card p-6 rounded-lg space-y-6">
                {/* Total Sales row */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                         {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        <Select value={period} onValueChange={(v) => setPeriod(v as any)}>
                            <SelectTrigger className="w-28 h-9 rounded-full border">
                                <SelectValue>{period}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Monthly">Monthly</SelectItem>
                                <SelectItem value="Yearly">Yearly</SelectItem>
                            </SelectContent>
                        </Select>
                        <div className="flex items-center space-x-2 border rounded-full px-3 py-1">
                            <Button variant="ghost" size="icon"><ChevronLeft /></Button>
                            <span className="font-medium">{year}</span>
                            <Button variant="ghost" size="icon"><ChevronRight /></Button>
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-orange-600">
                        {total.toLocaleString()} PKR
                    </div>
                </div>

                {/* Bar chart */}
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <BarChart data={monthlySales} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#FFA500" stopOpacity={0.8} />
                                    <stop offset="100%" stopColor="#FFA500" stopOpacity={0.2} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} />
                            <RTooltip formatter={(v: number) => `Rs ${v.toLocaleString()}`} />
                            <Bar dataKey="sales" fill="url(#barGrad)" barSize={24} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* ─── Bottom Row: Top Stores & Category ────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Performing Stores */}
                <div className="bg-card p-6 rounded-lg">
                    <h2 className="text-lg font-medium mb-4">Top Performing Stores</h2>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-muted-foreground">
                                <th>Store Name</th>
                                <th className="text-right">Total Sales</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {topStores.map((s) => (
                                <tr key={s.name} className="py-4 my-4 pt-6 text-md ">
                                    <td className='pt-2'>{s.name}</td>
                                    <td className="text-right font-semibold">Rs {s.totalSales.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Sales by Category */}
                <div className="bg-card p-6 rounded-lg">
                    <h2 className="text-lg font-medium mb-4">Sales by Category</h2>
                    <div style={{ width: '100%', height: 280 }}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={categoryShare}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={4}
                                    labelLine={false}
                                >
                                    {categoryShare.map((c) => (
                                        <Cell key={c.name} fill={c.color} />
                                    ))}
                                </Pie>
                                <Legend
                                    layout="vertical"
                                    align="right"
                                    verticalAlign="middle"
                                    formatter={(value) => <span className="text-sm">{value}</span>}
                                />
                                <RTooltip formatter={(v: number) => `Rs ${v.toLocaleString()}`} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
