# UI Testing

## Overview
The frontend consists of basic HTML, CSS, and JS files located in the `/frontend` directory. It uses JavaScript Fetch API to interact with the backend services.

## Test Areas

### 1. Dashboard (`index.html`)
- **Objective**: Ensure dashboard correctly fetches and displays summary metrics (availability, consumption, quality, complaints).
- **Validation**: Charts render without errors. API endpoints (`/api/resources`, `/api/distribution`) return expected JSON format.

### 2. Complaints Page (`complaints.html`)
- **Objective**: Validate form submission for new complaints.
- **Validation**:
  - Required fields prevent submission if empty.
  - Successful submission displays a success message.
  - API call made to the appropriate endpoint.

### 3. Consumption & Resources (`consumption.html`, `resources.html`)
- **Objective**: Ensure data tables populate accurately from backend.
- **Validation**:
  - Pagination or scrolling works.
  - No undefined or null values displayed improperly.

## Execution Status
**Pending verification**: Requires backend services to be compiled and running. Currently blocked.
