# DevCircle Setup Guide

This guide will help you set up DevCircle for your college.

## Quick Start Checklist

- [ ] Node.js 18+ installed
- [ ] MongoDB installed or Docker ready
- [ ] GitHub OAuth app created
- [ ] Environment variables configured
- [ ] Backend running
- [ ] Frontend running
- [ ] First user authenticated

## Detailed Setup Steps

### 1. System Requirements

Ensure you have the following installed:

```bash
# Check Node.js version (should be 18+)
node --version

# Check npm version
npm --version

# Check if Docker is installed (optional)
docker --version
```

### 2. Clone and Install

```bash
# Clone the repository
git clone https://github.com/yourusername/DevCircle.git
cd DevCircle

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 3. MongoDB Setup

#### Option A: Local MongoDB

```bash
# Install MongoDB (macOS)
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Verify MongoDB is running
mongosh
```

#### Option B: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Add it to your `.env` file

#### Option C: Docker

```bash
# Run MongoDB in Docker
docker run -d -p 27017:27017 --name mongodb mongo:7.0
```

### 4. GitHub OAuth Setup

1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in the details:
   ```
   Application name: DevCircle - Your College Name
   Homepage URL: http://localhost:3000
   Authorization callback URL: http://localhost:4000/api/auth/github/callback
   ```
4. Click "Register application"
5. Copy the **Client ID** and generate a **Client Secret**
6. Save these for the next step

### 5. Environment Configuration

#### Backend (.env in server/)

```bash
cd server
cp .env.example .env
```

Edit `server/.env`:

```env
PORT=4000
NODE_ENV=development

# Your MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/devcircle

# Generate a random string for JWT secret
JWT_SECRET=your_random_secret_here_make_it_long_and_secure
JWT_EXPIRES_IN=7d

# GitHub OAuth credentials from previous step
GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here
GITHUB_CALLBACK_URL=http://localhost:4000/api/auth/github/callback

# Frontend URL
CLIENT_URL=http://localhost:3000

# Your college configuration
COLLEGE_DOMAIN=@youruniversity.edu
COLLEGE_ID=your_college_slug
```

#### Frontend (.env in client/)

```bash
cd ../client
cp .env.example .env
```

Edit `client/.env`:

```env
REACT_APP_API_URL=http://localhost:4000/api
REACT_APP_GITHUB_CLIENT_ID=your_github_client_id_here
REACT_APP_COLLEGE_NAME=Your University Name
REACT_APP_COLLEGE_ID=your_college_slug
```

### 6. Start the Application

#### Terminal 1 - Backend

```bash
cd server
npm run dev
```

You should see:
```
✅ MongoDB Connected
✅ Server running at http://localhost:4000
```

#### Terminal 2 - Frontend

```bash
cd client
npm start
```

Browser should open automatically at http://localhost:3000

### 7. Test the Application

1. Click "Login with GitHub"
2. Authorize the application
3. You should be redirected back and logged in
4. Check your profile - you should have 10 karma points to start

### 8. Verify Everything Works

- [ ] Homepage loads
- [ ] GitHub login works
- [ ] Dashboard shows your profile
- [ ] Can create a request
- [ ] Leaderboard displays
- [ ] Profile page works

## Common Issues

### MongoDB Connection Failed

```bash
# Check if MongoDB is running
mongosh

# If not, start it
brew services start mongodb-community  # macOS
sudo systemctl start mongod            # Linux
```

### GitHub OAuth Redirect Error

- Verify callback URL matches exactly in GitHub settings
- Check that `GITHUB_CALLBACK_URL` in `.env` is correct
- Clear browser cache and cookies

### Port Already in Use

```bash
# Find and kill process on port 4000
lsof -ti:4000 | xargs kill -9

# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### TypeScript Errors

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Production Deployment

### Using Docker Compose

```bash
# Create production .env in root
cp .env.example .env
# Edit with production values

# Build and start
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Using Individual Services

See the main README.md for deployment guides for:
- Railway
- Vercel + Render
- AWS
- Digital Ocean

## Next Steps

1. Customize the branding for your college
2. Invite students to join
3. Create some initial help requests
4. Build your college's dev community!

## Need Help?

- Check the [main README](README.md)
- Open an [issue](https://github.com/yourusername/DevCircle/issues)
- Start a [discussion](https://github.com/yourusername/DevCircle/discussions)

Good luck building your college's developer community! 🚀
