# ACE Campus Platform

A unified campus solution with role-based access and a dark orange theme.

## Tech Stack

- Next.js 14 App Router, React 18, TypeScript
- TailwindCSS, Radix UI/shadcn, Framer Motion
- MongoDB Atlas via Mongoose

## Setup

1. Install dependencies

```bash
npm i
```

2. Configure environment

```env
MONGODB_URI=
```

3. Run dev server

```bash
npm run dev
```

## Structure

```
app/
  api/
    login/route.ts
    signup/{student,teacher,canteen}/route.ts
  login/page.tsx
  signup/{page,student/page,teacher/page,canteen/page}.tsx
  student/{dashboard,timetable,food}/page.tsx
  teacher/{dashboard,timetable,food,attendance-management}/page.tsx
components/{student-sidebar,teacher-sidebar,user-menu}.tsx
lib/{db,models}.ts
```

## Auth

- Login: POST /api/login with { email, password, role }
- Signup: POST /api/signup/{student|teacher|canteen}
- Passwords hashed with bcryptjs
- Client session in localStorage: isLoggedIn, userRole, currentUser

## Features

- Timetable: days vertical, time slots horizontal, break slots
- Food: student and teacher UIs match with categories, badges, actions
- Attendance (teacher): section/date, mark all, per-student toggle, save
- Profile dropdown: initials, name, role, logout

## Theming

- Black background with orange accents
- Shared button/card styles in `components/ui/*` and `app/globals.css`

## Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

## Troubleshooting

- Verify MONGODB_URI for API 500s
- Ensure matching role collection for login
- Restart dev for Tailwind JIT issues
