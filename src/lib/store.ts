"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Job,
  Candidate,
  CandidateStage,
  RubricCriteria,
  AuditEvent,
  ScheduledInterview,
  ChatMessage,
  AssistantState,
  AssistantAction,
  VideoScreening,
} from "./types";
import { mockJobs, mockCandidates, generateRubricForRole } from "./mock-data";

interface AppState {
  // Jobs
  jobs: Job[];
  selectedJobId: string | null;
  setSelectedJob: (jobId: string | null) => void;
  updateJobRubric: (jobId: string, rubric: RubricCriteria[]) => void;

  // Candidates
  candidates: Candidate[];
  selectedCandidateId: string | null;
  setSelectedCandidate: (candidateId: string | null) => void;
  updateCandidateStage: (
    candidateId: string,
    stage: CandidateStage,
    actor: string,
  ) => void;
  addAuditEvent: (
    candidateId: string,
    event: Omit<AuditEvent, "id" | "timestamp">,
  ) => void;
  updateVideoScreening: (
    candidateId: string,
    screening: Partial<VideoScreening>,
  ) => void;
  setRecruiterDecision: (
    candidateId: string,
    decision: "pass" | "hold" | "reject",
    notes: string,
  ) => void;

  // Interviews
  scheduledInterviews: ScheduledInterview[];
  scheduleInterview: (interview: Omit<ScheduledInterview, "id">) => void;
  addInterview: (interview: ScheduledInterview) => void;

  // UI Actions for candidates
  moveCandidate: (candidateId: string, newStage: CandidateStage) => void;
  shortlistCandidate: (candidateId: string) => void;
  rejectCandidate: (candidateId: string) => void;

  // AI Assistant
  assistantOpen: boolean;
  assistantMinimized: boolean;
  assistantState: AssistantState;
  chatMessages: ChatMessage[];
  setAssistantOpen: (open: boolean) => void;
  setAssistantMinimized: (minimized: boolean) => void;
  setAssistantState: (state: AssistantState) => void;
  addChatMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => void;
  executeAssistantAction: (action: AssistantAction) => void;

  // Settings
  settings: {
    voiceEnabledDefault: boolean;
    prefersReducedMotion: boolean;
  };
  setVoiceEnabledDefault: (enabled: boolean) => void;
  setPrefersReducedMotion: (reduced: boolean) => void;

  // UI State
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // Helpers
  getCandidatesForJob: (jobId: string) => Candidate[];
  getJobById: (jobId: string) => Job | undefined;
  getCandidateById: (candidateId: string) => Candidate | undefined;

  // AI Actions
  shortlistTopCandidates: (jobId: string) => void;
  generateRubric: (jobId: string) => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial State
      jobs: mockJobs,
      selectedJobId: null,
      candidates: mockCandidates,
      selectedCandidateId: null,
      scheduledInterviews: [],
      assistantOpen: false,
      assistantMinimized: false,
      assistantState: "idle",
      chatMessages: [],
      sidebarCollapsed: false,

      // Settings
      settings: {
        voiceEnabledDefault: true,
        prefersReducedMotion: false,
      },
      setVoiceEnabledDefault: (enabled) =>
        set({
          settings: { ...(get().settings || {}), voiceEnabledDefault: enabled },
        }),
      setPrefersReducedMotion: (reduced) =>
        set({
          settings: {
            ...(get().settings || {}),
            prefersReducedMotion: reduced,
          },
        }),

      // Job Actions
      setSelectedJob: (jobId) => set({ selectedJobId: jobId }),

      updateJobRubric: (jobId, rubric) =>
        set((state) => ({
          jobs: state.jobs.map((job) =>
            job.id === jobId ? { ...job, rubric } : job,
          ),
        })),

      // Candidate Actions
      setSelectedCandidate: (candidateId) =>
        set({ selectedCandidateId: candidateId }),

      updateCandidateStage: (candidateId, stage, actor) =>
        set((state) => {
          const candidate = state.candidates.find((c) => c.id === candidateId);
          if (!candidate) return state;

          const auditEvent: AuditEvent = {
            id: generateId(),
            type: "stage_change",
            description: `Moved to ${stage.charAt(0).toUpperCase() + stage.slice(1)} stage`,
            timestamp: new Date().toISOString(),
            actor,
          };

          return {
            candidates: state.candidates.map((c) =>
              c.id === candidateId
                ? { ...c, stage, auditLog: [...c.auditLog, auditEvent] }
                : c,
            ),
          };
        }),

