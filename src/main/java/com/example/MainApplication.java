package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = {
    "com.watermgmt", 
    "org.example", 
    "com.quality", 
    "com.example"
})
@EntityScan(basePackages = {
    "com.watermgmt.distribution.entity", 
    "org.example.waterresourceservice.entity"
})
@EnableJpaRepositories(basePackages = {
    "com.watermgmt.distribution.repository", 
    "org.example.waterresourceservice.repository"
})
public class MainApplication {
    public static void main(String[] args) {
        SpringApplication.run(MainApplication.class, args);
    }
}
