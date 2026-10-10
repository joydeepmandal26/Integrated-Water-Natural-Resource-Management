package com.example.model;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
@Entity
@Data
public class WaterQuality {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String parameters;
    private String inspectionResults;
    private LocalDate testingDate;
    private String complianceStatus;
}
