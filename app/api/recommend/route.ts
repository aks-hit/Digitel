import { NextRequest, NextResponse } from 'next/server';
import { AssessmentData, applyBusinessRules, calculateHomeScore } from '@/lib/business-rules';
import { buildRecommendationPrompt } from '@/lib/prompts';
import { GoogleGenAI } from '@google/genai';

// Fallback recommendations when Gemini API is unavailable
function generateFallbackRecommendation(data: AssessmentData) {
  const rules = applyBusinessRules(data);
  const score = calculateHomeScore(data);

  const budgetMultiplier =
    rules.budgetCategory === 'high' ? 1 : rules.budgetCategory === 'medium' ? 0.7 : 0.5;

  const recommendations = [
    {
      category: 'Fiber',
      productName:
        rules.tierSuggestion === 'Premium'
          ? 'DigiTel Fiber 500'
          : rules.tierSuggestion === 'Plus'
          ? 'DigiTel Fiber 200'
          : 'DigiTel Fiber 100',
      monthlyPrice:
        rules.tierSuggestion === 'Premium'
          ? 1499
          : rules.tierSuggestion === 'Plus'
          ? 1099
          : 799,
      reason: data.wfh
        ? `With WFH needs and ${data.numDevices} devices, you need reliable high-speed connectivity for video calls and cloud work.`
        : `For a family of ${data.familySize} with ${data.numDevices} devices, this plan ensures smooth streaming and browsing for everyone.`,
      impact: data.wfh
        ? 'Reduces video call drops by 95% and enables seamless cloud collaboration'
        : `Supports ${data.numDevices}+ simultaneous device connections without slowdowns`,
    },
    {
      category: 'OTT',
      productName:
        rules.tierSuggestion === 'Premium'
          ? 'OTT Premium Bundle'
          : rules.tierSuggestion === 'Plus'
          ? 'OTT Super Bundle'
          : 'OTT Family Bundle',
      monthlyPrice: Math.round(
        (rules.tierSuggestion === 'Premium' ? 1299 : rules.tierSuggestion === 'Plus' ? 799 : 449) *
          budgetMultiplier
      ),
      reason: data.hasKids
        ? 'Family-friendly entertainment with parental controls and kids content across Disney+ Hotstar, Netflix, and Amazon Prime.'
        : `Curated entertainment package matching your ${rules.persona} persona with the best streaming platforms.`,
      impact: 'Save ₹2,400+/year compared to individual OTT subscriptions',
    },
    {
      category: 'Security',
      productName:
        data.homeType === 'villa' || data.homeType === 'penthouse'
          ? 'Total Security Suite'
          : data.homeType === 'independent-house'
          ? '4-Camera Kit + Smart Lock'
          : 'Smart Security Starter',
      monthlyPrice:
        data.homeType === 'villa' || data.homeType === 'penthouse'
          ? 1999
          : data.homeType === 'independent-house'
          ? 999
          : 599,
      reason:
        data.homeType === 'villa'
          ? 'Your villa requires comprehensive perimeter security with 6 cameras, smart lock, and motion sensors.'
          : data.hasKids || data.hasSeniors
          ? 'Peace of mind for your family with 24/7 surveillance and emergency alerts.'
          : 'Smart security monitoring with mobile alerts and cloud recording.',
      impact: 'Reduces property risk by 80% with 24/7 AI-powered surveillance',
    },
    {
      category: 'Cyber',
      productName: data.hasKids ? 'Family Shield' : 'Total Cyber Protection',
      monthlyPrice: data.hasKids ? 299 : 499,
      reason: data.hasKids
        ? 'Protects your children online with safe browsing, content filters, and screen time management.'
        : `With ${data.numDevices} connected devices, comprehensive cyber protection prevents data breaches and identity theft.`,
      impact: 'Blocks 99.9% of malware, phishing, and unsafe content across all devices',
    },
  ];

  // Add smart home if budget allows
  if (data.monthlyBudget >= 3000 && data.numDevices >= 5) {
    recommendations.push({
      category: 'Smart Home',
      productName:
        rules.tierSuggestion === 'Premium' ? 'Smart Home Pro' : 'Smart Starter Kit',
      monthlyPrice: rules.tierSuggestion === 'Premium' ? 999 : 499,
      reason:
        data.hasSeniors
          ? 'Voice-controlled home automation with emergency monitoring designed for senior-friendly interaction.'
          : 'Transform your home with voice control, smart lighting, and automated routines for comfort and energy savings.',
      impact: 'Save up to 30% on electricity with intelligent automation',
    });
  }

  const totalMonthly = recommendations.reduce((sum, r) => sum + r.monthlyPrice, 0);

  return {
    persona: rules.persona,
    tierName: `DigiTel ${rules.tierSuggestion} Home`,
    recommendations,
    totalMonthlyPrice: totalMonthly,
    totalAnnualValue: totalMonthly * 12,
    estimatedSavings: Math.round(totalMonthly * 0.18) * 12,
    predictedCLVIncrease: '+32%',
    predictedChurnReduction: '-15%',
    predictedHomeScore: Math.min(score.overall + 35, 95),
    executiveSummary: `Based on your ${rules.persona} profile in ${data.city}, we recommend the ${rules.tierSuggestion} tier bundle. This personalized package addresses your ${data.wfh ? 'work-from-home connectivity' : 'household connectivity'} needs${data.hasKids ? ', child safety' : ''}${data.hasSeniors ? ', senior care' : ''}, and entertainment requirements within your ₹${data.monthlyBudget}/month budget.`,
    quickWins: [
      `Immediate speed upgrade to ${data.wfh ? '500 Mbps' : '200 Mbps'} fiber`,
      `Save ₹${Math.round(totalMonthly * 0.18)}/month with bundle pricing`,
      `24/7 AI-powered home security monitoring starts Day 1`,
    ],
    homeScore: score,
    businessRules: rules,
  };
}

export async function POST(request: NextRequest) {
  try {
    const data: AssessmentData = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = buildRecommendationPrompt(data);

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const text = response.text || '';
        // Because of responseMimeType, we can safely parse directly
        try {
          const aiResult = JSON.parse(text);
          const score = calculateHomeScore(data);
          const rules = applyBusinessRules(data);
          return NextResponse.json({
            ...aiResult,
            homeScore: score,
            businessRules: rules,
          });
        } catch (parseError) {
          console.error('Failed to parse Gemini JSON:', text);
          throw parseError; // trigger fallback
        }
      } catch (aiError) {
        console.error('Gemini API error, using fallback:', aiError);
      }
    }

    // Fallback to rule-based recommendations
    const result = generateFallbackRecommendation(data);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Recommendation error:', error);
    return NextResponse.json({ error: 'Failed to generate recommendations' }, { status: 500 });
  }
}
