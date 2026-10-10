// demoData.js – centralised mock data for demo mode
const demoResources = [
  { id: 1, name: 'Ganges River', location: 'Haridwar Basin', type: 'River', capacity: 1200, level: 900, status: 'Good' },
  { id: 2, name: 'Chilika Lake', location: 'Odisha Coast', type: 'Lake', capacity: 2000, level: 1500, status: 'Fair' },
  { id: 3, name: 'Sardar Sarovar Dam', location: 'Narmada Valley', type: 'Reservoir', capacity: 3000, level: 2500, status: 'Excellent' }
];

const demoConsumption = {
  totalResources: 3,
  totalCapacity: 6200,
  availableWater: 4900,
  dailyConsumption: 210,
  consumptionTrend: [
    { date: '2023-09-01', value: 150, location: 'Haridwar Basin' },
    { date: '2023-09-02', value: 160, location: 'Odisha Coast' },
    { date: '2023-09-03', value: 170, location: 'Narmada Valley' },
    { date: '2023-09-04', value: 180, location: 'Haridwar Basin' },
    { date: '2023-09-05', value: 190, location: 'Odisha Coast' },
    { date: '2023-09-06', value: 210, location: 'Narmada Valley' }
  ],
  distribution: [
    { name: 'Ganges River', value: 900 },
    { name: 'Chilika Lake', value: 1500 },
    { name: 'Sardar Sarovar Dam', value: 2500 }
  ]
};

const demoComplaints = [
  { id: 'C001', date: '2023-09-04', location: 'Delhi NCR', category: 'Leak', status: 'Pending' },
  { id: 'C002', date: '2023-09-03', location: 'Chennai South', category: 'Contamination', status: 'Resolved' },
  { id: 'C003', date: '2023-09-02', location: 'Kolkata East', category: 'Overflow', status: 'Pending' }
];

const demoMaintenance = [
  { id: 1, description: 'Pump inspection', location: 'Haridwar Basin', date: '2023-09-10', status: 'Scheduled' },
  { id: 2, description: 'Valve replacement', location: 'Odisha Coast', date: '2023-09-12', status: 'Completed' },
  { id: 3, description: 'Dam cleaning', location: 'Narmada Valley', date: '2023-09-15', status: 'Planned' }
];
if (typeof window !== 'undefined') {
  const savedData = localStorage.getItem('waterMgmtDemoData');
  if (savedData) {
    try {
      window.demoData = JSON.parse(savedData);
    } catch (e) {
      window.demoData = { demoResources, demoConsumption, demoComplaints, demoMaintenance };
    }
  } else {
    window.demoData = { demoResources, demoConsumption, demoComplaints, demoMaintenance };
  }
}
