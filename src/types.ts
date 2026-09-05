export type ScenarioType = 'normal' | 'spike' | 'low';

export type ShiftType = 'standard_9h' | 'micro_4h' | 'part_time';

export type StationType =
  | 'Front Counter'
  | 'Assembly Line'
  | 'Fry Station'
  | 'Flame Broiler'
  | 'Aggregator Dispatch'
  | 'BOH Prep';

export interface StationAllocation {
  frontCounter: number;
  assemblyLine: number;
  fryStation: number;
  flameBroiler: number;
  aggregatorDispatch: number;
  bohPrep: number;
}

export interface Store {
  id: string;
  name: string;
  city: string;
  region: string;
  address: string;
  dailySalesLakhs: number;
  ordersCount: number;
  sssg: number; // e.g. +4.6%
  laborUtil: number; // e.g. 87%
  avgSpeedOfServiceSec: number; // e.g. 175 (2m 55s)
  dailyUnproductiveHoursSaved: number; // e.g. 16
  aiOpportunityWeek: number; // e.g. 26800
  status: 'Optimized' | 'Watch' | 'Attention';
  description: string;
}

export interface HourlyForecast {
  hour: number;
  timeLabel: string;
  transactionsPerHour: number;
  aiForecast: number; // synonym for backwards-compat in existing charts
  actualTransactions: number | null;
  baselineTransactions: number;
  confidenceLow: number;
  confidenceHigh: number;
  
  // Speed of Service & Productivity metrics
  speedOfServiceSecUnoptimized: number; // e.g. 420s (7m) during peak
  speedOfServiceSecOptimized: number;   // e.g. 175s (2m 55s) during peak
  txPerEmployeeUnoptimized: number;     // e.g. 1.7 tx/hr during lull (< 2 is overstaffed)
  txPerEmployeeOptimized: number;       // e.g. 3.8 tx/hr during lull, 4.8 in peak
  
  // Staffing counts
  traditionalCrew9h: number;            // static 8 or 9 crew
  scheduledCrew: number;                // alias for traditional / baseline
  recommendedCrew: number;              // demand-aligned crew count
  microShiftCrewCount: number;          // count of 3-4h micro-shift crew on floor
  
  // Station allocation breakdown
  stationAllocationTraditional: StationAllocation;
  stationAllocationOptimized: StationAllocation;
  
  // Station rebalancing note
  rebalanceAction?: string;
  isLull: boolean;
  isPeak: boolean;
}

export interface ForecastSignal {
  id: string;
  category: 'day' | 'weather' | 'event' | 'promotion' | 'delivery';
  title: string;
  subtitle: string;
  impactBadge: string;
  impactType: 'positive' | 'negative' | 'neutral';
  explanation: string;
}

export type SkillTag =
  | 'Assembly'
  | 'Front Counter'
  | 'Flame Broiler'
  | 'Fry Station'
  | 'Aggregator Dispatch'
  | 'BOH Prep'
  | 'Shift Supervisor';

export interface Employee {
  id: string;
  nameId: string; // e.g. "Rahul S. (Crew A)"
  primaryRole: StationType;
  secondaryStations: StationType[];
  skills: SkillTag[];
  shiftType: ShiftType;
  availability: string;
  traditionalShift: {
    start: number; // 24hr decimal, e.g. 8 (08:00)
    end: number;   // 17 (17:00) - 9 hour shift
    label: string; // "08:00–17:00 (9h Straight)"
  };
  recommendedShift: {
    start: number;
    end: number;
    label: string;
    isMicroShift: boolean; // true for 4-hour peak coverage
    assignedStation: StationType;
  };
  currentShift: {
    start: number;
    end: number;
    label: string;
  };
  isCrossTrained: boolean;
  status: 'active' | 'scheduled' | 'rebalanced' | 'break';
  hourlyRateINR: number;
  managerOverridden?: boolean;
}

export interface AlertItem {
  id: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  category:
    | 'OFF_PEAK_OVERSTAFF'
    | 'PEAK_SOS_RISK'
    | 'STATION_REBALANCE'
    | 'BREAK_COMPLIANCE'
    | 'MICRO_SHIFT';
  title: string;
  storeName: string;
  description: string;
  recommendedAction: string;
  timestamp: string;
  status: 'pending' | 'approved' | 'dismissed';
  metricImpact?: string;
}

export interface OperationalSettings {
  targetSpeedOfServiceSec: number;     // 180s (3m QSR benchmark)
  maxSpeedOfServiceSec: number;        // 300s (5m threshold)
  minTransactionsPerEmployee: number;  // 2.0 (below this is unproductive)
  targetTransactionsPerEmployee: number; // 4.5 - 5.5
  minBohPrepStaffing: number;          // 1
  minAssemblyStaffing: number;         // 1
  minFrontCounterStaffing: number;     // 1
  hourlyBaseWageINR: number;           // ₹95/hr
  overtimeMultiplier: number;          // 1.5x
  advanceScheduleNoticeDays: number;   // 5 days
}

export interface SensitivityParams {
  laborSavingsPct: number;    // 1 to 10%
  throughputBoostPct: number; // 0 to 5%
  microShiftRatioPct: number; // 10 to 40%
  sosImprovementPct: number;  // 10 to 50%
}

export interface ROICalculatorParams {
  numberOfStores: number;
  avgMonthlyStoreRevenueLakhs: number;
  unproductiveHoursSavedPerDay: number;
  hourlyWageINR: number;
  peakRevenueDropOffRecoveredPct: number;
  implementationCostPerStorePerMonth: number;
}
