package org.example.waterresourceservice.repository;

import org.example.waterresourceservice.entity.WaterResource;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WaterResourceRepository extends JpaRepository<WaterResource, Long> {
}