package com.example.demo.todoapp.service;

import com.example.demo.todoapp.model.Todo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TodoService {

    private List<Todo> todos = new ArrayList<>();

    private int idCounter = 1;

    public List<Todo> getAllTodos() {
        return todos;
    }

    public Todo addTodo(Todo todo) {

        todo.setId(idCounter++);

        todos.add(todo);

        return todo;
    }

    public Todo updateTodo(Integer id, Todo updatedTodo) {

        for (Todo todo : todos) {

            if (todo.getId().equals(id)) {

                todo.setTask(updatedTodo.getTask());

                return todo;
            }
        }

        return null;
    }

    public void deleteTodo(Integer id) {

        todos.removeIf(todo ->
                todo.getId().equals(id));
    }
}