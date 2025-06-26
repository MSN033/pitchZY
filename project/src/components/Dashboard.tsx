import React from 'react';
import { TrendingUp, Users, Briefcase, DollarSign, Target, Percent } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { mockMetrics } from '../data/mockData';

const Dashboard: React.FC = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const performanceData = [
    { month: 'Jan', deals: 8, funding: 25000000 },
    { month: 'Feb', deals: 12, funding: 35000000 },
    { month: 'Mar', deals: 15, funding: 42000000 },
    { month: 'Apr', deals: 18, funding: 55000000 },
    { month: 'May', deals: 22, funding: 68000000 },
    { month: 'Jun', deals: 28, funding: 85000000 },
  ];

  const stageDistribution = [
    { name: 'Pre-Seed', value: 25, color: '#3b82f6' },
    { name: 'Seed', value: 35, color: '#10b981' },
    { name: 'Series A', value: 20, color: '#f59e0b' },
    { name: 'Series B+', value: 20, color: '#ef4444' },
  ];

  const MetricCard = ({ title, value, icon: Icon, change, changeType }: any) => (
    <div className="glass rounded-xl p-6 card-hover animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          {change && (
            <div className={`flex items-center mt-2 text-sm ${
              changeType === 'positive' ? 'text-green-400' : 'text-red-400'
            }`}>
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>{change}</span>
            </div>
          )}
        </div>
        <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome back! Here's your investment overview.</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
            Export Report
          </button>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            Add New Deal
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <MetricCard
          title="Total Investors"
          value={mockMetrics.totalInvestors}
          icon={Users}
          change="+12% from last month"
          changeType="positive"
        />
        <MetricCard
          title="Active Deals"
          value={mockMetrics.activeDeals}
          icon={Briefcase}
          change="+8% from last month"
          changeType="positive"
        />
        <MetricCard
          title="Total Funding"
          value={formatCurrency(mockMetrics.totalFunding)}
          icon={DollarSign}
          change="+23% from last month"
          changeType="positive"
        />
        <MetricCard
          title="Avg Deal Size"
          value={formatCurrency(mockMetrics.avgDealSize)}
          icon={Target}
          change="+5% from last month"
          changeType="positive"
        />
        <MetricCard
          title="Pipeline Value"
          value={formatCurrency(mockMetrics.pipelineValue)}
          icon={TrendingUp}
          change="+18% from last month"
          changeType="positive"
        />
        <MetricCard
          title="Conversion Rate"
          value={`${mockMetrics.conversionRate}%`}
          icon={Percent}
          change="+2.3% from last month"
          changeType="positive"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass rounded-xl p-6 animate-slide-up">
          <h3 className="text-xl font-semibold text-white mb-6">Funding Performance</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="funding" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-xl p-6 animate-slide-up">
          <h3 className="text-xl font-semibold text-white mb-6">Deal Stage Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stageDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {stageDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="glass rounded-xl p-6 animate-slide-up">
        <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'New investor added', investor: 'Sarah Chen from Accel Partners', time: '2 hours ago', type: 'investor' },
            { action: 'Deal status updated', startup: 'TechFlow AI moved to Due Diligence', time: '4 hours ago', type: 'deal' },
            { action: 'Meeting scheduled', details: 'Follow-up call with Marcus Johnson', time: '6 hours ago', type: 'meeting' },
            { action: 'Funding milestone', startup: 'SecureVault closed Series B ($25M)', time: '1 day ago', type: 'funding' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg">
              <div className={`w-3 h-3 rounded-full ${
                activity.type === 'investor' ? 'bg-blue-500' :
                activity.type === 'deal' ? 'bg-green-500' :
                activity.type === 'meeting' ? 'bg-yellow-500' : 'bg-purple-500'
              }`}></div>
              <div className="flex-1">
                <p className="text-white font-medium">{activity.action}</p>
                <p className="text-gray-400 text-sm">{activity.investor || activity.startup || activity.details}</p>
              </div>
              <p className="text-gray-500 text-sm">{activity.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;