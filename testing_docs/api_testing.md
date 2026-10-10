# API Testing

This document details the REST endpoints tested, their methods, expected payloads, and responses.

## Distribution Service (`/api/distribution`)

### 1. GET `/zones`
- **Description**: Retrieves all supply zones.
- **Response**: `200 OK`, JSON array of `SupplyZone`.

### 2. POST `/zones`
- **Description**: Creates a new supply zone.
- **Request Payload**: 
  ```json
  {
    "name": "North Zone",
    "region": "Region A",
    "populationServed": 5000
  }
  ```
- **Response**: `200 OK`, Created `SupplyZone` object.

### 3. POST `/requests`
- **Description**: Submits a water supply request.
- **Request Payload**:
  ```json
  {
    "zoneId": 1,
    "volumeRequested": 500.0,
    "requestType": "REGULAR"
  }
  ```
- **Response**: `200 OK`, returns request with default status `PENDING` and current timestamp.
- **Negative Test**: Invalid JSON payload returns `400 Bad Request`.

### 4. PATCH `/requests/{id}/status`
- **Description**: Updates request status.
- **Query Param**: `status=APPROVED`
- **Response**: `200 OK`
- **Negative Test**: ID not found returns `404 Not Found`.

## Water Resource Service (`/api/resources`)

### 1. GET `/`
- **Description**: Retrieves all water resources.
- **Response**: `200 OK`, JSON array.

### 2. GET `/{id}/availability`
- **Description**: Gets the available capacity for a resource.
- **Response**: `200 OK`, Double value.
- **Negative Test**: Non-existent ID returns `404 Not Found`.

### 3. POST `/`
- **Description**: Creates a new resource.
- **Request Payload**:
  ```json
  {
    "name": "Lake X",
    "type": "LAKE",
    "totalCapacity": 10000.0,
    "currentLevel": 8000.0
  }
  ```
- **Negative Test**: Missing required `@Valid` fields (if constraints are added) returns `400 Bad Request`.
