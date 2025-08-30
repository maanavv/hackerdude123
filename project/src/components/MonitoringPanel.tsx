import React, { useState } from 'react';
import { Activity, Thermometer, Wind, Waves, Droplets, MapPin, Calendar, Download } from 'lucide-react';
import { RealTimeChart } from './RealTimeChart';

interface SensorData {
  id: string;
  name: string;
  location: string;
  type: 'tide_gauge' | 'weather_station' | 'water_quality' | 'satellite';
  status: 'online' | 'offline' | 'maintenance';
  lastUpdate: Date;
  value: number;
  unit: string;
}

export function MonitoringPanel() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [selectedSensorType, setSelectedSensorType] = useState('all');

  const sensorData: SensorData[] = [
    {
      id: '1',
      name: 'Mumbai Port Tide Gauge',
      location: 'Mumbai, Maharashtra',
      type: 'tide_gauge',
      status: 'online',
      lastUpdate: new Date(Date.now() - 2 * 60 * 1000),
      value: 2.4,
      unit: 'm'
    },
    {
      id: '2',
      name: 'Kochi Weather Station',
      location: 'Kochi, Kerala',
      type: 'weather_station',
      status: 'online',
      lastUpdate: new Date(Date.now() - 5 * 60 * 1000),
      value: 28.5,
      unit: '°C'
    },
    {
      id: '3',
      name: 'Chennai Water Quality Monitor',
      location: 'Chennai, Tamil Nadu',
      type: 'water_quality',
      status: 'online',
      lastUpdate: new Date(Date.now() - 1 * 60 * 1000),
      value: 7.2,
      unit: 'pH'
    },
    {
      id: '4',
      name: 'Visakhapatnam Weather Station',
      location: 'Visakhapatnam, Andhra Pradesh',
      type: 'weather_station',
      status: 'maintenance',
      lastUpdate: new Date(Date.now() - 4 * 60 * 60 * 1000),
      value: 0,
      unit: 'km/h'
    },
    {
      id: '5',
      name: 'Goa Satellite Feed',
      location: 'Goa Coastline',
      type: 'satellite',
      status: 'online',
      lastUpdate: new Date(Date.now() - 15 * 60 * 1000),
      value: 92.1,
      unit: '%'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600 bg-green-50 border-green-200';
      case 'offline': return 'text-red-600 bg-red-50 border-red-200';
      case 'maintenance': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSensorIcon = (type: string) => {
    switch (type) {
      case 'tide_gauge': return Waves;
      case 'weather_station': return Wind;
      case 'water_quality': return Droplets;
      case 'satellite': return Activity;
      default: return MapPin;
    }
  };

  const filteredSensors = sensorData.filter(sensor => 
    selectedSensorType === 'all' || sensor.type === selectedSensorType
  );

  return (
    <div className="p-6 space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Sensor Monitoring</h2>
          <p className="text-sm text-gray-500">Real-time data from coastal monitoring infrastructure</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={selectedSensorType}
            onChange={(e) => setSelectedSensorType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Sensors</option>
            <option value="tide_gauge">Tide Gauges</option>
            <option value="weather_station">Weather Stations</option>
            <option value="water_quality">Water Quality</option>
            <option value="satellite">Satellite Feeds</option>
          </select>
          
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          
          <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* Real-time Charts Grid */}
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
        
        <RealTimeChart 
          title="Water Temperature"
          data={[
            { time: '00:00', value: 26.2 },
            { time: '04:00', value: 25.8 },
            { time: '08:00', value: 27.1 },
            { time: '12:00', value: 28.5 },
            { time: '16:00', value: 29.2 },
            { time: '20:00', value: 27.8 },
          ]}
          color="red"
          unit="°C"
        />
        
        <RealTimeChart 
          title="Wind Speed"
          data={[
            { time: '00:00', value: 12.5 },
            { time: '04:00', value: 15.2 },
            { time: '08:00', value: 18.7 },
            { time: '12:00', value: 22.3 },
            { time: '16:00', value: 19.8 },
            { time: '20:00', value: 16.4 },
          ]}
          color="green"
          unit="km/h"
        />
        
        <RealTimeChart 
          title="Water Quality Index"
          data={[
            { time: '00:00', value: 7.8 },
            { time: '04:00', value: 7.6 },
            { time: '08:00', value: 7.4 },
            { time: '12:00', value: 7.2 },
            { time: '16:00', value: 7.5 },
            { time: '20:00', value: 7.7 },
          ]}
          color="yellow"
          unit="pH"
        />
      </div>

      {/* Sensor Status Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Sensor Network Status</h3>
          <p className="text-sm text-gray-500">Current status of all monitoring equipment</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {filteredSensors.map((sensor) => {
            const Icon = getSensorIcon(sensor.type);
            return (
              <div key={sensor.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{sensor.name}</h4>
                      <p className="text-sm text-gray-500">{sensor.location}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(sensor.status)}`}>
                    {sensor.status}
                  </span>
                </div>
                
                {sensor.status === 'online' && (
                  <div className="mb-3">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-gray-900">{sensor.value}</span>
                      <span className="text-sm text-gray-500">{sensor.unit}</span>
                    </div>
                  </div>
                )}
                
                <div className="text-xs text-gray-500">
                  Last update: {sensor.lastUpdate.toLocaleTimeString()}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Historical Data Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">AI Threat Detection Insights</h3>
          <p className="text-sm text-gray-500">Machine learning analysis of historical patterns</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Pattern Recognition</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Sea level trends</span>
                  <span className="text-sm font-medium text-red-600">↗ Increasing</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Algal bloom probability</span>
                  <span className="text-sm font-medium text-orange-600">72% likely</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Storm formation risk</span>
                  <span className="text-sm font-medium text-yellow-600">Medium</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Water quality stability</span>
                  <span className="text-sm font-medium text-green-600">Stable</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Predictive Analysis</h4>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-900">Next 24 Hours</p>
                  <p className="text-xs text-gray-600">High probability of tidal surge in Mumbai region</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-900">Next 7 Days</p>
                  <p className="text-xs text-gray-600">Weather patterns suggest potential storm development</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-900">Monthly Outlook</p>
                  <p className="text-xs text-gray-600">Seasonal analysis indicates elevated threat levels</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}