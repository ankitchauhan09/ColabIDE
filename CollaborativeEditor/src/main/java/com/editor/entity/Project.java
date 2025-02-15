package com.editor.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Data
@Table(name = "projects")
public class Project {
    @Id
    @Column("projectId")
    private String projectId;
    @Column("userId")
    private String userId;
    @Column("title")
    private String title;
    @Column("language")
    private String language;
    @Column("content")
    private String content;
    @Column("createdAt")
    private LocalDateTime createdAt;
}
