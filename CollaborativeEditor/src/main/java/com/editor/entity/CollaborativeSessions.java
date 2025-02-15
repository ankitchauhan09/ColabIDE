package com.editor.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Data
@Table(name = "collaborative_sessions")
public class CollaborativeSessions {
    @Id
    @Column("session_id")
    private String sessionId;
    @Column("host_user_id")
    private String hostUserId;
    @Column("joined_userid_list")
    private String joinedUseridList;
    @Column("project_id")
    private String projectId;

}
