package com.editor.service;

import com.editor.payload.CodeExecutionResponse;
import com.editor.payload.SourceCode;
import reactor.core.publisher.Mono;

public interface EditorService {

    public Mono<CodeExecutionResponse> runCode(SourceCode sourceCode);

}
