package com.editor.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ProjectDto {
    private String projectId;
    private String userId;
    private String title;
    private String language;
    private LocalDateTime createdAt;
}
