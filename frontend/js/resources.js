// resources.js – handles displaying, adding, editing, and deleting water resources (demo mode)
import { apiRequest } from './api.js';

const tableBody = document.getElementById('resourceTableBody');
const addBtn = document.getElementById('addBtn');

function renderResources(resources) {
  tableBody.innerHTML = '';
  resources.forEach(res => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${res.id}</td>
      <td>${res.name}</td>
      <td>${res.capacity} m³</td>
      <td>
        <button class='btn editBtn' data-id='${res.id}'>Edit</button>
        <button class='btn deleteBtn' data-id='${res.id}'>Delete</button>
      </td>`;
    tableBody.appendChild(tr);
  });
}

function loadResources() {
  apiRequest('GET', '/api/resources')
    .then(data => renderResources(data))
    .catch(err => console.error('Failed to load resources', err));
}

addBtn?.addEventListener('click', () => {
  const name = prompt('Resource name');
  const capacity = prompt('Capacity (m³)');
  if (name && capacity) {
    apiRequest('POST', '/api/resources', { name, capacity: Number(capacity) })
      .then(() => loadResources())
      .catch(err => console.error(err));
  }
});

// Delegated event handling for edit/delete (demo only, no persistence)
tableBody?.addEventListener('click', e => {
  if (e.target.matches('.editBtn')) {
    const id = e.target.dataset.id;
    const newName = prompt('New name');
    if (newName) {
      apiRequest('PUT', `/api/resources/${id}`, { name: newName })
        .then(() => loadResources())
        .catch(err => console.error(err));
    }
  } else if (e.target.matches('.deleteBtn')) {
    const id = e.target.dataset.id;
    if (confirm('Delete this resource?')) {
      apiRequest('DELETE', `/api/resources/${id}`)
        .then(() => loadResources())
        .catch(err => console.error(err));
    }
  }
});

// Initial load
loadResources();
