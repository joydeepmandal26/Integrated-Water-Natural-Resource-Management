// frontend/js/api.js

/**
 * Simple wrapper around fetch that respects demo mode.
 * In DEMO_MODE we return static sample data after a short delay
 * to simulate network latency.
 */

function apiRequest(arg1, arg2, arg3) {
  // Support two signatures:
  // 1. apiRequest(path, options) – existing usage
  // 2. apiRequest(method, path, options) – used in resources.js, etc.
  let path, options;
  if (arg1 && typeof arg1 === 'string' && arg1.startsWith('/')) {
    // signature (path, options)
    path = arg1;
    options = arg2 || {};
  } else {
    // signature (method, path, options)
    const method = arg1 || 'GET';
    path = arg2 || '';
    options = arg3 || {};
    options = Object.assign({ method }, options);
  }
  const url = `${CONFIG.API_BASE_URL}${path}`;
  const fetchOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  if (CONFIG.DEMO_MODE) {
    if (typeof window.demoData === 'undefined') {
      console.warn('Demo data not loaded; ensure demoData.js is included before api.js');
      return Promise.reject(new Error('Demo data not loaded'));
    }
    // Map API paths to demo data
    const dataMap = {
      '/api/resources': window.demoData.demoResources,
      '/api/consumption': window.demoData.demoConsumption,
      '/api/complaints': window.demoData.demoComplaints,
      '/api/maintenance': window.demoData.demoMaintenance,
    };
// Handle POST to complaints (create new complaint)
if (path === '/api/complaints' && options && options.method === 'POST') {
  // Parse payload
  let payload = {};
  try { payload = JSON.parse(options.body || '{}'); } catch (e) { }
  const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const trackingId = `CMP-${date.replace(/-/g, '')}-${Math.floor(1000 + Math.random()*9000)}`;
  const newComplaint = {
    id: trackingId,
    date,
    location: payload.location || '',
    category: payload.category || '',
    status: 'Pending',
    ...payload
  };
  // Push into demo data array
  if (window.demoData && Array.isArray(window.demoData.demoComplaints)) {
    window.demoData.demoComplaints.push(newComplaint);
  }
  return new Promise(resolve => {
    setTimeout(() => resolve({ ok: true, json: () => Promise.resolve({ id: trackingId }) }), 300);
  });
}

// Handle POST to maintenance
if (path === '/api/maintenance' && options && options.method === 'POST') {
  let payload = {};
  try { payload = JSON.parse(options.body || '{}'); } catch (e) { }
  if (window.demoData && Array.isArray(window.demoData.demoMaintenance)) {
    const newId = window.demoData.demoMaintenance.length ? Math.max(...window.demoData.demoMaintenance.map(m => m.id)) + 1 : 1;
    const newRecord = { id: newId, ...payload };
    window.demoData.demoMaintenance.push(newRecord);
  }
  return new Promise(resolve => setTimeout(() => resolve({ ok: true, json: () => Promise.resolve({}) }), 300));
}

// Handle POST to resources
if (path === '/api/resources' && options && options.method === 'POST') {
  let payload = {};
  try { payload = JSON.parse(options.body || '{}'); } catch (e) { }
  if (window.demoData && Array.isArray(window.demoData.demoResources)) {
    const newId = window.demoData.demoResources.length ? Math.max(...window.demoData.demoResources.map(r => r.id)) + 1 : 1;
    const newResource = { id: newId, status: 'Good', level: payload.capacity, ...payload };
    window.demoData.demoResources.push(newResource);
  }
  return new Promise(resolve => setTimeout(() => resolve({ ok: true, json: () => Promise.resolve({}) }), 300));
}

// Handle DELETE
if (options && options.method === 'DELETE') {
  if (path.startsWith('/api/maintenance/')) {
     const id = parseInt(path.split('/').pop(), 10);
     if (window.demoData && Array.isArray(window.demoData.demoMaintenance)) {
       window.demoData.demoMaintenance = window.demoData.demoMaintenance.filter(m => m.id !== id);
     }
  } else if (path.startsWith('/api/resources/')) {
     const id = parseInt(path.split('/').pop(), 10);
     if (window.demoData && Array.isArray(window.demoData.demoResources)) {
       window.demoData.demoResources = window.demoData.demoResources.filter(r => r.id !== id);
     }
  }
  return new Promise(resolve => setTimeout(() => resolve({ ok: true, json: () => Promise.resolve({}) }), 300));
}

// Handle PUT (Edit)
if (options && options.method === 'PUT') {
  let payload = {};
  try { payload = JSON.parse(options.body || '{}'); } catch (e) { }
  if (path.startsWith('/api/maintenance/')) {
     const id = parseInt(path.split('/').pop(), 10);
     if (window.demoData && Array.isArray(window.demoData.demoMaintenance)) {
       const idx = window.demoData.demoMaintenance.findIndex(m => m.id === id);
       if (idx !== -1) window.demoData.demoMaintenance[idx] = { ...window.demoData.demoMaintenance[idx], ...payload };
     }
  } else if (path.startsWith('/api/resources/')) {
     const id = parseInt(path.split('/').pop(), 10);
     if (window.demoData && Array.isArray(window.demoData.demoResources)) {
       const idx = window.demoData.demoResources.findIndex(r => r.id === id);
       if (idx !== -1) window.demoData.demoResources[idx] = { ...window.demoData.demoResources[idx], ...payload };
     }
  }
  return new Promise(resolve => setTimeout(() => resolve({ ok: true, json: () => Promise.resolve({}) }), 300));
}
    // Determine response data based on path
    let respData = dataMap[path];
    if (!respData && path.startsWith('/api/complaints/')) {
      const id = path.split('/').pop();
      respData = window.demoData.demoComplaints.find(c => c.id === id) || { error: 'Not found' };
    }
    // Default to empty array/object if undefined
    if (typeof respData === 'undefined') respData = [];
    // Simulate async response
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ ok: true, json: () => Promise.resolve(respData) });
      }, 300);
    });
  }

  return fetch(url, fetchOptions);
}
// Duplicate API block removed – logic handled above

