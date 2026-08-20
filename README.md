# Meknos Frontend Application

The modern, responsive web client for the **Meknos** platform, built with React 19, TypeScript, Vite, Tailwind CSS v4, Zustand for state management, and Framer Motion for smooth animations.

---

## 🛠️ Tools & Technologies Used

### Core Framework & Build Tools
- **UI Library:** [React 19](https://react.dev/) (`react` & `react-dom` v19.2)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (v6)
- **Build Tool & Dev Server:** [Vite](https://vitejs.dev/) (v8)
- **Compiler Optimizations:** React Compiler (`babel-plugin-react-compiler`)

### Styling & Animations
- **CSS Framework:** [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite` v4.3)
- **Animation Engine:** [Motion / Framer Motion](https://motion.dev/) (v13)

### State Management & Routing
- **Global State Management:** [Zustand](https://zustand-demo.pmnd.rs/) (v5)
- **Routing:** [React Router DOM](https://reactrouter.com/) (v7)

### Data Fetching & Content Rendering
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Markdown Processing:** `react-markdown` & `remark-gfm`
- **Analytics:** `@vercel/analytics`

### Authentication & Integrations
- Google OAuth 2.0 (Client-side integration via Google Identity Services)

### Code Quality & Linting
- **Linter:** [ESLint](https://eslint.org/) (v10) with React Hooks & Refresh plugins

---

## 📁 Folder Structure

```text
frontend/
├── .env                  # Local environment configuration (git-ignored)
├── .env.example          # Environment variables template
├── eslint.config.js      # ESLint configuration
├── index.html            # Application HTML entry point
├── package.json          # Project dependencies & scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite build tool configuration & plugin setup
├── public/               # Static assets & public resources
└── src/
    ├── main.tsx          # React application root entry point
    ├── App.tsx           # Main application routing & layout container
    ├── index.css         # Global styles & Tailwind CSS v4 directives
    ├── api/              # API clients & service endpoints
    │   ├── auth.api.ts         # Authentication API requests
    │   ├── axios.ts            # Centralized Axios instance configuration
    │   ├── chat.api.ts         # AI chat & conversation API requests
    │   ├── user.api.ts         # User account API requests
    │   └── userProfile.api.ts  # Profile & portfolio management API requests
    ├── components/       # Reusable UI components
    │   ├── common/             # Generic atomic UI components (Buttons, Cards, Modals, Icons)
    │   ├── layout/             # Layout components (Navbar, Footer)
    │   ├── pages/              # Top-level page views (HomePage, DashboardPage, LoginPage, PublicProfilePage)
    │   ├── policies/           # Privacy policy & terms of service components
    │   └── sections/           # Landing page sections (Hero, Features, Pricing, FAQ, CTA)
    ├── config/           # Site metadata & static configuration
    │   └── site.ts             # Site metadata & navigation links configuration
    ├── store/            # Zustand global state stores
    │   ├── useAuthStore.ts     # User session & authentication state
    │   └── useUserProfileStore.ts # User profile state management
    ├── types/            # TypeScript type definitions & interfaces
    └── utils/            # Helper utilities
        └── googleAuth.ts       # Google OAuth helper script loader
```

---

## ⚙️ Prerequisites & Setup

### Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18.x or higher recommended)
- [npm](https://www.npmjs.com/) (v9.x or higher)
- Running **Meknos Backend Service** (or URL to deployed backend)

---

### Step-by-Step Setup

1. **Navigate to the Frontend Directory**
   ```bash
   cd frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root of the `frontend` directory based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

   Configure the environment variables in `.env`:
   ```env
   # Backend API Base URL
   VITE_API_URL=http://localhost:8000

   # Google OAuth Client ID
   VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
   ```

---

## 🚀 Running the Application

### 1. Development Mode
Start the Vite development server with hot module replacement (HMR):
```bash
npm run dev
```
The application will start listening at `http://localhost:5173` (or the port displayed in your terminal).

### 2. Build for Production
Compile TypeScript types and bundle assets for production using Vite:
```bash
npm run build
```
The compiled output will be generated inside the `dist/` directory.

### 3. Preview Production Build
Locally preview the generated production build:
```bash
npm run preview
```

### 4. Code Linting
Run ESLint to check for code quality issues:
```bash
npm run lint
```

---

## 📄 License

This repository is licensed under the [ISC License](LICENSE).
