'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import {
  Shield,
  Wifi,
  Tv,
  Brain,
  Home,
  TrendingUp,
  ChevronRight,
  Sparkles,
  BarChart3,
  Users,
  Zap,
  ArrowRight,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const FEATURES = [
  {
    icon: Brain,
    title: 'AI Recommendation Engine',
    desc: 'Gemini-powered personalized bundle recommendations with full explainability.',
    color: 'from-cyan-400 to-blue-500',
  },
  {
    icon: Home,
    title: 'Digital Home Score',
    desc: 'Comprehensive assessment across connectivity, entertainment, security, cyber & automation.',
    color: 'from-blue-400 to-purple-500',
  },
  {
    icon: BarChart3,
    title: 'Impact Simulator',
    desc: 'Simulate business impact across 10K to 1M households in real-time.',
    color: 'from-purple-400 to-pink-500',
  },
  {
    icon: Users,
    title: 'Customer 360°',
    desc: 'Complete view of services, churn risk, CLV, and upgrade potential.',
    color: 'from-emerald-400 to-cyan-500',
  },
  {
    icon: Shield,
    title: 'Predictive Churn',
    desc: 'AI identifies at-risk households before they leave with actionable retention plans.',
    color: 'from-amber-400 to-orange-500',
  },
  {
    icon: Sparkles,
    title: 'Conversational AI',
    desc: 'Natural language interface: "Should I upgrade?" — with context-aware answers.',
    color: 'from-rose-400 to-red-500',
  },
];

const STATS = [
  { value: '20M+', label: 'Households Served' },
  { value: '35%', label: 'CLV Increase' },
  { value: '<10%', label: 'Target Churn' },
  { value: '3+', label: 'Products/Home' },
];

const JOURNEY_STEPS = [
  { icon: Wifi, label: 'Broadband', color: 'bg-cyan-500' },
  { icon: Tv, label: 'OTT', color: 'bg-blue-500' },
  { icon: Shield, label: 'Security', color: 'bg-purple-500' },
  { icon: Shield, label: 'Cyber', color: 'bg-emerald-500' },
  { icon: Brain, label: 'AI Home', color: 'bg-amber-500' },
];

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Navbar />

      {/* Background effects */}
      <div className="orb w-[600px] h-[600px] bg-cyan-500 top-[-200px] left-[-200px]" />
      <div className="orb w-[500px] h-[500px] bg-blue-600 top-[200px] right-[-150px]" />
      <div className="orb w-[400px] h-[400px] bg-purple-600 bottom-[-100px] left-[30%]" />
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-sm font-medium mb-8 ${
              mounted ? 'fade-in-up' : 'opacity-0'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Powered by Google Gemini AI
          </div>

          {/* Headline */}
          <h1
            className={`text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight ${
              mounted ? 'fade-in-up fade-in-up-delay-1' : 'opacity-0'
            }`}
          >
            <span className="text-white">DigiTel</span>{' '}
            <span className="gradient-text">Nexus AI</span>
          </h1>

          <p
            className={`text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-4 ${
              mounted ? 'fade-in-up fade-in-up-delay-2' : 'opacity-0'
            }`}
          >
            India&apos;s First AI-Powered Digital Home Intelligence Platform
          </p>

          <p
            className={`text-base md:text-lg text-slate-500 max-w-2xl mx-auto mb-12 ${
              mounted ? 'fade-in-up fade-in-up-delay-3' : 'opacity-0'
            }`}
          >
            Maximize Household Lifetime Value with personalized service recommendations,
            predictive customer insights, and intelligent cross-selling.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 ${
              mounted ? 'fade-in-up fade-in-up-delay-4' : 'opacity-0'
            }`}
          >
            <Link href="/assessment" className="glow-button text-lg px-8 py-4 flex items-center gap-2">
              Start Home Assessment
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/executive"
              className="px-8 py-4 rounded-xl border border-slate-700 text-slate-300 hover:border-cyan-500/50 hover:text-white transition-all flex items-center gap-2 font-medium"
            >
              Executive Dashboard
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Stats Bar */}
          <div
            className={`glass-card p-6 max-w-4xl mx-auto ${
              mounted ? 'fade-in-up fade-in-up-delay-5' : 'opacity-0'
            }`}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Digital Home Journey */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              The Digital Home <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              From basic broadband to a fully connected AI-powered smart home.
            </p>
          </div>

          {/* Journey timeline */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
            {JOURNEY_STEPS.map((step, i) => (
              <div key={step.label} className="flex items-center">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center shadow-lg shadow-${step.color}/20 animate-float`}
                    style={{ animationDelay: `${i * 0.5}s` }}
                  >
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-sm font-medium text-slate-300">{step.label}</span>
                </div>
                {i < JOURNEY_STEPS.length - 1 && (
                  <div className="hidden md:block w-16 h-0.5 bg-gradient-to-r from-slate-700 to-slate-600 mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Platform <span className="gradient-text">Capabilities</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              AI-driven modules that transform telecom into a digital home powerhouse.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="glass-card p-6 group cursor-pointer fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Value */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto glass-card p-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white mb-4">
                <TrendingUp className="w-8 h-8 inline mr-2 text-emerald-400" />
                Business Impact
              </h2>
              <p className="text-slate-400 mb-6">
                DigiTel Nexus AI transforms every customer touchpoint into a revenue opportunity,
                reducing churn while increasing household lifetime value.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                  <div className="text-2xl font-bold text-emerald-400">+20%</div>
                  <div className="text-sm text-slate-400">Revenue Growth FY29</div>
                </div>
                <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10">
                  <div className="text-2xl font-bold text-cyan-400">+35%</div>
                  <div className="text-sm text-slate-400">CLV Increase</div>
                </div>
                <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10">
                  <div className="text-2xl font-bold text-purple-400">&gt;25%</div>
                  <div className="text-sm text-slate-400">Cross-sell Rate</div>
                </div>
                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
                  <div className="text-2xl font-bold text-amber-400">&lt;10%</div>
                  <div className="text-sm text-slate-400">Churn Target</div>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="w-48 h-48 relative">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="6" />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#scoreGradient)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="283"
                    strokeDashoffset="70"
                    className="score-ring"
                  />
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold gradient-text">75</span>
                  <span className="text-sm text-slate-400">Avg Score</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to <span className="gradient-text">Transform</span> Your Digital Home?
          </h2>
          <p className="text-slate-400 mb-8">
            Take the 2-minute Digital Home Assessment and discover your personalized AI recommendations.
          </p>
          <Link href="/assessment" className="glow-button text-lg px-10 py-4 inline-flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Begin Assessment
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm text-slate-400">
              DigiTel Nexus AI &copy; 2025. Built with Gemini AI.
            </span>
          </div>
          <div className="text-sm text-slate-500">
            AI-Powered Digital Home Intelligence Platform
          </div>
        </div>
      </footer>
    </div>
  );
}
