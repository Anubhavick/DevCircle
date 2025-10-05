# DevCircle
# Mutual Growth for College Coders

**DevCircle** is an open-source platform designed to boost coding communities *within colleges* through fair and active peer-to-peer support. Instead of fighting for visibility on crowded global platforms, DevCircle creates a focused, trust-based space where developers help each other — and grow together.

---

## 🔍 Why DevCircle?

New developers often struggle with:
- Getting real feedback on projects
- Receiving GitHub stars or follows
- Finding collaboration partners
- Feeling isolated in their coding journey

**DevCircle fixes this** by letting you:
- ✅ Request help (code review, bug fix, GitHub star, project collab)
- ✅ Earn help credits by helping others
- ✅ Connect only with active users in your college
- ✅ Build your college's dev culture with no spam, no noise

---

## 🎯 Key Features

- 🔁 Mutual help system (you give, you get)
- 🧠 Smart matchmaker (active, fair users only)
- 🎓 Private college instances (self-hosted)
- ⭐ GitHub integration
- ⚖️ Karma / Help Score logic
- 📈 Leaderboard & weekly activity tracker

---

## 💡 Vision

Every college can self-host DevCircle to strengthen its local developer community. It's not about building another LinkedIn — it's about building trust, accountability, and support at the grassroots level.

---

## 🛠️ Tech Stack

### Backend
- **Node.js** + **Express** - RESTful API
- **TypeScript** - Type-safe development
- **MongoDB** + **Mongoose** - Database & ODM
- **JWT** - Authentication
- **GitHub OAuth** - User authentication

### Frontend
- **React 19** + **TypeScript** - UI Framework
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Context API** - State management

### DevOps
- **Docker** + **Docker Compose** - Containerization
- **Nginx** - Reverse proxy for frontend

---

## 📦 Project Structure

```
DevCircle/
├── client/                    # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── context/          # React Context (Auth)
│   │   ├── pages/            # Page components
│   │   ├── types/            # TypeScript types
│   │   ├── utils/            # Utility functions
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── Dockerfile
│   ├── package.json
│   └── tailwind.config.js
│
├── server/                    # Node.js Backend
│   ├── config/               # Configuration files
│   ├── controllers/          # Request handlers
│   ├── interfaces/           # TypeScript interfaces
│   ├── middleware/           # Express middleware
│   ├── models/               # Mongoose models
│   ├── repositories/         # Database operations
│   ├── routes/               # API routes
│   ├── services/             # Business logic
│   ├── utils/                # Utility functions
│   ├── app.ts                # Express app setup
│   ├── server.ts             # Server entry point
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml         # Docker orchestration
├── .env.example              # Environment variables template
└── README.md                 # You are here!
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (v6 or higher) OR **Docker**
- **GitHub OAuth App** credentials ([Create one here](https://github.com/settings/developers))

### Option 1: Local Development (Without Docker)

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/DevCircle.git
cd DevCircle
```

#### 2. Setup Backend

```bash
cd server

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env and fill in your values:
# - MongoDB connection string
# - GitHub OAuth credentials
# - JWT secret
# - College configuration
nano .env  # or use your preferred editor

# Run in development mode
npm run dev
```

The backend will start at `http://localhost:4000`

#### 3. Setup Frontend

```bash
cd ../client

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your values:
# - Backend API URL
# - GitHub Client ID
# - College information
nano .env

# Start development server
npm start
```

The frontend will start at `http://localhost:3000`

### Option 2: Docker Deployment (Recommended for Production)

#### 1. Setup Environment Variables

```bash
# Copy the example file
cp .env.example .env

# Edit and fill in your values
nano .env
```

#### 2. Build and Run with Docker Compose

```bash
# Build and start all services (MongoDB, Backend, Frontend)
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build
```

Access the application at `http://localhost`

#### 3. Stop Services

```bash
docker-compose down

# To remove volumes as well
docker-compose down -v
```

---

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `server/` directory:

