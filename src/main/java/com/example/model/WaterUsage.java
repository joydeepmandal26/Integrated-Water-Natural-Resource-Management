package com.example.model;
import jakarta.persistence.*;
import lombok.Data;
@Entity
@Data
public class WaterUsage {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String usageType; // domestic, agricultural, industrial, institutional
    private Double consumptionAmount;
}
