package com.editor.service;

import com.editor.dto.UserDto;
import reactor.core.publisher.Mono;

public interface UserService {

    public Mono<UserDto> getUser(String userId);

    public Mono<UserDto> getUserByEmail(String email);

}