      addAuditEvent: (candidateId, event) =>
        set((state) => ({
          candidates: state.candidates.map((c) =>
            c.id === candidateId
              ? {
                  ...c,
                  auditLog: [
                    ...c.auditLog,
                    {
                      ...event,
                      id: generateId(),
                      timestamp: new Date().toISOString(),
                    },
                  ],
                }
              : c,
          ),
        })),

      updateVideoScreening: (candidateId, screening) =>
        set((state) => ({
          candidates: state.candidates.map((c) => {
            if (c.id !== candidateId) return c;
            const isNew = !c.videoScreening;
            const updatedScreening = c.videoScreening
              ? { ...c.videoScreening, ...screening }
              : ({ id: generateId(), ...screening } as VideoScreening);

            return {
              ...c,
              videoScreening: updatedScreening,
              auditLog: isNew
                ? [
                    ...c.auditLog,
                    {
                      id: generateId(),
                      type: "screening_submitted",
                      description: "Video screening submitted",
                      timestamp: new Date().toISOString(),
                      actor: "Candidate",
                    },
                  ]
                : c.auditLog,
            };
          }),
        })),

      setRecruiterDecision: (candidateId, decision, notes) =>
        set((state) => {
          const candidate = state.candidates.find((c) => c.id === candidateId);
          if (!candidate || !candidate.videoScreening) return state;

          const auditEvent: AuditEvent = {
            id: generateId(),
            type: "screening_reviewed",
            description: `Video screening reviewed - ${decision.charAt(0).toUpperCase() + decision.slice(1)}`,
            timestamp: new Date().toISOString(),
            actor: "Recruiter",
          };

          return {
            candidates: state.candidates.map((c) =>
              c.id === candidateId
                ? {
                    ...c,
                    videoScreening: {
                      ...c.videoScreening!,
                      recruiterDecision: {
                        decision,
                        notes,
                        decidedAt: new Date().toISOString(),
                      },
                    },
                    auditLog: [...c.auditLog, auditEvent],
                  }
                : c,
            ),
          };
        }),

      // Interview Actions
      scheduleInterview: (interview) =>
        set((state) => {
          const newInterview = { ...interview, id: generateId() };
          const candidate = state.candidates.find(
            (c) => c.id === interview.candidateId,
          );

          if (candidate) {
            const auditEvent: AuditEvent = {
              id: generateId(),
              type: "interview_scheduled",
              description: `Interview scheduled for ${new Date(interview.scheduledAt).toLocaleDateString()}`,
              timestamp: new Date().toISOString(),
              actor: "Recruiter",
            };

            return {
              scheduledInterviews: [...state.scheduledInterviews, newInterview],
              candidates: state.candidates.map((c) =>
                c.id === interview.candidateId
                  ? { ...c, auditLog: [...c.auditLog, auditEvent] }
                  : c,
              ),
            };
          }

          return {
            scheduledInterviews: [...state.scheduledInterviews, newInterview],
          };
        }),

      // Convenience to accept a full interview object (used by UI)
      addInterview: (interview) =>
        set((state) => {
          const i = interview.id
            ? interview
            : { ...interview, id: generateId() };
          const candidate = state.candidates.find(
            (c) => c.id === i.candidateId,
          );

          if (candidate) {
            const auditEvent: AuditEvent = {
              id: generateId(),
              type: "interview_scheduled",
              description: `Interview scheduled for ${new Date(i.scheduledAt).toLocaleDateString()}`,
              timestamp: new Date().toISOString(),
              actor: "Recruiter",
            };

            return {
              scheduledInterviews: [...state.scheduledInterviews, i],
              candidates: state.candidates.map((c) =>
                c.id === i.candidateId
                  ? { ...c, auditLog: [...c.auditLog, auditEvent] }
                  : c,
              ),
            };
          }

          return { scheduledInterviews: [...state.scheduledInterviews, i] };
        }),

      cancelInterview: (interviewId: string) =>
        set((state) => {
          const interview = state.scheduledInterviews.find(
            (iv) => iv.id === interviewId,
          );
          return {
            scheduledInterviews: state.scheduledInterviews.filter(
              (iv) => iv.id !== interviewId,
            ),
            candidates: interview
              ? state.candidates.map((c) =>
                  c.id === interview.candidateId
                    ? {
                        ...c,
                        auditLog: [
                          ...c.auditLog,
                          {
                            id: generateId(),
                            type: "interview_scheduled",
                            description: "Interview cancelled",
                            timestamp: new Date().toISOString(),
                            actor: "Recruiter",
                          },
                        ],
                      }
                    : c,
                )
              : state.candidates,
          };
        }),

