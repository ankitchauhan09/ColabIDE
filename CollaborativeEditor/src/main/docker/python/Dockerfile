# Use the official lightweight Python image
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Accept the script name as an argument and run the Python file
ENTRYPOINT ["sh", "-c", "python /app/${SCRIPT_NAME}"]
