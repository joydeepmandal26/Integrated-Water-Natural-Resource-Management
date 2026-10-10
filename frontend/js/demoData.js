// demoData.js – centralised mock data for demo mode
const demoResources = [
  { id: 1, name: 'River A', location: 'North Basin', type: 'River', capacity: 1200, level: 900, status: 'Good' },
  { id: 2, name: 'Lake B', location: 'East Valley', type: 'Lake', capacity: 2000, level: 1500, status: 'Fair' },
  { id: 3, name: 'Reservoir C', location: 'South Plateau', type: 'Reservoir', capacity: 3000, level: 2500, status: 'Excellent' }
];

const demoConsumption = {
  totalResources: 3,
  totalCapacity: 6200,
  availableWater: 4900,
  dailyConsumption: 210,
  consumptionTrend: [
    { date: '2023-09-01', value: 150, location: 'North Basin' },
    { date: '2023-09-02', value: 160, location: 'East Valley' },
    { date: '2023-09-03', value: 170, location: 'South Plateau' },
    { date: '2023-09-04', value: 180, location: 'North Basin' },
    { date: '2023-09-05', value: 190, location: 'East Valley' },
    { date: '2023-09-06', value: 210, location: 'South Plateau' }
  ],
  distribution: [
    { name: 'River A', value: 900 },
    { name: 'Lake B', value: 1500 },
    { name: 'Reservoir C', value: 2500 }
  ]
};

const demoComplaints = [
  { id: 'C001', date: '2023-09-04', location: 'North Zone', category: 'Leak', status: 'Pending' },
  { id: 'C002', date: '2023-09-03', location: 'South Zone', category: 'Contamination', status: 'Resolved' },
  { id: 'C003', date: '2023-09-02', location: 'East Zone', category: 'Overflow', status: 'Pending' }
];

const demoMaintenance = [
  { id: 1, description: 'Pump inspection', location: 'North Basin', date: '2023-09-10', status: 'Scheduled' },
  { id: 2, description: 'Valve replacement', location: 'East Valley', date: '2023-09-12', status: 'Completed' },
  { id: 3, description: 'Dam cleaning', location: 'South Plateau', date: '2023-09-15', status: 'Planned' }
];
if (typeof window !== 'undefined') {
  window.demoData = { demoResources, demoConsumption, demoComplaints, demoMaintenance };
}
