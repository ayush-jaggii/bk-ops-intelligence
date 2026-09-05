import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import {
  Store,
  HourlyForecast,
  ForecastSignal,
  Employee,
  AlertItem,
  OperationalSettings,
  ScenarioType,
  SensitivityParams,
  StationType
} from '../types';
import {
  INITIAL_STORES,
  INITIAL_HOURLY_DATA,
  FORECAST_SIGNALS,
  INITIAL_EMPLOYEES,
  INITIAL_ALERTS,
  DEFAULT_SETTINGS
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'info';
  title: string;
  description: string;
}

interface AppContextType {
  // Stores
  stores: Store[];
  selectedStore: Store;
  setSelectedStoreId: (id: string) => void;

  // Scenario
  scenario: ScenarioType;
  setScenario: (scenario: ScenarioType) => void;

  // Hourly Data & Forecasts
  hourlyData: HourlyForecast[];
  signals: ForecastSignal[];

  // Workforce & Employees
  employees: Employee[];
  scheduleApproved: boolean;
  microShiftsActive: boolean;
  approveSchedule: () => void;
  resetScheduleApproval: () => void;
  toggleMicroShifts: () => void;
  updateEmployeeShift: (id: string, start: number, end: number) => void;
  rebalanceStation: (stationFrom: StationType, stationTo: StationType) => void;

  // Alerts
  alerts: AlertItem[];
  approveAlert: (id: string) => void;
  dismissAlert: (id: string) => void;

  // Settings
  settings: OperationalSettings;
  updateSettings: (newSettings: Partial<OperationalSettings>) => void;
  resetSettings: () => void;

  // Sensitivity Analysis
  sensitivity: SensitivityParams;
  setSensitivity: React.Dispatch<React.SetStateAction<SensitivityParams>>;

  // Modals & UI States
  dataAssumptionsOpen: boolean;
  setDataAssumptionsOpen: (open: boolean) => void;
  decisionFlowOpen: boolean;
  setDecisionFlowOpen: (open: boolean) => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (type: 'success' | 'warning' | 'info', title: string, description: string) => void;
  removeToast: (id: string) => void;

