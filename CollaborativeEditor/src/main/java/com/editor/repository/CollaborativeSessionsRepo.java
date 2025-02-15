package com.editor.repository;

import com.editor.entity.CollaborativeSessions;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import reactor.core.publisher.Mono;

public interface CollaborativeSessionsRepo extends R2dbcRepository<CollaborativeSessions, String> {

    @Query("INSERT INTO collaborative_sessions (session_id, host_user_id, joined_userid_list, project_id) " +
            "VALUES (:#{#session.sessionId}, :#{#session.hostUserId}, :#{#session.joinedUseridList}, :#{#session.projectId})")
    Mono<Void> createSession(CollaborativeSessions session);

    @Query("SELECT * FROM collaborative_sessions WHERE session_id = :sessionId")
    Mono<CollaborativeSessions> getSessionById(String sessionId);

    @Query("DELETE FROM collaborative_sessions WHERE session_id = :sessionId")
    Mono<Void> terminateSession(String sessionId);

    @Query("UPDATE collaborative_sessions SET host_user_id = :#{#session.hostUserId}, " +
            "joined_userid_list = :#{#session.joinedUseridList}, " +
            "project_id = :#{#session.projectId} WHERE session_id = :sessionId")
    Mono<Void> updateSession(String sessionId, CollaborativeSessions session);
}
