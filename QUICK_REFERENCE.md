# DevCircle - Quick Reference Guide

## 🚀 Instant Commands

### First Time Setup
```bash
# Run the automated setup
./setup.sh

# OR manually:
cd server && npm install && cd ../client && npm install
```

### Start Development
```bash
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend  
cd client && npm start
```

### Docker (All-in-One)
```bash
docker-compose up --build
```

## 📡 API Endpoints Reference

### Base URL
```
http://localhost:4000/api
```

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/auth/github` | Start GitHub OAuth |
| GET | `/auth/github/callback` | OAuth callback |
| GET | `/auth/verify` | Verify token |

### Users
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/users/me` | ✅ | Get current user |
| GET | `/users/:id` | ❌ | Get user by ID |
| PUT | `/users/me` | ✅ | Update profile |
| GET | `/users/leaderboard?college=xxx` | ❌ | Get leaderboard |
| GET | `/users/college?college=xxx` | ❌ | Get college users |

### Requests
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/requests/open` | ❌ | Browse open requests |
| GET | `/requests/:id` | ❌ | Get request details |
| POST | `/requests` | ✅ | Create request |
| GET | `/requests/my/requests` | ✅ | My requests |
| GET | `/requests/my/helped` | ✅ | Requests I'm helping |
| POST | `/requests/:id/accept` | ✅ | Accept request |
| POST | `/requests/:id/complete` | ✅ | Complete request |
| POST | `/requests/:id/cancel` | ✅ | Cancel request |

### Activities
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/activities/recent` | ❌ | Recent activity feed |
| GET | `/activities/my` | ✅ | My activities |
| GET | `/activities/user/:userId` | ❌ | User's activities |

## 🎨 Frontend Routes

| Route | Component | Auth | Description |
|-------|-----------|------|-------------|
| `/` | Home | ❌ | Landing page |
| `/auth/callback` | AuthCallback | ❌ | OAuth handler |
| `/dashboard` | Dashboard | ✅ | User dashboard |
| `/requests` | Requests | ✅ | Browse/create requests |
| `/leaderboard` | Leaderboard | ❌ | Rankings |
| `/profile/:id?` | Profile | ✅ | User profile |

## 🔧 Project Structure Quick Map

```
DevCircle/
├── client/              # React Frontend
│   ├── src/
│   │   ├── components/  # UI Components
│   │   ├── pages/       # Page Components
│   │   ├── context/     # Auth Context
│   │   ├── types/       # TypeScript Types
│   │   └── utils/       # API Client
│   └── public/
│
├── server/              # Express Backend
│   ├── controllers/     # Request Handlers
│   ├── services/        # Business Logic
│   ├── repositories/    # Data Access
│   ├── models/          # Database Models
│   ├── routes/          # API Routes
│   ├── middleware/      # Express Middleware
│   └── interfaces/      # TypeScript Interfaces
│
└── Docker files
```

## 📦 Key Technologies

| Layer | Tech | Purpose |
|-------|------|---------|
| Frontend | React 19 | UI Framework |
| Frontend | TypeScript | Type Safety |
| Frontend | Tailwind CSS | Styling |
| Frontend | React Router | Navigation |
| Frontend | Axios | HTTP Client |
| Backend | Node.js + Express | API Server |
| Backend | TypeScript | Type Safety |
| Backend | MongoDB + Mongoose | Database |
| Backend | JWT | Authentication |
| Backend | GitHub OAuth | User Login |
| DevOps | Docker | Containerization |

## 🔑 Environment Variables Checklist

### Server (.env)
- [ ] `PORT=4000`
- [ ] `MONGODB_URI` - Your MongoDB connection
- [ ] `JWT_SECRET` - Random secret key
- [ ] `GITHUB_CLIENT_ID` - From GitHub OAuth app
- [ ] `GITHUB_CLIENT_SECRET` - From GitHub OAuth app
- [ ] `COLLEGE_ID` - Your college identifier

