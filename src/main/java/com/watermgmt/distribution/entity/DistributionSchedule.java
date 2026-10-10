package com.watermgmt.distribution.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "distribution_schedules")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class DistributionSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long zoneId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Double targetDischargeLiters;
    private String status; // givr any 4 of these - SCHEDULED, IN_PROGRESS, COMPLETED, CANCELLED
}