package com.editor.service;

import com.editor.dto.UserDto;
import com.editor.payload.LoginRequestPayload;
import com.editor.payload.UserSignupRequestPayload;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;


public interface UserAuthService {
    public Mono<UserDto> register(UserSignupRequestPayload userSignupRequestPayload);
    public Mono<UserDto> login(LoginRequestPayload loginRequestPayload);
}
