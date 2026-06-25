package com.example.demo;

import com.example.demo.entity.Todo;
import com.example.demo.repository.TodoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner loadData(TodoRepository repo) {
        return args -> {
            repo.save(new Todo(1L, "Learn Spring Boot"));
            repo.save(new Todo(2L, "Learn H2 Database"));
        };
    }
}