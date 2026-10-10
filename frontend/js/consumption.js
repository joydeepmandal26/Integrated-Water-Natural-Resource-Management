// consumption.js – demo mode chart and table rendering

const ctx = document.getElementById('consumptionChart')?.getContext('2d');
let chartInstance = null;
const tableBody = document.getElementById('consumptionTableBody');
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');
const locationInput = document.getElementById('locationFilter');
const applyBtn = document.getElementById('applyFilter');

function renderChart(trendData) {
  const labels = trendData.map(d => d.date);
  const values = trendData.map(d => d.value);
  if (chartInstance) chartInstance.destroy();
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Daily Consumption (m³)',
        data: values,
        borderColor: 'var(--accent-color)',
        backgroundColor: 'rgba(0,204,102,0.2)',
        fill: true,
      }],
    },
    options: {
      responsive: true,
      scales: {
        x: { display: true },
        y: { beginAtZero: true },
      },
    },
  });
}

function renderTable(trendData) {
  tableBody.innerHTML = '';
  trendData.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${row.date}</td><td>${row.location || 'N/A'}</td><td>${row.value}</td>`;
    tableBody.appendChild(tr);
  });
}

function loadAndRender() {
  apiRequest('GET', '/api/consumption')
    .then(res => res.json())
    .then(data => {
      let trend = data.consumptionTrend || [];
      const start = startInput?.value;
      const end = endInput?.value;
      const loc = locationInput?.value?.trim();
      if (start) trend = trend.filter(r => r.date >= start);
      if (end) trend = trend.filter(r => r.date <= end);
      if (loc) trend = trend.filter(r => (r.location || '').toLowerCase().includes(loc.toLowerCase()));
      renderChart(trend);
      renderTable(trend);
    })
    .catch(err => console.error('Failed to load consumption data', err));
}

applyBtn?.addEventListener('click', loadAndRender);
// Initial load
loadAndRender();
