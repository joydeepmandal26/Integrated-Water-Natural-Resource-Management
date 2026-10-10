# Test Plan

## 1. Objectives
Ensure the reliability, security, and functionality of the Integrated Water & Natural Resource Management system. Validate REST APIs, PostgreSQL on Neon integration, frontend rendering, and microservice behavior.

## 2. Scope
### In Scope:
- `distribution-service`: Managing supply zones, requests, schedules, and consumption.
- `water-resource-service`: Managing water resource inventory and capacity.
- `quality_maintainance`: Water quality data generation and inspection.
- Frontend HTML/CSS/JS interactions.
- PostgreSQL database persistence (CRUD).

### Out of Scope:
- Authentication (currently omitted in existing implementation).
- Load/stress testing.

## 3. Test Strategy
- **Unit Testing**: JUnit 5 and Mockito for service-level logic.
- **Integration Testing**: Spring Boot Test with embedded H2 or MockMvc for API testing.
- **Manual API Testing**: Verification of REST endpoints using expected payloads.
- **UI Testing**: Manual testing of frontend pages interacting with mock or real local services.

## 4. Environment
- **Java**: 21
- **Framework**: Spring Boot 3.x
- **Build Tool**: Maven
- **Database**: PostgreSQL (Neon)

## 5. Roles
- Developers: Write and execute unit/integration tests.
- Testers: Perform API, Integration, and UI validation.

## 6. Risks and Mitigations
- **Risk**: Neon DB connectivity issues during test runs.
  - *Mitigation*: Ensure local tests use H2 or mocked database layers when disconnected.
- **Risk**: Missing endpoints for certain dashboard features.
  - *Mitigation*: Clearly mark them as "Not implemented" in test cases.

## 7. Entry and Exit Criteria
- **Entry**: Code compiles successfully (`mvn compile`), local database is reachable.
- **Exit**: All unit tests pass, API endpoints respond correctly to valid inputs, critical bugs are resolved.
