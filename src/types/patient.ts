export interface Vitals {
  heartRate: number;
  systolicBP: number;
  diastolicBP: number;
  map: number;
  respiratoryRate: number;
  spO2: number;
  temperature: number;
  timestamp: Date;
}

export interface LabResults {
  lactate: number;
  creatinine: number;
  bilirubin: number;
  platelets: number;
  wbc: number;
  pf_ratio: number;
  timestamp: Date;
}

export interface OrganRisk {
  organ: 'kidney' | 'lung' | 'liver' | 'cardiac' | 'coagulopathy';
  riskScore: number;
  trend: 'increasing' | 'stable' | 'decreasing';
  contributingFactors: string[];
}

export interface ManagementPlan {
  category: string;
  recommendation: string;
  priority: 'critical' | 'high' | 'moderate' | 'low';
  timing: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'M' | 'F';
  bed: string;
  admissionDate: Date;
  diagnosis: string;
  sepsisRiskScore: number;
  sepsisRiskTrend: 'increasing' | 'stable' | 'decreasing';
  organRisks: OrganRisk[];
  topContributingFactors: string[];
  vitals: Vitals;
  labs: LabResults;
  managementPlan: ManagementPlan[];
  lastUpdated: Date;
}

export type RiskLevel = 'critical' | 'high' | 'moderate' | 'low' | 'minimal';

export const getRiskLevel = (score: number): RiskLevel => {
  if (score >= 80) return 'critical';
  if (score >= 60) return 'high';
  if (score >= 40) return 'moderate';
  if (score >= 20) return 'low';
  return 'minimal';
};

export const getRiskColor = (level: RiskLevel): string => {
  const colors = {
    critical: 'risk-critical',
    high: 'risk-high',
    moderate: 'risk-moderate',
    low: 'risk-low',
    minimal: 'risk-minimal',
  };
  return colors[level];
};
