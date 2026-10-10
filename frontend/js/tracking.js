// tracking.js – demo mode complaint ID lookup and display
// No import needed – apiRequest is attached to window

const trackBtn = document.getElementById('trackBtn');
const trackInput = document.getElementById('trackId');
const resultDiv = document.getElementById('trackingResult');

function renderResult(data) {
  if (data.error) {
    resultDiv.innerHTML = `<p style='color:red;'>${data.error}</p>`;
    return;
  }
  const { id, date, location, category, status } = data;
  resultDiv.innerHTML = `
    <h3>Complaint ${id}</h3>
    <ul>
      <li><strong>Date:</strong> ${date}</li>
      <li><strong>Location:</strong> ${location}</li>
      <li><strong>Category:</strong> ${category}</li>
      <li><strong>Status:</strong> ${status}</li>
    </ul>
  `;
}

function trackComplaint() {
  const id = trackInput.value.trim();
  if (!id) {
    resultDiv.innerHTML = `<p style='color:red;'>Please enter a tracking ID.</p>`;
    return;
  }
  apiRequest('GET', `/api/complaints/${id}`)
    .then(res => res.json())
    .then(data => renderResult(data))
    .catch(err => {
      console.error('Tracking error', err);
      resultDiv.innerHTML = `<p style='color:red;'>Failed to fetch complaint.</p>`;
    });
}

trackBtn?.addEventListener('click', trackComplaint);
