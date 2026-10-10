package org.example.waterresourceservice.service;

import org.example.waterresourceservice.entity.WaterResource;
import org.example.waterresourceservice.repository.WaterResourceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WaterResourceService {

    private final WaterResourceRepository repository;

    public WaterResourceService(WaterResourceRepository repository) {
        this.repository = repository;
    }

    public List<WaterResource> getAllResources() {
        return repository.findAll();
    }

    public Optional<WaterResource> getResourceById(Long id) {
        return repository.findById(id);
    }

    public double getAvailableCapacity(Long id) {
        WaterResource resource = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resource not found"));

        return resource.getCapacity() - resource.getCurrentLevel();
    }

    public WaterResource createResource(WaterResource resource) {
        return repository.save(resource);
    }

    public WaterResource updateResource(Long id, WaterResource resource) {
        WaterResource existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resource not found"));

        existing.setName(resource.getName());
        existing.setType(resource.getType());
        existing.setLocation(resource.getLocation());
        existing.setCapacity(resource.getCapacity());
        existing.setCurrentLevel(resource.getCurrentLevel());
        existing.setInflow(resource.getInflow());
        existing.setOutflow(resource.getOutflow());

        return repository.save(existing);
    }

    public void deleteResource(Long id) {
        repository.deleteById(id);
    }
}