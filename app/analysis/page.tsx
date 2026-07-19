'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Brain, Database, Shield, LineChart, Sparkles, CheckCircle2 } from 'lucide-react';

const ANALYSIS_STEPS = [
  { icon: Database, label: 'Loading household profile...', duration: 800 },
  { icon: Shield, label: 'Applying business rules engine...', duration: 1000 },
  { icon: Brain, label: 'Running Gemini AI analysis...', duration: 2500 },
  { icon: LineChart, label: 'Calculating Digital Home Score...', duration: 800 },
  { icon: Sparkles, label: 'Generating personalized recommendations...', duration: 900 },
];

export default function AnalysisPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);

  const hasStartedRef = useRef(false);

  useEffect(() => {
    // Check if assessment data exists
    const data = localStorage.getItem('digitel-assessment');
    if (!data) {
      router.push('/assessment');
      return;
    }

    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    // Fetch recommendations from API
    const fetchRecommendations = async () => {
      try {
        const assessmentData = JSON.parse(data);
        const response = await fetch('/api/recommend', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(assessmentData),
        });
        const result = await response.json();
        localStorage.setItem('digitel-recommendations', JSON.stringify(result));
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
        // Store fallback
        localStorage.setItem('digitel-recommendations', JSON.stringify({ error: true }));
      }
    };

    // Animate steps
    const animateSteps = () => new Promise<void>((resolve) => {
      let stepIndex = 0;
      const runStep = () => {
        if (stepIndex < ANALYSIS_STEPS.length) {
          setCurrentStep(stepIndex);
          setTimeout(() => {
            setCompleted((prev) => {
              // Ensure we don't add duplicates
              if (!prev.includes(stepIndex)) return [...prev, stepIndex];
              return prev;
            });
            stepIndex++;
            runStep();
          }, ANALYSIS_STEPS[stepIndex].duration);
        } else {
          resolve();
        }
      };
      runStep();
    });

    const runAll = async () => {
      await Promise.all([
        fetchRecommendations(),
        animateSteps()
      ]);
      // All done, navigate
      setTimeout(() => router.push('/dashboard'), 500);
    };

    runAll();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div className="orb w-[600px] h-[600px] bg-cyan-500 top-[-200px] left-[-200px]" />
      <div className="orb w-[500px] h-[500px] bg-purple-600 bottom-[-100px] right-[-100px]" />

      <div className="max-w-lg w-full mx-auto px-6">
        <div className="glass-card p-8 md:p-10">
          {/* AI Brain animation */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center animate-pulse-glow">
                <Brain className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 blur-xl animate-pulse" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white text-center mb-2">
            Analyzing Your Digital Home
          </h2>
          <p className="text-slate-400 text-center mb-8">
            Our AI is processing your profile and generating personalized recommendations.
          </p>

          {/* Steps */}
          <div className="space-y-4">
            {ANALYSIS_STEPS.map((step, i) => {
              const isActive = currentStep === i && !completed.includes(i);
              const isDone = completed.includes(i);
              const isPending = !isActive && !isDone;
              const StepIcon = step.icon;

              return (
                <div
                  key={i}
                  className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
                    isActive ? 'bg-cyan-500/5 border border-cyan-500/20' : ''
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                      isDone
                        ? 'bg-emerald-500/10'
                        : isActive
                        ? 'bg-cyan-500/10'
                        : 'bg-slate-800/50'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <StepIcon
                        className={`w-5 h-5 ${
                          isActive ? 'text-cyan-400 animate-pulse' : 'text-slate-600'
                        }`}
                      />
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      isDone
                        ? 'text-emerald-400'
                        : isActive
                        ? 'text-cyan-400'
                        : isPending
                        ? 'text-slate-600'
                        : ''
                    }`}
                  >
                    {step.label}
                  </span>
                  {isActive && (
                    <div className="ml-auto flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0s' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="mt-8">
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${((completed.length) / ANALYSIS_STEPS.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
