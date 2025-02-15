<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ColabIDE - Collaborative Online Code Editor</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            color: #333;
        }
        .header {
            text-align: center;
            margin-bottom: 2rem;
        }
        h1 {
            color: #2563eb;
            margin-bottom: 1rem;
        }
        h2 {
            color: #1e40af;
            margin-top: 2rem;
        }
        .badges {
            display: flex;
            gap: 0.5rem;
            justify-content: center;
            flex-wrap: wrap;
            margin: 1rem 0;
        }
        .badge {
            background: #e5e7eb;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.875rem;
            color: #4b5563;
        }
        .features {
            background: #f9fafb;
            padding: 1.5rem;
            border-radius: 0.5rem;
            margin: 1.5rem 0;
        }
        .feature-item {
            margin-bottom: 1rem;
        }
        code {
            background: #e5e7eb;
            padding: 0.2rem 0.4rem;
            border-radius: 0.25rem;
            font-size: 0.875em;
        }
        .footer {
            text-align: center;
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 1px solid #e5e7eb;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🚀 ColabIDE</h1>
        <p>A powerful, collaborative online code editor built for modern development teams</p>
        <div class="badges">
            <span class="badge">Next.js</span>
            <span class="badge">Spring Boot</span>
            <span class="badge">Monaco Editor</span>
            <span class="badge">Docker</span>
            <span class="badge">WebSocket</span>
            <span class="badge">Yjs</span>
        </div>
    </div>

    <h2>✨ Features</h2>
    <div class="features">
        <div class="feature-item">
            <strong>🌐 Multi-Language Support</strong>
            <p>Write and execute code in multiple programming languages including Java, Python, C++, and JavaScript - all from your browser.</p>
        </div>
        <div class="feature-item">
            <strong>👥 Real-time Collaboration</strong>
            <p>Code together with your team in real-time. See live cursor positions, track changes, and collaborate seamlessly using Yjs synchronization.</p>
        </div>
        <div class="feature-item">
            <strong>🔒 Secure Execution</strong>
            <p>Code execution happens in isolated Docker containers, ensuring secure and efficient compilation for each language.</p>
        </div>
        <div class="feature-item">
            <strong>⚡ Powerful Editor</strong>
            <p>Built on Monaco Editor (the same engine that powers VS Code) for a premium coding experience with syntax highlighting and intelligent code completion.</p>
        </div>
    </div>

    <h2>🛠️ Tech Stack</h2>
    <ul>
        <li><strong>Frontend:</strong> Next.js, React, Monaco Editor</li>
        <li><strong>Backend:</strong> Spring Boot</li>
        <li><strong>Real-time Collaboration:</strong> Yjs, WebSocket</li>
        <li><strong>Code Execution:</strong> Docker</li>
    </ul>

    <h2>🔥 Latest Updates</h2>
    <ul>
        <li>Real-time collaborative coding implementation</li>
        <li>Remote cursor tracking using Monaco Delta Decoration API</li>
        <li>Instant change synchronization across all connected users</li>
        <li>Enhanced team collaboration features</li>
    </ul>

    <div class="footer">
        <p>Built with ❤️ for developers by developers</p>
        <p>Looking forward to your feedback and contributions!</p>
    </div>
</body>
</html>
