package com.watermgmt.distribution.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "supply_zones")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class SupplyZone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String zoneCode;

    private String zoneName;
    private Double dailyAllocatedQuotaLiters;
    private Double currentAllocationLiters;
    private String status; // ACTIVE, RESTRICTED, CRITICAL
}