import React, { useState } from 'react';
import { Search, Filter, Plus, Building, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { mockStartups } from '../data/mockData';

const Startups: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredStartups = mockStartups.filter(startup => {
    const matchesSearch = startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         startup.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = filterStage === 'all' || startup.stage === filterStage;
    const matchesStatus = filterStatus === 'all' || startup.status === filterStatus;
    return matchesSearch && matchesStage && matchesStatus;
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'pre-seed': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'seed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'series-a': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'series-b': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'series-c': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'later': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'prospecting': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'pitching': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'due-diligence': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'negotiating': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'closed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'passed': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Startups</h1>
          <p className="text-gray-400 mt-1">Track and manage your startup deal pipeline.</p>
        </div>
        <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Startup</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search startups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary-500"
          >
            <option value="all">All Stages</option>
            <option value="pre-seed">Pre-Seed</option>
            <option value="seed">Seed</option>
            <option value="series-a">Series A</option>
            <option value="series-b">Series B</option>
            <option value="series-c">Series C</option>
            <option value="later">Later</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary-500"
          >
            <option value="all">All Status</option>
            <option value="prospecting">Prospecting</option>
            <option value="pitching">Pitching</option>
            <option value="due-diligence">Due Diligence</option>
            <option value="negotiating">Negotiating</option>
            <option value="closed">Closed</option>
            <option value="passed">Passed</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredStartups.map((startup) => (
          <div key={startup.id} className="glass rounded-xl p-6 card-hover animate-fade-in">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{startup.name}</h3>
                  <p className="text-gray-400 text-sm">{startup.industry}</p>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStageColor(startup.stage)}`}>
                  {startup.stage.replace('-', ' ')}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(startup.status)}`}>
                  {startup.status.replace('-', ' ')}
                </span>
              </div>
            </div>

            <p className="text-gray-300 text-sm mb-4 line-clamp-2">{startup.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-300">
                  <DollarSign className="w-4 h-4" />
                  <div>
                    <p className="text-gray-400 text-xs">Funding Raised</p>
                    <p className="text-white font-semibold text-sm">{formatCurrency(startup.fundingRaised)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <TrendingUp className="w-4 h-4" />
                  <div>
                    <p className="text-gray-400 text-xs">Valuation</p>
                    <p className="text-white font-semibold text-sm">{formatCurrency(startup.valuation)}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-300">
                  <Calendar className="w-4 h-4" />
                  <div>
                    <p className="text-gray-400 text-xs">Last Update</p>
                    <p className="text-white font-semibold text-sm">
                      {new Date(startup.lastUpdate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Investors</p>
                  <p className="text-white font-semibold text-sm">{startup.investors.length} connected</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm">
                  View Details
                </button>
                <button className="flex-1 px-3 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors text-sm">
                  Update Status
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredStartups.length === 0 && (
        <div className="text-center py-12">
          <Building className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-400 mb-2">No startups found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Startups;