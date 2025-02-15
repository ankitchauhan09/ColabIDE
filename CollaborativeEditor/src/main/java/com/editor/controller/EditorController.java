package com.editor.controller;

import com.editor.payload.SourceCode;
import com.editor.service.EditorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RequestMapping("/api/v1/editor/compile")
@RestController
public class EditorController {

    @Autowired
    private EditorService editorService;

    @PostMapping()
    public Mono<ResponseEntity<?>> compileCode(@RequestBody SourceCode sourceCode) {
        return editorService.runCode(sourceCode)
                .map(ResponseEntity::ok);
    }

}
