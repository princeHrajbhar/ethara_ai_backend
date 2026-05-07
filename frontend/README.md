# Task & Project Management Frontend

Modern React + TypeScript frontend for the Task & Project Management System.

## 🚀 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing
- **Zustand** - State management
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **React Hot Toast** - Notifications
- **date-fns** - Date formatting

## 📦 Installation

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000/api/v1
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Layout.tsx       # Main layout with sidebar
│   │   └── CreateProjectModal.tsx
│   ├── pages/               # Page components
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Projects.tsx
│   │   ├── ProjectDetail.tsx
│   │   ├── Tasks.tsx
│   │   ├── TaskDetail.tsx
│   │   ├── Users.tsx
│   │   └── Profile.tsx
│   ├── services/            # API services
│   │   ├── projectService.ts
│   │   ├── taskService.ts
│   │   └── userService.ts
│   ├── store/               # Zustand stores
│   │   └── authStore.ts
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   ├── utils/               # Utility functions
│   │   └── helpers.ts
│   ├── lib/                 # Libraries
│   │   └── api.ts           # Axios instance
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## 🎨 Features

### Authentication
- ✅ Login / Register
- ✅ JWT authentication with HTTP-only cookies
- ✅ Protected routes
- ✅ Role-based access control

### Dashboard
- ✅ Overview statistics
- ✅ Recent projects
- ✅ Quick actions

### Projects
- ✅ List all projects
- ✅ Create new project
- ✅ View project details
- ✅ Search projects
- ✅ Project status badges
- ✅ Member management (coming soon)

### Tasks
- ✅ View tasks by project
- ✅ Task status and priority badges
- ✅ Create/update/delete tasks (coming soon)
- ✅ Task assignment (coming soon)

### Users (Admin Only)
- ✅ List all users
- ✅ View user roles
- ✅ User management (coming soon)

### Profile
- ✅ View user profile
- ✅ User information display

## 🎯 Available Scripts

```bash
# Development
npm run dev          # Start dev server (http://localhost:5173)

# Build
npm run build        # Build for production

# Preview
npm run preview      # Preview production build

# Lint
npm run lint         # Run ESLint
```

## 🔐 Authentication Flow

1. User logs in with email/password
2. Backend sets HTTP-only cookie with JWT token
3. Frontend stores user data in Zustand store
4. All API requests automatically include cookie
5. Protected routes check for user in store
6. Logout clears cookie and store

## 🎨 Styling

The app uses Tailwind CSS with custom utility classes:

- `.btn` - Base button styles
- `.btn-primary` - Primary button
- `.btn-secondary` - Secondary button
- `.btn-danger` - Danger button
- `.input` - Input field styles
- `.card` - Card container
- `.badge` - Badge/tag styles

## 📱 Responsive Design

- Mobile-first approach
- Responsive sidebar (hamburger menu on mobile)
- Grid layouts adapt to screen size
- Touch-friendly UI elements

## 🔄 State Management

Uses Zustand for global state:

```typescript
// Auth Store
const { user, login, logout, register } = useAuthStore()

// Usage
await login(email, password)
await logout()
```

## 🌐 API Integration

All API calls use the configured Axios instance:

```typescript
import api from '@/lib/api'

// Automatically includes credentials
const response = await api.get('/projects')
```

## 🎨 Color Scheme

- Primary: Blue (#0ea5e9)
- Success: Green
- Warning: Orange
- Danger: Red
- Gray scale for text and backgrounds

## 🚧 Coming Soon

- [ ] Task creation modal
- [ ] Task detail page with full CRUD
- [ ] Project member management
- [ ] User role management
- [ ] Task filtering and sorting
- [ ] Drag-and-drop task boards
- [ ] Real-time updates
- [ ] File attachments
- [ ] Comments on tasks
- [ ] Activity timeline
- [ ] Email notifications
- [ ] Dark mode

## 📝 Notes

- Backend must be running on `http://localhost:3000`
- CORS is configured to allow credentials
- All dates are formatted using date-fns
- Icons from Lucide React
- Toast notifications for user feedback

## 🐛 Troubleshooting

**CORS Issues:**
- Ensure backend CORS is configured with `credentials: true`
- Check `withCredentials: true` in axios config

**Authentication Issues:**
- Clear browser cookies
- Check backend is running
- Verify API_URL in .env

**Build Issues:**
- Delete `node_modules` and reinstall
- Clear Vite cache: `rm -rf node_modules/.vite`

## 📄 License

MIT
