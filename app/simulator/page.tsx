'use client';

import { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import { simulateImpact } from '@/lib/business-rules';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Users,
  IndianRupee,
  BarChart3,
  Percent,
  Zap,
  Building2,
  ChevronUp,
} from 'lucide-react';

const SCALE_OPTIONS = [
  { value: 10000, label: '10K', desc: 'Pilot' },
  { value: 100000, label: '100K', desc: 'City' },
  { value: 500000, label: '500K', desc: 'Region' },
  { value: 1000000, label: '1M', desc: 'National' },
  { value: 5000000, label: '5M', desc: 'Full Base' },
];

function formatCurrency(value: number): string {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)} L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)} K`;
  return `₹${value}`;
}

function AnimatedCounter({
  value,
  format = 'number',
  suffix = '',
  prefix = '',
}: {
  value: number;
  format?: 'currency' | 'number' | 'percent';
  suffix?: string;
  prefix?: string;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 30;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += increment;
      if (step >= steps) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  let formatted: string;
  if (format === 'currency') {
    formatted = formatCurrency(Math.round(display));
  } else if (format === 'percent') {
    formatted = `${display.toFixed(1)}%`;
  } else {
    formatted = Math.round(display).toLocaleString();
  }

  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export default function SimulatorPage() {
  const [households, setHouseholds] = useState(100000);
  const [impact, setImpact] = useState(simulateImpact(100000));

  const updateSimulation = useCallback((count: number) => {
    setHouseholds(count);
    setImpact(simulateImpact(count));
  }, []);

  // Revenue comparison chart data
  const revenueData = SCALE_OPTIONS.map((opt) => {
    const sim = simulateImpact(opt.value);
    return {
      name: opt.label,
      current: Math.round(sim.currentRevenue / 10000000),
      projected: Math.round(sim.projectedRevenue / 10000000),
      uplift: Math.round(sim.revenueUplift / 10000000),
    };
  });

  // Churn projection data
  const churnData = [
    { month: 'Jan', without: 22, with: 18 },
    { month: 'Feb', without: 21.5, with: 16 },
    { month: 'Mar', without: 22.3, with: 14.5 },
    { month: 'Apr', without: 21.8, with: 13 },
    { month: 'May', without: 22.1, with: 11.5 },
    { month: 'Jun', without: 21.5, with: 10 },
  ];

  // Products per household projection
  const productsData = [
    { month: 'Q1', products: 1.4 },
    { month: 'Q2', products: 1.9 },
    { month: 'Q3', products: 2.5 },
    { month: 'Q4', products: 3.2 },
  ];

  return (
    <div className="min-h-screen relative">
      <Navbar />
      <div className="orb w-[500px] h-[500px] bg-emerald-600 top-[-200px] left-[-200px]" />
      <div className="orb w-[400px] h-[400px] bg-cyan-600 bottom-[-100px] right-[-100px]" />

      <div className="max-w-7xl mx-auto pt-24 pb-12 px-4 md:px-6">
        {/* Header */}
        <div className="mb-8 fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Business Impact <span className="gradient-text">Simulator</span>
          </h1>
          <p className="text-slate-400">
            Simulate DigiTel Nexus AI deployment across different customer scales.
          </p>
        </div>

        {/* Scale Selector */}
        <div className="glass-card p-6 mb-8 fade-in-up fade-in-up-delay-1">
          <h3 className="text-sm font-medium text-slate-400 mb-4 flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            SELECT DEPLOYMENT SCALE
          </h3>
          <div className="grid grid-cols-5 gap-3">
            {SCALE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => updateSimulation(opt.value)}
                className={`p-4 rounded-xl text-center transition-all ${
                  households === opt.value
                    ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-800/30 border border-slate-700 hover:border-slate-600'
                }`}
              >
                <div
                  className={`text-2xl font-bold mb-1 ${
                    households === opt.value ? 'gradient-text' : 'text-white'
                  }`}
                >
                  {opt.label}
                </div>
                <div className="text-xs text-slate-400">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 fade-in-up fade-in-up-delay-2">
          <div className="kpi-card">
            <div className="flex items-center gap-2 mb-3">
              <IndianRupee className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-slate-400">Projected Revenue</span>
            </div>
            <div className="text-2xl font-bold text-white">
              <AnimatedCounter value={impact.projectedRevenue} format="currency" />
            </div>
            <div className="flex items-center gap-1 mt-2 text-emerald-400 text-xs">
              <ChevronUp className="w-3 h-3" />
              <AnimatedCounter value={impact.revenueUplift} format="currency" /> uplift
            </div>
          </div>

          <div className="kpi-card">
            <div className="flex items-center gap-2 mb-3">
              <Percent className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-slate-400">Projected Churn</span>
            </div>
            <div className="text-2xl font-bold text-cyan-400">
              <AnimatedCounter value={impact.projectedChurn} format="percent" />
            </div>
            <div className="flex items-center gap-1 mt-2 text-emerald-400 text-xs">
              <TrendingDown className="w-3 h-3" />
              Down from {impact.currentChurn}%
            </div>
          </div>

          <div className="kpi-card">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-slate-400">ARPU</span>
            </div>
            <div className="text-2xl font-bold text-white">
              ₹<AnimatedCounter value={impact.arpu} />
            </div>
            <div className="flex items-center gap-1 mt-2 text-emerald-400 text-xs">
              <ChevronUp className="w-3 h-3" />
              Products: {impact.productsPerHousehold}/home
            </div>
          </div>

          <div className="kpi-card">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-slate-400">Retained Customers</span>
            </div>
            <div className="text-2xl font-bold text-amber-400">
              <AnimatedCounter value={impact.retainedCustomers} />
            </div>
            <div className="flex items-center gap-1 mt-2 text-emerald-400 text-xs">
              <TrendingUp className="w-3 h-3" />
              CLV +{impact.clvIncrease}%
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Comparison */}
          <div className="glass-card p-6 fade-in-up fade-in-up-delay-3">
            <h3 className="text-lg font-semibold text-white mb-1">Revenue Projection</h3>
            <p className="text-sm text-slate-400 mb-4">Current vs Projected Annual Revenue (₹ Cr)</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0d1321',
                    border: '1px solid #1e293b',
                    borderRadius: '12px',
                    color: '#f1f5f9',
                  }}
                  formatter={(value: number) => [`₹${value} Cr`, '']}
                />
                <Bar dataKey="current" fill="#64748b" radius={[4, 4, 0, 0]} name="Current" />
                <Bar dataKey="projected" fill="#06b6d4" radius={[4, 4, 0, 0]} name="Projected" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Churn Reduction */}
          <div className="glass-card p-6 fade-in-up fade-in-up-delay-4">
            <h3 className="text-lg font-semibold text-white mb-1">Churn Rate Projection</h3>
            <p className="text-sm text-slate-400 mb-4">With vs Without Nexus AI (%)</p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={churnData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[5, 25]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0d1321',
                    border: '1px solid #1e293b',
                    borderRadius: '12px',
                    color: '#f1f5f9',
                  }}
                  formatter={(value: number) => [`${value}%`, '']}
                />
                <Line
                  type="monotone"
                  dataKey="without"
                  stroke="#f43f5e"
                  strokeWidth={2}
                  dot={{ fill: '#f43f5e', r: 4 }}
                  name="Without AI"
                />
                <Line
                  type="monotone"
                  dataKey="with"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: '#10b981', r: 4 }}
                  name="With Nexus AI"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Products per Household */}
          <div className="glass-card p-6 fade-in-up fade-in-up-delay-5">
            <h3 className="text-lg font-semibold text-white mb-1">Products per Household</h3>
            <p className="text-sm text-slate-400 mb-4">Growth trajectory over 12 months</p>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={productsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[0, 4]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0d1321',
                    border: '1px solid #1e293b',
                    borderRadius: '12px',
                    color: '#f1f5f9',
                  }}
                />
                <defs>
                  <linearGradient id="prodGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="products"
                  stroke="#8b5cf6"
                  fill="url(#prodGrad)"
                  strokeWidth={2}
                  name="Products/HH"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* EBITDA */}
          <div className="glass-card p-6 fade-in-up fade-in-up-delay-5">
            <h3 className="text-lg font-semibold text-white mb-1">EBITDA Impact</h3>
            <p className="text-sm text-slate-400 mb-6">At {households.toLocaleString()} household scale</p>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-400">EBITDA Margin</span>
                  <span className="text-sm font-medium text-white">{impact.ebitdaMargin}%</span>
                </div>
                <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
                    style={{ width: `${impact.ebitdaMargin}%` }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                  <div className="text-xs text-slate-400 mb-1">Projected EBITDA</div>
                  <div className="text-xl font-bold text-emerald-400">
                    {formatCurrency(impact.ebitda)}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10">
                  <div className="text-xs text-slate-400 mb-1">Revenue per HH</div>
                  <div className="text-xl font-bold text-cyan-400">
                    ₹{impact.arpu}/mo
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-500/5 to-purple-500/5 border border-cyan-500/10">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-medium text-white">Key Insight</span>
                </div>
                <p className="text-sm text-slate-400">
                  At {households.toLocaleString()} households, Nexus AI is projected to generate{' '}
                  <span className="text-cyan-400 font-medium">{formatCurrency(impact.revenueUplift)}</span> in
                  additional annual revenue while retaining{' '}
                  <span className="text-emerald-400 font-medium">{impact.retainedCustomers.toLocaleString()}</span>{' '}
                  customers who would have otherwise churned.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
