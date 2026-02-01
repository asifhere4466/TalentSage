# TalentSage Frontend Task

Production-grade frontend demo simulating an AI-native recruitment
operating system.

## Overview

This project is a single frontend-only SaaS application built with
**Next.js, React, and TypeScript**.\
It combines a premium marketing website, a recruiter workspace, and a
global AI assistant to create a realistic product experience without
requiring a backend.

The focus of this implementation is **UI/UX quality, consistent state
management, complete workflows, and engineering discipline.**

---

## Live Demo

(Insert deployed Vercel link)

## GitHub Repository

(Insert repository link)

---

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Framer Motion for animations
- Zustand / Context API for state
- LocalStorage for persistence
- Web Speech API (with graceful fallback)
- Vercel deployment (Node 20)

---

## Key Features

### Marketing Experience

- Premium hero section with animation
- Product capability sections
- Animated impact metrics
- Responsive across devices
- Fast, stable navigation header

### Recruiter Workspace

- Jobs listing and detail views
- Candidate pipeline management
- Editable evaluation rubric
- Candidate profile with resume preview
- AI evaluation artifact UI
- Audit timeline for transparency

### AI Assistant

- Floating global widget
- Chat interface with timestamps
- Avatar state transitions (idle, listening, thinking, speaking)
- Voice input/output with fallback
- Deterministic logic triggering real UI actions:
  - Shortlist candidates
  - Generate rubric
  - Schedule interviews

### Video Screening

- Record or upload candidate videos
- Preview and playback support
- Recruiter decisions with notes
- AI-style screening summary with transcript and scoring

---

## Architecture

The application uses route groups to separate experiences:

- `(marketing)` -- Public-facing website\
- `(app)` -- Recruiter dashboard

A shared design system ensures visual consistency, while the global
assistant is mounted at the root layout for cross-app accessibility.

---

## State Management

Global state ensures workflow consistency across the application.\
Candidate stage transitions, rubric updates, and scheduling events
immediately propagate to all relevant UI surfaces.

Local persistence enhances realism while keeping the project
frontend-only.

---

## Testing

The project includes tests covering:

- Candidate stage workflow updates
- Rubric validation logic
- Assistant-triggered actions or video screening state

---

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm start
```

---

## Design Philosophy

This project was built to simulate a **trust-critical SaaS platform**
rather than a simple UI prototype.\
Every decision prioritizes clarity, predictability, performance, and
product-level polish.

---

## Notes for Reviewers

- All AI behavior is mocked intentionally.
- Dummy data is used to simulate production workflows.
- The focus is on frontend engineering quality rather than backend
  connectivity.
- I TRIED MY BEST TO COVER ALL THE FUNCTIONALITIES, IN THIS SHORT SPAN. I HOPE I GOT THEM ALL COMPLETED.

---

**Author:** Muhammad Asif
