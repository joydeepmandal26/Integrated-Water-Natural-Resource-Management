// maintenance.js – demo mode maintenance schedule handling
import { apiRequest } from './api.js';

const tableBody = document.getElementById('maintenanceTableBody');
const addBtn = document.getElementById('addMaintenanceBtn');

function renderMaintenance(items) {
  tableBody.innerHTML = '';
  items.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.id}</td>
      <td>${item.description}</td>
      <td>${item.location}</td>
      <td>${item.date}</td>
      <td>${item.status}</td>
      <td>
        <button class='btn editBtn' data-id='${item.id}'>Edit</button>
        <button class='btn deleteBtn' data-id='${item.id}'>Delete</button>
      </td>`;
    tableBody.appendChild(tr);
  });
}

function loadMaintenance() {
  apiRequest('GET', '/api/maintenance')
    .then(res => res.json())
    .then(data => renderMaintenance(data))
    .catch(err => console.error('Failed to load maintenance', err));
}

addBtn?.addEventListener('click', () => {
  const description = prompt('Description');
  const location = prompt('Location');
  const date = prompt('Date (YYYY-MM-DD)');
  const status = prompt('Status (Scheduled/Completed)');
  if (description && location && date && status) {
    apiRequest('POST', '/api/maintenance', {
      description,
      location,
      date,
      status,
    })
      .then(() => loadMaintenance())
      .catch(err => console.error(err));
  }
});

// Edit / Delete handlers – demo only (no persistence)
tableBody?.addEventListener('click', e => {
  if (e.target.matches('.editBtn')) {
    const id = e.target.dataset.id;
    const newDesc = prompt('New description');
    if (newDesc) {
      apiRequest('PUT', `/api/maintenance/${id}`, { description: newDesc })
        .then(() => loadMaintenance())
        .catch(err => console.error(err));
    }
  } else if (e.target.matches('.deleteBtn')) {
    const id = e.target.dataset.id;
    if (confirm('Delete this entry?')) {
      apiRequest('DELETE', `/api/maintenance/${id}`)
        .then(() => loadMaintenance())
        .catch(err => console.error(err));
    }
  }
});

// Initial load
loadMaintenance();
