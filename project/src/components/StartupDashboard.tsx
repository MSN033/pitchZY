import React, { useState } from 'react';
import { 
  TrendingUp, 
  LogOut, 
  Eye, 
  Heart, 
  MessageSquare, 
  BarChart3, 
  Edit, 
  Send,
  DollarSign,
  Users,
  Target,
  Calendar
} from 'lucide-react';
import { User } from '../types';
import { mockStartups, mockMessages, mockInvestors } from '../data/mockData';

interface StartupDashboardProps {
  user: User;
  onLogout: () => void;
}

const StartupDashboard: React.FC<StartupDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data for the current startup
  const currentStartup = mockStartups[0]; // Using first startup as example
  const startupMessages = mockMessages.filter(msg => msg.toId === currentStartup.id);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

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
          title="Profile Views"
          value={currentStartup.metrics.views.toLocaleString()}
          icon={Eye}
          color="bg-blue-600"
          change="+12% this week"
        />
        <MetricCard
          title="Investor Interest"
          value={currentStartup.metrics.interests}
          icon={Heart}
          color="bg-red-500"
          change="+3 new"
        />
        <MetricCard
          title="Messages"
          value={currentStartup.metrics.messages}
          icon={MessageSquare}
          color="bg-green-600"
          change="2 unread"
        />
        <MetricCard
          title="Funding Progress"
          value={`${Math.round((currentStartup.fundingRaised / currentStartup.fundingGoal) * 100)}%`}
          icon={Target}
          color="bg-purple-600"
          change={formatCurrency(currentStartup.fundingRaised)}
        />
      </div>

      {/* Funding Progress */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Fundraising Status</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Goal: {formatCurrency(currentStartup.fundingGoal)}</span>
            <span className="text-gray-900 font-semibold">Raised: {formatCurrency(currentStartup.fundingRaised)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full transition-all"
              style={{ width: `${(currentStartup.fundingRaised / currentStartup.fundingGoal) * 100}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-600">
            {formatCurrency(currentStartup.fundingGoal - currentStartup.fundingRaised)} remaining to reach goal
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'Profile viewed', investor: 'Alexandra Thompson from Sequoia Capital', time: '2 hours ago', type: 'view' },
            { action: 'Interest expressed', investor: 'Michael Chen from Andreessen Horowitz', time: '5 hours ago', type: 'interest' },
            { action: 'Message received', investor: 'Sarah Williams from Kleiner Perkins', time: '1 day ago', type: 'message' },
            { action: 'Pitch deck downloaded', investor: 'Anonymous Investor', time: '2 days ago', type: 'download' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className={`w-3 h-3 rounded-full ${
                activity.type === 'view' ? 'bg-blue-500' :
                activity.type === 'interest' ? 'bg-red-500' :
                activity.type === 'message' ? 'bg-green-500' : 'bg-purple-500'
              }`}></div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium">{activity.action}</p>
                <p className="text-gray-600 text-sm">{activity.investor}</p>
              </div>
              <p className="text-gray-500 text-sm">{activity.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Company Profile</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Edit className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
            <input
              type="text"
              value={currentStartup.companyName}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Founder Name</label>
            <input
              type="text"
              value={currentStartup.founderName}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
            <input
              type="text"
              value={currentStartup.industry}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Stage</label>
            <input
              type="text"
              value={currentStartup.stage}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              value={currentStartup.location}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Team Size</label>
            <input
              type="text"
              value={`${currentStartup.teamSize} employees`}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              readOnly
            />
          </div>
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={currentStartup.description}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            readOnly
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
          <div className="flex flex-wrap gap-2">
            {currentStartup.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPitch = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Pitch Management</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Send className="w-4 h-4" />
            <span>Submit New Pitch</span>
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pitch Deck URL</label>
            <input
              type="url"
              value={currentStartup.pitchUrl || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://your-pitch-deck.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Executive Summary</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={6}
              placeholder="Provide a compelling executive summary of your startup..."
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Funding Goal</label>
              <input
                type="text"
                value={formatCurrency(currentStartup.fundingGoal)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Use of Funds</label>
              <input
                type="text"
                placeholder="e.g., Product development, Marketing, Hiring"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Investor Messages</h3>
        
        {startupMessages.length > 0 ? (
          <div className="space-y-4">
            {startupMessages.map((message) => {
              const investor = mockInvestors.find(inv => inv.id === message.fromId);
              return (
                <div key={message.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                        {investor?.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{investor?.name}</h4>
                        <p className="text-sm text-gray-600">{investor?.firm}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(message.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <h5 className="font-medium text-gray-900 mb-2">{message.subject}</h5>
                  <p className="text-gray-700 mb-4">{message.content}</p>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      Reply
                    </button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm">
                      Mark as Read
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h4>
            <p className="text-gray-600">When investors reach out, their messages will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Profile Performance</h4>
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Views</span>
              <span className="font-semibold">{currentStartup.metrics.views}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">This Week</span>
              <span className="font-semibold text-green-600">+142</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Conversion Rate</span>
              <span className="font-semibold">1.8%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Investor Interest</h4>
            <Heart className="w-5 h-5 text-red-500" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Interest</span>
              <span className="font-semibold">{currentStartup.metrics.interests}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">This Week</span>
              <span className="font-semibold text-green-600">+3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Response Rate</span>
              <span className="font-semibold">65%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Engagement</h4>
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Messages</span>
              <span className="font-semibold">{currentStartup.metrics.messages}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Meetings Scheduled</span>
              <span className="font-semibold">4</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Follow-ups</span>
              <span className="font-semibold">12</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Funding Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Investor Interest by Industry Focus</h4>
            <div className="space-y-3">
              {['AI/ML', 'Enterprise Software', 'SaaS', 'Automation'].map((focus, index) => (
                <div key={focus} className="flex items-center justify-between">
                  <span className="text-gray-600">{focus}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${[85, 72, 68, 45][index]}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{[85, 72, 68, 45][index]}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Investment Stage Interest</h4>
            <div className="space-y-3">
              {['Series A', 'Seed', 'Series B', 'Pre-Seed'].map((stage, index) => (
                <div key={stage} className="flex items-center justify-between">
                  <span className="text-gray-600">{stage}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${[92, 78, 65, 34][index]}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{[92, 78, 65, 34][index]}%</span>
                  </div>
                </div>
              ))}
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
                <p className="text-sm text-gray-600">Startup Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-600">{currentStartup.companyName}</p>
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
              { id: 'profile', label: 'Profile', icon: Edit },
              { id: 'pitch', label: 'Pitch', icon: Send },
              { id: 'messages', label: 'Messages', icon: MessageSquare },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
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
        {activeTab === 'profile' && renderProfile()}
        {activeTab === 'pitch' && renderPitch()}
        {activeTab === 'messages' && renderMessages()}
        {activeTab === 'analytics' && renderAnalytics()}
      </div>
    </div>
  );
};

export default StartupDashboard;