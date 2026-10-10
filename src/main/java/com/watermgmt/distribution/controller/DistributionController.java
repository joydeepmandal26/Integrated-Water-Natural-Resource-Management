package com.watermgmt.distribution.controller;

import com.watermgmt.distribution.entity.*;
import com.watermgmt.distribution.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/distribution")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DistributionController {

    private final SupplyZoneRepository zoneRepo;
    private final WaterConsumptionRepository consumptionRepo;
    private final DistributionScheduleRepository scheduleRepo;
    private final SupplyRequestRepository requestRepo;


    @GetMapping("/zones")
    public List<SupplyZone> getAllZones() {
        return zoneRepo.findAll();
    }

    @PostMapping("/zones")
    public SupplyZone createZone(@RequestBody SupplyZone zone) {
        return zoneRepo.save(zone);
    }

    @GetMapping("/consumption")
    public List<WaterConsumption> getConsumption(@RequestParam(required = false) Long zoneId) {
        return (zoneId != null) ? consumptionRepo.findByZoneId(zoneId) : consumptionRepo.findAll();
    }

    @PostMapping("/consumption")
    public WaterConsumption logConsumption(@RequestBody WaterConsumption consumption) {
        return consumptionRepo.save(consumption);
    }

    @GetMapping("/schedules")
    public List<DistributionSchedule> getSchedules(@RequestParam(required = false) Long zoneId) {
        return (zoneId != null) ? scheduleRepo.findByZoneId(zoneId) : scheduleRepo.findAll();
    }

    @PostMapping("/schedules")
    public DistributionSchedule createSchedule(@RequestBody DistributionSchedule schedule) {
        return scheduleRepo.save(schedule);
    }

    @GetMapping("/requests")
    public List<SupplyRequest> getRequests(@RequestParam(required = false) String status) {
        return (status != null) ? requestRepo.findByStatus(status) : requestRepo.findAll();
    }

    @PostMapping("/requests")
    public SupplyRequest submitRequest(@RequestBody SupplyRequest request) {
        if (request.getRequestTimestamp() == null) {
            request.setRequestTimestamp(LocalDateTime.now());
        }
        if (request.getStatus() == null) {
            request.setStatus("PENDING");
        }
        return requestRepo.save(request);
    }

    @PatchMapping("/requests/{id}/status")
    public ResponseEntity<SupplyRequest> updateRequestStatus(@PathVariable Long id, @RequestParam String status) {
        return requestRepo.findById(id).map(req -> {
            req.setStatus(status);
            return ResponseEntity.ok(requestRepo.save(req));
        }).orElse(ResponseEntity.notFound().build());
    }
}