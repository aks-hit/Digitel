'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import {
  Users,
  Wallet,
  Laptop,
  Baby,
  HeartPulse,
  Home,
  Smartphone,
  Wifi,
  IndianRupee,
  Target,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  User,
} from 'lucide-react';

interface StepConfig {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  type: 'text' | 'select' | 'number' | 'multi-select' | 'boolean' | 'slider';
  options?: { value: string; label: string; desc?: string }[];
  field: string;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
}

const STEPS: StepConfig[] = [
  {
    id: 'name',
    title: "What's your name?",
    subtitle: "Let's personalize your Digital Home experience.",
    icon: User,
    type: 'text',
    field: 'customerName',
    placeholder: 'Enter your name',
  },
  {
    id: 'family',
    title: 'How many members in your household?',
    subtitle: 'Helps us recommend the right connectivity tier.',
    icon: Users,
    type: 'select',
    field: 'familySize',
    options: [
      { value: '1', label: '1 Person', desc: 'Living alone' },
      { value: '2', label: '2 People', desc: 'Couple' },
      { value: '3', label: '3-4 People', desc: 'Small family' },
      { value: '5', label: '5+ People', desc: 'Large family' },
    ],
  },
  {
    id: 'income',
    title: 'What is your household income band?',
    subtitle: 'We match recommendations to your comfort level.',
    icon: Wallet,
    type: 'select',
    field: 'incomeBand',
    options: [
      { value: 'below-25k', label: 'Under ₹25,000/mo', desc: 'Budget-friendly options' },
      { value: '25k-50k', label: '₹25,000 - ₹50,000/mo', desc: 'Mid-range plans' },
      { value: '50k-1L', label: '₹50,000 - ₹1,00,000/mo', desc: 'Premium options' },
      { value: 'above-1L', label: '₹1,00,000+/mo', desc: 'Ultra-premium tier' },
    ],
  },
  {
    id: 'wfh',
    title: 'Does anyone work from home?',
    subtitle: 'WFH needs reliable, high-speed connectivity with low latency.',
    icon: Laptop,
    type: 'boolean',
    field: 'wfh',
  },
  {
    id: 'kids',
    title: 'Are there children in the household?',
    subtitle: 'We recommend parental controls and family-safe entertainment.',
    icon: Baby,
    type: 'boolean',
    field: 'hasKids',
  },
  {
    id: 'seniors',
    title: 'Are there senior citizens at home?',
    subtitle: 'We offer emergency monitoring and simplified interfaces.',
    icon: HeartPulse,
    type: 'boolean',
    field: 'hasSeniors',
  },
  {
    id: 'home',
    title: 'What type of home do you live in?',
    subtitle: 'This determines security and network requirements.',
    icon: Home,
    type: 'select',
    field: 'homeType',
    options: [
      { value: 'apartment', label: 'Apartment', desc: '1-3 BHK flat' },
      { value: 'independent-house', label: 'Independent House', desc: '2-3 floors' },
      { value: 'villa', label: 'Villa / Bungalow', desc: 'Premium property' },
      { value: 'penthouse', label: 'Penthouse', desc: 'Luxury apartment' },
    ],
  },
  {
    id: 'devices',
    title: 'How many smart devices at home?',
    subtitle: 'Phones, laptops, tablets, TVs, smart speakers, etc.',
    icon: Smartphone,
    type: 'select',
    field: 'numDevices',
    options: [
      { value: '3', label: '1 - 5', desc: 'A few devices' },
      { value: '8', label: '5 - 10', desc: 'Moderate usage' },
      { value: '15', label: '10 - 20', desc: 'Heavy usage' },
      { value: '25', label: '20+', desc: 'Smart home level' },
    ],
  },
  {
    id: 'services',
    title: 'What DigiTel services do you currently use?',
    subtitle: 'Select all that apply.',
    icon: Wifi,
    type: 'multi-select',
    field: 'currentServices',
    options: [
      { value: 'fiber', label: 'Fiber Broadband' },
      { value: 'broadband', label: 'DSL/Copper Broadband' },
      { value: 'dth', label: 'DTH Television' },
      { value: 'ott', label: 'OTT Bundle' },
      { value: 'cctv', label: 'CCTV / Surveillance' },
      { value: 'smart-lock', label: 'Smart Door Lock' },
      { value: 'antivirus', label: 'Antivirus / Cyber' },
      { value: 'smart-home', label: 'Smart Home Devices' },
    ],
  },
  {
    id: 'budget',
    title: 'Monthly budget for digital home services?',
    subtitle: 'Including broadband, OTT, security, etc.',
    icon: IndianRupee,
    type: 'select',
    field: 'monthlyBudget',
    options: [
      { value: '1000', label: 'Under ₹1,500', desc: 'Starter' },
      { value: '2000', label: '₹1,500 - ₹3,000', desc: 'Essential' },
      { value: '3500', label: '₹3,000 - ₹5,000', desc: 'Plus' },
      { value: '6000', label: '₹5,000+', desc: 'Premium' },
    ],
  },
  {
    id: 'priorities',
    title: 'What are your top priorities?',
    subtitle: 'Select what matters most to your household.',
    icon: Target,
    type: 'multi-select',
    field: 'priorities',
    options: [
      { value: 'speed', label: 'High-Speed Internet' },
      { value: 'entertainment', label: 'Entertainment & OTT' },
      { value: 'security', label: 'Home Security' },
      { value: 'cyber', label: 'Cyber Safety' },
      { value: 'automation', label: 'Smart Home / Automation' },
      { value: 'value', label: 'Best Value for Money' },
    ],
  },
];

