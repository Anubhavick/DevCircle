#!/bin/bash

# DevCircle Quick Setup Script
# This script helps you get started with DevCircle quickly

set -e

echo "🚀 DevCircle Setup Script"
echo "========================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version must be 18 or higher. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm version: $(npm -v)"
echo ""

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd server
npm install
echo "✅ Backend dependencies installed"
echo ""

# Setup backend .env
if [ ! -f .env ]; then
    echo "📝 Creating backend .env file..."
    cp .env.example .env
    echo "⚠️  Please edit server/.env with your configuration"
    echo ""
fi

cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd client
npm install
echo "✅ Frontend dependencies installed"
echo ""

# Setup frontend .env
if [ ! -f .env ]; then
    echo "📝 Creating frontend .env file..."
    cp .env.example .env
    echo "⚠️  Please edit client/.env with your configuration"
    echo ""
fi

cd ..

echo "✨ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Configure your environment variables:"
echo "   - Edit server/.env"
echo "   - Edit client/.env"
echo ""
echo "2. Make sure MongoDB is running:"
echo "   - Local: brew services start mongodb-community"
echo "   - Docker: docker run -d -p 27017:27017 --name mongodb mongo:7.0"
echo ""
echo "3. Start the application:"
echo "   Terminal 1: cd server && npm run dev"
echo "   Terminal 2: cd client && npm start"
echo ""
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo "📖 For detailed instructions, see SETUP.md"
echo ""
echo "Happy coding! 🎉"