// Minimal mock data for demo mode. Extend as needed.
function mockData(path, options) {
  // Dashboard related endpoints
  if (path === '/api/resources') {
    return [
      { id: 1, name: 'Ganges River', location: 'Haridwar Basin', type: 'River', capacity: 1200, level: 900, status: 'Good' },
      { id: 2, name: 'Chilika Lake', location: 'Odisha Coast', type: 'Lake', capacity: 2000, level: 1500, status: 'Fair' },
    ];
  }
  if (path === '/api/consumption') {
    const resources = mockData('/api/resources');
    return {
      totalResources: resources.length,
      totalCapacity: 3200,
      availableWater: 2400,
      dailyConsumption: 180,
      consumptionTrend: [
        { date: '2023-09-01', value: 150 },
        { date: '2023-09-02', value: 160 },
        { date: '2023-09-03', value: 170 },
        { date: '2023-09-04', value: 180 },
        { date: '2023-09-05', value: 190 },
      ],
      distribution: [
        { name: 'Ganges River', value: 900 },
        { name: 'Chilika Lake', value: 1500 },
      ],
    };
  }
  if (path === '/api/complaints') {
    if (options && options.method === 'POST') {
      // mock creation, return a generated tracking ID
      return { id: 'C' + Math.floor(Math.random() * 1000).toString().padStart(3, '0') };
    }
    return [
      { id: 'C001', date: '2023-09-04', location: 'Delhi NCR', category: 'Leak', status: 'Pending' },
      { id: 'C002', date: '2023-09-03', location: 'Chennai South', category: 'Contamination', status: 'Resolved' },
    ];
  }
// Complaint lookup by ID
if (path.startsWith('/api/complaints/')) {
  const id = path.split('/').pop();
  const complaints = mockData('/api/complaints');
  return complaints.find(c => c.id === id) || { error: 'Not found' };
}
// Maintenance mock data
if (path === '/api/maintenance') {
  return [
    { id: 1, description: 'Pump inspection', location: 'Haridwar Basin', date: '2023-09-10', status: 'Scheduled' },
    { id: 2, description: 'Valve replacement', location: 'Odisha Coast', date: '2023-09-12', status: 'Completed' },
  ];
}
// Default empty array/object
return [];
}

window.apiRequest = apiRequest;
