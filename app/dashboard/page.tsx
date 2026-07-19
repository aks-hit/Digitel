'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import {
  Wifi,
  Tv,
  Shield,
  Lock,
  Cpu,
  Sparkles,
  TrendingUp,
  TrendingDown,
  IndianRupee,
  ChevronRight,
  MessageCircle,
  Download,
  Star,
  Zap,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Fiber: Wifi,
  OTT: Tv,
  Security: Shield,
  Cyber: Lock,
  'Smart Home': Cpu,
};

const CATEGORY_COLORS: Record<string, string> = {
  Fiber: 'from-cyan-400 to-blue-500',
  OTT: 'from-blue-400 to-purple-500',
  Security: 'from-purple-400 to-pink-500',
  Cyber: 'from-emerald-400 to-cyan-500',
  'Smart Home': 'from-amber-400 to-orange-500',
};

const JOURNEY_NODES = [
  { label: 'Broadband', icon: Wifi, color: '#06b6d4', active: true },
  { label: 'OTT Bundle', icon: Tv, color: '#3b82f6', active: true },
  { label: 'Security', icon: Shield, color: '#8b5cf6', active: false },
  { label: 'Cyber', icon: Lock, color: '#10b981', active: false },
  { label: 'Smart Home', icon: Cpu, color: '#f59e0b', active: false },
];

