import React, { useState, useEffect } from 'react';
import { AlertTriangle, TrendingUp, MapPin, Activity, Waves, Wind, Droplets, Zap } from 'lucide-react';
import { ThreatMap } from './ThreatMap';
import { RealTimeChart } from './RealTimeChart';
import { AlertSummary } from './AlertSummary';

interface ThreatData {
  id: string;
  type: 'sea_level' | 'algal_bloom' | 'illegal_dumping' | 'cyclonic';
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  confidence: number;
  timestamp: Date;
}

export function Dashboard() {
  const [threats, setThreats] = useState<ThreatData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data load
    setTimeout(() => {
      setThreats([
        {
          id: '1',
          type: 'sea_level',
          severity: 'high',
          location: 'Mumbai Coastline',
          confidence: 94.2,
          timestamp: new Date(Date.now() - 15 * 60 * 1000)
        },
        {
          id: '2',
          type: 'algal_bloom',
          severity: 'medium',
          location: 'Kerala Backwaters',
          confidence: 87.8,
          timestamp: new Date(Date.now() - 45 * 60 * 1000)
        },
        {
          id: '3',
          type: 'cyclonic',
          severity: 'critical',
          location: 'Bay of Bengal',
          confidence: 96.7,
          timestamp: new Date(Date.now() - 8 * 60 * 1000)
        }
      ]);
      setIsLoading(false);
    }, 1000);

    // Simulate real-time updates
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newThreat: ThreatData = {
          id: Date.now().toString(),
          type: ['sea_level', 'algal_bloom', 'illegal_dumping', 'cyclonic'][Math.floor(Math.random() * 4)] as any,
          severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as any,
          location: ['Chennai Coast', 'Goa Beaches', 'Kochi Harbor', 'Visakhapatnam Port'][Math.floor(Math.random() * 4)],
          confidence: 70 + Math.random() * 30,
          timestamp: new Date()
        };
        setThreats(prev => [newThreat, ...prev.slice(0, 9)]);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const getThreatIcon = (type: string) => {
    switch (type) {
      case 'sea_level': return Waves;
      case 'algal_bloom': return Droplets;
      case 'illegal_dumping': return AlertTriangle;
      case 'cyclonic': return Wind;
      default: return Activity;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading threat assessment data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Threats</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {threats.filter(t => t.severity === 'high' || t.severity === 'critical').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-red-500 mr-1" />
            <span className="text-sm text-red-600 font-medium">+12% from last week</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sensors Online</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">247</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600 font-medium">98.2% uptime</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Alerts Sent</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">1,247</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-blue-500 mr-1" />
            <span className="text-sm text-blue-600 font-medium">24h response time</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Coverage Area</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">2,847</p>
              <p className="text-xs text-gray-500">km² monitored</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Threat Map */}
        <div className="lg:col-span-2">
          <ThreatMap threats={threats} />
        </div>

        {/* Recent Threats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Threats</h3>
            <p className="text-sm text-gray-500">AI-detected anomalies and patterns</p>
          </div>
          <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
            {threats.slice(0, 5).map((threat) => {
              const Icon = getThreatIcon(threat.type);
              return (
                <div key={threat.id} className={`p-4 rounded-lg border ${getSeverityColor(threat.severity)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getSeverityColor(threat.severity)}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium capitalize">
                          {threat.type.replace('_', ' ')}
                        </p>
                        <p className="text-xs text-gray-500">{threat.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${getSeverityColor(threat.severity)}`}>
                        {threat.severity}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        {threat.confidence.toFixed(1)}% confidence
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {threat.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Data Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RealTimeChart 
          title="Sea Level Monitoring"
          data={[
            { time: '00:00', value: 1.2 },
            { time: '04:00', value: 1.8 },
            { time: '08:00', value: 2.1 },
            { time: '12:00', value: 2.4 },
            { time: '16:00', value: 2.2 },
            { time: '20:00', value: 1.9 },
          ]}
          color="blue"
          unit="m"
        />
        
        <AlertSummary alerts={threats} />
      </div>
    </div>
  );
}