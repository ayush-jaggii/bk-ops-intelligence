import {
  Store,
  HourlyForecast,
  ForecastSignal,
  Employee,
  AlertItem,
  OperationalSettings
} from '../types';

export const INITIAL_STORES: Store[] = [
  {
    id: 'delhi-select-citywalk',
    name: 'BK Delhi — Select Citywalk',
    city: 'New Delhi',
    region: 'North',
    address: 'Saket District Centre, Sector 6, Pushp Vihar, New Delhi',
    dailySalesLakhs: 2.84,
    ordersCount: 1146,
    sssg: 4.6,
    laborUtil: 88,
    avgSpeedOfServiceSec: 174, // 2m 54s
    dailyUnproductiveHoursSaved: 16,
    aiOpportunityWeek: 26880,
    status: 'Optimized',
    description: 'Flagship mall store with high footfall lunch rushes and intense delivery peaks.'
  },
  {
    id: 'bengaluru-indiranagar',
    name: 'BK Bengaluru — Indiranagar',
    city: 'Bengaluru',
    region: 'South',
    address: '100 Feet Rd, HAL 2nd Stage, Indiranagar, Bengaluru',
    dailySalesLakhs: 3.12,
    ordersCount: 1280,
    sssg: 5.8,
    laborUtil: 85,
    avgSpeedOfServiceSec: 182,
    dailyUnproductiveHoursSaved: 14,
    aiOpportunityWeek: 23520,
    status: 'Watch',
    description: 'High evening delivery aggregator mix requiring extra dispatcher micro-shifts.'
  },
  {
    id: 'mumbai-andheri',
    name: 'BK Mumbai — Andheri',
    city: 'Mumbai',
    region: 'West',
    address: 'Infinity Mall Link Road, Andheri West, Mumbai',
    dailySalesLakhs: 3.45,
    ordersCount: 1410,
    sssg: 6.1,
    laborUtil: 79,
    avgSpeedOfServiceSec: 215,
    dailyUnproductiveHoursSaved: 20,
    aiOpportunityWeek: 33600,
    status: 'Attention',
    description: 'Severe off-peak overstaffing during 3–5 PM and dinner kiosk bottlenecks.'
  },
  {
    id: 'gurugram-cyber-hub',
    name: 'BK Gurugram — Cyber Hub',
    city: 'Gurugram',
    region: 'North',
    address: 'DLF Cyber City, Phase 2, Gurugram, Haryana',
    dailySalesLakhs: 3.20,
    ordersCount: 1320,
    sssg: 4.9,
    laborUtil: 89,
    avgSpeedOfServiceSec: 168,
    dailyUnproductiveHoursSaved: 15,
    aiOpportunityWeek: 25200,
    status: 'Optimized',
    description: 'Corporate lunch rush (1–3 PM) matched with 4-hour micro-shifts.'
  },
  {
    id: 'pune-fc-road',
    name: 'BK Pune — FC Road',
    city: 'Pune',
    region: 'West',
    address: 'Fergusson College Road, Shivajinagar, Pune',
    dailySalesLakhs: 2.65,
    ordersCount: 1090,
    sssg: 3.8,
    laborUtil: 82,
    avgSpeedOfServiceSec: 190,
    dailyUnproductiveHoursSaved: 13,
    aiOpportunityWeek: 21840,
    status: 'Watch',
    description: 'High student value-meal volume with afternoon snack-time demand.'
  }
];

