import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar, NavTab } from './components/Sidebar';
import { ToastContainer } from './components/ToastContainer';
import { DataAssumptionsModal } from './components/DataAssumptionsModal';
import { DecisionFlowModal } from './components/DecisionFlowModal';
import { AIExplanationModal } from './components/AIExplanationModal';

// Pages
import { OverviewPage } from './pages/OverviewPage';
import { ForecastPage } from './pages/ForecastPage';
import { WorkforcePage } from './pages/WorkforcePage';
import { KitchenPage } from './pages/KitchenPage';
import { EnergyPage } from './pages/EnergyPage';
import { ImpactPage } from './pages/ImpactPage';
import { StoresPage } from './pages/StoresPage';
import { AlertsPage } from './pages/AlertsPage';
import { SettingsPage } from './pages/SettingsPage';

const AppContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavTab>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#F5F4F1] flex flex-col font-ui text-[#1A1A1A]">
      {/* Top Header */}
      <Navbar />

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 max-w-7xl mx-auto w-full">
          {currentTab === 'overview' && <OverviewPage setCurrentTab={setCurrentTab} />}
          {currentTab === 'forecast' && <ForecastPage />}
          {currentTab === 'workforce' && <WorkforcePage />}
          {currentTab === 'kitchen' && <KitchenPage />}
          {currentTab === 'energy' && <EnergyPage />}
          {currentTab === 'impact' && <ImpactPage />}
          {currentTab === 'stores' && <StoresPage setCurrentTab={setCurrentTab} />}
          {currentTab === 'alerts' && <AlertsPage />}
          {currentTab === 'settings' && <SettingsPage />}
        </main>
      </div>

      {/* Overlays & Modals */}
      <ToastContainer />
      <DataAssumptionsModal />
      <DecisionFlowModal />
      <AIExplanationModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