export default function AssessmentPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, unknown>>({
    customerName: '',
    familySize: 0,
    incomeBand: '',
    wfh: false,
    hasKids: false,
    hasSeniors: false,
    homeType: '',
    numDevices: 0,
    currentServices: [] as string[],
    monthlyBudget: 0,
    priorities: [] as string[],
    city: 'Mumbai',
  });

  const step = STEPS[currentStep];
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const handleSelect = (value: string) => {
    const s = STEPS[currentStep];
    if (s.type === 'multi-select') {
      const current = (answers[s.field] as string[]) || [];
      if (current.includes(value)) {
        setAnswers({ ...answers, [s.field]: current.filter((v) => v !== value) });
      } else {
        setAnswers({ ...answers, [s.field]: [...current, value] });
      }
    } else if (s.type === 'boolean') {
      setAnswers({ ...answers, [s.field]: value === 'true' });
    } else if (s.field === 'familySize' || s.field === 'numDevices' || s.field === 'monthlyBudget') {
      setAnswers({ ...answers, [s.field]: parseInt(value) });
    } else {
      setAnswers({ ...answers, [s.field]: value });
    }
  };

  const canProceed = () => {
    const val = answers[step.field];
    if (step.type === 'text') return (val as string).length > 0;
    if (step.type === 'multi-select') return (val as string[]).length > 0;
    if (step.type === 'boolean') return true;
    if (step.type === 'select') return val !== '' && val !== 0;
    return true;
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save to localStorage and navigate
      localStorage.setItem('digitel-assessment', JSON.stringify(answers));
      router.push('/analysis');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const StepIcon = step.icon;

  return (
    <div className="min-h-screen relative">
      <Navbar />
      <div className="orb w-[500px] h-[500px] bg-cyan-600 top-[-200px] right-[-200px]" />
      <div className="orb w-[400px] h-[400px] bg-purple-600 bottom-[-100px] left-[-100px]" />

      <div className="max-w-2xl mx-auto pt-28 pb-12 px-6">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-400">
              Step {currentStep + 1} of {STEPS.length}
            </span>
            <span className="text-sm text-cyan-400 font-medium">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="glass-card p-8 md:p-10 fade-in-up" key={currentStep}>
          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-6">
            <StepIcon className="w-7 h-7 text-white" />
          </div>

          {/* Question */}
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{step.title}</h2>
          <p className="text-slate-400 mb-8">{step.subtitle}</p>

          {/* Input area */}
          {step.type === 'text' && (
            <input
              type="text"
              value={(answers[step.field] as string) || ''}
              onChange={(e) => setAnswers({ ...answers, [step.field]: e.target.value })}
              placeholder={step.placeholder}
              className="w-full px-6 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white text-lg placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all"
              onKeyDown={(e) => e.key === 'Enter' && canProceed() && handleNext()}
              autoFocus
            />
          )}

          {step.type === 'select' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {step.options?.map((opt) => {
                const isSelected =
                  step.field === 'familySize' || step.field === 'numDevices' || step.field === 'monthlyBudget'
                    ? answers[step.field] === parseInt(opt.value)
                    : answers[step.field] === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/5'
                        : 'border-slate-700 bg-slate-800/30 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className={`font-semibold ${isSelected ? 'text-cyan-400' : 'text-white'}`}>
                          {opt.label}
                        </div>
                        {opt.desc && (
                          <div className="text-sm text-slate-400 mt-1">{opt.desc}</div>
                        )}
                      </div>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {step.type === 'boolean' && (
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: 'true', label: 'Yes' },
                { value: 'false', label: 'No' },
              ].map((opt) => {
                const isSelected = String(answers[step.field]) === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    className={`p-6 rounded-xl border text-center text-lg font-semibold transition-all ${
                      isSelected
                        ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400 shadow-lg shadow-cyan-500/5'
                        : 'border-slate-700 bg-slate-800/30 hover:border-slate-600 text-white'
                    }`}
                  >
                    {opt.label}
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 mx-auto mt-2" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {step.type === 'multi-select' && (
            <div className="grid grid-cols-2 gap-3">
              {step.options?.map((opt) => {
                const isSelected = ((answers[step.field] as string[]) || []).includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-cyan-500 bg-cyan-500/10'
                        : 'border-slate-700 bg-slate-800/30 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          isSelected ? 'border-cyan-500 bg-cyan-500' : 'border-slate-600'
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-3 h-3 text-white" />}
                      </div>
                      <span className={isSelected ? 'text-cyan-400 font-medium' : 'text-white'}>
                        {opt.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-10">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="glow-button flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-none"
            >
              {currentStep === STEPS.length - 1 ? 'Get My Recommendations' : 'Next'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === currentStep
                  ? 'w-8 bg-cyan-400'
                  : i < currentStep
                  ? 'w-4 bg-cyan-600'
                  : 'w-4 bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
