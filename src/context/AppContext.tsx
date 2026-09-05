import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import {
  Store,
  HourlyForecast,
  ForecastSignal,
  Employee,
  SKUItem,
  EquipmentItem,
  AlertItem,
  OperationalSettings,
  ScenarioType,
  SensitivityParams
} from '../types';
import {
  INITIAL_STORES,
  INITIAL_SIGNALS,
  INITIAL_EMPLOYEES,
  INITIAL_SKUS,
  INITIAL_EQUIPMENT,
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
  approveSchedule: () => void;
  resetScheduleApproval: () => void;
  updateEmployeeShift: (id: string, start: number, end: number) => void;

  // Kitchen
  skus: SKUItem[];
  kitchenPrepApplied: boolean;
  applyKitchenRecommendation: (skuId?: string) => void;
  selectedExplanationSKU: SKUItem | null;
  setSelectedExplanationSKU: (sku: SKUItem | null) => void;

  // Energy
  equipment: EquipmentItem[];
  toggleEquipmentApproval: (id: string) => void;
  applyAllEnergyRecommendations: () => void;

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

  // Global Financial Model Derived Metrics
  metrics: {
    salesToday: string;
    salesDiffPct: string;
    ordersCount: number;
    ordersDiffPct: string;
    laborUtilPct: number;
    laborDiffPts: string;
    wasteLoss: string;
    wasteDiffPct: string;
    monthlyOpportunityLakhs: number;
    laborSavingsMonthly: number;
    wasteSavingsMonthly: number;
    energySavingsMonthly: number;
    throughputBoostMonthly: number;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stores] = useState<Store[]>(INITIAL_STORES);
  const [selectedStoreId, setSelectedStoreId] = useState<string>('delhi-select-citywalk');
  const [scenario, setScenarioState] = useState<ScenarioType>('normal');
  const [scheduleApproved, setScheduleApproved] = useState<boolean>(false);
  const [kitchenPrepApplied, setKitchenPrepApplied] = useState<boolean>(false);
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [skus, setSkus] = useState<SKUItem[]>(INITIAL_SKUS);
  const [equipment, setEquipment] = useState<EquipmentItem[]>(INITIAL_EQUIPMENT);
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);
  const [settings, setSettings] = useState<OperationalSettings>(DEFAULT_SETTINGS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [selectedExplanationSKU, setSelectedExplanationSKU] = useState<SKUItem | null>(null);

  // Modals
  const [dataAssumptionsOpen, setDataAssumptionsOpen] = useState<boolean>(false);
  const [decisionFlowOpen, setDecisionFlowOpen] = useState<boolean>(false);

  // Sensitivity defaults
  const [sensitivity, setSensitivity] = useState<SensitivityParams>({
    laborSavingsPct: 4.8,
    wasteReductionPct: 18.0,
    energySavingsPct: 11.5,
    throughputBoostPct: 2.2
  });

  const selectedStore = useMemo(() => {
    return stores.find((s) => s.id === selectedStoreId) || stores[0];
  }, [stores, selectedStoreId]);

  const addToast = (type: 'success' | 'warning' | 'info', title: string, description: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, description }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Scenario switch wrapper with toast and data updates
  const setScenario = (newScenario: ScenarioType) => {
    setScenarioState(newScenario);
    if (newScenario === 'spike') {
      addToast(
        'warning',
        'Demand Spike Simulated (+25%)',
        'Model updated: Incoming pre-match footfall surge. Kitchen prep & evening crew requirements increased.'
      );
      // Auto add spike alert if not present
      if (!alerts.some((a) => a.id === 'alt-spike-dynamic')) {
        setAlerts((prev) => [
          {
            id: 'alt-spike-dynamic',
            priority: 'HIGH',
            title: 'Dynamic Rush Alert: +25% Volume Spike',
            storeName: selectedStore.name,
            description: 'Live order velocity spiked by 25%. Evening dinner rush arriving 45 mins earlier than usual.',
            recommendedAction: 'Move 1 runner to Fry Station and increase Whopper batch target to 24 units.',
            timestamp: 'Just now',
            status: 'pending',
            metricImpact: '+₹22,000 revenue at risk of delay'
          },
          ...prev
        ]);
      }
    } else if (newScenario === 'low') {
      addToast(
        'info',
        'Low Demand Simulated (-25%)',
        'Model updated: Mid-afternoon footfall reduced. Safe HVAC Eco-setback and holding reduction advised.'
      );
    } else {
      addToast(
        'info',
        'Baseline Operational Model Restored',
        'Standard operational forecast and scheduled shifts restored.'
      );
    }
  };

  // Dynamic hourly forecast adjusted by store multiplier and scenario
  const hourlyData = useMemo(() => {
    const storeMultiplier = selectedStore.dailySalesLakhs / 2.84; // base is Delhi 2.84L
    const scenarioFactor = scenario === 'spike' ? 1.25 : scenario === 'low' ? 0.75 : 1.0;

    return INITIAL_HOURLY_DATA.map((item) => {
      const forecastOrders = Math.round(item.aiForecast * storeMultiplier * scenarioFactor);
      const actual = item.actualOrders ? Math.round(item.actualOrders * storeMultiplier) : null;
      const baseline = Math.round(item.baselineOrders * storeMultiplier);
      const lowBand = Math.round(forecastOrders * 0.92);
      const highBand = Math.round(forecastOrders * 1.08);

      // Dynamic crew recommendation based on settings (orders per crew)
      // Required crew = forecastOrders / ordersPerKitchenCrewPerHour + orders / ordersPerFrontCounterCrewPerHour
      const kitchenReq = Math.max(
        settings.minKitchenStaffing,
        Math.ceil(forecastOrders / settings.ordersPerKitchenCrewPerHour)
      );
      const frontReq = Math.max(
        settings.minFrontOfHouseStaffing,
        Math.ceil(forecastOrders / settings.ordersPerFrontCounterCrewPerHour)
      );
      const deliveryReq = forecastOrders > 90 ? 2 : 1;
      const recommendedTotal = kitchenReq + frontReq + deliveryReq;

      // In low demand 3-5 PM, recommended crew is lower
      const isDipPeriod = item.hour >= 15 && item.hour <= 16;
      const adjustedRecTotal = isDipPeriod
        ? Math.max(4, recommendedTotal - (scenario === 'low' ? 1 : 0))
        : recommendedTotal;

      return {
        ...item,
        actualOrders: actual,
        aiForecast: forecastOrders,
        baselineOrders: baseline,
        confidenceLow: lowBand,
        confidenceHigh: highBand,
        recommendedCrew: adjustedRecTotal,
        recFrontCrew: frontReq,
        recKitchenCrew: kitchenReq,
        recDeliveryCrew: deliveryReq
      };
    });
  }, [selectedStore, scenario, settings]);

  // Derived financial metrics
  const metrics = useMemo(() => {
    const isSpike = scenario === 'spike';
    const isLow = scenario === 'low';

    const baseSales = selectedStore.dailySalesLakhs;
    const currentSales = isSpike
      ? (baseSales * 1.18).toFixed(2)
      : isLow
      ? (baseSales * 0.88).toFixed(2)
      : baseSales.toFixed(2);

    const baseOrders = selectedStore.ordersCount;
    const currentOrders = isSpike
      ? Math.round(baseOrders * 1.22)
      : isLow
      ? Math.round(baseOrders * 0.82)
      : baseOrders;

    const laborUtil = scheduleApproved ? 92 : isSpike ? 89 : isLow ? 74 : selectedStore.laborUtil;
    const wasteLoss = kitchenPrepApplied ? 2850 : isLow ? 5600 : 4280;

    // Monthly Opportunity Calculations (Lakhs)
    // Formula: Labor Savings + Waste Reduction + Energy + Throughput Boost
    const baseStoreMonthlyRev = selectedStore.dailySalesLakhs * 30; // in Lakhs
    const laborSavings = Math.round(baseStoreMonthlyRev * 100000 * (sensitivity.laborSavingsPct / 100) * 0.4);
    const wasteSavings = Math.round(baseStoreMonthlyRev * 100000 * (sensitivity.wasteReductionPct / 100) * 0.05);
    const energySavings = Math.round(baseStoreMonthlyRev * 100000 * (sensitivity.energySavingsPct / 100) * 0.035);
    const throughputBoost = Math.round(baseStoreMonthlyRev * 100000 * (sensitivity.throughputBoostPct / 100) * 0.15);

    const totalOpportunityLakhs = Number(
      ((laborSavings + wasteSavings + energySavings + throughputBoost) / 100000).toFixed(2)
    );

    return {
      salesToday: `₹${currentSales}L`,
      salesDiffPct: isSpike ? '+14.2% vs forecast' : isLow ? '-8.4% vs forecast' : '+6.2% vs forecast',
      ordersCount: currentOrders,
      ordersDiffPct: isSpike ? '+22.4% vs yesterday' : isLow ? '-11.5% vs yesterday' : '+4.8% vs yesterday',
      laborUtilPct: laborUtil,
      laborDiffPts: scheduleApproved ? '+14 pts vs baseline' : '+9 pts vs baseline',
      wasteLoss: `₹${wasteLoss.toLocaleString('en-IN')}`,
      wasteDiffPct: kitchenPrepApplied ? '-33% vs baseline' : '-18% vs baseline',
      monthlyOpportunityLakhs: totalOpportunityLakhs,
      laborSavingsMonthly: laborSavings,
      wasteSavingsMonthly: wasteSavings,
      energySavingsMonthly: energySavings,
      throughputBoostMonthly: throughputBoost
    };
  }, [selectedStore, scenario, scheduleApproved, kitchenPrepApplied, sensitivity]);

  // Action Handlers
  const approveSchedule = () => {
    setScheduleApproved(true);
    // update employees to recommended shifts
    setEmployees((prev) =>
      prev.map((emp) => ({
        ...emp,
        currentShift: { ...emp.recommendedShift }
      }))
    );
    addToast(
      'success',
      '✓ Schedule Recommendation Approved',
      '2 crew members reallocated from 3:00–5:00 PM lull to 5:00–7:30 PM peak window. Shift roster updated.'
    );
  };

  const resetScheduleApproval = () => {
    setScheduleApproved(false);
    setEmployees(INITIAL_EMPLOYEES);
    addToast('info', 'Schedule Reset', 'Shift schedule returned to baseline configuration.');
  };

  const updateEmployeeShift = (id: string, start: number, end: number) => {
    setEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id === id) {
          const formatHour = (h: number) => {
            const hrs = Math.floor(h);
            const mins = h % 1 !== 0 ? '30' : '00';
            return `${hrs < 10 ? '0' : ''}${hrs}:${mins}`;
          };
          return {
            ...emp,
            currentShift: {
              start,
              end,
              label: `${formatHour(start)}–${formatHour(end)}`
            }
          };
        }
        return emp;
      })
    );
    addToast('info', 'Shift Assignment Updated', 'Custom roster change recorded.');
  };

  const applyKitchenRecommendation = (skuId?: string) => {
    setKitchenPrepApplied(true);
    setSkus((prev) =>
      prev.map((sku) => {
        if (!skuId || sku.id === skuId) {
          return {
            ...sku,
            currentReady: sku.currentReady + sku.recommendedPrep,
            recommendedPrep: 0,
            status: 'Hold',
            holdingTimeRemMin: sku.shelfLifeMinutes
          };
        }
        return sku;
      })
    );
    addToast(
      'success',
      '✓ Kitchen Prep Recommendation Applied',
      skuId ? 'Batch prep ticket pushed to Kitchen Display System (KDS).' : 'All SKU preparation buffers synchronized with next 30-min forecast.'
    );
  };

  const toggleEquipmentApproval = (id: string) => {
    setEquipment((prev) =>
      prev.map((eq) => {
        if (eq.id === id) {
          if (eq.isSafetyLocked) {
            addToast('warning', 'Safety Constraint Enforced', 'Refrigeration units cannot be shut down or modified due to Food Safety compliance.');
            return eq;
          }
          const nextState = !eq.approved;
          if (nextState) {
            addToast('success', `✓ ${eq.name} Optimized`, `Switched to ${eq.recommendedMode}. Saving approx ₹${eq.estimatedSavingsPerHour}/hr.`);
          }
          return { ...eq, approved: nextState };
        }
        return eq;
      })
    );
  };

  const applyAllEnergyRecommendations = () => {
    setEquipment((prev) =>
      prev.map((eq) => (eq.isSafetyLocked ? eq : { ...eq, approved: true }))
    );
    addToast('success', '✓ All Energy Modes Applied', 'Non-critical equipment switched to scheduled eco/standby modes.');
  };

  const approveAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'approved' as const } : a))
    );
    const alert = alerts.find((a) => a.id === id);
    addToast('success', 'Alert Action Executed', alert ? `Approved: ${alert.recommendedAction}` : 'Action recorded in store log.');
  };

  const dismissAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'dismissed' as const } : a))
    );
    addToast('info', 'Alert Dismissed', 'Action marked dismissed by store manager.');
  };

  const updateSettings = (newSettings: Partial<OperationalSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    addToast('success', 'Operational Parameters Saved', 'Forecasting model thresholds dynamically updated.');
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    addToast('info', 'Settings Reset', 'Restored default operating parameters.');
  };

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
        approveSchedule,
        resetScheduleApproval,
        updateEmployeeShift,
        skus,
        kitchenPrepApplied,
        applyKitchenRecommendation,
        selectedExplanationSKU,
        setSelectedExplanationSKU,
        equipment,
        toggleEquipmentApproval,
        applyAllEnergyRecommendations,
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

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