export const INITIAL_HOURLY_DATA: HourlyForecast[] = [
  {
    hour: 12,
    timeLabel: '12 PM',
    transactionsPerHour: 34,
    aiForecast: 34,
    actualTransactions: 35,
    baselineTransactions: 32,
    confidenceLow: 30,
    confidenceHigh: 38,
    speedOfServiceSecUnoptimized: 210, // 3m 30s
    speedOfServiceSecOptimized: 165,   // 2m 45s
    txPerEmployeeUnoptimized: 4.25,
    txPerEmployeeOptimized: 4.85,
    traditionalCrew9h: 8,
    scheduledCrew: 8,
    recommendedCrew: 7,
    microShiftCrewCount: 0,
    isLull: false,
    isPeak: false,
    stationAllocationTraditional: { frontCounter: 2, assemblyLine: 2, fryStation: 1, flameBroiler: 1, aggregatorDispatch: 1, bohPrep: 1 },
    stationAllocationOptimized: { frontCounter: 2, assemblyLine: 2, fryStation: 1, flameBroiler: 1, aggregatorDispatch: 1, bohPrep: 0 }
  },
  {
    hour: 13,
    timeLabel: '1 PM',
    transactionsPerHour: 52,
    aiForecast: 52,
    actualTransactions: 50,
    baselineTransactions: 48,
    confidenceLow: 46,
    confidenceHigh: 58,
    speedOfServiceSecUnoptimized: 410, // 6m 50s (BLOWOUT)
    speedOfServiceSecOptimized: 172,   // 2m 52s (Within 3m benchmark)
    txPerEmployeeUnoptimized: 6.5,     // Heavy stress on 8 crew
    txPerEmployeeOptimized: 4.72,     // Balanced on 11 crew
    traditionalCrew9h: 8,              // Fixed 9h shift cap
    scheduledCrew: 8,
    recommendedCrew: 11,               // 8 base + 3 micro-shifts
    microShiftCrewCount: 3,
    isLull: false,
    isPeak: true,
    rebalanceAction: 'Reassign 2 BOH Prep crew to Assembly & Dispatch',
    stationAllocationTraditional: { frontCounter: 2, assemblyLine: 2, fryStation: 1, flameBroiler: 1, aggregatorDispatch: 1, bohPrep: 1 },
    stationAllocationOptimized: { frontCounter: 3, assemblyLine: 3, fryStation: 2, flameBroiler: 1, aggregatorDispatch: 2, bohPrep: 0 }
  },
  {
    hour: 14,
    timeLabel: '2 PM',
    transactionsPerHour: 48,
    aiForecast: 48,
    actualTransactions: 47,
    baselineTransactions: 44,
    confidenceLow: 42,
    confidenceHigh: 54,
    speedOfServiceSecUnoptimized: 380, // 6m 20s
    speedOfServiceSecOptimized: 176,   // 2m 56s
    txPerEmployeeUnoptimized: 6.0,
    txPerEmployeeOptimized: 4.8,
    traditionalCrew9h: 8,
    scheduledCrew: 8,
    recommendedCrew: 10,
    microShiftCrewCount: 2,
    isLull: false,
    isPeak: true,
    rebalanceAction: 'Sustain reinforced Assembly Line and Fryer capacity',
    stationAllocationTraditional: { frontCounter: 2, assemblyLine: 2, fryStation: 1, flameBroiler: 1, aggregatorDispatch: 1, bohPrep: 1 },
    stationAllocationOptimized: { frontCounter: 2, assemblyLine: 3, fryStation: 2, flameBroiler: 1, aggregatorDispatch: 2, bohPrep: 0 }
  },
  {
    hour: 15,
    timeLabel: '3 PM',
    transactionsPerHour: 16,
    aiForecast: 16,
    actualTransactions: null,
    baselineTransactions: 15,
    confidenceLow: 12,
    confidenceHigh: 20,
    speedOfServiceSecUnoptimized: 140, // 2m 20s (empty store)
    speedOfServiceSecOptimized: 148,   // 2m 28s
    txPerEmployeeUnoptimized: 1.77,    // < 2 tx/hr (OFF-PEAK OVERSTAFFING)
    txPerEmployeeOptimized: 4.0,       // 16 tx / 4 crew = 4 tx/hr
    traditionalCrew9h: 9,              // Overlapping Shift A & Shift B!
    scheduledCrew: 9,
    recommendedCrew: 4,                // Stand-down unnecessary full-timers
    microShiftCrewCount: 0,
    isLull: true,
    isPeak: false,
    rebalanceAction: 'Off-peak lull: 5 idle crew stood down; 1 assigned to deep BOH sanitization',
    stationAllocationTraditional: { frontCounter: 3, assemblyLine: 2, fryStation: 1, flameBroiler: 1, aggregatorDispatch: 1, bohPrep: 1 },
    stationAllocationOptimized: { frontCounter: 1, assemblyLine: 1, fryStation: 1, flameBroiler: 0, aggregatorDispatch: 0, bohPrep: 1 }
  },
  {
    hour: 16,
    timeLabel: '4 PM',
    transactionsPerHour: 14,
    aiForecast: 14,
    actualTransactions: null,
    baselineTransactions: 13,
    confidenceLow: 10,
    confidenceHigh: 18,
    speedOfServiceSecUnoptimized: 135,
    speedOfServiceSecOptimized: 142,
    txPerEmployeeUnoptimized: 1.55,    // Severe idle labor waste
    txPerEmployeeOptimized: 3.5,
    traditionalCrew9h: 9,              // 9 staff handling only 14 orders!
    scheduledCrew: 9,
    recommendedCrew: 4,
    microShiftCrewCount: 0,
    isLull: true,
    isPeak: false,
    rebalanceAction: 'Stagger crew meal breaks and BOH stock replenishment',
    stationAllocationTraditional: { frontCounter: 3, assemblyLine: 2, fryStation: 1, flameBroiler: 1, aggregatorDispatch: 1, bohPrep: 1 },
    stationAllocationOptimized: { frontCounter: 1, assemblyLine: 1, fryStation: 1, flameBroiler: 0, aggregatorDispatch: 0, bohPrep: 1 }
  },
  {
    hour: 17,
    timeLabel: '5 PM',
    transactionsPerHour: 28,
    aiForecast: 28,
    actualTransactions: null,
    baselineTransactions: 26,
    confidenceLow: 24,
    confidenceHigh: 34,
    speedOfServiceSecUnoptimized: 195,
    speedOfServiceSecOptimized: 168,
    txPerEmployeeUnoptimized: 3.5,
    txPerEmployeeOptimized: 4.66,
    traditionalCrew9h: 8,
    scheduledCrew: 8,
    recommendedCrew: 6,
    microShiftCrewCount: 0,
    isLull: false,
    isPeak: false,
    rebalanceAction: 'Pre-dinner station prep: Broiler warm-up & Patty loading',
    stationAllocationTraditional: { frontCounter: 2, assemblyLine: 2, fryStation: 1, flameBroiler: 1, aggregatorDispatch: 1, bohPrep: 1 },
    stationAllocationOptimized: { frontCounter: 2, assemblyLine: 2, fryStation: 1, flameBroiler: 1, aggregatorDispatch: 0, bohPrep: 0 }
  },
  {
    hour: 18,
    timeLabel: '6 PM',
    transactionsPerHour: 42,
    aiForecast: 42,
    actualTransactions: null,
    baselineTransactions: 39,
    confidenceLow: 36,
    confidenceHigh: 48,
    speedOfServiceSecUnoptimized: 310, // 5m 10s
    speedOfServiceSecOptimized: 174,   // 2m 54s
    txPerEmployeeUnoptimized: 5.25,
    txPerEmployeeOptimized: 4.66,
    traditionalCrew9h: 8,
    scheduledCrew: 8,
    recommendedCrew: 9,
    microShiftCrewCount: 2,            // Evening micro-shifts arrive
    isLull: false,
    isPeak: false,
    rebalanceAction: 'Activate Aggregator Dispatch station as Swiggy/Zomato wave builds',
    stationAllocationTraditional: { frontCounter: 2, assemblyLine: 2, fryStation: 1, flameBroiler: 1, aggregatorDispatch: 1, bohPrep: 1 },
    stationAllocationOptimized: { frontCounter: 2, assemblyLine: 3, fryStation: 2, flameBroiler: 1, aggregatorDispatch: 1, bohPrep: 0 }
  },
  {
    hour: 19,
    timeLabel: '7 PM',
    transactionsPerHour: 55,
    aiForecast: 55,
    actualTransactions: null,
    baselineTransactions: 50,
    confidenceLow: 48,
    confidenceHigh: 62,
    speedOfServiceSecUnoptimized: 445, // 7m 25s (CRITICAL BOTTLENECK)
    speedOfServiceSecOptimized: 168,   // 2m 48s (Speedy dispatch)
    txPerEmployeeUnoptimized: 6.87,    // Staff overwhelmed -> kiosk drop-off
    txPerEmployeeOptimized: 4.58,     // 12 crew = smooth pacing
    traditionalCrew9h: 8,              // Fixed 8 crew cap
    scheduledCrew: 8,
    recommendedCrew: 12,               // 8 base + 4 micro-shift peak reinforcements
    microShiftCrewCount: 4,
    isLull: false,
    isPeak: true,
    rebalanceAction: 'Maximum peak deployment: 3 Assembly + 2 Fryer + 2 Dispatch + 3 Counter',
    stationAllocationTraditional: { frontCounter: 2, assemblyLine: 2, fryStation: 1, flameBroiler: 1, aggregatorDispatch: 1, bohPrep: 1 },
    stationAllocationOptimized: { frontCounter: 3, assemblyLine: 3, fryStation: 2, flameBroiler: 2, aggregatorDispatch: 2, bohPrep: 0 }
  },
  {
    hour: 20,
    timeLabel: '8 PM',
    transactionsPerHour: 50,
    aiForecast: 50,
    actualTransactions: null,
    baselineTransactions: 46,
    confidenceLow: 44,
    confidenceHigh: 58,
    speedOfServiceSecUnoptimized: 405, // 6m 45s
    speedOfServiceSecOptimized: 172,   // 2m 52s
    txPerEmployeeUnoptimized: 6.25,
    txPerEmployeeOptimized: 4.54,
    traditionalCrew9h: 8,
    scheduledCrew: 8,
    recommendedCrew: 11,
    microShiftCrewCount: 3,
    isLull: false,
    isPeak: true,
    rebalanceAction: 'High aggregator delivery surge: dedicated driver staging handoff',
    stationAllocationTraditional: { frontCounter: 2, assemblyLine: 2, fryStation: 1, flameBroiler: 1, aggregatorDispatch: 1, bohPrep: 1 },
    stationAllocationOptimized: { frontCounter: 3, assemblyLine: 3, fryStation: 2, flameBroiler: 1, aggregatorDispatch: 2, bohPrep: 0 }
  }
];

