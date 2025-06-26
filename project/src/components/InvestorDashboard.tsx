import React, { useState } from 'react';
import { 
  TrendingUp, 
  LogOut, 
  Search, 
  Filter, 
  Heart, 
  MessageSquare, 
  BarChart3, 
  Building,
  DollarSign,
  Users,
  Target,
  Eye,
  Star,
  MapPin,
  Calendar
} from 'lucide-react';
import { User } from '../types';
import { mockStartups, mockInvestors, mockInvestments } from '../data/mockData';

interface InvestorDashboardProps {
  user: User;
  onLogout: () => void;
}

const InvestorDashboard: React.FC<InvestorDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('all');
  const [filterStage, setFilterStage] = useState('all');
  
  // Mock data for the current investor
  const currentInvestor = mockInvestors[0]; // Using first investor as example
  const investorInvestments = mockInvestments.filter(inv => inv.investorId === currentInvestor.id);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const filteredStartups = mockStartups.filter(startup => {
    const matchesSearch = startup.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         startup.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = filterIndustry === 'all' || startup.industry.toLowerCase().includes(filterIndustry.toLowerCase());
    const matchesStage = filterStage === 'all' || startup.stage === filterStage;
    return matchesSearch && matchesIndustry && matchesStage;
  });

  const MetricCard = ({ title, value, icon: Icon, color, change }: any) => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className="text-sm text-green-600 mt-1">{change}</p>
          )}
        </div>
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Portfolio Companies"
          value={currentInvestor.portfolio}
          icon={Building}
          color="bg-blue-600"
          change="+2 this quarter"
        />
        <MetricCard
          title="Active Deals"
          value="8"
          icon={Target}
          color="bg-green-600"
          change="3 in due diligence"
        />
        <MetricCard
          title="Total Invested"
          value="$45M"
          icon={DollarSign}
          color="bg-purple-600"
          change="+$5M this year"
        />
        <MetricCard
          title="Startups Reviewed"
          value="156"
          icon={Eye}
          color="bg-orange-600"
          change="12 this week"
        />
      </div>

      {/* Investment Pipeline */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Investment Pipeline</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { stage: 'Prospecting', count: 24, color: 'bg-blue-500' },
            { stage: 'Due Diligence', count: 8, color: 'bg-yellow-500' },
            { stage: 'Negotiating', count: 3, color: 'bg-orange-500' },
            { stage: 'Closed', count: 2, color: 'bg-green-500' },
          ].map((item, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                <span className="text-white font-bold">{item.count}</span>
              </div>
              <h4 className="font-semibold text-gray-900">{item.stage}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'Reviewed pitch', startup: 'TechFlow AI - Series A', time: '2 hours ago', type: 'review' },
            { action: 'Scheduled meeting', startup: 'GreenTech Solutions - Seed', time: '5 hours ago', type: 'meeting' },
            { action: 'Sent message', startup: 'HealthLink - Pre-Seed', time: '1 day ago', type: 'message' },
            { action: 'Added to shortlist', startup: 'EduTech Pro - Seed', time: '2 days ago', type: 'shortlist' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className={`w-3 h-3 rounded-full ${
                activity.type === 'review' ? 'bg-blue-500' :
                activity.type === 'meeting' ? 'bg-green-500' :
                activity.type === 'message' ? 'bg-purple-500' : 'bg-yellow-500'
              }`}></div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium">{activity.action}</p>
                <p className="text-gray-600 text-sm">{activity.startup}</p>
              </div>
              <p className="text-gray-500 text-sm">{activity.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBrowseStartups = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search startups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterIndustry}
                onChange={(e) => setFilterIndustry(e.target.value)}
                className="px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Industries</option>
                <option value="ai">AI/ML</option>
                <option value="healthcare">Healthcare</option>
                <option value="fintech">FinTech</option>
                <option value="education">Education</option>
                <option value="clean">Clean Tech</option>
              </select>
            </div>
            <select
              value={filterStage}
              onChange={(e) => setFilterStage(e.target.value)}
              className="px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Stages</option>
              <option value="pre-seed">Pre-Seed</option>
              <option value="seed">Seed</option>
              <option value="series-a">Series A</option>
              <option value="series-b">Series B</option>
            </select>
          </div>
        </div>
      </div>

      {/* Startup Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredStartups.map((startup) => (
          <div key={startup.id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{startup.companyName}</h3>
                  <p className="text-gray-600 text-sm">{startup.industry}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {startup.stage}
                </span>
                <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>

            <p className="text-gray-700 text-sm mb-4 line-clamp-2">{startup.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-gray-500 text-xs">Funding Goal</p>
                <p className="font-semibold text-gray-900">{formatCurrency(startup.fundingGoal)}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Raised</p>
                <p className="font-semibold text-gray-900">{formatCurrency(startup.fundingRaised)}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Location</p>
                <p className="font-semibold text-gray-900 flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {startup.location}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Team Size</p>
                <p className="font-semibold text-gray-900">{startup.teamSize} people</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {startup.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    {tag}
                  </span>
                ))}
                {startup.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    +{startup.tags.length - 3}
                  </span>
                )}
              </div>
            </div>

            <div className="flex space-x-3">
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                View Details
              </button>
              <button className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium flex items-center justify-center space-x-1">
                <MessageSquare className="w-4 h-4" />
                <span>Contact</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredStartups.length === 0 && (
        <div className="text-center py-12">
          <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No startups found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );

  const renderShortlist = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Shortlisted Startups</h3>
        
        <div className="space-y-4">
          {mockStartups.slice(0, 2).map((startup) => (
            <div key={startup.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{startup.companyName}</h4>
                    <p className="text-gray-600 text-sm">{startup.industry} • {startup.stage}</p>
                    <p className="text-gray-700 text-sm mt-1">{startup.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Heart className="w-5 h-5 fill-current" />
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Review
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Messages</h3>
        
        <div className="space-y-4">
          {[
            {
              startup: 'TechFlow AI',
              founder: 'Sarah Chen',
              subject: 'Thank you for your interest',
              preview: 'Thank you for expressing interest in TechFlow AI. I would love to schedule a call to discuss our Series A round...',
              time: '2 hours ago',
              unread: true
            },
            {
              startup: 'GreenTech Solutions',
              founder: 'Marcus Johnson',
              subject: 'Follow-up on our meeting',
              preview: 'Following up on our great conversation yesterday. Attached you will find our updated financial projections...',
              time: '1 day ago',
              unread: false
            }
          ].map((message, index) => (
            <div key={index} className={`p-4 border rounded-lg hover:bg-gray-50 transition-colors ${
              message.unread ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
            }`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                    {message.founder.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{message.founder}</h4>
                    <p className="text-sm text-gray-600">{message.startup}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-500">{message.time}</span>
                  {message.unread && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-1 ml-auto"></div>
                  )}
                </div>
              </div>
              <h5 className="font-medium text-gray-900 mb-2">{message.subject}</h5>
              <p className="text-gray-700 text-sm mb-4">{message.preview}</p>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Reply
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm">
                  Archive
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderInvestmentTracker = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Investment Portfolio</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Company</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Investment</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Stage</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Date</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {investorInvestments.map((investment) => {
                const startup = mockStartups.find(s => s.id === investment.startupId);
                return (
                  <tr key={investment.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                          <Building className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{startup?.companyName}</p>
                          <p className="text-sm text-gray-600">{startup?.industry}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right font-semibold text-gray-900">
                      {formatCurrency(investment.amount)}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {investment.stage}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right text-gray-600">
                      {new Date(investment.date).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        investment.status === 'completed' ? 'bg-green-100 text-green-800' :
                        investment.status === 'negotiating' ? 'bg-yellow-100 text-yellow-800' :
                        investment.status === 'interested' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {investment.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4">Portfolio Performance</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Invested</span>
              <span className="font-semibold">$45M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Current Value</span>
              <span className="font-semibold text-green-600">$67M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">ROI</span>
              <span className="font-semibold text-green-600">+49%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4">Investment Distribution</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Seed</span>
              <span className="font-semibold">40%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Series A</span>
              <span className="font-semibold">35%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Series B+</span>
              <span className="font-semibold">25%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4">Sector Allocation</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">AI/ML</span>
              <span className="font-semibold">30%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Healthcare</span>
              <span className="font-semibold">25%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">FinTech</span>
              <span className="font-semibold">20%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Other</span>
              <span className="font-semibold">25%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">pitchZY</h1>
                <p className="text-sm text-gray-600">Investor Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-600">{currentInvestor.firm}</p>
              </div>
              <button
                onClick={onLogout}
                className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'browse', label: 'Browse Startups', icon: Search },
              { id: 'shortlist', label: 'Shortlist', icon: Heart },
              { id: 'messages', label: 'Messages', icon: MessageSquare },
              { id: 'tracker', label: 'Investment Tracker', icon: TrendingUp },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'browse' && renderBrowseStartups()}
        {activeTab === 'shortlist' && renderShortlist()}
        {activeTab === 'messages' && renderMessages()}
        {activeTab === 'tracker' && renderInvestmentTracker()}
      </div>
    </div>
  );
};

export default InvestorDashboard;