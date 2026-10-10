# Test Cases

## Functional Test Cases

| Case ID | Module | Scenario | Expected Result | Status |
|---|---|---|---|---|
| TC-01 | Water Resource | Create a new water resource | Resource is saved and returns 200 OK | Passed |
| TC-02 | Water Resource | Get availability for valid ID | Returns capacity double | Passed |
| TC-03 | Water Resource | Get availability for invalid ID | Returns 404 Not Found | Passed |
| TC-04 | Distribution | Create new supply zone | Zone is saved successfully | Passed |
| TC-05 | Distribution | Submit supply request without status | Request saved with default PENDING status | Passed |
| TC-06 | Distribution | Update supply request status | Status updated and returned | Passed |
| TC-07 | Water Quality | Access water quality data generator | Endpoint accessible (if applicable) | Not Implemented |
| TC-08 | Complaints | Submit public complaint | Should save complaint | Pending verification |

## Non-Functional Test Cases

| Case ID | Scenario | Expected Result | Status |
|---|---|---|---|
| NFTC-01 | Invalid Payload on POST `/api/resources` | Returns 400 Bad Request | Passed |
| NFTC-02 | Missing required fields in WaterResource | Validation error triggered | Passed |

## End-to-End Illustrative Scenario
**Scenario**: A supply zone has significantly reduced water availability. Test whether authorized staff can retrieve the available resource level, consumption data, affected infrastructure, outstanding maintenance issues, and pending supply requests to support the next distribution cycle.

- **Check Resource Level**: `/api/resources/{id}/availability` (Implemented & Passed)
- **Check Consumption**: `/api/distribution/consumption?zoneId={id}` (Implemented & Passed)
- **Pending Supply Requests**: `/api/distribution/requests?status=PENDING` (Implemented & Passed)
- **Affected Infrastructure / Maintenance**: (Not implemented)
