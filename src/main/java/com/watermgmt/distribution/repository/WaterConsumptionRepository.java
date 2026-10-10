package com.watermgmt.distribution.repository;

import com.watermgmt.distribution.entity.WaterConsumption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface WaterConsumptionRepository extends JpaRepository<WaterConsumption, Long> {
    List<WaterConsumption> findByZoneId(Long zoneId);
    List<WaterConsumption> findByCategory(String category);
}