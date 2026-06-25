package com.example.demo.todoapp.controller;

import com.example.demo.todoapp.model.Todo;
import com.example.demo.todoapp.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todos")
@CrossOrigin("*")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @GetMapping
    public List<Todo> getTodos() {
        return todoService.getAllTodos();
    }

    @PostMapping
    public Todo addTodo(@RequestBody Todo todo) {

        return todoService.addTodo(todo);
    }

    @PutMapping("/{id}")
    public Todo updateTodo(
            @PathVariable Integer id,
            @RequestBody Todo updatedTodo) {

        return todoService.updateTodo(id, updatedTodo);
    }

    @DeleteMapping("/{id}")
    public String deleteTodo(
            @PathVariable Integer id) {

        todoService.deleteTodo(id);

        return "Todo Deleted Successfully";
    }
}