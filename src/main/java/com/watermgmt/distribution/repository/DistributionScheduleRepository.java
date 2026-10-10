package com.watermgmt.distribution.repository;

import com.watermgmt.distribution.entity.DistributionSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DistributionScheduleRepository extends JpaRepository<DistributionSchedule, Long> {
    List<DistributionSchedule> findByZoneId(Long zoneId);
    List<DistributionSchedule> findByStatus(String status);
}