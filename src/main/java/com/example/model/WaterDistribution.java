package com.example.model;
import jakarta.persistence.*;
import lombok.Data;
@Entity
@Data
public class WaterDistribution {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String distributionSchedule;
    private String supplyZone;
    private String pipelineId;
    private String supplyRequestDetails;
}
