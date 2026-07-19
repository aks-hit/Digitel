import { NextRequest, NextResponse } from 'next/server';
import { AssessmentData } from '@/lib/business-rules';
import { buildChatPrompt } from '@/lib/prompts';
import { GoogleGenAI } from '@google/genai';

export async function POST(request: NextRequest) {
  try {
    const { message, assessment, recommendations, history } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = buildChatPrompt(
          assessment as AssessmentData,
          JSON.stringify(recommendations),
          [...(history || []), { role: 'user', content: message }]
        );

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });

        return NextResponse.json({
          reply: response.text || 'I apologize, I could not process your question. Please try again.',
        });
      } catch (aiError) {
        console.error('Gemini chat error:', aiError);
      }
    }

    // Fallback smart responses
    const lowerMsg = message.toLowerCase();
    let reply = '';

    if (lowerMsg.includes('mesh') || lowerMsg.includes('wifi')) {
      reply = `Based on your ${(assessment as AssessmentData)?.homeType || 'home'} with ${(assessment as AssessmentData)?.numDevices || 'multiple'} devices, yes — Mesh WiFi would significantly improve coverage. ${(assessment as AssessmentData)?.wfh ? 'Especially since you work from home, dead zones can impact video calls and productivity.' : 'It ensures every room gets consistent high-speed connectivity.'} Our DigiTel Mesh Kit covers up to 3,000 sq ft with WiFi 6E technology.`;
    } else if (lowerMsg.includes('ott') || lowerMsg.includes('streaming') || lowerMsg.includes('netflix')) {
      reply = `For your household, I recommend the ${(assessment as AssessmentData)?.hasKids ? 'OTT Family Bundle which includes Disney+ Hotstar for kids content, plus Netflix and Amazon Prime' : 'OTT Super Bundle with Netflix, Amazon Prime, and all major platforms'}. ${(assessment as AssessmentData)?.hasKids ? 'It includes built-in parental controls across all platforms.' : 'You save ₹2,400/year compared to individual subscriptions.'} The bundle is part of your recommended DigiTel package.`;
    } else if (lowerMsg.includes('cctv') || lowerMsg.includes('camera') || lowerMsg.includes('security')) {
      reply = `${(assessment as AssessmentData)?.homeType === 'villa' ? 'For your villa, I strongly recommend our 4-Camera CCTV Kit with AI motion detection, night vision, and cloud recording.' : 'Our Smart Security solution includes HD cameras with mobile alerts and 30-day cloud storage.'} ${(assessment as AssessmentData)?.hasKids || (assessment as AssessmentData)?.hasSeniors ? 'With family members who need extra safety, 24/7 monitoring provides peace of mind.' : 'You can monitor your home from anywhere via the DigiTel app.'} The AI detects unusual activity and sends instant alerts.`;
    } else if (lowerMsg.includes('cost') || lowerMsg.includes('price') || lowerMsg.includes('budget') || lowerMsg.includes('save')) {
      reply = `Your recommended bundle is designed to stay within your ₹${(assessment as AssessmentData)?.monthlyBudget || 3000}/month budget. The bundle pricing saves you approximately 18% compared to subscribing to each service individually. That's about ₹${Math.round(((assessment as AssessmentData)?.monthlyBudget || 3000) * 0.18 * 12).toLocaleString()}/year in savings while getting more services than you'd typically afford separately.`;
    } else if (lowerMsg.includes('why') || lowerMsg.includes('recommend')) {
      reply = `Every recommendation is tailored to your specific profile. As a "${(assessment as AssessmentData)?.wfh ? 'Remote Professional' : 'Digital Family'}" household in ${(assessment as AssessmentData)?.city || 'your city'}, our AI considers your ${(assessment as AssessmentData)?.familySize || 'family'}-member household, ${(assessment as AssessmentData)?.numDevices || 'multiple'} devices, ${(assessment as AssessmentData)?.hasKids ? "children's safety needs, " : ""}and ₹${(assessment as AssessmentData)?.monthlyBudget || 3000}/month budget. The business rules engine ensures critical needs are covered first, then Gemini AI optimizes for maximum value.`;
    } else if (lowerMsg.includes('upgrade') || lowerMsg.includes('better') || lowerMsg.includes('improve')) {
      reply = `To improve your Digital Home Score, I'd prioritize: 1) ${(assessment as AssessmentData)?.currentServices?.includes('fiber') ? 'Upgrading to a faster fiber tier' : 'Getting DigiTel Fiber for reliable connectivity'}, 2) Adding comprehensive security coverage, and 3) ${(assessment as AssessmentData)?.currentServices?.includes('ott') ? 'Upgrading your OTT bundle' : 'Getting our OTT bundle for entertainment'}. Each upgrade directly improves your category scores and overall household score.`;
    } else {
      reply = `Great question! Based on your ${(assessment as AssessmentData)?.homeType || 'home'} profile with a monthly budget of ₹${(assessment as AssessmentData)?.monthlyBudget || 3000}, I'd suggest exploring the recommended bundle on your dashboard. It's designed to maximize your digital home experience. Would you like to know more about any specific service — Fiber, OTT, Security, Cyber Protection, or Smart Home automation?`;
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { reply: 'I apologize for the technical difficulty. Please try asking your question again.' },
      { status: 200 }
    );
  }
}