  // Derived Shift & Labor Metrics
  metrics: {
    salesToday: string;
    salesDiffPct: string;
    ordersCount: number;
    ordersDiffPct: string;
    laborUtilPct: number;
    laborDiffPts: string;
    avgSpeedOfServiceFormatted: string;
    avgSpeedOfServiceSec: number;
    speedOfServiceSavedSec: string;
    unproductiveHoursSaved: number;
    dailyLaborSavingsINR: string;
    monthlyLaborSavingsINR: string;
    monthlyOpportunityLakhs: number;
    peakDropOffSavedINR: string;
    txPerEmployeeAvg: number;
    txPerEmployeeLull: number;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stores] = useState<Store[]>(INITIAL_STORES);
  const [selectedStoreId, setSelectedStoreId] = useState<string>('delhi-select-citywalk');
  const [scenario, setScenarioState] = useState<ScenarioType>('normal');
  const [scheduleApproved, setScheduleApproved] = useState<boolean>(false);
  const [microShiftsActive, setMicroShiftsActive] = useState<boolean>(true);
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);
  const [settings, setSettings] = useState<OperationalSettings>(DEFAULT_SETTINGS);
  const [dataAssumptionsOpen, setDataAssumptionsOpen] = useState<boolean>(false);
  const [decisionFlowOpen, setDecisionFlowOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const [sensitivity, setSensitivity] = useState<SensitivityParams>({
    laborSavingsPct: 8.5,
    throughputBoostPct: 3.2,
    microShiftRatioPct: 25,
    sosImprovementPct: 45
  });

  const selectedStore = useMemo(() => {
    return stores.find((s) => s.id === selectedStoreId) || stores[0];
  }, [stores, selectedStoreId]);

  const addToast = (type: 'success' | 'warning' | 'info', title: string, description: string) => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setToasts((prev) => [...prev, { id, type, title, description }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setScenario = (newScenario: ScenarioType) => {
    setScenarioState(newScenario);
    const label =
      newScenario === 'spike'
        ? 'IPL Dinner Rush (+25% Demand)'
        : newScenario === 'low'
        ? 'Heavy Afternoon Dip (-25% Demand)'
        : 'Standard Operations Baseline';
    addToast('info', 'Demand Scenario Changed', `Simulating ${label}. Micro-shifts and station staffing adjusted.`);
  };

  const approveSchedule = () => {
    setScheduleApproved(true);
    addToast(
      'success',
      '5-Day Advance Schedule Approved',
      'Master roster published to store biometric terminals. 4-hour micro-shifts confirmed for peak hours.'
    );
  };

  const resetScheduleApproval = () => {
    setScheduleApproved(false);
    addToast('info', 'Schedule Reopened for Review', 'Manager override enabled. Roster returned to draft state.');
  };

  const toggleMicroShifts = () => {
    setMicroShiftsActive((prev) => {
      const nextState = !prev;
      addToast(
        nextState ? 'success' : 'warning',
        nextState ? '4-Hour Micro-Shifts Enabled' : 'Reverted to Traditional 9-Hour Straight Shifts',
        nextState
          ? 'Flexible peak micro-shifts activated. Off-peak idle labor eliminated.'
          : 'Traditional fixed 9h shifts active. Expect idle crew in 3–5 PM lull.'
      );
      return nextState;
    });
  };

  const updateEmployeeShift = (id: string, start: number, end: number) => {
    setEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id === id) {
          return {
            ...emp,
            currentShift: {
              start,
              end,
              label: `${String(start).padStart(2, '0')}:00–${String(end).padStart(2, '0')}:00`
            },
            managerOverridden: true
          };
        }
        return emp;
      })
    );
    addToast('success', 'Shift Updated', `Manager override applied. Biometric punch constraints refreshed.`);
  };

  const rebalanceStation = (stationFrom: StationType, stationTo: StationType) => {
    setEmployees((prev) => {
      let moved = false;
      return prev.map((emp) => {
        if (!moved && emp.primaryRole === stationFrom && emp.isCrossTrained) {
          moved = true;
          return {
            ...emp,
            primaryRole: stationTo,
            status: 'rebalanced'
          };
        }
        return emp;
      });
    });
    addToast(
      'info',
      'Station Rebalanced',
      `Cross-trained crew reallocated from ${stationFrom} to ${stationTo} to protect Speed of Service.`
    );
  };

  const approveAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'approved' as const } : a))
    );
    addToast('success', 'Action Approved', 'Operational adjustment executed.');
  };

  const dismissAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'dismissed' as const } : a))
    );
    addToast('info', 'Alert Dismissed', 'Manager opted to maintain current state.');
  };

  const updateSettings = (newSettings: Partial<OperationalSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    addToast('success', 'Labor Settings Saved', 'Store scheduling rules updated.');
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    addToast('info', 'Settings Reset', 'Restored default Burger King scheduling parameters.');
  };

  // Hourly Data dynamic recalculation based on scenario
  const hourlyData = useMemo(() => {
    const multiplier = scenario === 'spike' ? 1.25 : scenario === 'low' ? 0.75 : 1.0;

    return INITIAL_HOURLY_DATA.map((h) => {
      const scaledTx = Math.round(h.transactionsPerHour * multiplier);
      const isPeak = scaledTx >= 45;
      const isLull = scaledTx <= 20;

      // Unoptimized baseline: static 8-9 crew
      const traditionalCrew = h.traditionalCrew9h;
      const txPerEmpUnoptimized = Number((scaledTx / traditionalCrew).toFixed(2));
      
      // Speed of Service: if tx per employee > 5.5, SoS blows out to 6-8 minutes (360-480s)
      const sosUnoptimized = txPerEmpUnoptimized > 6.0
        ? Math.min(480, Math.round(180 + (txPerEmpUnoptimized - 5.0) * 160))
        : txPerEmpUnoptimized > 4.5
        ? Math.round(180 + (txPerEmpUnoptimized - 4.5) * 60)
        : 140;

      // AI Recommended crew: targets ~4.5 tx/employee, with 4h micro-shifts added during peak
      let recCrew = Math.max(4, Math.round(scaledTx / 4.8));
      if (isLull) recCrew = 4; // minimum store operating baseline
      if (isPeak && scenario === 'spike') recCrew = Math.max(recCrew, 13);

      const microCount = isPeak ? Math.max(0, recCrew - 8) : 0;
      const actualActiveCrew = scheduleApproved || microShiftsActive ? recCrew : traditionalCrew;
      const txPerEmpOptimized = Number((scaledTx / actualActiveCrew).toFixed(2));
      
      // Optimized SoS stays under 3m (180s) benchmark
      const sosOptimized = Math.max(140, Math.min(185, Math.round(155 + (txPerEmpOptimized - 3.5) * 15)));

      return {
        ...h,
        transactionsPerHour: scaledTx,
        aiForecast: scaledTx,
        speedOfServiceSecUnoptimized: sosUnoptimized,
        speedOfServiceSecOptimized: sosOptimized,
        txPerEmployeeUnoptimized: txPerEmpUnoptimized,
        txPerEmployeeOptimized: txPerEmpOptimized,
        recommendedCrew: recCrew,
        scheduledCrew: actualActiveCrew,
        microShiftCrewCount: microCount,
        isLull,
        isPeak
      };
    });
  }, [scenario, scheduleApproved, microShiftsActive]);

  // Derived Financial and Operational Metrics
  const metrics = useMemo(() => {
    const isApproved = scheduleApproved || microShiftsActive;
    const baseSales = selectedStore.dailySalesLakhs * 100000;
    const salesMultiplier = scenario === 'spike' ? 1.22 : scenario === 'low' ? 0.78 : 1.0;
    const currentSalesVal = Math.round(baseSales * salesMultiplier);

    const ordersCount = Math.round(selectedStore.ordersCount * salesMultiplier);
    const unproductiveHoursSaved = isApproved ? 16 : 0;
    const dailyWageSaved = unproductiveHoursSaved * settings.hourlyBaseWageINR * 2.5; // includes shift overlap overhead

    return {
      salesToday: `₹ ${currentSalesVal.toLocaleString('en-IN')}`,
      salesDiffPct: scenario === 'spike' ? '+22%' : scenario === 'low' ? '-22%' : '+4.6%',
      ordersCount,
      ordersDiffPct: scenario === 'spike' ? '+20%' : scenario === 'low' ? '-20%' : '+4.8%',
      laborUtilPct: isApproved ? 88 : 74,
      laborDiffPts: isApproved ? '+14 pts' : '-4 pts',
      avgSpeedOfServiceFormatted: isApproved ? '2m 54s' : '6m 40s',
      avgSpeedOfServiceSec: isApproved ? 174 : 400,
      speedOfServiceSavedSec: isApproved ? '3m 46s' : '0s',
      unproductiveHoursSaved,
      dailyLaborSavingsINR: `₹ ${dailyWageSaved.toLocaleString('en-IN')}/-`,
      monthlyLaborSavingsINR: `₹ ${(dailyWageSaved * 30).toLocaleString('en-IN')}/-`,
      monthlyOpportunityLakhs: Number(((dailyWageSaved * 30) / 100000).toFixed(2)),
      peakDropOffSavedINR: `₹ ${(14500 * salesMultiplier).toFixed(0)}/-`,
      txPerEmployeeAvg: isApproved ? 4.6 : 3.1,
      txPerEmployeeLull: isApproved ? 4.0 : 1.7
    };
  }, [selectedStore, scenario, scheduleApproved, microShiftsActive, settings.hourlyBaseWageINR]);

  return (
    <AppContext.Provider
      value={{
        stores,
        selectedStore,
        setSelectedStoreId,
        scenario,
        setScenario,
        hourlyData,
        signals: FORECAST_SIGNALS,
        employees,
        scheduleApproved,
        microShiftsActive,
        approveSchedule,
        resetScheduleApproval,
        toggleMicroShifts,
        updateEmployeeShift,
        rebalanceStation,
        alerts,
        approveAlert,
        dismissAlert,
        settings,
        updateSettings,
        resetSettings,
        sensitivity,
        setSensitivity,
        dataAssumptionsOpen,
        setDataAssumptionsOpen,
        decisionFlowOpen,
        setDecisionFlowOpen,
        toasts,
        addToast,
        removeToast,
        metrics
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
