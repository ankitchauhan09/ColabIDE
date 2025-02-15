# 🚀 ColabIDE

A powerful, collaborative online code editor built for modern development teams.

![Next.js](https://img.shields.io/badge/-Next.js-000000?style=flat-square&logo=next.js)
![Spring Boot](https://img.shields.io/badge/-Spring%20Boot-6DB33F?style=flat-square&logo=spring&logoColor=white)
![Monaco Editor](https://img.shields.io/badge/-Monaco%20Editor-007ACC?style=flat-square&logo=visual-studio-code&logoColor=white)
![Docker](https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![WebSocket](https://img.shields.io/badge/-WebSocket-010101?style=flat-square)
![Yjs](https://img.shields.io/badge/-Yjs-FFDC00?style=flat-square&logoColor=black)

## About The Project

ColabIDE is an online code editor that allows developers to write, run, and test their code in multiple programming languages, all from the browser. Built with modern technologies and designed for seamless collaboration, it provides a powerful development environment accessible from anywhere.

## Demo
<video src="https://sfmrqycwibsrxzmucyzr.supabase.co/storage/v1/object/public/project-images//2025-01-07_01-26-22.mkv" controls autoplay loop muted></video>

## ✨ Key Features

### 🌐 Multi-Language Support
- Write and execute code in Java, Python, C++, JavaScript, and more
- Seamless language switching with automatic syntax highlighting
- Isolated execution environments for each language

### 👥 Real-time Collaboration
- Code together with your team in real-time
- Track remote cursors and see live changes
- Built-in WebSocket communication for instant updates
- Smooth synchronization powered by Yjs

### 🔒 Secure Execution
- Isolated Docker containers for code compilation
- Secure sandboxing for each execution
- Resource usage monitoring and limits

### ⚡ Powerful Editor Experience
- Built on Monaco Editor (powers VS Code)
- Intelligent code completion
- Syntax highlighting
- Multiple themes support
- Integrated terminal

## 🛠️ Tech Stack

### Frontend
- Next.js for the UI framework
- React for component architecture
- Monaco Editor for code editing
- Yjs for real-time collaboration

### Backend
- Spring Boot for the server
- WebSocket for real-time communication
- Docker for code execution
- Multi-language compilation support

## 🔥 Latest Updates

### Real-time Collaboration Features
- Implemented real-time collaborative coding
- Added remote cursor tracking using Monaco Delta Decoration API
- Enabled instant change synchronization
- Enhanced team collaboration capabilities
- Improved cursor position tracking

## 🚀 Getting Started

### Running the Backend

Navigate to the `CollaborativeEditor` directory:

```bash
cd CollaborativeEditor

# For Unix/Linux/MacOS
./mvnw spring-boot:run

# For Windows
.\mvnw.cmd spring-boot:run
```

The backend server will start on `http://localhost:8080`

### Running the Frontend

Navigate to the `collaborative-editor-frontend` directory:

```bash
cd collaborative-editor-frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend development server will start on `http://localhost:3000`

## 📦 Prerequisites

- Node.js (v14 or higher)
- Java 17 or higher
- Maven (or use the included Maven Wrapper)
- Docker

## 💡 Roadmap

- [ ] Add support for more programming languages
- [ ] Implement user authentication
- [ ] Add project sharing capabilities
- [ ] Create custom theme editor
- [ ] Add integrated debugging tools

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Built with ❤️ for developers by developers.

Looking forward to your feedback and contributions! 🎉
