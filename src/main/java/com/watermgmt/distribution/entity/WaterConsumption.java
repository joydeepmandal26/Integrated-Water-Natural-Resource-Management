package com.watermgmt.distribution.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "water_consumptions")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class WaterConsumption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long zoneId;

    @Column(nullable = false)
    private String category;

    private Double consumptionLiters;
    private LocalDate recordDate;
    private String consumerIdentifier;
}