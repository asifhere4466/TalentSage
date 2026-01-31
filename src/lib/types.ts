// Core Types for TalentSage

export type CandidateStage = 'applied' | 'shortlisted' | 'interview' | 'rejected' | 'hired';

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  position: string;
  jobId: string;
  stage: CandidateStage;
  appliedDate: string;
  score: number;
  skills: string[];
  experience: string;
  education: string;
  resumeText: string;
  location: string;
  aiEvaluation?: AIEvaluation;
  videoScreening?: VideoScreening;
  auditLog: AuditEvent[];
}

export interface AIEvaluation {
  overallScore: number;
  skillsMatch: number;
  experienceMatch: number;
  cultureFit: number;
  recommendation: 'strong_yes' | 'yes' | 'maybe' | 'no';
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
  aiSummary?: VideoAISummary;
  recruiterDecision?: {
    decision: 'pass' | 'hold' | 'reject';
    notes: string;
    decidedAt: string;
  };
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
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  status: 'open' | 'closed' | 'paused';
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
  type: 'stage_change' | 'rubric_update' | 'screening_submitted' | 'screening_reviewed' | 'interview_scheduled' | 'note_added' | 'ai_evaluation';
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
  type: 'phone' | 'video' | 'onsite';
  interviewers: string[];
  notes?: string;
}

// AI Assistant Types
export type AssistantState = 'idle' | 'listening' | 'thinking' | 'speaking';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  actions?: AssistantAction[];
}

export interface AssistantAction {
  id: string;
  type: 'shortlist' | 'generate_rubric' | 'schedule_interview' | 'view_candidate' | 'view_job';
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
