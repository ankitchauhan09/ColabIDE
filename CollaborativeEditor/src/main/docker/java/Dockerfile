# Use the official OpenJDK image as base image
FROM openjdk:11-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Accept the script name as an environment variable, compile, and run the Java program
ENTRYPOINT ["sh", "-c", "javac /app/$SCRIPT_NAME && java ${SCRIPT_NAME%.*}"]
