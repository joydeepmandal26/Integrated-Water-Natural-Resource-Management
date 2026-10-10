// resources.js – handles displaying, adding, editing, and deleting water resources (demo mode)

const tableBody = document.getElementById('resourceTableBody');
const addBtn = document.getElementById('addBtn');

function renderResources(resources) {
  tableBody.innerHTML = '';
  resources.forEach(res => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${res.id}</td>
      <td>${res.name}</td>
      <td>${res.location || 'N/A'}</td>
      <td>${res.type || 'N/A'}</td>
      <td>${res.capacity} m³</td>
      <td>${res.level || 'N/A'} m³</td>
      <td>${res.status || 'N/A'}</td>
      <td>
        <button class='btn editBtn' data-id='${res.id}'>Edit</button>
        <button class='btn deleteBtn' data-id='${res.id}'>Delete</button>
      </td>`;
    tableBody.appendChild(tr);
  });
}

function loadResources() {
  apiRequest('GET', '/api/resources')
    .then(res => res.json())
    .then(data => renderResources(data))
    .catch(err => console.error('Failed to load resources', err));
}

addBtn?.addEventListener('click', () => {
  const name = prompt('Resource name');
  const location = prompt('Location');
  const type = prompt('Type (e.g., River, Lake, Reservoir)');
  const capacity = prompt('Capacity (m³)');
  const level = prompt('Current Level (m³)');
  const status = prompt('Status (e.g., Good, Fair, Excellent)');
  if (name && capacity) {
    const payload = {
      name,
      location,
      type,
      capacity: Number(capacity),
      level: Number(level) || 0,
      status
    };
    apiRequest('POST', '/api/resources', { body: JSON.stringify(payload) })
      .then(() => loadResources())
      .catch(err => console.error(err));
  }
});

// Delegated event handling for edit/delete (demo only, no persistence)
tableBody?.addEventListener('click', e => {
  if (e.target.matches('.editBtn')) {
    const id = e.target.dataset.id;
    const newName = prompt('New name');
    const newLocation = prompt('New location');
    const newType = prompt('New type');
    const newCapacity = prompt('New capacity (m³)');
    const newLevel = prompt('New level (m³)');
    const newStatus = prompt('New status');
    
    if (newName) {
      const payload = {
        name: newName,
        location: newLocation,
        type: newType,
        capacity: Number(newCapacity),
        level: Number(newLevel),
        status: newStatus
      };
      apiRequest('PUT', `/api/resources/${id}`, { body: JSON.stringify(payload) })
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