export const FORECAST_SIGNALS: ForecastSignal[] = [
  {
    id: 'signal-1',
    category: 'event',
    title: 'IPL Cricket Match (7:30 PM)',
    subtitle: 'Delhi vs Mumbai · Arun Jaitley Stadium',
    impactBadge: '+28% Dinner Spike',
    impactType: 'positive',
    explanation: 'Home viewing triggers high Whopper combo family pack delivery orders between 7:00 PM and 9:30 PM. 4-hour evening micro-shifts scheduled.'
  },
  {
    id: 'signal-2',
    category: 'day',
    title: 'Tuesday Afternoon Lull Pattern',
    subtitle: '3:00 PM – 5:00 PM Footfall Dip',
    impactBadge: '-34% Transactions',
    impactType: 'negative',
    explanation: 'Historical Tuesday mall data shows sharp post-lunch slump (< 16 tx/hr). Fixed 9-hour straight shifts cause severe unproductive overstaffing.'
  },
  {
    id: 'signal-3',
    category: 'delivery',
    title: 'Aggregator Delivery Cluster',
    subtitle: 'Swiggy & Zomato Gold Campaign',
    impactBadge: '+22% Delivery Mix',
    impactType: 'positive',
    explanation: 'Delivery order share shifts from 38% to 60% during dinner window. Requires dedicated Aggregator Dispatch station to prevent front counter blockage.'
  },
  {
    id: 'signal-4',
    category: 'weather',
    title: 'Thunderstorm Forecast (6:00 PM)',
    subtitle: 'High Humidity & Sudden Showers',
    impactBadge: '+18% Delivery Shift',
    impactType: 'neutral',
    explanation: 'Rain shifts dine-in walk-ins to instant delivery aggregators. Dining room floor crew rebalanced to packaging and dispatch.'
  }
];

