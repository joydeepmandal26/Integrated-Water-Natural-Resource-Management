# Integration Testing

## Overview
Integration tests verify that different microservices in the Integrated Water & Natural Resource Management project communicate correctly, handle errors gracefully, and process end-to-end workflows.

## Modules Tested
1. **API Gateway** to Microservices
2. **Distribution Service** with **Water Resource Service**
3. Frontend Integration with Backend APIs

## End-to-End Workflow Scenarios

### Scenario 1: Complete Supply Request Fulfillment
- **Step 1**: Frontend submits a new Supply Request to `/api/distribution/requests`.
- **Step 2**: Distribution Service registers the request (PENDING).
- **Step 3**: Distribution Service checks Water Resource Service for availability.
  - *Note: In current implementation, inter-service API call is not fully implemented.*
- **Expected Outcome**: Request should be registered, but full automated checking is pending verification.

### Scenario 2: Error Handling (Service Down)
- **Action**: Call Gateway `/api/distribution` when Distribution Service is stopped.
- **Expected Outcome**: Gateway should return `503 Service Unavailable` or gracefully fallback.

## Status
All integration tests are **Blocked** currently due to compilation failures in the core `distribution-service` entity layer.
