export type ScenarioType = 'normal' | 'spike' | 'low';

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
  kitchenUtil: number; // e.g. 81%
  energyEfficiency: number; // e.g. 74%
  aiOpportunityWeek: number; // e.g. 5200
  status: 'Optimized' | 'Watch' | 'Attention';
  description: string;
}

export interface HourlyForecast {
  hour: number;
  timeLabel: string;
  actualOrders: number | null;
  aiForecast: number;
  baselineOrders: number;
  confidenceLow: number;
  confidenceHigh: number;
  occupancyPct: number;
  scheduledCrew: number;
  recommendedCrew: number;
  frontCrew: number;
  kitchenCrew: number;
  driveThruCrew: number;
  deliveryCrew: number;
  managerCrew: number;
  recFrontCrew: number;
  recKitchenCrew: number;
  recDeliveryCrew: number;
  diningHvacMode: 'Normal' | 'Eco 72%' | 'Standby';
  kitchenHvacMode: 'Normal' | 'Eco 85%';
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

export type SkillTag = 'Kitchen' | 'Grill' | 'Fryer' | 'Cashier' | 'Drive-Thru' | 'Delivery' | 'Closing';

export interface Employee {
  id: string;
  nameId: string; // e.g. "Crew A"
  primaryRole: string;
  skills: SkillTag[];
  availability: string;
  currentShift: {
    start: number; // 24hr decimal, e.g. 12
    end: number;   // 20
    label: string; // "12:00–20:00"
  };
  recommendedShift: {
    start: number;
    end: number;
    label: string;
  };
  isCrossTrained: boolean;
  status: 'active' | 'scheduled' | 'reassigned' | 'break';
}

export interface SKUItem {
  id: string;
  name: string;
  category: 'Burger' | 'Sides' | 'Beverage' | 'Chicken';
  currentReady: number;
  next30mForecast: number;
  recommendedPrep: number;
  holdingTimeRemMin: number;
  maxHoldingTimeMin: number;
  unitPrice: number;
  status: 'Prepare' | 'Hold' | 'At Risk';
  whyExplanation: string;
  batchSize: number;
  shelfLifeMinutes: number;
}

export interface EquipmentItem {
  id: string;
  name: string;
  category: 'HVAC' | 'Cooking' | 'Holding' | 'Refrigeration' | 'Lighting';
  currentStatus: string;
  currentUtilization: number; // percentage
  recommendedUtilization: number; // percentage
  recommendedMode: string;
  estimatedHourlyCost: number; // INR
  estimatedSavingsPerHour: number; // INR
  reason: string;
  isSafetyLocked: boolean; // refrigeration is locked
  safetyNote?: string;
  approved: boolean;
}

export interface AlertItem {
  id: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  storeName: string;
  description: string;
  recommendedAction: string;
  timestamp: string;
  status: 'pending' | 'approved' | 'dismissed';
  metricImpact?: string;
}

export interface OperationalSettings {
  ordersPerKitchenCrewPerHour: number;
  ordersPerFrontCounterCrewPerHour: number;
  minKitchenStaffing: number;
  minFrontOfHouseStaffing: number;
  prepSafetyBufferPct: number;
  maxHoldingTimeMinutes: number;
  energyOptimizationThresholdPct: number;
  forecastHorizonHours: number;
}

export interface SensitivityParams {
  laborSavingsPct: number;     // 1 to 10%
  wasteReductionPct: number;   // 5 to 30%
  energySavingsPct: number;    // 3 to 20%
  throughputBoostPct: number;  // 0 to 5%
}

export interface ROICalculatorParams {
  numberOfStores: number;
  avgMonthlyStoreRevenueLakhs: number;
  laborOptimizationPct: number;
  wasteReductionPct: number;
  energyReductionPct: number;
  throughputImprovementPct: number;
  implementationCostPerStorePerMonth: number;
}
