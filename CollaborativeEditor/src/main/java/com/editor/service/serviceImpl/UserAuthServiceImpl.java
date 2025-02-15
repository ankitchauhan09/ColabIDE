package com.editor.service.serviceImpl;

import com.editor.dto.UserDto;
import com.editor.entity.User;
import com.editor.payload.LoginRequestPayload;
import com.editor.payload.UserSignupRequestPayload;
import com.editor.repository.UserRepo;
import com.editor.service.UserAuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Service
@Slf4j
public class UserAuthServiceImpl implements UserAuthService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public Mono<UserDto> register(UserSignupRequestPayload userSignupRequestPayload) {
        // Map the payload to a User entity
        User user = mapToUserEntity(userSignupRequestPayload);

        log.info("User to save: {}", user);

        // Save the user and map to UserDto
        return userRepo.registerUser(user)
                .thenReturn(mapToUserDto(user));
    }

    @Override
    public Mono<UserDto> login(LoginRequestPayload loginRequestPayload) {
        return userRepo.findByEmail(loginRequestPayload.getEmail())
                .flatMap(user -> {
                    if (user.getPassword().equals(loginRequestPayload.getPassword())) {
                        log.info("user : {}", user);
                        return Mono.just(user);
                    } else {
                        return Mono.error(new RuntimeException("Invalid email or password"));
                    }
                }).map(this::mapToUserDto);
    }

    private User mapToUserEntity(UserSignupRequestPayload payload) {
        return User.builder()
                .userId(UUID.randomUUID().toString())
                .email(payload.getEmail())
                .password(payload.getPassword())
                .firstName(payload.getFirstName())
                .lastName(payload.getLastName())
                .build();
    }

    private UserDto mapToUserDto(User user) {
        return UserDto.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .build();
    }
}
