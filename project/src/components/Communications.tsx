import React, { useState } from 'react';
import { Search, Filter, Plus, MessageSquare, Phone, Mail, Calendar, User } from 'lucide-react';
import { mockCommunications, mockInvestors, mockStartups } from '../data/mockData';

const Communications: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredCommunications = mockCommunications.filter(comm => {
    const investor = mockInvestors.find(inv => inv.id === comm.investorId);
    const startup = comm.startupId ? mockStartups.find(s => s.id === comm.startupId) : null;
    
    const matchesSearch = comm.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comm.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (investor && investor.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (startup && startup.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterType === 'all' || comm.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return Mail;
      case 'call': return Phone;
      case 'meeting': return Calendar;
      case 'note': return MessageSquare;
      default: return MessageSquare;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'email': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'call': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'meeting': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'note': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Communications</h1>
          <p className="text-gray-400 mt-1">Track all interactions with investors and startups.</p>
        </div>
        <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Communication</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search communications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary-500"
          >
            <option value="all">All Types</option>
            <option value="email">Email</option>
            <option value="call">Call</option>
            <option value="meeting">Meeting</option>
            <option value="note">Note</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredCommunications.map((comm) => {
          const investor = mockInvestors.find(inv => inv.id === comm.investorId);
          const startup = comm.startupId ? mockStartups.find(s => s.id === comm.startupId) : null;
          const TypeIcon = getTypeIcon(comm.type);

          return (
            <div key={comm.id} className="glass rounded-xl p-6 card-hover animate-fade-in">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
                    <TypeIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{comm.subject}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(comm.type)}`}>
                        {comm.type}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{investor?.name}</span>
                      </div>
                      {startup && (
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>{startup.name}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(comm.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{comm.content}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <div className="flex space-x-3">
                  <button className="px-3 py-1 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm">
                    Reply
                  </button>
                  <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors text-sm">
                    Edit
                  </button>
                </div>
                {comm.followUpDate && (
                  <div className="flex items-center space-x-2 text-sm text-yellow-400">
                    <Calendar className="w-4 h-4" />
                    <span>Follow-up: {new Date(comm.followUpDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredCommunications.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-400 mb-2">No communications found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Communications;