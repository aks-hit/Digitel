// DigiTel Nexus AI — Business Rules Engine
// Applied BEFORE Gemini to ensure deterministic base recommendations

export interface AssessmentData {
  familySize: number;
  incomeBand: string;
  wfh: boolean;
  hasKids: boolean;
  hasSeniors: boolean;
  homeType: string;
  numDevices: number;
  currentServices: string[];
  monthlyBudget: number;
  priorities: string[];
  city: string;
  customerName: string;
}

export interface RuleResult {
  mustHave: string[];
  recommended: string[];
  persona: string;
  tierSuggestion: string;
  budgetCategory: string;
}

const PERSONAS: Record<string, (d: AssessmentData) => boolean> = {
  'Remote Professional': (d) => d.wfh && d.incomeBand !== 'below-25k',
  'Digital Family': (d) => d.hasKids && d.familySize >= 3,
  'Premium Smart Home': (d) =>
    (d.homeType === 'villa' || d.homeType === 'penthouse') && d.monthlyBudget >= 5000,
  'Senior Care Home': (d) => d.hasSeniors && d.familySize <= 3,
  'Budget Conscious': (d) => d.monthlyBudget < 2000,
  'Entertainment Hub': (d) => d.priorities.includes('entertainment'),
  'Security First': (d) => d.priorities.includes('security'),
};

export function detectPersona(data: AssessmentData): string {
  for (const [persona, check] of Object.entries(PERSONAS)) {
    if (check(data)) return persona;
  }
  return 'Digital Family';
}

export function applyBusinessRules(data: AssessmentData): RuleResult {
  const mustHave: string[] = [];
  const recommended: string[] = [];

  // WFH Rules
  if (data.wfh) {
    mustHave.push('Mesh WiFi System');
    mustHave.push('100 Mbps+ Fiber Plan');
    recommended.push('Cloud Backup Solution');
  }

  // Kids Rules
  if (data.hasKids) {
    mustHave.push('Parental Controls');
    recommended.push('Disney+ Hotstar');
    recommended.push('Kids Learning Bundle');
    if (data.homeType === 'villa' || data.homeType === 'independent-house') {
      recommended.push('Outdoor CCTV Camera');
    }
  }

  // Senior Rules
  if (data.hasSeniors) {
    mustHave.push('Emergency Monitoring');
    recommended.push('Health Alert System');
    recommended.push('Simple Remote Interface');
  }

  // Home Type Rules
  if (data.homeType === 'villa' || data.homeType === 'penthouse') {
    mustHave.push('4-Camera CCTV Kit');
    recommended.push('Smart Door Lock');
    recommended.push('Video Doorbell');
    recommended.push('Whole Home WiFi 6E');
  } else if (data.homeType === 'independent-house') {
    recommended.push('2-Camera CCTV Kit');
    recommended.push('Smart Door Lock');
  }

  // Device Rules
  if (data.numDevices > 10) {
    mustHave.push('WiFi 6E Router');
    recommended.push('Network Security Suite');
  } else if (data.numDevices > 5) {
    recommended.push('Mesh WiFi Extender');
  }

  // Priority Rules
  if (data.priorities.includes('entertainment')) {
    recommended.push('OTT Super Bundle');
    recommended.push('Smart TV Stick');
  }
  if (data.priorities.includes('security')) {
    mustHave.push('Cyber Security Suite');
    recommended.push('VPN Service');
  }
  if (data.priorities.includes('automation')) {
    recommended.push('Smart Home Starter Kit');
    recommended.push('Voice Assistant Integration');
  }

  // Budget tier
  let tierSuggestion = 'Essential';
  let budgetCategory = 'low';
  if (data.monthlyBudget >= 5000) {
    tierSuggestion = 'Premium';
    budgetCategory = 'high';
  } else if (data.monthlyBudget >= 3000) {
    tierSuggestion = 'Plus';
    budgetCategory = 'medium';
  } else if (data.monthlyBudget >= 2000) {
    tierSuggestion = 'Essential';
    budgetCategory = 'low';
  } else {
    tierSuggestion = 'Starter';
    budgetCategory = 'starter';
  }

  return {
    mustHave: [...new Set(mustHave)],
    recommended: [...new Set(recommended)],
    persona: detectPersona(data),
    tierSuggestion,
    budgetCategory,
  };
}

// Calculate Home Score
export function calculateHomeScore(data: AssessmentData): {
  connectivity: number;
  entertainment: number;
  security: number;
  cyber: number;
  automation: number;
  overall: number;
} {
  let connectivity = 30;
  let entertainment = 20;
  let security = 15;
  let cyber = 10;
  let automation = 5;

  // Connectivity
  if (data.currentServices.includes('fiber')) connectivity += 30;
  if (data.currentServices.includes('broadband')) connectivity += 20;
  if (data.numDevices > 5) connectivity += 10;
  if (data.wfh) connectivity += 10;
  connectivity = Math.min(connectivity, 100);

  // Entertainment
  if (data.currentServices.includes('ott')) entertainment += 30;
  if (data.currentServices.includes('dth')) entertainment += 15;
  if (data.hasKids) entertainment += 10;
  if (data.priorities.includes('entertainment')) entertainment += 15;
  entertainment = Math.min(entertainment, 100);

  // Security
  if (data.currentServices.includes('cctv')) security += 35;
  if (data.currentServices.includes('smart-lock')) security += 20;
  if (data.homeType === 'villa') security += 10;
  if (data.priorities.includes('security')) security += 15;
  security = Math.min(security, 100);

  // Cyber
  if (data.currentServices.includes('antivirus')) cyber += 25;
  if (data.currentServices.includes('vpn')) cyber += 20;
  if (data.priorities.includes('security')) cyber += 15;
  cyber = Math.min(cyber, 100);

  // Automation
  if (data.currentServices.includes('smart-home')) automation += 35;
  if (data.priorities.includes('automation')) automation += 20;
  if (data.numDevices > 10) automation += 10;
  automation = Math.min(automation, 100);

  const overall = Math.round(
    connectivity * 0.3 +
      entertainment * 0.2 +
      security * 0.2 +
      cyber * 0.15 +
      automation * 0.15
  );

  return { connectivity, entertainment, security, cyber, automation, overall };
}

// Impact simulation
export function simulateImpact(households: number) {
  const avgRevenuePerHousehold = 2800; // INR/month
  const crossSellUplift = 0.35;
  const churnReduction = 0.12;
  const currentChurn = 0.22;
  const targetProducts = 3.2;

  const currentRevenue = households * avgRevenuePerHousehold * 12;
  const projectedRevenue = households * avgRevenuePerHousehold * (1 + crossSellUplift) * 12;
  const revenueUplift = projectedRevenue - currentRevenue;
  const projectedChurn = currentChurn - churnReduction;
  const retainedCustomers = Math.round(households * churnReduction);
  const ebitdaMargin = 0.38;
  const projectedEbitda = projectedRevenue * ebitdaMargin;
  const clvIncrease = 35;
  const productsPerHousehold = targetProducts;
  const arpu = Math.round(projectedRevenue / households / 12);

  return {
    currentRevenue,
    projectedRevenue,
    revenueUplift,
    currentChurn: currentChurn * 100,
    projectedChurn: projectedChurn * 100,
    retainedCustomers,
    ebitda: projectedEbitda,
    ebitdaMargin: ebitdaMargin * 100,
    clvIncrease,
    currentProducts: 1.4,
    productsPerHousehold,
    arpu,
    households,
  };
}
