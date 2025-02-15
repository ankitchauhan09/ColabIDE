package com.editor.service.serviceImpl;

import com.editor.dto.*;
import com.editor.entity.CollaborativeSessions;
import com.editor.entity.Project;
import com.editor.repository.CollaborativeSessionsRepo;
import com.editor.repository.ProjectRepo;
import com.editor.service.ProjectService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepo projectRepo;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private CollaborativeSessionsRepo collaborativeSessionsRepo;

    @Override
    public Mono<ProjectDto> createProject(Project project) {
        return Mono.defer(() -> {
            project.setProjectId(UUID.randomUUID().toString());
            project.setCreatedAt(LocalDateTime.now());
            return projectRepo.createProject(project)
                    .thenReturn(this.convertToDto(project));
        });
    }


    @Override
    public Flux<ProjectDto> getAllProjectsByUserId(String userId) {
        return projectRepo.findAllByUserId(userId)
                .map(this::convertToDto);
    }

    @Override
    public Flux<ProjectDto> getAllProjects() {
        return projectRepo.findAll().map(this::convertToDto);
    }

    @Override
    public Mono<ProjectDto> getProjectById(String projectId) {
        return projectRepo.findById(projectId)
                .map(this::convertToDto);
    }

    @Override
    public Mono<Void> updateProjectContent(String projectId, String content) {
        return projectRepo.updateContent(projectId, content)
                .then(Mono.empty());
    }

    @Override
    public Flux<ProjectDto> getProjectsByTitle(String projectTitle) {
        return projectRepo.findByTitle(projectTitle)
                .map(this::convertToDto);
    }

    @Override
    public Mono<CollaborativeSessionDto> createColabSession(CollaborativeSessionDto collaborativeSessionDto) {
        return Mono.defer(() -> {
            collaborativeSessionDto.setSessionId(UUID.randomUUID().toString());
            CollaborativeSessions collaborativeSessions = convertSessionToEntity(collaborativeSessionDto);
            return collaborativeSessionsRepo.createSession(collaborativeSessions)
                    .then(Mono.fromCallable(() -> convertSessionToDto(collaborativeSessions)));
        });
    }

    @Override
    public Mono<Void> addUserToColabSession(String sessionId, String userId, String userName) {
        return collaborativeSessionsRepo.getSessionById(sessionId)
                .flatMap(collabSession -> {
                    try {
                        JoinedUser joinedUsers = JoinedUser.builder()
                                .userId(userId)
                                .username(userName)
                                .build();
                        collabSession.setJoinedUseridList(objectMapper.writeValueAsString(joinedUsers));
                        return collaborativeSessionsRepo.updateSession(sessionId, collabSession);
                    } catch (Exception e) {
                        return Mono.error(e);
                    }
                });
    }

    private CollaborativeSessions convertSessionToEntity(CollaborativeSessionDto collaborativeSessionDto) {
        CollaborativeSessions collaborativeSessions = new CollaborativeSessions();
        collaborativeSessions.setSessionId(collaborativeSessionDto.getSessionId());
        collaborativeSessions.setProjectId(collaborativeSessionDto.getProjectId());
        collaborativeSessions.setHostUserId(collaborativeSessionDto.getHostUserId());
        try {
            String joinedUsers = objectMapper.writeValueAsString(collaborativeSessionDto.getJoinedUsers());
            collaborativeSessions.setJoinedUseridList(joinedUsers);
        } catch (Exception e) {
            collaborativeSessions.setJoinedUseridList("");
        }
        return collaborativeSessions;
    }


    private CollaborativeSessionDto convertSessionToDto(CollaborativeSessions collaborativeSessions) {
        CollaborativeSessionDto collaborativeSessionDto = new CollaborativeSessionDto();
        collaborativeSessionDto.setSessionId(collaborativeSessions.getSessionId());
        collaborativeSessionDto.setHostUserId(collaborativeSessions.getHostUserId());
        collaborativeSessionDto.setProjectId(collaborativeSessions.getProjectId());
        try {
            List<JoinedUser> joinedUsers = objectMapper.readValue(collaborativeSessions.getJoinedUseridList(), new TypeReference<List<JoinedUser>>() {
            });
            collaborativeSessionDto.setJoinedUsers(joinedUsers);
        } catch (Exception e) {
            collaborativeSessionDto.setJoinedUsers(new ArrayList<>());
        }
        return collaborativeSessionDto;
    }

    private Project convertToEntity(ProjectDto projectDto) {
        Project project = new Project();
        project.setProjectId(projectDto.getProjectId());
        project.setCreatedAt(projectDto.getCreatedAt());
        project.setLanguage(projectDto.getLanguage());
        project.setTitle(projectDto.getTitle());
        project.setUserId(projectDto.getUserId());
        return project;
    }

    private ProjectDto convertToDto(Project project) {
        ProjectDto projectDto = new ProjectDto();
        if (project.getProjectId() != null) {
            projectDto.setProjectId(project.getProjectId());
        } else {
            projectDto.setProjectId(UUID.randomUUID().toString());
        }
        projectDto.setTitle(project.getTitle());
        projectDto.setCreatedAt(LocalDateTime.now());
        projectDto.setLanguage(project.getLanguage());
        projectDto.setUserId(project.getUserId());
        return projectDto;
    }
}
