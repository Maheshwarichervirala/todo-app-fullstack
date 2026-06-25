package com.example.demo.todoapp.model;

public class Todo {

    private Integer id;
    private String task;

    public Todo() {
    }

    public Todo(Integer id, String task) {
        this.id = id;
        this.task = task;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
    }
}