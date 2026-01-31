# TalentSage - Frontend Task Submission

**AI-Native Recruitment Operating System**

A production-grade frontend application built with React + TypeScript + Next.js, featuring an AI assistant, video screening, and complete recruiter workflow.

## 📋 Overview

TalentSage is a comprehensive recruitment platform that includes:

- **Marketing Website**: Premium landing page with animations and impact metrics
- **Recruiter Dashboard**: Complete job and candidate management workflow
- **AI Assistant**: Voice-enabled chatbot with avatar animations
- **Video Screening**: Record/upload video responses with AI analysis
- **State Management**: Zustand-based persistent state with audit trails

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or 20+
- npm 9+ or yarn/pnpm equivalent

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

### Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📁 Project Structure

```
TalentSage/
├── src/                          # All source code lives under `src/`
│   ├── app/                      # Next.js app directory (app router)
│   │   ├── layout.tsx            # Root layout with AI Assistant
│   │   ├── page.tsx              # Marketing homepage
│   │   ├── globals.css           # Global styles
│   │   └── dashboard/            # Recruiter dashboard routes
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       ├── jobs/
│   │       ├── candidates/
│   │       └── video-screening/
│   │
│   ├── components/               # UI components (marketing, dashboard, ai-assistant, ui)
│   │   ├── marketing/
│   │   ├── dashboard/
│   │   ├── ai-assistant/
│   │   └── ui/
│   │
│   ├── lib/                      # Store, types, mocks, utilities
│   └── hooks/                    # Custom hooks
│
├── __tests__/                    # Test files
│   ├── store.candidate.test.ts
│   ├── store.rubric.test.ts
│   └── store.assistant.test.ts
│
├── public/                       # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
├── jest.config.js
└── jest.setup.js
```

## 🎯 Key Features & Completed Requirements

### ✅ Part A: Marketing Website

- **Hero Section**: Animated entrance with CTA buttons
- **Features Section**: Showcases 6 core TalentSage capabilities
- **Metrics Section**: Displays business impact (60% time-to-hire reduction, 75% faster screening, etc.)
- **How It Works**: Timeline animation showing recruitment flow
- **Testimonials**: Social proof section
- **Contact Information**: Houston + Dubai locations
- **Responsive**: Mobile, tablet, desktop optimized

### ✅ Part B: Recruiter Workspace

**Jobs & Candidates Flow:**

- View paginated list of open jobs
- Navigate to individual job with full details
- Edit evaluation rubric (weighted criteria system)
- View candidates pipeline for each job
- Move candidates through stages: Applied → Shortlisted → Interview → Hired/Rejected
- View candidate profiles with resume preview
- AI evaluation artifacts with scoring breakdown

**Candidate Profile:**

- Candidate summary and skills
- Resume text preview
- AI evaluation card (skills match, experience match, culture fit, recommendation)
- Audit log showing all events

**State Management:**

- Real-time stage transitions
- Persistent rubric updates (session + localStorage)
- Search/filter/sort functionality
- Empty states for better UX
- Error boundaries for graceful failures

### ✅ Part C: AI Assistant

**Floating Widget:**

- Always accessible chat panel
- Open/close/minimize states
- Timestamped messages
- Suggested action buttons

**Avatar with States:**

- Idle: Subtle pulse animation
- Listening: Sound wave animation
- Thinking: Rotating gradient
- Speaking: Pulsing scale animation

**Voice Support:**

- Speech-to-text input (Web Speech API)
- Text-to-speech output (Web Speech Synthesis API)
- Graceful fallback for unsupported browsers
- Visual indicators for voice states

**Real Actions:**

- "Shortlist top candidates": Moves top-scored candidates to shortlist stage
- "Generate evaluation rubric": Creates role-specific criteria
- "Schedule interview": Opens modal to book interview + adds audit log

### ✅ Part D: Video Screening

**Candidate Screening:**

- Record video (30-60 seconds)
- Upload video file
- Preview before submission
- Playback after submission

**Recruiter Controls:**

- Pass / Hold / Reject decision buttons
- Notes field for feedback
- Audit timeline tracking

**AI Screening Summary:**

- Transcript display (mock data)
- Scoring breakdown (communication, clarity, confidence, technical)
- Recommendation summary
- Key highlights extraction

### ✅ Part E: Engineering

**Code Quality:**

- Clean component architecture
- Reusable UI component library
- Consistent patterns and conventions
- Type-safe throughout with TypeScript

**Testing:**

- 3+ comprehensive tests covering:
  - Candidate stage management workflow
  - Rubric creation and validation
  - AI assistant actions and state management

