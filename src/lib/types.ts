// Core Types for TalentSage

export type CandidateStage =
  | "new"
  | "applied"
  | "screening"
  | "shortlisted"
  | "interview"
  | "offer"
  | "hired"
  | "rejected";

export interface ExperienceEntry {
  role: string;
  company: string;
  duration?: string;
  description?: string;
}

export interface EducationEntry {
  degree: string;
  school: string;
  year?: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  position: string;
  currentRole?: string;
  currentCompany?: string;
  jobId: string;
  stage: CandidateStage;
  appliedDate: string;
  score: number;
  aiScore?: number; // optional alias used by some UI components
  skills: string[];
  // Support either a simple string (legacy mock data) or a structured array used by the UI
  experience: string | ExperienceEntry[];
  education: string | EducationEntry[];
  resumeText: string;
  location: string;
  aiEvaluation?: AIEvaluation;
  aiSummary?: string; // optional short summary used in UI
  scores?: Record<string, number>;
  linkedIn?: string;
  github?: string;
  resumeUrl?: string;
  isShortlisted?: boolean;
  interviewScheduled?: string | null;
  videoScreening?: VideoScreening;
  certifications?: string[];
  auditLog: AuditEvent[];
}

export interface AIEvaluation {
  overallScore: number;
  skillsMatch: number;
  experienceMatch: number;
  cultureFit: number;
  recommendation: "strong_yes" | "yes" | "maybe" | "no";
  summary: string;
  strengths: string[];
  concerns: string[];
  evaluatedAt: string;
}

export interface VideoScreening {
  id: string;
  videoUrl: string;
  duration: number;
  submittedAt: string;
  transcript?: string;
  // Short textual analysis sometimes displayed in the UI
  aiAnalysis?: string;
  // Legacy/optional top-level scores (UI may read from aiSummary instead)
  communicationScore?: number;
  confidenceScore?: number;
  aiSummary?: VideoAISummary;
  recruiterDecision?: {
    decision: "pass" | "hold" | "reject";
    notes: string;
    decidedAt: string;
  };
  // Additional optional fields used by UI and tests
  candidateId?: string;
  questions?: Array<{ question: string; timestamp?: number }>;
  technicalScore?: number;
  highlights?: string[];
  status?: "pending_review" | "reviewed" | "submitted" | string;
}

export interface VideoAISummary {
  communicationScore: number;
  clarityScore: number;
  confidenceScore: number;
  technicalScore: number;
  overallScore: number;
  transcript: string;
  keyPoints: string[];
  recommendation: string;
}

export interface RubricCriteria {
  id: string;
  name: string;
  description: string;
  weight: number;
  maxScore: number;
  scoreDescriptions?: Record<number, string>;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "remote";
  level: "junior" | "mid" | "senior" | "lead";
  status: "open" | "closed" | "paused";
  postedDate: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  rubric: RubricCriteria[];
  candidateCount: number;
}

export interface AuditEvent {
  id: string;
  type:
    | "stage_change"
    | "rubric_update"
    | "screening_submitted"
    | "screening_reviewed"
    | "interview_scheduled"
    | "note_added"
    | "ai_evaluation";
  description: string;
  timestamp: string;
  actor: string;
  metadata?: Record<string, unknown>;
}

export interface ScheduledInterview {
  id: string;
  candidateId: string;
  jobId: string;
  scheduledAt: string;
  duration: number;
  type: "phone" | "video" | "onsite" | "panel";
  interviewers: string[];
  notes?: string;
  status?: string;
}

// AI Assistant Types
export type AssistantState = "idle" | "listening" | "thinking" | "speaking";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  actions?: AssistantAction[];
}

export interface AssistantAction {
  id: string;
  type:
    | "shortlist"
    | "generate_rubric"
    | "schedule_interview"
    | "view_candidate"
    | "view_job";
  label: string;
  payload?: Record<string, unknown>;
  executed?: boolean;
}

// Navigation/UI Types
export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
}
