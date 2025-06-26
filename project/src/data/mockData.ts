import { Startup, Investor, Message, Investment } from '../types';

export const mockStartups: Startup[] = [
  {
    id: '1',
    companyName: 'TechFlow AI',
    founderName: 'Sarah Chen',
    email: 'sarah@techflow.ai',
    pitchUrl: 'https://pitch.com/techflow-ai',
    description: 'AI-powered workflow automation platform that helps enterprises streamline their operations and increase productivity by 40%.',
    industry: 'Artificial Intelligence',
    stage: 'Series A',
    fundingGoal: 5000000,
    fundingRaised: 1200000,
    location: 'San Francisco, CA',
    teamSize: 12,
    founded: '2022',
    website: 'https://techflow.ai',
    tags: ['AI', 'Enterprise', 'SaaS', 'Automation'],
    metrics: {
      views: 1247,
      interests: 23,
      messages: 8
    }
  },
  {
    id: '2',
    companyName: 'GreenTech Solutions',
    founderName: 'Marcus Johnson',
    email: 'marcus@greentech.com',
    pitchUrl: 'https://pitch.com/greentech',
    description: 'Sustainable energy management platform for commercial buildings, reducing energy costs by up to 30%.',
    industry: 'Clean Technology',
    stage: 'Seed',
    fundingGoal: 2000000,
    fundingRaised: 500000,
    location: 'Austin, TX',
    teamSize: 8,
    founded: '2023',
    website: 'https://greentech.com',
    tags: ['CleanTech', 'Energy', 'IoT', 'Sustainability'],
    metrics: {
      views: 892,
      interests: 15,
      messages: 5
    }
  },
  {
    id: '3',
    companyName: 'HealthLink',
    founderName: 'Dr. Emily Rodriguez',
    email: 'emily@healthlink.com',
    pitchUrl: 'https://pitch.com/healthlink',
    description: 'Telemedicine platform connecting rural patients with specialists, improving healthcare access for underserved communities.',
    industry: 'Healthcare',
    stage: 'Pre-Seed',
    fundingGoal: 1000000,
    fundingRaised: 150000,
    location: 'Denver, CO',
    teamSize: 5,
    founded: '2023',
    website: 'https://healthlink.com',
    tags: ['Healthcare', 'Telemedicine', 'Rural', 'Access'],
    metrics: {
      views: 634,
      interests: 12,
      messages: 3
    }
  },
  {
    id: '4',
    companyName: 'EduTech Pro',
    founderName: 'David Kim',
    email: 'david@edutechpro.com',
    pitchUrl: 'https://pitch.com/edutechpro',
    description: 'Personalized learning platform using AI to adapt to individual student needs and improve learning outcomes.',
    industry: 'Education Technology',
    stage: 'Seed',
    fundingGoal: 3000000,
    fundingRaised: 800000,
    location: 'Boston, MA',
    teamSize: 15,
    founded: '2022',
    website: 'https://edutechpro.com',
    tags: ['EdTech', 'AI', 'Personalization', 'Learning'],
    metrics: {
      views: 1156,
      interests: 19,
      messages: 7
    }
  }
];

export const mockInvestors: Investor[] = [
  {
    id: '1',
    name: 'Alexandra Thompson',
    email: 'alex@sequoiacap.com',
    firm: 'Sequoia Capital',
    interests: ['AI', 'Enterprise Software', 'Fintech'],
    investmentRange: '$1M - $10M',
    location: 'Menlo Park, CA',
    portfolio: 25,
    bio: 'Partner at Sequoia Capital with 15+ years of experience in early-stage investments. Focus on AI and enterprise software.',
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@a16z.com',
    firm: 'Andreessen Horowitz',
    interests: ['Healthcare', 'Biotech', 'Digital Health'],
    investmentRange: '$500K - $5M',
    location: 'San Francisco, CA',
    portfolio: 18,
    bio: 'General Partner focusing on healthcare innovation and digital transformation in medical services.',
  },
  {
    id: '3',
    name: 'Sarah Williams',
    email: 'sarah@kleinerperkins.com',
    firm: 'Kleiner Perkins',
    interests: ['CleanTech', 'Sustainability', 'Energy'],
    investmentRange: '$2M - $15M',
    location: 'Palo Alto, CA',
    portfolio: 32,
    bio: 'Senior Partner with expertise in clean technology and sustainable innovation investments.',
  }
];

export const mockMessages: Message[] = [
  {
    id: '1',
    fromId: '1',
    toId: '1',
    fromRole: 'investor',
    subject: 'Interest in TechFlow AI',
    content: 'Hi Sarah, I\'m very interested in TechFlow AI\'s approach to workflow automation. Would love to schedule a call to discuss your Series A round.',
    timestamp: '2024-01-15T10:30:00Z',
    read: false
  },
  {
    id: '2',
    fromId: '2',
    toId: '3',
    fromRole: 'investor',
    subject: 'HealthLink Partnership Opportunity',
    content: 'Dr. Rodriguez, your telemedicine platform aligns perfectly with our healthcare portfolio. Let\'s explore potential synergies.',
    timestamp: '2024-01-14T14:20:00Z',
    read: true
  }
];

export const mockInvestments: Investment[] = [
  {
    id: '1',
    startupId: '1',
    investorId: '1',
    amount: 2500000,
    stage: 'Series A',
    date: '2024-01-10',
    status: 'negotiating'
  },
  {
    id: '2',
    startupId: '2',
    investorId: '3',
    amount: 750000,
    stage: 'Seed',
    date: '2024-01-08',
    status: 'interested'
  }
];