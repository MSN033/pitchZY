import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Target, BarChart3, PieChart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Portfolio: React.FC = () => {
  const portfolioData = [
    { name: 'TechFlow AI', invested: 2500000, currentValue: 4200000, return: 68 },
    { name: 'GreenTech Solutions', invested: 1500000, currentValue: 2100000, return: 40 },
    { name: 'HealthLink', invested: 800000, currentValue: 950000, return: 18.75 },
    { name: 'SecureVault', invested: 5000000, currentValue: 8200000, return: 64 },
  ];

  const performanceData = [
    { quarter: 'Q1 2023', totalValue: 45000000, invested: 32000000 },
    { quarter: 'Q2 2023', totalValue: 52000000, invested: 38000000 },
    { quarter: 'Q3 2023', totalValue: 58000000, invested: 43000000 },
    { quarter: 'Q4 2023', totalValue: 67000000, invested: 48000000 },
    { quarter: 'Q1 2024', totalValue: 75000000, invested: 52000000 },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const totalInvested = portfolioData.reduce((sum, item) => sum + item.invested, 0);
  const totalCurrentValue = portfolioData.reduce((sum, item) => sum + item.currentValue, 0);
  const totalReturn = ((totalCurrentValue - totalInvested) / totalInvested) * 100;

  const MetricCard = ({ title, value, change, changeType, icon: Icon }: any) => (
    <div className="glass rounded-xl p-6 card-hover animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          {change && (
            <div className={`flex items-center mt-2 text-sm ${
              changeType === 'positive' ? 'text-green-400' : 'text-red-400'
            }`}>
              {changeType === 'positive' ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
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
          <h1 className="text-3xl font-bold text-white">Portfolio</h1>
          <p className="text-gray-400 mt-1">Monitor your investment performance and returns.</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
            Export Report
          </button>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            Generate Analysis
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Invested"
          value={formatCurrency(totalInvested)}
          icon={DollarSign}
        />
        <MetricCard
          title="Current Value"
          value={formatCurrency(totalCurrentValue)}
          change="+15.2% this quarter"
          changeType="positive"
          icon={TrendingUp}
        />
        <MetricCard
          title="Total Return"
          value={`${totalReturn.toFixed(1)}%`}
          change="+2.3% from last quarter"
          changeType="positive"
          icon={Target}
        />
        <MetricCard
          title="Portfolio Count"
          value={portfolioData.length}
          icon={PieChart}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-xl p-6 animate-slide-up">
          <h3 className="text-xl font-semibold text-white mb-6">Portfolio Performance</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="quarter" stroke="#9ca3af" />
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
                  dataKey="totalValue" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                  name="Portfolio Value"
                />
                <Line 
                  type="monotone" 
                  dataKey="invested" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                  name="Total Invested"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-xl p-6 animate-slide-up">
          <h3 className="text-xl font-semibold text-white mb-6">Investment Returns</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={portfolioData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Bar dataKey="return" fill="#3b82f6" name="Return %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="glass rounded-xl p-6 animate-slide-up">
        <h3 className="text-xl font-semibold text-white mb-6">Portfolio Holdings</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Company</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium">Invested</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium">Current Value</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium">Return</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium">Performance</th>
              </tr>
            </thead>
            <tbody>
              {portfolioData.map((company, index) => (
                <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{company.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right text-white">
                    {formatCurrency(company.invested)}
                  </td>
                  <td className="py-4 px-4 text-right text-white">
                    {formatCurrency(company.currentValue)}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className={`font-medium ${
                      company.return > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {company.return > 0 ? '+' : ''}{company.return.toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {company.return > 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-400" />
                      )}
                      <span className="text-sm text-gray-400">Strong</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;