### Client (.env)
- [ ] `REACT_APP_API_URL=http://localhost:4000/api`
- [ ] `REACT_APP_GITHUB_CLIENT_ID` - Same as backend
- [ ] `REACT_APP_COLLEGE_ID` - Same as backend

## 💾 MongoDB Setup Options

### Option 1: Local
```bash
brew install mongodb-community
brew services start mongodb-community
# Use: mongodb://localhost:27017/devcircle
```

### Option 2: Docker
```bash
docker run -d -p 27017:27017 --name mongodb mongo:7.0
# Use: mongodb://localhost:27017/devcircle
```

### Option 3: Atlas (Cloud)
```bash
# Sign up at mongodb.com/cloud/atlas
# Get connection string
# Use: mongodb+srv://username:password@cluster.mongodb.net/devcircle
```

## 🐛 Troubleshooting Quick Fixes

### Backend won't start
```bash
cd server
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Frontend won't start
```bash
cd client
rm -rf node_modules package-lock.json
npm install
npm start
```

### MongoDB connection error
```bash
# Check if MongoDB is running
mongosh

# If not, start it
brew services start mongodb-community  # macOS
sudo systemctl start mongod            # Linux
```

### Port already in use
```bash
# Kill process on port 4000 (backend)
lsof -ti:4000 | xargs kill -9

# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9
```

### TypeScript errors
```bash
# Both server and client
npm install
```

### GitHub OAuth not working
1. Check callback URL in GitHub settings
2. Verify `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`
3. Clear browser cookies
4. Check console for errors

## 📚 File Locations

| What | Where |
|------|-------|
| API Routes | `server/routes/*.ts` |
| Business Logic | `server/services/*.ts` |
| Database Models | `server/models/*.ts` |
| React Pages | `client/src/pages/*.tsx` |
| React Components | `client/src/components/*.tsx` |
| API Client | `client/src/utils/api.ts` |
| Auth Context | `client/src/context/AuthContext.tsx` |
| Types | `server/interfaces/*.ts` & `client/src/types/index.ts` |

## 🎯 Common Tasks

### Add a new API endpoint
1. Create route in `server/routes/`
2. Add controller in `server/controllers/`
3. Add service logic in `server/services/`
4. Update repository if needed
5. Test with Postman/Thunder Client

### Add a new page
1. Create component in `client/src/pages/`
2. Add route in `client/src/App.tsx`
3. Add navigation link in `Navbar.tsx`
4. Style with Tailwind classes

### Add a new database model
1. Create interface in `server/interfaces/`
2. Create model in `server/models/`
3. Create repository in `server/repositories/`
4. Create service in `server/services/`
5. Create controller and routes

## 🔒 Security Notes

- Never commit `.env` files
- Keep `JWT_SECRET` secure and random
- Use HTTPS in production
- Validate all user inputs
- Use rate limiting in production
- Keep dependencies updated

## 📊 Database Collections

| Collection | Description | Key Fields |
|------------|-------------|-----------|
| users | User profiles | username, email, karmaPoints, helpScore |
| requests | Help requests | title, type, status, helpCredits |
| activities | Activity logs | user, type, pointsEarned |

## 🚀 Deployment Checklist

- [ ] Update `.env` with production values
- [ ] Set `NODE_ENV=production`
- [ ] Use strong `JWT_SECRET`
- [ ] Configure production MongoDB
- [ ] Update GitHub OAuth callback URLs
- [ ] Build frontend: `npm run build`
- [ ] Build backend: `npm run build`
- [ ] Test all features
- [ ] Set up monitoring
- [ ] Configure domain and SSL

## 📞 Getting Help

1. Check `README.md` - Full documentation
2. Check `SETUP.md` - Detailed setup guide
3. Check `PROJECT_SUMMARY.md` - Complete overview
4. Check code comments - Inline documentation
5. Open GitHub issue - Community support

---

**Print this page for quick reference during development!** 📋
