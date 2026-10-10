# Setup and Run Tests

## Prerequisites
- Java 21 installed.
- Maven installed (`mvn` command available).
- Access to the Neon PostgreSQL database (configured in `src/main/resources/application.properties`).

## Building the Project
Before running tests, ensure the project compiles:
```bash
mvn clean compile
```

*Note: Currently, the project has compilation errors in `distribution-service` related to Lombok and entity methods (`SupplyRequest`). These must be resolved before proceeding.*

## Running Tests
To execute all JUnit and Spring Boot integration tests across modules:
```bash
mvn test
```

### Running Specific Module Tests
If the project is separated into standard Maven modules, you can use:
```bash
mvn -pl distribution-service test
```
*(Adjust the module name according to your POM structure once finalized).*

## Troubleshooting
- **Missing Symbols (getters/setters)**: Ensure your IDE has Lombok plugin enabled. If using command line, ensure `lombok` dependency is present and annotation processing is enabled in `maven-compiler-plugin`.
- **Database Connection Refused**: Verify that the Neon DB connection strings in `application.properties` are correct and that the remote DB is accessible. Do not hardcode secrets into version control.
