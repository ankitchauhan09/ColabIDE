package com.editor.repository;

import com.editor.dto.UserDto;
import com.editor.entity.User;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import reactor.core.publisher.Mono;

public interface UserRepo extends R2dbcRepository<User, String> {

    @Query("INSERT INTO user(userId, firstName, lastName, email, password) VALUES(:#{#user.userId}, :#{#user.firstName}, :#{#user.lastName}, :#{#user.email}, :#{#user.password})")
    Mono<UserDto> registerUser(User user);

    @Query("SELECT * FROM user WHERE email = :email")
    Mono<User> findByEmail(String email);


}
