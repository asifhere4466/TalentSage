import { renderHook, act } from "@testing-library/react";
import { useAppStore } from "@/lib/store";
import { mockCandidates, mockJobs } from "@/lib/mock-data";

describe("App Store - Candidate Stage Management", () => {
  // Reset store before each test
  beforeEach(() => {
    useAppStore.setState({
      candidates: mockCandidates,
      jobs: mockJobs,
      scheduledInterviews: [],
    });
  });

  it("should update candidate stage and add audit event", () => {
    const { result } = renderHook(() => useAppStore());
    const initialCandidates = result.current.candidates;
    const testCandidateId = initialCandidates[0].id;

    act(() => {
      result.current.updateCandidateStage(
        testCandidateId,
        "shortlisted",
        "Test User",
      );
    });

    const updatedCandidate = result.current.getCandidateById(testCandidateId);

    expect(updatedCandidate).toBeDefined();
    expect(updatedCandidate?.stage).toBe("shortlisted");
    expect(updatedCandidate?.auditLog.length).toBeGreaterThan(0);

    const lastAuditEvent =
      updatedCandidate?.auditLog[updatedCandidate.auditLog.length - 1];
    expect(lastAuditEvent?.type).toBe("stage_change");
    expect(lastAuditEvent?.description).toContain("Shortlisted");
  });

  it("should maintain state consistency when moving candidate through pipeline", () => {
    const { result } = renderHook(() => useAppStore());
    const testCandidateId = result.current.candidates[0].id;

    const before = result.current.getCandidateById(testCandidateId);
    const initialAuditLength = before?.auditLog.length || 0;

    act(() => {
      result.current.updateCandidateStage(
        testCandidateId,
        "shortlisted",
        "Recruiter",
      );
      result.current.updateCandidateStage(
        testCandidateId,
        "interview",
        "Recruiter",
      );
    });

    const candidate = result.current.getCandidateById(testCandidateId);

    expect(candidate?.stage).toBe("interview");
    expect(candidate?.auditLog.length).toBe(initialAuditLength + 2);
    expect(
      candidate?.auditLog[candidate.auditLog.length - 2].description,
    ).toContain("Shortlisted");
    expect(
      candidate?.auditLog[candidate.auditLog.length - 1].description,
    ).toContain("Interview");
  });

  it("should filter candidates by job correctly", () => {
    const { result } = renderHook(() => useAppStore());

    // Get candidates for first job
    const jobCandidates = result.current.getCandidatesForJob("job-1");

    expect(jobCandidates.length).toBeGreaterThan(0);
    expect(jobCandidates.every((c) => c.jobId === "job-1")).toBe(true);
  });
});
