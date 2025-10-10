package org.example.blogsakura_java.controller;

import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.example.blogsakura_java.pojo.ViewRequest;
import org.example.blogsakura_java.service.ViewService;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
public class ViewController {

    @Resource
    private ViewService viewService;

    @GetMapping("/article/views/{id}")
    public Long getViews(@PathVariable String id) {
        return viewService.getViews(id);
    }

    @PutMapping("/article/views/{id}")
    public void updateViews(@PathVariable String id, @RequestBody ViewRequest viewRequest) {
        viewService.updateViews(id, viewRequest.getView());
    }
}
