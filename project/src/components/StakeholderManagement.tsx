import React, { useState } from 'react';
import { Users, Plus, Phone, Mail, MapPin, Shield, Eye, Edit, UserCheck } from 'lucide-react';

interface Stakeholder {
  id: string;
  name: string;
  organization: string;
  role: 'authority' | 'community_leader' | 'emergency_responder' | 'researcher';
  location: string;
  phone: string;
  email: string;
  alertPreferences: string[];
  status: 'active' | 'inactive';
}

export function StakeholderManagement() {
  const [stakeholders] = useState<Stakeholder[]>([
    {
      id: '1',
      name: 'Dr. Raj Sharma',
      organization: 'Mumbai Disaster Management Authority',
      role: 'authority',
      location: 'Mumbai, Maharashtra',
      phone: '+91 98765 43210',
      email: 'raj.sharma@mdma.gov.in',
      alertPreferences: ['critical', 'high'],
      status: 'active'
    },
    {
      id: '2',
      name: 'Priya Nair',
      organization: 'Kochi Community Council',
      role: 'community_leader',
      location: 'Kochi, Kerala',
      phone: '+91 87654 32109',
      email: 'priya.nair@kcc.org',
      alertPreferences: ['critical', 'high', 'medium'],
      status: 'active'
    },
    {
      id: '3',
      name: 'Captain Vikram Singh',
      organization: 'Indian Coast Guard',
      role: 'emergency_responder',
      location: 'Chennai, Tamil Nadu',
      phone: '+91 76543 21098',
      email: 'vikram.singh@coastguard.gov.in',
      alertPreferences: ['critical'],
      status: 'active'
    },
    {
      id: '4',
      name: 'Dr. Meera Krishnan',
      organization: 'National Institute of Oceanography',
      role: 'researcher',
      location: 'Goa',
      phone: '+91 65432 10987',
      email: 'meera.krishnan@nio.org',
      alertPreferences: ['critical', 'high', 'medium', 'low'],
      status: 'active'
    }
  ]);

  const [selectedRole, setSelectedRole] = useState('all');

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'authority': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'community_leader': return 'text-green-600 bg-green-50 border-green-200';
      case 'emergency_responder': return 'text-red-600 bg-red-50 border-red-200';
      case 'researcher': return 'text-purple-600 bg-purple-50 border-purple-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'authority': return Shield;
      case 'community_leader': return Users;
      case 'emergency_responder': return Phone;
      case 'researcher': return Eye;
      default: return Users;
    }
  };

  const filteredStakeholders = stakeholders.filter(stakeholder =>
    selectedRole === 'all' || stakeholder.role === selectedRole
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Stakeholder Management</h2>
          <p className="text-sm text-gray-500">Manage alert recipients and communication channels</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Roles</option>
            <option value="authority">Authorities</option>
            <option value="community_leader">Community Leaders</option>
            <option value="emergency_responder">Emergency Responders</option>
            <option value="researcher">Researchers</option>
          </select>
          
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Stakeholder</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-blue-600">Authorities</p>
              <p className="text-xl font-bold text-blue-700">
                {stakeholders.filter(s => s.role === 'authority').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Users className="w-6 h-6 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-600">Community</p>
              <p className="text-xl font-bold text-green-700">
                {stakeholders.filter(s => s.role === 'community_leader').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Phone className="w-6 h-6 text-red-600" />
            <div>
              <p className="text-sm font-medium text-red-600">Responders</p>
              <p className="text-xl font-bold text-red-700">
                {stakeholders.filter(s => s.role === 'emergency_responder').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Eye className="w-6 h-6 text-purple-600" />
            <div>
              <p className="text-sm font-medium text-purple-600">Researchers</p>
              <p className="text-xl font-bold text-purple-700">
                {stakeholders.filter(s => s.role === 'researcher').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stakeholder List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Registered Stakeholders</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredStakeholders.map((stakeholder) => {
            const RoleIcon = getRoleIcon(stakeholder.role);
            return (
              <div key={stakeholder.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getRoleColor(stakeholder.role)}`}>
                      <RoleIcon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-gray-900">{stakeholder.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getRoleColor(stakeholder.role)}`}>
                          {stakeholder.role.replace('_', ' ')}
                        </span>
                        {stakeholder.status === 'active' && (
                          <span className="text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-medium">
                            Active
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">{stakeholder.organization}</p>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{stakeholder.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Phone className="w-4 h-4" />
                          <span>{stakeholder.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Mail className="w-4 h-4" />
                          <span>{stakeholder.email}</span>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <p className="text-xs text-gray-500 mb-1">Alert Preferences:</p>
                        <div className="flex items-center space-x-2">
                          {stakeholder.alertPreferences.map((pref) => (
                            <span key={pref} className={`px-2 py-1 rounded text-xs font-medium capitalize ${getRoleColor(stakeholder.role)}`}>
                              {pref}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 p-2 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors">
                      <UserCheck className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}