import React, { useState, useEffect } from 'react';
import { AlertTriangle, Activity, Eye, Users, Settings, Bell, MapPin, TrendingUp, Waves, Wind, Zap, Droplets } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { AlertCenter } from './components/AlertCenter';
import { MonitoringPanel } from './components/MonitoringPanel';
import { StakeholderManagement } from './components/StakeholderManagement';
import { SystemSettings } from './components/SystemSettings';
import { NotificationCenter } from './components/NotificationCenter';

type ViewType = 'dashboard' | 'alerts' | 'monitoring' | 'stakeholders' | 'settings';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [notifications, setNotifications] = useState(3);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate notification updates
      if (Math.random() > 0.8) {
        setNotifications(prev => prev + 1);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'dashboard' as ViewType, label: 'Dashboard', icon: Activity },
    { id: 'alerts' as ViewType, label: 'Alert Center', icon: AlertTriangle },
    { id: 'monitoring' as ViewType, label: 'Monitoring', icon: Eye },
    { id: 'stakeholders' as ViewType, label: 'Stakeholders', icon: Users },
    { id: 'settings' as ViewType, label: 'Settings', icon: Settings },
  ];

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'alerts':
        return <AlertCenter />;
      case 'monitoring':
        return <MonitoringPanel />;
      case 'stakeholders':
        return <StakeholderManagement />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-white shadow-lg border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
              <Waves className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">CoastGuard</h1>
              <p className="text-sm text-gray-500">Early Warning System</p>
            </div>
          </div>
        </div>
        
        <nav className="mt-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
                  currentView === item.id
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Quick Stats */}
        <div className="mt-8 px-6">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            System Status
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Active Sensors</span>
              <span className="text-sm font-semibold text-green-600">247</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Data Quality</span>
              <span className="text-sm font-semibold text-green-600">98.2%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Response Time</span>
              <span className="text-sm font-semibold text-blue-600">1.4s</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 capitalize">
                {currentView === 'stakeholders' ? 'Stakeholder Management' : currentView}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {new Date().toLocaleString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* System Status Indicator */}
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">System Operational</span>
              </div>
              
              {/* Notifications */}
              <NotificationCenter count={notifications} />
              
              {/* Emergency Contact */}
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Emergency Contact
              </button>
            </div>
          </div>
        </header>

        {/* View Content */}
        <main className="flex-1 overflow-auto">
          {renderView()}
        </main>
      </div>
    </div>
  );
}

export default App;