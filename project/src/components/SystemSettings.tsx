import React, { useState } from 'react';
import { Settings, Bell, Shield, Database, Wifi, Brain, Save, RefreshCw } from 'lucide-react';

export function SystemSettings() {
  const [alertThresholds, setAlertThresholds] = useState({
    seaLevel: { low: 1.5, medium: 2.0, high: 2.5, critical: 3.0 },
    windSpeed: { low: 30, medium: 50, high: 80, critical: 120 },
    waterTemp: { low: 2, medium: 3, high: 5, critical: 8 },
    ph: { low: 0.3, medium: 0.5, high: 0.8, critical: 1.0 }
  });

  const [aiSettings, setAiSettings] = useState({
    confidence: 75,
    learningRate: 0.01,
    historicalWindow: 30,
    anomalyDetection: true,
    patternRecognition: true,
    predictiveAnalysis: true
  });

  const [notificationSettings, setNotificationSettings] = useState({
    sms: true,
    email: true,
    webhook: true,
    mobile: true,
    autoEscalation: true,
    escalationDelay: 15
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">System Configuration</h2>
          <p className="text-sm text-gray-500">Configure alert thresholds, AI parameters, and system behavior</p>
        </div>
        
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alert Thresholds */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Alert Thresholds</h3>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Sea Level (meters)</label>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(alertThresholds.seaLevel).map(([level, value]) => (
                  <div key={level}>
                    <label className="block text-xs text-gray-500 mb-1 capitalize">{level}</label>
                    <input
                      type="number"
                      value={value}
                      onChange={(e) => setAlertThresholds(prev => ({
                        ...prev,
                        seaLevel: { ...prev.seaLevel, [level]: Number(e.target.value) }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      step="0.1"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Wind Speed (km/h)</label>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(alertThresholds.windSpeed).map(([level, value]) => (
                  <div key={level}>
                    <label className="block text-xs text-gray-500 mb-1 capitalize">{level}</label>
                    <input
                      type="number"
                      value={value}
                      onChange={(e) => setAlertThresholds(prev => ({
                        ...prev,
                        windSpeed: { ...prev.windSpeed, [level]: Number(e.target.value) }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI/ML Configuration */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Brain className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">AI/ML Configuration</h3>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confidence Threshold: {aiSettings.confidence}%
              </label>
              <input
                type="range"
                min="50"
                max="95"
                value={aiSettings.confidence}
                onChange={(e) => setAiSettings(prev => ({ ...prev, confidence: Number(e.target.value) }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>50%</span>
                <span>95%</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Historical Analysis Window: {aiSettings.historicalWindow} days
              </label>
              <input
                type="range"
                min="7"
                max="90"
                value={aiSettings.historicalWindow}
                onChange={(e) => setAiSettings(prev => ({ ...prev, historicalWindow: Number(e.target.value) }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>7 days</span>
                <span>90 days</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">AI Features</label>
              
              {Object.entries({
                anomalyDetection: 'Anomaly Detection',
                patternRecognition: 'Pattern Recognition',
                predictiveAnalysis: 'Predictive Analysis'
              }).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{label}</span>
                  <button
                    onClick={() => setAiSettings(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      aiSettings[key as keyof typeof aiSettings] ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        aiSettings[key as keyof typeof aiSettings] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Wifi className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Notification Channels</h3>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            {Object.entries({
              sms: 'SMS Alerts',
              email: 'Email Notifications',
              webhook: 'Webhook Integration',
              mobile: 'Mobile App Push',
              autoEscalation: 'Auto Escalation'
            }).map(([key, label]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{label}</span>
                <button
                  onClick={() => setNotificationSettings(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notificationSettings[key as keyof typeof notificationSettings] ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notificationSettings[key as keyof typeof notificationSettings] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Escalation Delay: {notificationSettings.escalationDelay} minutes
              </label>
              <input
                type="range"
                min="5"
                max="60"
                value={notificationSettings.escalationDelay}
                onChange={(e) => setNotificationSettings(prev => ({ ...prev, escalationDelay: Number(e.target.value) }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Database className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Database Status</span>
              <span className="text-sm font-medium text-green-600">Connected</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">AI Model Version</span>
              <span className="text-sm font-medium text-blue-600">v2.1.3</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Last Backup</span>
              <span className="text-sm font-medium text-gray-900">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">System Uptime</span>
              <span className="text-sm font-medium text-green-600">99.97%</span>
            </div>
            
            <button className="w-full mt-4 border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
              <RefreshCw className="w-4 h-4" />
              <span>Refresh System Status</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}