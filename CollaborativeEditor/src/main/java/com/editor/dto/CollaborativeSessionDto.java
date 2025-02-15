package com.editor.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
public class CollaborativeSessionDto {
    private String sessionId;
    private String hostUserId;
    private String projectId;
    private List<JoinedUser> joinedUsers = new ArrayList<>();
}

