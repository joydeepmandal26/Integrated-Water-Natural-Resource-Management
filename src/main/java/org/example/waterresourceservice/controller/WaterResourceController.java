package org.example.waterresourceservice.controller;

import jakarta.validation.Valid;
import org.example.waterresourceservice.entity.WaterResource;
import org.example.waterresourceservice.service.WaterResourceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resources")
public class WaterResourceController {

    private final WaterResourceService service;

    public WaterResourceController(WaterResourceService service) {
        this.service = service;
    }

    @GetMapping
    public List<WaterResource> getAllResources() {
        return service.getAllResources();
    }

    @GetMapping("/{id}")
    public ResponseEntity<WaterResource> getResourceById(@PathVariable Long id) {
        return service.getResourceById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public WaterResource createResource(@Valid @RequestBody WaterResource resource) {
        return service.createResource(resource);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WaterResource> updateResource(
            @PathVariable Long id,
            @Valid @RequestBody WaterResource resource) {

        try {
            return ResponseEntity.ok(service.updateResource(id, resource));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResource(@PathVariable Long id) {
        service.deleteResource(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/{id}/availability")
    public ResponseEntity<Double> getAvailability(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(service.getAvailableCapacity(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

}