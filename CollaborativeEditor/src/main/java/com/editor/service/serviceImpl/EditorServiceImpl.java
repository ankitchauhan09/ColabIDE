package com.editor.service.serviceImpl;

import com.editor.payload.CodeExecutionResponse;
import com.editor.payload.SourceCode;
import com.editor.service.EditorService;
import com.editor.utils.APP_CONSTANTS;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.UUID;

@Service
@Slf4j
public class EditorServiceImpl implements EditorService {

    @PostConstruct
    void init() {
        Path directory = Paths.get(System.getProperty("user.dir"), "app");
        if (!Files.exists(directory)) {
            try {
                Files.createDirectories(directory);
                log.info("Created directory: {}", directory.toString());
            } catch (IOException e) {
                log.error("Failed to create directory: {}", e.getMessage());
                throw new RuntimeException(e);
            }
        } else {
            log.info("Directory already exists: {}", directory.toString());
        }
    }

    @Override
    public Mono<CodeExecutionResponse> runCode(SourceCode sourceCode) {
        return Mono.defer(() -> {
            String language = sourceCode.getLanguage();
            String dockerImage = getDockerImage(language);
            String fileName = generateFileName(language, sourceCode.getCode());
            log.info("filename : {}", fileName);
            String fileExtension = getExtension(language);
            return executeCode(sourceCode.getCode(), dockerImage, fileName, fileExtension);
        });
    }

    private String generateFileName(String language, String code) {
        if ("java".equals(language)) {
            // Extract class name dynamically from the Java code if needed
            return extractClassName(code);
        } else {
            return "tempFile" + UUID.randomUUID().toString();
        }
    }

    private String extractClassName(String code) {
        // Basic regex to find the class name (assuming it's a public class)
        String className = "UnknownClass";
        if (code.contains("public class ")) {
            int start = code.indexOf("public class ") + 13;
            int end = code.indexOf(" ", start);
            if (end == -1) {
                end = code.indexOf("{", start);
            }
            className = code.substring(start, end).trim();
        }
        return className;
    }

    private String getExtension(String language) {
        return switch (language) {
            case "java" -> ".java";
            case "python" -> ".py";
            case "cpp" -> ".cpp";
            case "c" -> ".c";
            case "javascript" -> ".js";
            case "golang" -> ".go";
            default -> "";
        };
    }

    private String getDockerImage(String language) {
        return switch (language) {
            case "java" -> APP_CONSTANTS.DOCKER_JAVA_IMAGE;
            case "python" -> APP_CONSTANTS.DOCKER_PYTHON_RUNNER;
            case "cpp" -> APP_CONSTANTS.DOCKER_CPP_IMAGE;
            case "javascript" -> APP_CONSTANTS.DOCKER_JAVASCRIPT_RUNNER;
            case "golang" -> APP_CONSTANTS.DOCKER_GO_LANG_RUNNER;
            default -> throw new IllegalStateException("Unexpected value: " + language);
        };
    }

    private Mono<CodeExecutionResponse> executeCode(String code, String dockerImage, String fileName, String fileExtension) {
        return Mono.fromCallable(() -> {
                    log.info("Running container");
                    Path tempScript = Paths.get(System.getProperty("user.dir"), "app", fileName + fileExtension);  // Use absolute path
                    log.info("Temp file : {}", tempScript.getFileName().toString());

                    // Ensure the file is created before writing
                    Files.write(tempScript, code.getBytes(), StandardOpenOption.CREATE, StandardOpenOption.WRITE);

                    ProcessBuilder processBuilder = new ProcessBuilder(
                            "docker", "run", "--rm",
                            "-v", tempScript.getParent().toAbsolutePath() + ":/app",
                            "-e", "SCRIPT_NAME=" + tempScript.getFileName().toString(),
                            dockerImage
                    );
                    processBuilder.redirectErrorStream(true);
                    Process process = processBuilder.start();

                    StringBuilder output = new StringBuilder();
                    try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                        String line;
                        while ((line = reader.readLine()) != null) {
                            log.info("Output: {}", line);
                            output.append(line).append("\n");
                        }
                    }

                    int exitCode = process.waitFor();
                    Files.deleteIfExists(tempScript);
                    if (exitCode == 0) {
                        return new CodeExecutionResponse(true, output.toString());
                    } else {
                        return new CodeExecutionResponse(false, "Error while executing the code: " + output);
                    }
                })
                .onErrorResume(e -> {
                    e.printStackTrace();
                    return Mono.just(new CodeExecutionResponse(false, "Error while executing the code: " + e.getMessage()));
                });
    }
}
