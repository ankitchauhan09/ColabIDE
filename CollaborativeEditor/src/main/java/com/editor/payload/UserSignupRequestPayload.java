package com.editor.payload;

import lombok.Data;

@Data
public class UserSignupRequestPayload {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
}