      // Candidate convenience actions
      moveCandidate: (candidateId, newStage) =>
        set((state) => {
          const candidate = state.candidates.find((c) => c.id === candidateId);
          if (!candidate) return state;

          const auditEvent: AuditEvent = {
            id: generateId(),
            type: "stage_change",
            description: `Moved to ${newStage.charAt(0).toUpperCase() + newStage.slice(1)} stage`,
            timestamp: new Date().toISOString(),
            actor: "Recruiter",
          };

          return {
            candidates: state.candidates.map((c) =>
              c.id === candidateId
                ? {
                    ...c,
                    stage: newStage,
                    auditLog: [...c.auditLog, auditEvent],
                  }
                : c,
            ),
          };
        }),

      shortlistCandidate: (candidateId) =>
        set((state) => ({
          candidates: state.candidates.map((c) =>
            c.id === candidateId
              ? {
                  ...c,
                  stage: "shortlisted",
                  isShortlisted: true,
                  auditLog: [
                    ...c.auditLog,
                    {
                      id: generateId(),
                      type: "stage_change",
                      description: "Shortlisted by recruiter",
                      timestamp: new Date().toISOString(),
                      actor: "Recruiter",
                    },
                  ],
                }
              : c,
          ),
        })),

      rejectCandidate: (candidateId) =>
        set((state) => ({
          candidates: state.candidates.map((c) =>
            c.id === candidateId
              ? {
                  ...c,
                  stage: "rejected",
                  auditLog: [
                    ...c.auditLog,
                    {
                      id: generateId(),
                      type: "stage_change",
                      description: "Rejected by recruiter",
                      timestamp: new Date().toISOString(),
                      actor: "Recruiter",
                    },
                  ],
                }
              : c,
          ),
        })),

      // Assistant Actions
      setAssistantOpen: (open) => set({ assistantOpen: open }),
      setAssistantMinimized: (minimized) =>
        set({ assistantMinimized: minimized }),
      setAssistantState: (state) => set({ assistantState: state }),

      addChatMessage: (message) =>
        set((state) => ({
          chatMessages: [
            ...state.chatMessages,
            {
              ...message,
              id: generateId(),
              timestamp: new Date().toISOString(),
            },
          ],
        })),

      executeAssistantAction: (action) => {
        const state = get();

        switch (action.type) {
          case "shortlist":
            if (state.selectedJobId) {
              get().shortlistTopCandidates(state.selectedJobId);
            }
            break;
          case "generate_rubric":
            if (state.selectedJobId) {
              get().generateRubric(state.selectedJobId);
            }
            break;
          case "schedule_interview":
            // This is handled by the UI opening a modal
            break;
        }
      },

      // UI Actions
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

      // Helpers
      getCandidatesForJob: (jobId) =>
        get().candidates.filter((c) => c.jobId === jobId),

      getJobById: (jobId) => get().jobs.find((j) => j.id === jobId),

      getCandidateById: (candidateId) =>
        get().candidates.find((c) => c.id === candidateId),

      // AI Actions
      shortlistTopCandidates: (jobId) =>
        set((state) => {
          const jobCandidates = state.candidates.filter(
            (c) => c.jobId === jobId && c.stage === "applied",
          );
          const topCandidates = jobCandidates
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);

          return {
            candidates: state.candidates.map((c) => {
              if (topCandidates.find((tc) => tc.id === c.id)) {
                const auditEvent: AuditEvent = {
                  id: generateId(),
                  type: "stage_change",
                  description:
                    "AI-recommended shortlist - Moved to Shortlisted stage",
                  timestamp: new Date().toISOString(),
                  actor: "TalentSage AI",
                };
                return {
                  ...c,
                  stage: "shortlisted" as CandidateStage,
                  auditLog: [...c.auditLog, auditEvent],
                };
              }
              return c;
            }),
          };
        }),

      generateRubric: (jobId) =>
        set((state) => {
          const job = state.jobs.find((j) => j.id === jobId);
          if (!job) return state;

          const newRubric = generateRubricForRole(job.title);

          return {
            jobs: state.jobs.map((j) =>
              j.id === jobId ? { ...j, rubric: newRubric } : j,
            ),
          };
        }),
    }),
    {
      name: "talentsage-storage",
      partialize: (state) => ({
        jobs: state.jobs,
        candidates: state.candidates,
        scheduledInterviews: state.scheduledInterviews,
        chatMessages: state.chatMessages,
        settings: state.settings,
      }),
    },
  ),
);

// Backwards-compatible alias expected by components
export const useStore = useAppStore;