**Documentation:**

- Clear README with setup instructions
- Inline code comments
- Type definitions for all data structures

## 🎨 Animation Approach

All animations leverage **Framer Motion** with performance considerations:

- **Hero Entrance**: Staggered fade-in + slide-up animations
- **Scroll Reveals**: Intersection Observer with `useInView` hook
- **Feature Carousel**: Swipe-enabled card transitions
- **Metrics Counters**: Animated number increments on view
- **Avatar States**: Smooth state transitions with strategic keyframes
- **UI Interactions**: Spring animations for natural feel

All animations are optimized to:

- Avoid layout shifts (using `transform` property)
- Respect `prefers-reduced-motion` setting
- Use CSS animations where possible over JavaScript
- Implement proper cleanup in useEffect hooks

## 🗄️ State Management

Using **Zustand** with persistence middleware:

```typescript
// Automatic persistence to localStorage
- Jobs and candidates list
- User preferences (sidebar state)
- Chat messages
- Interview schedules

// Audit Trail
- All candidate stage changes tracked
- Video screening reviews logged
- Rubric modifications recorded
- AI actions documented
```

## 📱 Responsive Design

- **Mobile**: Touch-optimized, single column layout
- **Tablet**: Optimized sidebar, larger touch targets
- **Desktop**: Full sidebar, multi-column layouts
- All components use Tailwind CSS with breakpoint utilities

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast compliant
- Screen reader friendly

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel deploy

# Set environment variables if needed
vercel env add
```

### Docker

```bash
# Build
docker build -t talentsage-frontend .

# Run
docker run -p 3000:3000 talentsage-frontend
```

### Static Export

```bash
# Build static site
npm run build -- --export

# Deploy 'out' folder to any static host
```

## 🧪 Testing Philosophy

Tests focus on **behavior and workflow**, not implementation details:

1. **Candidate Workflow Test**: Validates complete pipeline (Applied → Shortlisted → Interview)
2. **Rubric Logic Test**: Ensures weighted criteria system works
3. **Assistant Action Test**: Verifies AI actions trigger correct state changes

Run tests:

```bash
npm test
npm test:watch
npm test:coverage
```

## 🔧 Tech Stack

| Layer         | Technology                   |
| ------------- | ---------------------------- |
| Framework     | Next.js 15 + React 18        |
| Language      | TypeScript 5.3               |
| State         | Zustand 4.4                  |
| Animations    | Framer Motion 10             |
| Styling       | Tailwind CSS 3.4             |
| UI Components | Radix UI + Custom            |
| Icons         | Lucide React 0.344           |
| Forms         | React Hook Form              |
| Charts        | Recharts 2.10                |
| Testing       | Jest + React Testing Library |
| Dev Server    | Next.js Dev                  |

## 📝 Environment Variables

None required for demo! The application uses mock data.

For production:

```env
NEXT_PUBLIC_API_URL=your-api-url
NEXT_PUBLIC_ANALYTICS_ID=optional
```

## 🐛 Debugging

Enable verbose logging:

```typescript
// In lib/store.ts, uncomment for detailed state logs
// localStorage.setItem('debug', 'talentsage:*')
```

## 📞 Support Contact Information

**Vision Tact LLC**

- Phone: +(1) 281-786-0706
- Email: info@visiontact.com
- Houston: 8990 Kirby Dr, Ste 220, Houston, TX 77054, USA
- Dubai: Building A1, Dubai Digital Park, Dubai Silicon Oasis, UAE

## 📄 License

© 2026 Vision Tact LLC. All rights reserved.

## 🎯 Task Requirements Checklist

- [x] **Part A**: Premium marketing website with hero, features, metrics, contact info
- [x] **Part B**: Recruiter workflow - jobs, candidates, pipeline, rubric editing
- [x] **Part C**: AI Assistant - chat, avatar states, voice I/O, real actions
- [x] **Part D**: Video screening - record/upload, review, AI summary
- [x] **Part E**: Engineering - tests, documentation, clean code
- [x] **Animations**: Hero entrance, scroll reveals, feature carousel, counters, avatar
- [x] **Performance**: No layout shifts, responsive interactions, optimized animations
- [x] **State**: Consistent UI, persistent data, audit trails
- [x] **Responsive**: Mobile, tablet, desktop optimized
- [x] **Accessibility**: Semantic HTML, ARIA labels, keyboard support

---

**Last Updated**: January 31, 2026
**Status**: Production-Ready Demo
**Duration**: 3-day task submission
