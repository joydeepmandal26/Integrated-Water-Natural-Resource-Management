# Database Testing

## Overview
The project uses PostgreSQL hosted on **Neon**. Database testing ensures correct schema generation, table relationships, constraint enforcement, and query performance via Spring Data JPA.

## Connection Details
- **Database**: PostgreSQL (Neon)
- **Configuration**: Managed via `application.properties` using standard Spring `spring.datasource.url`.
- *Note: No secrets or credentials are exposed in this document.*

## Test Scenarios

### 1. Connection Validation
- **Objective**: Verify application successfully connects to Neon DB on startup.
- **Expected**: Spring Boot startup logs `HikariPool - Starting...` without exceptions.

### 2. Schema Generation
- **Objective**: Ensure entities like `WaterResource`, `SupplyZone`, and `SupplyRequest` generate correct tables.
- **Expected**: Tables contain Primary Keys, auto-increment strategies (`GenerationType.IDENTITY`), and foreign key constraints where applicable.

### 3. CRUD Persistence
- **Objective**: Verify that objects saved via Repositories persist exactly as intended.
- **Expected**: saving a `WaterResource` successfully records its `totalCapacity` and `currentLevel` in the correct types.

## Execution Status
**Blocked**: Application currently fails to compile, so JPA persistence tests and context startup cannot be executed locally.
