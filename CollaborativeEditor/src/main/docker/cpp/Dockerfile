# Use an official lightweight GCC image
FROM gcc:14.2.0

# Set the working directory inside the container
WORKDIR /app

ENTRYPOINT ["sh", "-c"]
# Command to compile and execute C++ code
CMD ["g++ /app/${SCRIPT_NAME} -o /app/script.out && /app/script.out"]