export default function DashboardPage() {
  const router = useRouter();
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [recommendations, setRecommendations] = useState<any>(null);
  const [assessment, setAssessment] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'score' | 'recommendations' | 'journey'>('score');
  const [animateScore, setAnimateScore] = useState(false);

  useEffect(() => {
    const recData = localStorage.getItem('digitel-recommendations');
    const assData = localStorage.getItem('digitel-assessment');

    if (!recData || !assData) {
      router.push('/assessment');
      return;
    }

    setRecommendations(JSON.parse(recData));
    setAssessment(JSON.parse(assData));
    setTimeout(() => setAnimateScore(true), 500);
  }, [router]);

  if (!recommendations || !assessment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="shimmer w-full max-w-2xl h-96 rounded-2xl" />
      </div>
    );
  }

  const homeScore = recommendations.homeScore || {
    connectivity: 65,
    entertainment: 45,
    security: 30,
    cyber: 25,
    automation: 15,
    overall: 42,
  };

  const predictedScore = recommendations.predictedHomeScore || 82;

  const radarData = [
    { subject: 'Connectivity', current: homeScore.connectivity, predicted: Math.min(homeScore.connectivity + 25, 100) },
    { subject: 'Entertainment', current: homeScore.entertainment, predicted: Math.min(homeScore.entertainment + 30, 100) },
    { subject: 'Security', current: homeScore.security, predicted: Math.min(homeScore.security + 40, 100) },
    { subject: 'Cyber Safety', current: homeScore.cyber, predicted: Math.min(homeScore.cyber + 35, 100) },
    { subject: 'Automation', current: homeScore.automation, predicted: Math.min(homeScore.automation + 30, 100) },
  ];

  const recs = recommendations.recommendations || [];

  return (
    <div className="min-h-screen relative">
      <Navbar />
      <div className="orb w-[500px] h-[500px] bg-cyan-600 top-[-200px] right-[-200px]" />
      <div className="orb w-[400px] h-[400px] bg-purple-600 bottom-[-100px] left-[-100px]" />

      <div className="max-w-7xl mx-auto pt-24 pb-12 px-4 md:px-6">
        {/* Header */}
        <div className="mb-8 fade-in-up">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {assessment.customerName ? `${assessment.customerName}'s` : 'Your'} Digital Home
              </h1>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium">
                  {recommendations.persona || 'Digital Family'}
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium">
                  {recommendations.tierName || 'DigiTel Plus Home'}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                href="/chat"
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:border-cyan-500/50 hover:text-white transition-all text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Ask AI
              </Link>
              <Link
                href="/simulator"
                className="glow-button text-sm px-4 py-2 flex items-center gap-2"
              >
                <TrendingUp className="w-4 h-4" />
                Business Impact
              </Link>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        {recommendations.executiveSummary && (
          <div className="glass-card p-6 mb-6 fade-in-up fade-in-up-delay-1">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">AI Executive Summary</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {recommendations.executiveSummary}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* KPI Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 fade-in-up fade-in-up-delay-2">
          <div className="kpi-card">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-slate-400">Home Score</span>
            </div>
            <div className="text-3xl font-bold gradient-text">
              {homeScore.overall}<span className="text-lg text-slate-500">/100</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-emerald-400 text-xs">
              <TrendingUp className="w-3 h-3" />
              → {predictedScore} after upgrade
            </div>
          </div>
          <div className="kpi-card">
            <div className="flex items-center gap-2 mb-2">
              <IndianRupee className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-slate-400">Monthly Cost</span>
            </div>
            <div className="text-3xl font-bold text-white">
              ₹{(recommendations.totalMonthlyPrice || 0).toLocaleString()}
            </div>
            <div className="flex items-center gap-1 mt-1 text-emerald-400 text-xs">
              <TrendingDown className="w-3 h-3" />
              Save ₹{Math.round((recommendations.estimatedSavings || 0) / 12).toLocaleString()}/mo
            </div>
          </div>
          <div className="kpi-card">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-slate-400">CLV Impact</span>
            </div>
            <div className="text-3xl font-bold text-emerald-400">
              {recommendations.predictedCLVIncrease || '+32%'}
            </div>
            <div className="text-xs text-slate-500 mt-1">Lifetime Value Increase</div>
          </div>
          <div className="kpi-card">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-slate-400">Churn Risk</span>
            </div>
            <div className="text-3xl font-bold text-cyan-400">
              {recommendations.predictedChurnReduction || '-15%'}
            </div>
            <div className="text-xs text-slate-500 mt-1">Churn Reduction</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { key: 'score' as const, label: 'Digital Home Score' },
            { key: 'recommendations' as const, label: 'AI Recommendations' },
            { key: 'journey' as const, label: 'Customer Journey' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.key ? 'tab-active' : 'tab-inactive'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'score' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 fade-in-up">
            {/* Radar Chart */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Digital Home Score Breakdown
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#1e293b" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} />
                  <Radar
                    name="Current"
                    dataKey="current"
                    stroke="#64748b"
                    fill="#64748b"
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />
                  <Radar
                    name="After Upgrade"
                    dataKey="predicted"
                    stroke="#06b6d4"
                    fill="#06b6d4"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 mt-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-500" />
                  <span className="text-xs text-slate-400">Current</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-400" />
                  <span className="text-xs text-slate-400">After Upgrade</span>
                </div>
              </div>
            </div>

            {/* Score Ring + Details */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Overall Score</h3>
              <div className="flex justify-center mb-6">
                <div className="relative w-48 h-48">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="5" />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="url(#dashGrad)"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray="283"
                      strokeDashoffset={animateScore ? 283 - (283 * homeScore.overall) / 100 : 283}
                      className="transition-all duration-1500 ease-out"
                    />
                    <defs>
                      <linearGradient id="dashGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-bold gradient-text">{homeScore.overall}</span>
                    <span className="text-sm text-slate-400">out of 100</span>
                  </div>
                </div>
              </div>

              {/* Category breakdown */}
              <div className="space-y-3">
                {[
                  { label: 'Connectivity', value: homeScore.connectivity, color: '#06b6d4' },
                  { label: 'Entertainment', value: homeScore.entertainment, color: '#3b82f6' },
                  { label: 'Security', value: homeScore.security, color: '#8b5cf6' },
                  { label: 'Cyber Safety', value: homeScore.cyber, color: '#10b981' },
                  { label: 'Automation', value: homeScore.automation, color: '#f59e0b' },
                ].map((cat) => (
                  <div key={cat.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">{cat.label}</span>
                      <span className="text-white font-medium">{cat.value}/100</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: animateScore ? `${cat.value}%` : '0%',
                          backgroundColor: cat.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-4 fade-in-up">
            {/* Quick Wins */}
            {recommendations.quickWins && (
              <div className="glass-card p-6 mb-4">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  Quick Wins
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {recommendations.quickWins.map((win: string, i: number) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/5 border border-amber-500/10"
                    >
                      <ChevronRight className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-300">{win}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendation Cards */}
            {recs.map((rec: any, i: number) => {
              const Icon = CATEGORY_ICONS[rec.category] || Wifi;
              const colorClass = CATEGORY_COLORS[rec.category] || 'from-cyan-400 to-blue-500';
              return (
                <div
                  key={i}
                  className="glass-card p-6 fade-in-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                        <div>
                          <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                            {rec.category}
                          </span>
                          <h4 className="text-lg font-semibold text-white">{rec.productName}</h4>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold gradient-text">
                            ₹{rec.monthlyPrice}
                            <span className="text-sm text-slate-500">/mo</span>
                          </div>
                        </div>
                      </div>

                      {/* Why this recommendation */}
                      <div className="p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/10 mb-3">
                        <div className="flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="text-xs font-medium text-cyan-400 block mb-1">
                              Why this recommendation?
                            </span>
                            <p className="text-sm text-slate-300">{rec.reason}</p>
                          </div>
                        </div>
                      </div>

                      {/* Impact */}
                      <div className="flex items-center gap-2 text-sm text-emerald-400">
                        <TrendingUp className="w-4 h-4" />
                        {rec.impact}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Total */}
            <div className="glass-card p-6 border-cyan-500/20">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {recommendations.tierName || 'DigiTel Bundle'} — Total
                  </h3>
                  <p className="text-sm text-slate-400">
                    Annual value: ₹{(recommendations.totalAnnualValue || 0).toLocaleString()} |
                    Bundle savings: ₹{(recommendations.estimatedSavings || 0).toLocaleString()}/year
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold gradient-text">
                    ₹{(recommendations.totalMonthlyPrice || 0).toLocaleString()}
                    <span className="text-sm text-slate-500">/month</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'journey' && (
          <div className="fade-in-up">
            <div className="glass-card p-8">
              <h3 className="text-lg font-semibold text-white mb-2">Your Digital Home Journey</h3>
              <p className="text-sm text-slate-400 mb-8">
                From where you are today to a fully connected intelligent home.
              </p>

              {/* Journey Timeline */}
              <div className="relative">
                {/* Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-amber-500" />

                {JOURNEY_NODES.map((node, i) => {
                  const hasService = (assessment.currentServices || []).some(
                    (s: string) =>
                      node.label.toLowerCase().includes(s) ||
                      s.includes(node.label.toLowerCase().split(' ')[0])
                  );

                  return (
                    <div key={i} className="relative flex items-start gap-6 mb-8 last:mb-0">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 z-10 ${
                          hasService
                            ? 'bg-emerald-500/20 border-2 border-emerald-500'
                            : 'bg-slate-800 border-2 border-slate-700'
                        }`}
                        style={hasService ? {} : { borderColor: node.color }}
                      >
                        <node.icon
                          className="w-5 h-5"
                          style={{ color: hasService ? '#10b981' : node.color }}
                        />
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-semibold text-white">{node.label}</h4>
                          {hasService ? (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                              Active
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium">
                              Recommended
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-400">
                          {hasService
                            ? 'Currently active on your account.'
                            : `AI recommends adding ${node.label.toLowerCase()} to improve your digital home score.`}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/simulator"
                className="glow-button flex items-center justify-center gap-2"
              >
                View Business Impact
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/chat"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-700 text-slate-300 hover:border-cyan-500/50 hover:text-white transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Ask AI About Your Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
