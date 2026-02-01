import { renderHook, act } from "@testing-library/react";
import { useAppStore } from "@/lib/store";

describe("App Store - Video Screening & Interviews", () => {
  beforeEach(() => {
    useAppStore.setState({
      candidates: useAppStore.getState().candidates,
      jobs: useAppStore.getState().jobs,
      scheduledInterviews: [],
    });
  });

  it("should add screening_submitted audit event on first video submission", () => {
    const { result } = renderHook(() => useAppStore());
    const candidateId = result.current.candidates[0].id;

    expect(
      result.current.getCandidateById(candidateId)?.videoScreening,
    ).toBeUndefined();

    act(() => {
      result.current.updateVideoScreening(candidateId, {
        id: "vs-test",
        candidateId,
        videoUrl: "/test.mp4",
        duration: 60,
        submittedAt: new Date().toISOString(),
        status: "pending_review",
      });
    });

    const updated = result.current.getCandidateById(candidateId);
    expect(updated?.videoScreening).toBeDefined();

    const lastAudit = updated?.auditLog[updated.auditLog.length - 1];
    expect(lastAudit).toBeDefined();
    expect(lastAudit?.type).toBe("screening_submitted");
    expect(lastAudit?.description).toContain("Video screening submitted");
  });

  it("should cancel scheduled interview and add a cancellation audit event", () => {
    const { result } = renderHook(() => useAppStore());
    const candidateId = result.current.candidates[0].id;

    act(() => {
      const jobId = result.current.jobs[0].id;
      result.current.scheduleInterview({
        candidateId,
        jobId,
        scheduledAt: new Date().toISOString(),
        duration: 30,
        type: "phone",
        interviewers: ["Interviewer"],
      });
    });

    const scheduled = result.current.scheduledInterviews[0];
    expect(scheduled).toBeDefined();

    act(() => {
      result.current.cancelInterview(scheduled.id);
    });

    expect(
      result.current.scheduledInterviews.find((s) => s.id === scheduled.id),
    ).toBeUndefined();

    const updated = result.current.getCandidateById(candidateId);
    const lastAudit = updated?.auditLog[updated.auditLog.length - 1];

    expect(lastAudit).toBeDefined();
    expect(lastAudit?.description).toContain("cancelled");
  });
});
