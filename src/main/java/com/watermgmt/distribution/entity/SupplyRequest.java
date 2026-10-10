package com.watermgmt.distribution.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "supply_requests")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class SupplyRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long zoneId;
    private String requestedBy;
    private Double requestedQuantityLiters;
    private String urgency; // choose any frm - LOW, MEDIUM, HIGH, EMERGENCY
    private String reason;
    private String status; // choose any frm PENDING, APPROVED, REJECTED, FULFILLED
    private LocalDateTime requestTimestamp;
}