export const INITIAL_SIGNALS = FORECAST_SIGNALS;

export const INITIAL_EMPLOYEES: Employee[] = [
  // Full-time 9h straight shift employees
  {
    id: 'emp-1',
    nameId: 'Rahul Sharma (Crew A)',
    primaryRole: 'Front Counter',
    secondaryStations: ['Assembly Line', 'Aggregator Dispatch'],
    skills: ['Front Counter', 'Assembly', 'Shift Supervisor'],
    shiftType: 'standard_9h',
    availability: 'Full Time',
    traditionalShift: { start: 8, end: 17, label: '08:00–17:00 (9h Straight)' },
    recommendedShift: { start: 8, end: 17, label: '08:00–17:00 (Staggered Break at 15:00)', isMicroShift: false, assignedStation: 'Front Counter' },
    currentShift: { start: 8, end: 17, label: '08:00–17:00' },
    isCrossTrained: true,
    status: 'active',
    hourlyRateINR: 110
  },
  {
    id: 'emp-2',
    nameId: 'Vikram Singh (Crew B)',
    primaryRole: 'Flame Broiler',
    secondaryStations: ['Fry Station', 'Assembly Line'],
    skills: ['Flame Broiler', 'Fry Station', 'Assembly'],
    shiftType: 'standard_9h',
    availability: 'Full Time',
    traditionalShift: { start: 8, end: 17, label: '08:00–17:00 (9h Straight)' },
    recommendedShift: { start: 8, end: 17, label: '08:00–17:00 (BOH Prep in Lull)', isMicroShift: false, assignedStation: 'Flame Broiler' },
    currentShift: { start: 8, end: 17, label: '08:00–17:00' },
    isCrossTrained: true,
    status: 'active',
    hourlyRateINR: 105
  },
  {
    id: 'emp-3',
    nameId: 'Pooja Verma (Crew C)',
    primaryRole: 'Assembly Line',
    secondaryStations: ['Front Counter', 'Aggregator Dispatch'],
    skills: ['Assembly', 'Front Counter'],
    shiftType: 'standard_9h',
    availability: 'Full Time',
    traditionalShift: { start: 14, end: 23, label: '14:00–23:00 (9h Straight)' },
    recommendedShift: { start: 16, end: 23, label: '16:00–23:00 (Aligned to Peak)', isMicroShift: false, assignedStation: 'Assembly Line' },
    currentShift: { start: 14, end: 23, label: '14:00–23:00' },
    isCrossTrained: true,
    status: 'active',
    hourlyRateINR: 95
  },
  {
    id: 'emp-4',
    nameId: 'Amit Patel (Crew D)',
    primaryRole: 'Fry Station',
    secondaryStations: ['Flame Broiler', 'BOH Prep'],
    skills: ['Fry Station', 'BOH Prep'],
    shiftType: 'standard_9h',
    availability: 'Full Time',
    traditionalShift: { start: 14, end: 23, label: '14:00–23:00 (9h Straight)' },
    recommendedShift: { start: 17, end: 23, label: '17:00–23:00 (Peak Reinforcement)', isMicroShift: false, assignedStation: 'Fry Station' },
    currentShift: { start: 14, end: 23, label: '14:00–23:00' },
    isCrossTrained: true,
    status: 'active',
    hourlyRateINR: 95
  },
  {
    id: 'emp-5',
    nameId: 'Sneha Nair (Crew E)',
    primaryRole: 'BOH Prep',
    secondaryStations: ['Assembly Line', 'Aggregator Dispatch'],
    skills: ['BOH Prep', 'Assembly', 'Aggregator Dispatch'],
    shiftType: 'standard_9h',
    availability: 'Full Time',
    traditionalShift: { start: 8, end: 17, label: '08:00–17:00 (9h Straight)' },
    recommendedShift: { start: 8, end: 17, label: '08:00–17:00 (Rebalanced to Assembly at 13:00)', isMicroShift: false, assignedStation: 'Assembly Line' },
    currentShift: { start: 8, end: 17, label: '08:00–17:00' },
    isCrossTrained: true,
    status: 'rebalanced',
    hourlyRateINR: 95
  },
  
  // Flexible 3- to 4-Hour Micro-Shift crew (Peak coverage without lull idle hours)
  {
    id: 'emp-6',
    nameId: 'Karan Mehra (Crew F - Micro)',
    primaryRole: 'Assembly Line',
    secondaryStations: ['Aggregator Dispatch'],
    skills: ['Assembly', 'Aggregator Dispatch'],
    shiftType: 'micro_4h',
    availability: 'Lunch Rush Part-Time',
    traditionalShift: { start: 12, end: 21, label: 'Not Rostered in Static 9h' },
    recommendedShift: { start: 12, end: 16, label: '12:00–16:00 (4h Lunch Micro-Shift)', isMicroShift: true, assignedStation: 'Assembly Line' },
    currentShift: { start: 12, end: 16, label: '12:00–16:00 (4h Micro)' },
    isCrossTrained: true,
    status: 'scheduled',
    hourlyRateINR: 95
  },
  {
    id: 'emp-7',
    nameId: 'Deepak Joshi (Crew G - Micro)',
    primaryRole: 'Aggregator Dispatch',
    secondaryStations: ['Front Counter'],
    skills: ['Aggregator Dispatch', 'Front Counter'],
    shiftType: 'micro_4h',
    availability: 'Lunch Rush Part-Time',
    traditionalShift: { start: 12, end: 21, label: 'Not Rostered in Static 9h' },
    recommendedShift: { start: 12, end: 16, label: '12:00–16:00 (4h Lunch Micro-Shift)', isMicroShift: true, assignedStation: 'Aggregator Dispatch' },
    currentShift: { start: 12, end: 16, label: '12:00–16:00 (4h Micro)' },
    isCrossTrained: true,
    status: 'scheduled',
    hourlyRateINR: 95
  },
  {
    id: 'emp-8',
    nameId: 'Ananya Roy (Crew H - Micro)',
    primaryRole: 'Assembly Line',
    secondaryStations: ['Fry Station', 'Aggregator Dispatch'],
    skills: ['Assembly', 'Fry Station', 'Aggregator Dispatch'],
    shiftType: 'micro_4h',
    availability: 'Dinner Rush Part-Time',
    traditionalShift: { start: 14, end: 23, label: 'Not Rostered in Static 9h' },
    recommendedShift: { start: 18, end: 22, label: '18:00–22:00 (4h Dinner Micro-Shift)', isMicroShift: true, assignedStation: 'Assembly Line' },
    currentShift: { start: 18, end: 22, label: '18:00–22:00 (4h Micro)' },
    isCrossTrained: true,
    status: 'scheduled',
    hourlyRateINR: 95
  },
  {
    id: 'emp-9',
    nameId: 'Manish Rawat (Crew I - Micro)',
    primaryRole: 'Fry Station',
    secondaryStations: ['Flame Broiler'],
    skills: ['Fry Station', 'Flame Broiler'],
    shiftType: 'micro_4h',
    availability: 'Dinner Rush Part-Time',
    traditionalShift: { start: 14, end: 23, label: 'Not Rostered in Static 9h' },
    recommendedShift: { start: 18, end: 22, label: '18:00–22:00 (4h Dinner Micro-Shift)', isMicroShift: true, assignedStation: 'Fry Station' },
    currentShift: { start: 18, end: 22, label: '18:00–22:00 (4h Micro)' },
    isCrossTrained: true,
    status: 'scheduled',
    hourlyRateINR: 95
  },
  {
    id: 'emp-10',
    nameId: 'Simran Kaur (Crew J - Micro)',
    primaryRole: 'Aggregator Dispatch',
    secondaryStations: ['Front Counter'],
    skills: ['Aggregator Dispatch', 'Front Counter'],
    shiftType: 'micro_4h',
    availability: 'Dinner Rush Part-Time',
    traditionalShift: { start: 14, end: 23, label: 'Not Rostered in Static 9h' },
    recommendedShift: { start: 19, end: 23, label: '19:00–23:00 (4h Dinner Micro-Shift)', isMicroShift: true, assignedStation: 'Aggregator Dispatch' },
    currentShift: { start: 19, end: 23, label: '19:00–23:00 (4h Micro)' },
    isCrossTrained: true,
    status: 'scheduled',
    hourlyRateINR: 95
  }
];

