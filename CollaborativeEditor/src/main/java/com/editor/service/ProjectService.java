package com.editor.service;


import com.editor.dto.CollaborativeSessionDto;
import com.editor.dto.ProjectDto;
import com.editor.entity.Project;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ProjectService {

    public Mono<ProjectDto> createProject(Project project);
    public Flux<ProjectDto> getAllProjectsByUserId(String userId);
    public Flux<ProjectDto> getAllProjects();
    public Mono<ProjectDto> getProjectById(String projectId);
    public Mono<Void> updateProjectContent(String projectId, String content);
    public Flux<ProjectDto> getProjectsByTitle(String projectTitle);

    public Mono<CollaborativeSessionDto> createColabSession(CollaborativeSessionDto collaborativeSessionDto);

    Mono<Void> addUserToColabSession(String sessionId, String userId, String userName);
}
