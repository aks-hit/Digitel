'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  IndianRupee,
  Users,
  ShoppingCart,
  ThumbsUp,
  BarChart3,
  Layers,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

const KPIs = [
  {
    label: 'Total WTH Revenue',
    value: '₹6,800 Cr',
    change: 'FY24 Actual',
    trend: 'up',
    icon: IndianRupee,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
  },
  {
    label: 'Target Contribution',
    value: '20%',
    change: 'by FY29',
    trend: 'up',
    icon: TrendingUp,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
  },
  {
    label: 'Investment Budget',
    value: '₹2,500 Cr',
    change: 'Over 3 Yrs',
    trend: 'up',
    icon: Layers,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
  },
  {
    label: 'Target CLV (3+ Prod)',
    value: '₹18,000',
    change: '+227% vs 1 Prod',
    trend: 'up',
    icon: ShoppingCart,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
  {
    label: 'Target Churn',
    value: '5%',
    change: 'With 3+ Products',
    trend: 'down',
    icon: TrendingDown,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
  },
  {
    label: 'Home Surveillance',
    value: '₹350 Cr',
    change: 'Highest Growth',
    trend: 'up',
    icon: Zap,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
  },
];

const revenueByService = [
  { name: 'Broadband', value: 4100, color: '#06b6d4' },
  { name: 'DTH', value: 2350, color: '#f59e0b' },
  { name: 'Surveillance', value: 350, color: '#8b5cf6' },
];

const monthlyRevenueTrend = [
  { month: 'Jul', revenue: 380, target: 400 },
  { month: 'Aug', revenue: 410, target: 415 },
  { month: 'Sep', revenue: 430, target: 430 },
  { month: 'Oct', revenue: 455, target: 445 },
  { month: 'Nov', revenue: 478, target: 460 },
  { month: 'Dec', revenue: 495, target: 475 },
  { month: 'Jan', revenue: 520, target: 490 },
  { month: 'Feb', revenue: 545, target: 505 },
  { month: 'Mar', revenue: 570, target: 520 },
];

const personaDistribution = [
  { name: 'Aspirer Homes (HV2)', value: 40, color: '#3b82f6' },
  { name: 'Premium Homes (HV1)', value: 10, color: '#8b5cf6' },
];

const aiMetrics = [
  { label: 'Recommendation CTR', value: '34.2%', target: '25%', status: 'above' },
  { label: 'Chat Satisfaction', value: '4.6/5', target: '4.0/5', status: 'above' },
  { label: 'Prediction Accuracy', value: '89.3%', target: '85%', status: 'above' },
  { label: 'Avg Response Time', value: '1.2s', target: '2.0s', status: 'above' },
];

const crossSellData = [
  { bundle: 'Fiber → OTT', rate: 42 },
  { bundle: 'OTT → Security', rate: 28 },
  { bundle: 'Fiber → Cyber', rate: 22 },
  { bundle: 'Security → Smart', rate: 18 },
  { bundle: 'Cyber → Smart', rate: 15 },
];

export default function ExecutivePage() {
  const [timeRange, setTimeRange] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');

  return (
    <div className="min-h-screen relative">
      <Navbar />
      <div className="orb w-[500px] h-[500px] bg-blue-600 top-[-200px] left-[-200px]" />
      <div className="orb w-[400px] h-[400px] bg-purple-600 bottom-[-100px] right-[-100px]" />

      <div className="max-w-7xl mx-auto pt-24 pb-12 px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 fade-in-up">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Executive <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-slate-400">DigiTel Nexus AI Business Intelligence</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            {(['monthly', 'quarterly', 'yearly'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                  timeRange === range
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8 fade-in-up fade-in-up-delay-1">
          {KPIs.map((kpi) => (
            <div key={kpi.label} className="kpi-card">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-8 h-8 rounded-lg ${kpi.bgColor} flex items-center justify-center`}>
                  <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
                </div>
              </div>
              <div className="text-xl font-bold text-white mb-1">{kpi.value}</div>
              <div className="text-xs text-slate-400 mb-2">{kpi.label}</div>
              <div
                className={`flex items-center gap-1 text-xs font-medium ${
                  kpi.trend === 'up' ? 'text-emerald-400' : 'text-emerald-400'
                }`}
              >
                {kpi.trend === 'up' ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                {kpi.change}
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Revenue Trend */}
          <div className="glass-card p-6 lg:col-span-2 fade-in-up fade-in-up-delay-2">
            <h3 className="text-lg font-semibold text-white mb-1">Revenue Trend</h3>
            <p className="text-sm text-slate-400 mb-4">Actual vs Target (₹ Cr)</p>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={monthlyRevenueTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0d1321',
                    border: '1px solid #1e293b',
                    borderRadius: '12px',
                    color: '#f1f5f9',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#64748b"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Target"
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  dot={{ fill: '#06b6d4', r: 4 }}
                  name="Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Customer Personas */}
          <div className="glass-card p-6 fade-in-up fade-in-up-delay-3">
            <h3 className="text-lg font-semibold text-white mb-1">Customer Personas</h3>
            <p className="text-sm text-slate-400 mb-4">Distribution breakdown</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={personaDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  dataKey="value"
                  stroke="none"
                >
                  {personaDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0d1321',
                    border: '1px solid #1e293b',
                    borderRadius: '12px',
                    color: '#f1f5f9',
                  }}
                  formatter={(value) => [`${value}%`, '']}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {personaDistribution.map((p) => (
                <div key={p.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                    <span className="text-xs text-slate-400">{p.name}</span>
                  </div>
                  <span className="text-xs font-medium text-white">{p.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue by Service */}
          <div className="glass-card p-6 fade-in-up fade-in-up-delay-4">
            <h3 className="text-lg font-semibold text-white mb-1">Revenue by Service</h3>
            <p className="text-sm text-slate-400 mb-4">Annual Revenue (₹ Cr)</p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={revenueByService} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0d1321',
                    border: '1px solid #1e293b',
                    borderRadius: '12px',
                    color: '#f1f5f9',
                  }}
                  formatter={(value) => [`₹${value} Cr`, '']}
                />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} name="Revenue">
                  {revenueByService.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Cross-sell Performance */}
          <div className="glass-card p-6 fade-in-up fade-in-up-delay-5">
            <h3 className="text-lg font-semibold text-white mb-1">Cross-sell Pathways</h3>
            <p className="text-sm text-slate-400 mb-4">Conversion rate by bundle path</p>
            <div className="space-y-4 mt-6">
              {crossSellData.map((item) => (
                <div key={item.bundle}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm text-slate-300">{item.bundle}</span>
                    <span className="text-sm font-medium text-cyan-400">{item.rate}%</span>
                  </div>
                  <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-1000"
                      style={{ width: `${item.rate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Metrics */}
        <div className="glass-card p-6 fade-in-up fade-in-up-delay-5">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-semibold text-white">AI Performance Metrics</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {aiMetrics.map((metric) => (
              <div
                key={metric.label}
                className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 border border-slate-700/50"
              >
                <div className="text-xs text-slate-400 mb-2">{metric.label}</div>
                <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-slate-500">Target: {metric.target}</span>
                  <span className="text-xs text-emerald-400 ml-auto">✓ Above</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
