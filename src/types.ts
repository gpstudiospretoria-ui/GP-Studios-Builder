export type ServiceType = "cv" | "social" | "business" | "essay";

export interface CVDraftInputs {
  name: string;
  role: string;
  skills: string;
  experience: string;
  academics: string;
}

export interface SocialDraftInputs {
  businessName: string;
  industry: string;
  offerings: string;
  tone: string;
  campaignTheme: string;
}

export interface BusinessDraftInputs {
  ventureName: string;
  description: string;
  market: string;
  revenue: string;
  advantage: string;
  milestones: string;
}

export interface EssayDraftInputs {
  topic: string;
  academicLevel: string;
  arguments: string;
  sources: string;
  thesisGoals: string;
}

export interface DraftResponse {
  draftContent: string;
  isDemoMode?: boolean;
  message?: string;
  error?: string;
}

export interface ServiceDetail {
  id: ServiceType;
  title: string;
  priceZAR: number;
  badge: string;
  badgeColor: string;
  borderClass: string;
  accentColor: string;
  description: string;
  gumroadLink: string;
  bullets: string[];
}
