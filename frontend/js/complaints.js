// frontend/js/complaints.js

/**
 * Handles complaint form submission.
 * Uses apiRequest from api.js. In DEMO_MODE a mock response
 * with a generated tracking ID is returned.
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('complaintForm');
  const submitBtn = document.getElementById('submitBtn');
  const statusMsg = document.getElementById('statusMsg');
  const demoIndicator = document.getElementById('demoIndicator');

  if (CONFIG.DEMO_MODE) {
    demoIndicator.style.display = 'block';
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Simple front‑end validation
    const required = ['name', 'contact', 'location', 'category', 'priority', 'description'];
    let valid = true;
    required.forEach(id => {
      const el = document.getElementById(id);
      if (!el.value.trim()) {
        el.style.borderColor = 'red';
        valid = false;
      } else {
        el.style.borderColor = '';
      }
    });
    if (!valid) {
      statusMsg.textContent = 'Please fill in all required fields.';
      statusMsg.style.color = 'red';
      return;
    }

    // Disable while processing
    submitBtn.disabled = true;
    statusMsg.textContent = 'Submitting...';
    statusMsg.style.color = '';

    const payload = {
      name: document.getElementById('name').value.trim(),
      contact: document.getElementById('contact').value.trim(),
      location: document.getElementById('location').value.trim(),
      category: document.getElementById('category').value,
      priority: document.getElementById('priority').value,
      description: document.getElementById('description').value.trim(),
    };

    try {
      const response = await apiRequest('/api/complaints', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Network error');
      const result = await response.json();
      // Expect result.trackingId in real API, mock returns id field
      const trackingId = result.trackingId || result.id || 'DEMO-' + Math.floor(Math.random()*10000);
      statusMsg.textContent = 'Submitted! Tracking ID: ' + trackingId;
      statusMsg.style.color = 'green';
      form.reset();
    } catch (err) {
      console.error(err);
      statusMsg.textContent = 'Submission failed. Please try again.';
      statusMsg.style.color = 'red';
    } finally {
      submitBtn.disabled = false;
    }
  });
});