export const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'alert-1',
    priority: 'HIGH',
    category: 'OFF_PEAK_OVERSTAFF',
    title: 'Off-Peak Overstaffing Detected (3:00 PM – 5:00 PM)',
    storeName: 'BK Delhi — Select Citywalk',
    description: '9 staff members are rostered on overlapping 9-hour straight shifts to handle only 14–16 transactions/hour (< 1.8 tx/employee). Unproductive labor burning ~₹1,520 in unnecessary wages.',
    recommendedAction: 'Stand down 4 scheduled crew members; convert afternoon overlap to 4-hour peak micro-shifts.',
    timestamp: '12 mins ago',
    status: 'pending',
    metricImpact: 'Saves 10 unproductive labor hours today (₹950)'
  },
  {
    id: 'alert-2',
    priority: 'HIGH',
    category: 'PEAK_SOS_RISK',
    title: 'Peak Understaffing & Speed of Service Blowout Risk (7:00 PM)',
    storeName: 'BK Delhi — Select Citywalk',
    description: 'Demand projected at 55 transactions/hour due to IPL match. Fixed shift cap of 8 crew will push Speed of Service beyond the 3-minute benchmark to 7m 25s, causing kiosk and aggregator order drop-offs.',
    recommendedAction: 'Deploy 4 evening micro-shift crew (18:00–22:00) to Assembly and Aggregator Dispatch.',
    timestamp: '25 mins ago',
    status: 'pending',
    metricImpact: 'Protects Speed of Service at 2m 48s; prevents ~₹14,500 in dropped peak orders'
  },
  {
    id: 'alert-3',
    priority: 'MEDIUM',
    category: 'STATION_REBALANCE',
    title: 'Cross-Station Rebalancing Trigger (1:00 PM Lunch Rush)',
    storeName: 'BK Delhi — Select Citywalk',
    description: 'BOH prep backlog is low while KDS assembly queue has 16 orders pending. Speed of Service is approaching 4m 10s.',
    recommendedAction: 'Shift 2 cross-trained crew members from BOH Prep to Assembly Line and Dispatch.',
    timestamp: '40 mins ago',
    status: 'pending',
    metricImpact: 'Reduces assembly queue wait time by 42%'
  },
  {
    id: 'alert-4',
    priority: 'MEDIUM',
    category: 'MICRO_SHIFT',
    title: '5-Day Advance Schedule Generated for Manager Review',
    storeName: 'BK Delhi — Select Citywalk',
    description: 'AI auto-rostering engine has generated next week’s demand-responsive schedule with 18 micro-shifts replacing rigid straight shifts.',
    recommendedAction: 'Review and approve master schedule or execute manager overrides.',
    timestamp: '1 hour ago',
    status: 'pending',
    metricImpact: 'Reduces weekly store labor cost by ₹26,880'
  }
];

export const DEFAULT_SETTINGS: OperationalSettings = {
  targetSpeedOfServiceSec: 180,       // 3 minutes (QSR industry standard)
  maxSpeedOfServiceSec: 300,          // 5 minutes
  minTransactionsPerEmployee: 2.0,    // Below this indicates overstaffing
  targetTransactionsPerEmployee: 4.8, // Healthy productivity band
  minBohPrepStaffing: 1,
  minAssemblyStaffing: 1,
  minFrontCounterStaffing: 1,
  hourlyBaseWageINR: 95,
  overtimeMultiplier: 1.5,
  advanceScheduleNoticeDays: 5
};
