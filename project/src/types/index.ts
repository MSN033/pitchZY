export interface User {
  id: string;
  email: string;
  role: 'startup' | 'investor';
  name: string;
  avatar?: string;
}

export interface Startup {
  id: string;
  companyName: string;
  founderName: string;
  email: string;
  pitchUrl?: string;
  description: string;
  industry: string;
  stage: string;
  fundingGoal: number;
  fundingRaised: number;
  location: string;
  teamSize: number;
  founded: string;
  website?: string;
  logo?: string;
  tags: string[];
  metrics: {
    views: number;
    interests: number;
    messages: number;
  };
}

export interface Investor {
  id: string;
  name: string;
  email: string;
  firm?: string;
  interests: string[];
  investmentRange: string;
  location: string;
  portfolio: number;
  avatar?: string;
  bio: string;
}

export interface Message {
  id: string;
  fromId: string;
  toId: string;
  fromRole: 'startup' | 'investor';
  subject: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Investment {
  id: string;
  startupId: string;
  investorId: string;
  amount: number;
  stage: string;
  date: string;
  status: 'interested' | 'negotiating' | 'completed' | 'passed';
}