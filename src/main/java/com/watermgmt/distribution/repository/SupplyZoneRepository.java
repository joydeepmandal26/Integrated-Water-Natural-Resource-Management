package com.watermgmt.distribution.repository;

import com.watermgmt.distribution.entity.SupplyZone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface SupplyZoneRepository extends JpaRepository<SupplyZone, Long> {

    Optional<SupplyZone> findByZoneCode(String zoneCode);
}