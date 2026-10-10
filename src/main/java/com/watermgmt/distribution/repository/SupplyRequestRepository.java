package com.watermgmt.distribution.repository;

import com.watermgmt.distribution.entity.SupplyRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SupplyRequestRepository extends JpaRepository<SupplyRequest, Long> {
    List<SupplyRequest> findByStatus(String status);
    List<SupplyRequest> findByUrgency(String urgency);
}