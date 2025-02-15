package com.editor.service.serviceImpl;

import com.editor.dto.UserDto;
import com.editor.repository.UserRepo;
import com.editor.service.UserService;
import com.editor.utils.CustomMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public Mono<UserDto> getUser(String userId) {
        return userRepo.findById(userId)
                .map(CustomMapper::convertFromEntityToDto);
    }

    @Override
    public Mono<UserDto> getUserByEmail(String email) {
        return userRepo.findByEmail(email)
                .map(CustomMapper::convertFromEntityToDto);
    }
}
