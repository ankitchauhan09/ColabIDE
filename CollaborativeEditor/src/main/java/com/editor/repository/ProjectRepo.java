package com.editor.repository;

import com.editor.entity.Project;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.ResponseBody;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface ProjectRepo extends R2dbcRepository<Project, String> {

    @Query("INSERT INTO projects (projectId, userId, title, language, createdAt) VALUES (:#{#project.projectId}, :#{#project.userId}, :#{#project.title}, :#{#project.language}, :#{#project.createdAt})")
    public Mono<Void> createProject(Project project);

    @Query("SELECT * FROM projects WHERE userId = :userId")
    public Flux<Project> findAllByUserId(String userId);

    @Query("SELECT * FROM projects WHERE projectTitle = :title")
    public Flux<Project> findByTitle(String title);

    @Query("UPDATE projects SET content = :content WHERE projectId = :projectId")
    public Mono<Void> updateContent(String projectId, String content);
}