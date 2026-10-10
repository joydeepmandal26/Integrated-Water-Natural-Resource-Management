package com.example.model;
import jakarta.persistence.*;
import lombok.Data;
@Entity
@Data
public class WaterAvailability {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double waterLevel;
    private Double inflow;
    private Double outflow;
    private Double availableCapacity;
}
