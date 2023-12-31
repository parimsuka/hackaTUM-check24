package com.demo.web;

import com.demo.model.Todo;
import com.demo.service.TodoService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/v1/todos", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class TodoController {

    private static final String ID_PATH = "/{id}";

    private final TodoService todoService;

    @PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Todo create(@Valid @RequestBody Todo todo) {
        return todoService.createTodo(todo);
    }

    @GetMapping(ID_PATH)
    public ResponseEntity<?> getById(@PathVariable String id) {
        // NotFoundApiException will be handled by GlobalErrorHandler:
        return ResponseEntity.ok(todoService.getById(id));
    }

    @GetMapping("")
    public Page<Todo> findTodos(@RequestParam(required = false) String label,
                                Pageable pageable) {
        return StringUtils.hasText(label)
                ? todoService.findByLabel(label, pageable)
                : todoService.findAll(pageable);
    }

    @DeleteMapping(ID_PATH)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void deleteById(@PathVariable String id) {
        todoService.deleteById(id);
    }

}
