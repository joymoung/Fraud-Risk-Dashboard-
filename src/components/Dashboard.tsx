import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  LineChart, Line, ComposedChart, Cell, PieChart, Pie
} from 'recharts';
import { 
  ShieldAlert, Activity, CreditCard, DollarSign,
  TrendingUp, TrendingDown
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './Card';
import { hourlyData, dailyData, recentTransactions, riskDistribution } from '../data';
import { cn } from '../lib/utils';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Fraud Risk Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">IEEE-CIS Fraud Detection Model Metrics</p>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-medium text-slate-700">Model Active</span>
          </div>
        </header>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Total Transactions</CardTitle>
              <Activity className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">338,000</div>
              <p className="text-xs text-slate-500 mt-1 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-emerald-500" />
                <span className="text-emerald-500 font-medium mr-1">+12%</span> from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Flagged as Fraud</CardTitle>
              <ShieldAlert className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">2,860</div>
              <p className="text-xs text-slate-500 mt-1 flex items-center">
                <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                <span className="text-red-500 font-medium mr-1">-2%</span> from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Avg Fraud Amount</CardTitle>
              <DollarSign className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$485.20</div>
              <p className="text-xs text-slate-500 mt-1 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-amber-500" />
                <span className="text-amber-500 font-medium mr-1">+5%</span> from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Model ROC-AUC</CardTitle>
              <CreditCard className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">0.942</div>
              <p className="text-xs text-slate-500 mt-1 flex items-center">
                Validation Score (Chronological Split)
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Daily Transaction Volume vs Fraud</CardTitle>
              <CardDescription>7-day historical overview</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={dailyData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(value) => `${value / 1000}k`} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
                  <Bar yAxisId="left" dataKey="transactions" name="Total Volume" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  <Line yAxisId="right" type="monotone" dataKey="fraud" name="Fraud Cases" stroke="#ef4444" strokeWidth={2} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Risk Score Distribution</CardTitle>
              <CardDescription>Population density by risk bucket</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskDistribution}
                    cx="50%"
                    cy="45%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {riskDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#0f172a', fontSize: '14px' }}
                    formatter={(value: number) => [`${value}%`, 'Population']}
                  />
                  <Legend 
                    layout="vertical" 
                    verticalAlign="bottom" 
                    align="center"
                    wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Table Area */}
        <Card>
          <CardHeader>
            <CardTitle>Recent High-Risk Transactions</CardTitle>
            <CardDescription>Transactions scoring above the 0.5 risk threshold.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 font-medium rounded-tl-lg">Transaction ID</th>
                    <th className="px-4 py-3 font-medium">Date & Time</th>
                    <th className="px-4 py-3 font-medium text-right">Amount</th>
                    <th className="px-4 py-3 font-medium">Card Category</th>
                    <th className="px-4 py-3 font-medium min-w-[120px]">Risk Score</th>
                    <th className="px-4 py-3 font-medium rounded-tr-lg">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentTransactions.map((txn) => (
                    <tr key={txn.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3 font-medium text-slate-900">{txn.id}</td>
                      <td className="px-4 py-3 text-slate-600">{txn.date}</td>
                      <td className="px-4 py-3 text-right font-medium text-slate-900">${txn.amount.toFixed(2)}</td>
                      <td className="px-4 py-3 text-slate-600">Card {txn.cardCategory}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={cn(
                                "h-full rounded-full transition-all duration-500",
                                txn.riskScore > 0.8 ? "bg-red-500" : 
                                txn.riskScore > 0.5 ? "bg-orange-500" : 
                                txn.riskScore > 0.2 ? "bg-amber-500" : "bg-emerald-500"
                              )}
                              style={{ width: `${txn.riskScore * 100}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-slate-700">{txn.riskScore.toFixed(2)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {txn.isHighRisk ? (
                          <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                            High Risk
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                            Low Risk
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="pt-8 pb-4 text-center">
          <p className="text-sm text-slate-500 font-medium">
            Created by Jaw ae Maung &copy; {new Date().getFullYear()} - All Credits Reserved
          </p>
        </footer>

      </div>
    </div>
  );
}
