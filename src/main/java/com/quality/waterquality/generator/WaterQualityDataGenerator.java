
package com.quality.waterquality.generator;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Random;

@Component
@ConditionalOnProperty(
        name = "app.generate-demo-data",
        havingValue = "true"
)
public class WaterQualityDataGenerator implements CommandLineRunner {

    private final JdbcTemplate jdbcTemplate;
    private final Random random = new Random();

    // Constructor: Spring provides the database connection helper.
    public WaterQualityDataGenerator(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    @Transactional
    public void run(String... args) {
        System.out.println("Starting random data generation...");

        generateData();

        System.out.println("Random data inserted successfully!");
    }

    private void generateData() {

        // Create two facilities.
        for (int i = 1; i <= 2; i++) {

            Long facilityId = jdbcTemplate.queryForObject(
                    "INSERT INTO water_quality_user.facilities " +
                            "(name, location, facility_type, status) " +
                            "VALUES (?, ?, ?, ?) RETURNING facility_id",
                    Long.class,
                    "Water Treatment Plant " + i,
                    randomLocation(),
                    "TREATMENT_PLANT",
                    "ACTIVE"
            );

            // Create two infrastructure items for each facility.
            for (int j = 1; j <= 2; j++) {

                String type;

                if (j == 1) {
                    type = "PUMP";
                } else {
                    type = "PIPELINE";
                }

                Long infrastructureId = jdbcTemplate.queryForObject(
                        "INSERT INTO water_quality_user.infrastructure " +
                                "(facility_id, name, infrastructure_type, " +
                                "installation_date, status) " +
                                "VALUES (?, ?, ?, ?, ?) RETURNING infrastructure_id",
                        Long.class,
                        facilityId,
                        type + " " + i + "-" + j,
                        type,
                        LocalDate.now().minusDays(random.nextInt(1000)),
                        "OPERATIONAL"
                );

                // Create a fault for this infrastructure.
                Long faultId = generateFault(infrastructureId);

                // Create an inspection.
                generateInspection(infrastructureId);

                // Create a maintenance record.
                generateMaintenance(infrastructureId, faultId);
            }

            // Create three water quality readings per facility.
            for (int k = 1; k <= 3; k++) {
                generateWaterQualityRecord(facilityId);
            }
        }
    }

    private void generateWaterQualityRecord(Long facilityId) {

        double ph = randomDouble(6.0, 9.0);
        double turbidity = randomDouble(0.1, 5.0);
        double oxygen = randomDouble(4.0, 10.0);
        double temperature = randomDouble(18.0, 35.0);
        double conductivity = randomDouble(100.0, 1000.0);
        double chlorine = randomDouble(0.1, 2.0);

        String compliance;

        if (ph >= 6.5 && ph <= 8.5 && turbidity <= 1.0) {
            compliance = "COMPLIANT";
        } else {
            compliance = "NON_COMPLIANT";
        }

        jdbcTemplate.update(
                "INSERT INTO water_quality_user.water_quality_records " +
                        "(facility_id, ph, turbidity, dissolved_oxygen, " +
                        "temperature, conductivity, residual_chlorine, " +
                        "compliance_status, remarks) " +
                        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                facilityId,
                ph,
                turbidity,
                oxygen,
                temperature,
                conductivity,
                chlorine,
                compliance,
                "Randomly generated test reading"
        );
    }

    private Long generateFault(Long infrastructureId) {

        String[] severities = {
                "LOW", "MEDIUM", "HIGH", "CRITICAL"
        };

        String[] statuses = {
                "OPEN", "IN_PROGRESS", "RESOLVED"
        };

        String severity = severities[random.nextInt(severities.length)];
        String status = statuses[random.nextInt(statuses.length)];

        return jdbcTemplate.queryForObject(
                "INSERT INTO water_quality_user.faults " +
                        "(infrastructure_id, description, severity, status) " +
                        "VALUES (?, ?, ?, ?) RETURNING fault_id",
                Long.class,
                infrastructureId,
                "Randomly generated equipment fault",
                severity,
                status
        );
    }

    private void generateInspection(Long infrastructureId) {

        String[] statuses = {
                "SCHEDULED", "IN_PROGRESS", "COMPLETED"
        };

        String status = statuses[random.nextInt(statuses.length)];

        jdbcTemplate.update(
                "INSERT INTO water_quality_user.inspections " +
                        "(infrastructure_id, inspector_name, findings, " +
                        "status, next_inspection_date) " +
                        "VALUES (?, ?, ?, ?, ?)",
                infrastructureId,
                randomInspector(),
                "Routine equipment inspection",
                status,
                LocalDate.now().plusDays(30)
        );
    }

    private void generateMaintenance(
            Long infrastructureId, Long faultId) {

        String[] types = {"PREVENTIVE", "REPAIR"};

        String[] statuses = {
                "PLANNED", "IN_PROGRESS", "COMPLETED"
        };

        String type = types[random.nextInt(types.length)];
        String status = statuses[random.nextInt(statuses.length)];
        double cost = randomDouble(500.0, 10000.0);

        jdbcTemplate.update(
                "INSERT INTO water_quality_user.maintenance_records " +
                        "(infrastructure_id, fault_id, maintenance_type, " +
                        "description, scheduled_date, cost, status) " +
                        "VALUES (?, ?, ?, ?, ?, ?, ?)",
                infrastructureId,
                faultId,
                type,
                "Randomly generated maintenance activity",
                LocalDate.now().plusDays(random.nextInt(30)),
                cost,
                status
        );
    }

    private double randomDouble(double min, double max) {
        return Math.round(
                (min + random.nextDouble() * (max - min)) * 100.0
        ) / 100.0;
    }

    private String randomLocation() {

        String[] locations = {
                "Vellore",
                "Chennai",
                "Bengaluru",
                "Coimbatore",
                "Tirupati"
        };

        return locations[random.nextInt(locations.length)];
    }

    private String randomInspector() {

        String[] names = {
                "Arun Kumar",
                "Priya Sharma",
                "Rahul Verma",
                "Ananya Rao",
                "Karthik Raj"
        };

        return names[random.nextInt(names.length)];
    }
}