```env
# Server
PORT=4000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/devcircle

# JWT
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:4000/api/auth/github/callback

# Frontend
CLIENT_URL=http://localhost:3000

# College
COLLEGE_DOMAIN=@youruniversity.edu
COLLEGE_ID=your_college_slug
```

### Frontend Environment Variables

Create a `.env` file in the `client/` directory:

```env
REACT_APP_API_URL=http://localhost:4000/api
REACT_APP_GITHUB_CLIENT_ID=your_github_client_id
REACT_APP_COLLEGE_NAME=Your University
REACT_APP_COLLEGE_ID=your_college_slug
```

### GitHub OAuth Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: DevCircle - Your College
   - **Homepage URL**: `http://localhost:3000` (or your domain)
   - **Authorization callback URL**: `http://localhost:4000/api/auth/github/callback`
4. Copy the Client ID and Client Secret to your `.env` files

---

## 📚 API Documentation

### Authentication

- `GET /api/auth/github` - Initiate GitHub OAuth
- `GET /api/auth/github/callback` - GitHub OAuth callback
- `GET /api/auth/verify` - Verify JWT token

### Users

- `GET /api/users/me` - Get current user
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/me` - Update current user
- `GET /api/users/leaderboard?college=xxx` - Get leaderboard
- `GET /api/users/college?college=xxx` - Get college users

### Requests

- `GET /api/requests/open` - Get open requests
- `GET /api/requests/:id` - Get request by ID
- `POST /api/requests` - Create new request
- `GET /api/requests/my/requests` - Get my requests
- `GET /api/requests/my/helped` - Get requests I'm helping with
- `POST /api/requests/:id/accept` - Accept a request
- `POST /api/requests/:id/complete` - Mark request as complete
- `POST /api/requests/:id/cancel` - Cancel a request

### Activities

- `GET /api/activities/recent` - Get recent activities
- `GET /api/activities/my` - Get my activities
- `GET /api/activities/user/:userId` - Get user activities

---

## 🐳 Docker Commands

```bash
# Build images
docker-compose build

# Start services
docker-compose up

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild and restart
docker-compose up --build --force-recreate

# Remove all (including volumes)
docker-compose down -v
```

---

## 🔧 Development

### Install Backend Dependencies

```bash
cd server
npm install
```

### Install Frontend Dependencies

```bash
cd client
npm install
```

### Run Tests

```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test
```

### Build for Production

```bash
# Backend
cd server
npm run build

# Frontend
cd client
npm run build
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🌟 Deployment

### Deploy on Railway

1. Create a new project on [Railway](https://railway.app)
2. Add MongoDB service
3. Add server service (connect to GitHub repo, set root directory to `server/`)
4. Add client service (connect to GitHub repo, set root directory to `client/`)
5. Configure environment variables
6. Deploy!

### Deploy on Vercel (Frontend) + Render (Backend)

**Frontend (Vercel):**
1. Import GitHub repo to Vercel
2. Set root directory to `client/`
3. Add environment variables
4. Deploy

**Backend (Render):**
1. Create new Web Service
2. Connect GitHub repo
3. Set root directory to `server/`
4. Add environment variables
5. Deploy

---

## 💬 Support

For questions, issues, or feature requests:
- Open an [Issue](https://github.com/yourusername/DevCircle/issues)
- Start a [Discussion](https://github.com/yourusername/DevCircle/discussions)

---

## 🎓 Self-Hosting for Your College

Want to set up DevCircle for your college? Here's a quick guide:

1. **Clone and customize** - Fork this repo and update branding
2. **Setup GitHub OAuth** - Create OAuth app for your domain
3. **Configure college domain** - Set your `.edu` email domain
4. **Deploy** - Use Docker Compose or your preferred platform
5. **Invite students** - Share with your college dev community!

---

## 🙏 Acknowledgments

Built with ❤️ for college developers who believe in mutual growth and community support.

---

**Star ⭐ this repository if you find it useful!**
