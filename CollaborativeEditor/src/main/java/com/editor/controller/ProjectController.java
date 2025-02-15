package com.editor.controller;

import com.editor.dto.CollaborativeSessionDto;
import com.editor.entity.Project;
import com.editor.service.ProjectService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@Slf4j
@RequestMapping("/api/v1/project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @PostMapping("/new")
    public Mono<ResponseEntity<?>> createNewProject(@RequestBody Project project) {
        log.info("project : {}", project);
        return projectService.createProject(project)
                .map(ResponseEntity::ok);
    }

    @GetMapping("/{projectId}")
    public Mono<ResponseEntity<?>> updateProject(@PathVariable String projectId) {
        return projectService.getProjectById(projectId)
                .map(ResponseEntity::ok);
    }

    @GetMapping("/all")
    public Mono<ResponseEntity<?>> getAllProjects() {
        return projectService.getAllProjects()
                .collectList()
                .map(ResponseEntity::ok);
    }

    @GetMapping("/user/{userId}")
    public Mono<ResponseEntity<?>> getUserProject(@PathVariable String userId) {
        return projectService.getAllProjectsByUserId(userId)
                .collectList()
                .map(ResponseEntity::ok);
    }

    @PostMapping("/create/colab-session")
    public Mono<ResponseEntity<?>> createColabSession(@RequestBody CollaborativeSessionDto collaborativeSessionDto) {
        return projectService.createColabSession(collaborativeSessionDto)
                .map(ResponseEntity::ok);
    }
}
