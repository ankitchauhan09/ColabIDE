package com.editor.controller;

import com.editor.payload.LoginRequestPayload;
import com.editor.payload.UserSignupRequestPayload;
import com.editor.service.UserAuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final UserAuthService userAuthService;

    AuthController(UserAuthService userAuthService) {
        this.userAuthService = userAuthService;
    }

    @PostMapping("/register")
    public Mono<ResponseEntity<?>> register(@RequestBody UserSignupRequestPayload signupRequestPayload) {
        return userAuthService.register(signupRequestPayload)
                .map(ResponseEntity::ok);
    }

    @PostMapping("/login")
    public Mono<ResponseEntity<?>> login(@RequestBody LoginRequestPayload loginRequestPayload) {
        return userAuthService.login(loginRequestPayload)
                .map(ResponseEntity::ok);

    }

}
