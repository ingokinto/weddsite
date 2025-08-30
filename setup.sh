#!/bin/bash

# Festival-Hochzeit 2026 - Local Server Setup Script
# This script helps you start a local server to avoid CORS errors

echo "🎵 Festival-Hochzeit 2026 - Local Server Setup"
echo "=============================================="
echo ""

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: index.html not found!"
    echo "Please run this script from the project directory."
    exit 1
fi

echo "✅ Found index.html - checking for server options..."
echo ""

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Try Python 3 first
if command_exists python3; then
    echo "🐍 Found Python 3 - Starting server..."
    echo "🌐 Server will be available at: http://localhost:8000"
    echo "📱 Open this URL in your browser"
    echo "🛑 Press Ctrl+C to stop the server"
    echo ""
    python3 -m http.server 8000
    exit 0
fi

# Try Python 2
if command_exists python; then
    echo "🐍 Found Python 2 - Starting server..."
    echo "🌐 Server will be available at: http://localhost:8000"
    echo "📱 Open this URL in your browser"
    echo "🛑 Press Ctrl+C to stop the server"
    echo ""
    python -m SimpleHTTPServer 8000
    exit 0
fi

# Try Node.js http-server
if command_exists http-server; then
    echo "📦 Found http-server - Starting server..."
    echo "🌐 Server will be available at: http://localhost:8000"
    echo "📱 Open this URL in your browser"
    echo "🛑 Press Ctrl+C to stop the server"
    echo ""
    http-server -p 8000
    exit 0
fi

# Try PHP
if command_exists php; then
    echo "🐘 Found PHP - Starting server..."
    echo "🌐 Server will be available at: http://localhost:8000"
    echo "📱 Open this URL in your browser"
    echo "🛑 Press Ctrl+C to stop the server"
    echo ""
    php -S localhost:8000
    exit 0
fi

# If no server found, provide installation instructions
echo "❌ No local server found!"
echo ""
echo "🔧 Please install one of the following:"
echo ""
echo "🐍 Python 3 (recommended):"
echo "   Ubuntu/Debian: sudo apt install python3"
echo "   macOS: brew install python3"
echo "   Windows: Download from python.org"
echo ""
echo "📦 Node.js http-server:"
echo "   npm install -g http-server"
echo ""
echo "🐘 PHP:"
echo "   Ubuntu/Debian: sudo apt install php"
echo "   macOS: brew install php"
echo "   Windows: Download from php.net"
echo ""
echo "🔄 After installation, run this script again."
echo ""
echo "📖 Alternative: Use VS Code with Live Server extension"
echo "   1. Install 'Live Server' extension"
echo "   2. Right-click on index.html"
echo "   3. Select 'Open with Live Server'"
echo "" 