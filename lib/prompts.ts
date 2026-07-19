import { AssessmentData, applyBusinessRules, calculateHomeScore } from './business-rules';

// Build the AI prompt with business rules context
export function buildRecommendationPrompt(data: AssessmentData): string {
  const rules = applyBusinessRules(data);
  const score = calculateHomeScore(data);

  return `You are DigiTel Nexus AI, an expert Digital Home Advisor for India's leading telecom provider.

CUSTOMER PROFILE:
- Name: ${data.customerName}
- Family Size: ${data.familySize}
- City: ${data.city}
- Income Band: ${data.incomeBand}
- Works from Home: ${data.wfh ? 'Yes' : 'No'}
- Has Children: ${data.hasKids ? 'Yes' : 'No'}
- Has Senior Citizens: ${data.hasSeniors ? 'Yes' : 'No'}
- Home Type: ${data.homeType}
- Number of Devices: ${data.numDevices}
- Current Services: ${data.currentServices.join(', ') || 'None'}
- Monthly Budget: ₹${data.monthlyBudget}
- Priorities: ${data.priorities.join(', ')}

BUSINESS RULES ANALYSIS:
- Detected Persona: ${rules.persona}
- Tier Suggestion: ${rules.tierSuggestion}
- Must-Have Services: ${rules.mustHave.join(', ')}
- Recommended Services: ${rules.recommended.join(', ')}

CURRENT HOME SCORE:
- Connectivity: ${score.connectivity}/100
- Entertainment: ${score.entertainment}/100
- Security: ${score.security}/100
- Cyber Safety: ${score.cyber}/100
- Automation: ${score.automation}/100
- Overall: ${score.overall}/100

INSTRUCTIONS:
Based on the above profile and business rules, recommend a personalized DigiTel digital home bundle. You MUST return a valid JSON object (no markdown, no code fences) with this exact structure:

{
  "persona": "${rules.persona}",
  "tierName": "string (e.g., DigiTel ${rules.tierSuggestion} Home)",
  "recommendations": [
    {
      "category": "string (Fiber/OTT/Security/Cyber/Smart Home)",
      "productName": "string",
      "monthlyPrice": number,
      "reason": "string (1-2 sentences explaining WHY this specific product for THIS customer)",
      "impact": "string (specific benefit like 'Reduces buffering by 90% for 8+ devices')"
    }
  ],
  "totalMonthlyPrice": number,
  "totalAnnualValue": number,
  "estimatedSavings": number,
  "predictedCLVIncrease": "string (e.g., '+32%')",
  "predictedChurnReduction": "string (e.g., '-15%')",
  "predictedHomeScore": number,
  "executiveSummary": "string (2-3 sentences about why this bundle is perfect for this household)",
  "quickWins": ["string (3 immediate benefits)"]
}

IMPORTANT RULES:
1. Total monthly price MUST be within ±20% of the customer's budget of ₹${data.monthlyBudget}.
2. Every recommendation MUST have a clear, personalized reason tied to the customer's profile.
3. Include 4-6 products covering Fiber, OTT, Security, Cyber, and optionally Smart Home.
4. Savings should represent bundle discount vs buying separately.
5. Be specific and quantitative in impacts.
6. Return ONLY the JSON object, no other text.`;
}

export function buildChatPrompt(
  data: AssessmentData,
  recommendations: string,
  chatHistory: { role: string; content: string }[]
): string {
  return `You are DigiTel Nexus AI, a helpful Digital Home Advisor. You are chatting with ${data.customerName}.

CUSTOMER CONTEXT:
- Persona: ${applyBusinessRules(data).persona}
- Family: ${data.familySize} members ${data.hasKids ? '(with children)' : ''} ${data.hasSeniors ? '(with seniors)' : ''}
- Budget: ₹${data.monthlyBudget}/month
- Home: ${data.homeType}
- WFH: ${data.wfh ? 'Yes' : 'No'}
- Current Services: ${data.currentServices.join(', ') || 'None'}

PREVIOUS RECOMMENDATIONS:
${recommendations}

CONVERSATION SO FAR:
${chatHistory.map((m) => `${m.role === 'user' ? 'Customer' : 'AI'}: ${m.content}`).join('\n')}

INSTRUCTIONS:
- Answer the customer's question helpfully and specifically.
- Reference their profile and recommendations when relevant.
- If asked "why" about a recommendation, explain using their specific situation.
- Keep responses concise (2-4 sentences max).
- Be warm, professional, and use the customer's name occasionally.
- If asked about pricing, be specific with numbers.
- ALWAYS tie recommendations back to their needs (WFH, kids, security, etc.)
- Return plain text, not JSON.`;
}

export function buildExecutiveInsightsPrompt(simulationData: {
  households: number;
  projectedRevenue: number;
  revenueUplift: number;
  projectedChurn: number;
  productsPerHousehold: number;
  arpu: number;
}): string {
  return `You are DigiTel Nexus AI, generating executive insights for DigiTel's leadership team.

SIMULATION DATA:
- Households Covered: ${simulationData.households.toLocaleString()}
- Projected Annual Revenue: ₹${(simulationData.projectedRevenue / 10000000).toFixed(1)} Cr
- Revenue Uplift: ₹${(simulationData.revenueUplift / 10000000).toFixed(1)} Cr
- Projected Churn Rate: ${simulationData.projectedChurn.toFixed(1)}%
- Products/Household: ${simulationData.productsPerHousehold}
- ARPU: ₹${simulationData.arpu}

Generate exactly 4 executive insights as a JSON array. Each insight should have:
{
  "title": "string (bold headline)",
  "insight": "string (2-3 sentences of actionable business intelligence)",
  "metric": "string (key number)",
  "trend": "up" or "down" (is this good news = up)
}

Return ONLY the JSON array.`;
}
