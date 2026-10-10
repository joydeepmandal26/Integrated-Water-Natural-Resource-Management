// frontend/js/dashboard.js

/**
 * Dashboard initialization script.
 * Fetches consumption and resource data, updates summary cards,
 * renders Chart.js visualizations and populates recent complaints table.
 */

document.addEventListener('DOMContentLoaded', initDashboard);

function initDashboard() {
  loadSummaryData();
  loadConsumptionChart();
  loadDistributionChart();
  loadRecentComplaints();
}

function loadSummaryData() {
  // For demo we reuse consumption endpoint which provides totals.
  apiRequest('/api/consumption')
    .then(resp => resp.json())
    .then(data => {
      document.getElementById('totalResources').textContent = data.totalResources ?? '--';
      document.getElementById('totalCapacity').textContent = data.totalCapacity ?? '--';
      document.getElementById('availableWater').textContent = data.availableWater ?? '--';
      document.getElementById('dailyConsumption').textContent = data.dailyConsumption ?? '--';
    })
    .catch(err => console.error('Error loading summary:', err));

  // Also fetch complaints to compute pending/resolved counts
  apiRequest('/api/complaints')
    .then(r => r.json())
    .then(complaints => {
      const pending = complaints.filter(c => c.status.toLowerCase() === 'pending').length;
      const resolved = complaints.filter(c => c.status.toLowerCase() === 'resolved').length;
      document.getElementById('pendingComplaints').textContent = pending;
      document.getElementById('resolvedComplaints').textContent = resolved;
    })
    .catch(err => {
      console.error('Error loading complaint counts', err);
      document.getElementById('pendingComplaints').textContent = '--';
      document.getElementById('resolvedComplaints').textContent = '--';
    });
}

function loadConsumptionChart() {
  const ctx = document.getElementById('consumptionChart').getContext('2d');
  apiRequest('/api/consumption')
    .then(r => r.json())
    .then(data => {
      const labels = data.consumptionTrend.map(p => p.date);
      const values = data.consumptionTrend.map(p => p.value);
      new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'Daily Consumption (M³)',
            data: values,
            borderColor: 'var(--primary-color)',
            backgroundColor: 'rgba(0,102,204,0.1)',
            tension: 0.3,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: true } },
        }
      });
    })
    .catch(err => console.error('Consumption chart error', err));
}

function loadDistributionChart() {
  const ctx = document.getElementById('distributionChart').getContext('2d');
  apiRequest('/api/consumption')
    .then(r => r.json())
    .then(data => {
      const labels = data.distribution.map(d => d.name);
      const values = data.distribution.map(d => d.value);
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels,
          datasets: [{
            data: values,
            backgroundColor: ['#0066cc', '#0099aa', '#00cc66', '#88ddff'],
          }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      });
    })
    .catch(err => console.error('Distribution chart error', err));
}

function loadRecentComplaints() {
  const tbody = document.getElementById('complaintsTableBody');
  apiRequest('/api/complaints')
    .then(r => r.json())
    .then(complaints => {
      tbody.innerHTML = '';
      if (complaints.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5">No complaints found.</td></tr>';
        document.getElementById('pendingComplaints').textContent = '0';
        document.getElementById('resolvedComplaints').textContent = '0';
        return;
      }
      let pending = 0, resolved = 0;
      complaints.forEach(c => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${c.id}</td>
          <td>${c.date}</td>
          <td>${c.location}</td>
          <td>${c.category}</td>
          <td>${c.status}</td>
        `;
        tbody.appendChild(tr);
        if (c.status.toLowerCase() === 'pending') pending++;
        else if (c.status.toLowerCase() === 'resolved') resolved++;
      });
      document.getElementById('pendingComplaints').textContent = pending;
      document.getElementById('resolvedComplaints').textContent = resolved;
    })
    .catch(err => {
      console.error('Error loading complaints', err);
      tbody.innerHTML = '<tr><td colspan="5">Failed to load complaints.</td></tr>';
      document.getElementById('pendingComplaints').textContent = '--';
      document.getElementById('resolvedComplaints').textContent = '--';
    });
}
