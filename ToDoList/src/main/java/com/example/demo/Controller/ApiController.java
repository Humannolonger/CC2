package com.example.demo.Controller;

import com.example.demo.Repository.TodoRepository;
import com.example.demo.model.Todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/todos")
public class ApiController {

    @Autowired
    private TodoRepository todoRepository;
    @CrossOrigin(origins = "*")
    @GetMapping("/get")
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }
    @CrossOrigin(origins = "*")
    @PostMapping("/post")
    public Todo createTodo(@RequestBody Todo todo) {
        return todoRepository.save(todo);
    }
    @CrossOrigin(origins = "*")
    @PutMapping("/{id}")
    public Todo updateTodo(@PathVariable Long id, @RequestBody Todo todoData) {
        Todo todo = todoRepository.findById(id).orElseThrow();
        todo.setTitle(todoData.getTitle());
        todo.setCompleted(todoData.isCompleted());
        return todoRepository.save(todo);
    }
    @CrossOrigin(origins = "*")
    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        todoRepository.deleteById(id);
    }
    @CrossOrigin(origins = "*")
    @GetMapping("/{id}")
    public Optional<Todo> getById(@PathVariable long id) {
    	return todoRepository.findById(id);
    }
}
