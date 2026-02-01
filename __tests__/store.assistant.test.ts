import { renderHook, act } from "@testing-library/react";
import { useAppStore } from "@/lib/store";

describe("App Store - AI Assistant Actions", () => {
  beforeEach(() => {
    useAppStore.setState({
      candidates: useAppStore.getState().candidates,
      jobs: useAppStore.getState().jobs,
      selectedJobId: "job-1",
      selectedCandidateId: "cand-1",
      chatMessages: [],
    });
  });

  it("should shortlist top candidates for a job", () => {
    const { result } = renderHook(() => useAppStore());
    const jobId = "job-1";

    act(() => {
      result.current.shortlistTopCandidates(jobId);
    });

    // Get updated candidates
    const shortlistedCandidates = result.current
      .getCandidatesForJob(jobId)
      .filter((c) => c.stage === "shortlisted");

    // Verify that candidates were shortlisted
    expect(shortlistedCandidates.length).toBeGreaterThan(0);

    // Verify audit logs were created
    shortlistedCandidates.forEach((candidate) => {
      const hasAuditEvent = candidate.auditLog.some(
        (event) =>
          event.type === "stage_change" &&
          event.description.includes("Shortlisted"),
      );
      expect(hasAuditEvent).toBe(true);
    });
  });

  it("should add chat messages correctly", () => {
    const { result } = renderHook(() => useAppStore());

    act(() => {
      result.current.addChatMessage({
        role: "user",
        content: "Shortlist top candidates for this job",
      });
    });

    expect(result.current.chatMessages.length).toBe(1);
    expect(result.current.chatMessages[0].role).toBe("user");
    expect(result.current.chatMessages[0].content).toContain("Shortlist");
    expect(result.current.chatMessages[0].id).toBeDefined();
    expect(result.current.chatMessages[0].timestamp).toBeDefined();
  });

  it("should handle multiple chat messages in sequence", () => {
    const { result } = renderHook(() => useAppStore());

    act(() => {
      result.current.addChatMessage({
        role: "user",
        content: "Hello, can you help?",
      });

      result.current.addChatMessage({
        role: "assistant",
        content: "Of course! What do you need?",
      });

      result.current.addChatMessage({
        role: "user",
        content: "Generate a rubric",
      });
    });

    expect(result.current.chatMessages.length).toBe(3);
    expect(result.current.chatMessages[0].role).toBe("user");
    expect(result.current.chatMessages[1].role).toBe("assistant");
    expect(result.current.chatMessages[2].role).toBe("user");
  });

  it("should toggle assistant open/minimized states", () => {
    const { result } = renderHook(() => useAppStore());

    expect(result.current.assistantOpen).toBe(false);

    act(() => {
      result.current.setAssistantOpen(true);
    });

    expect(result.current.assistantOpen).toBe(true);

    act(() => {
      result.current.setAssistantMinimized(true);
    });

    expect(result.current.assistantMinimized).toBe(true);
    expect(result.current.assistantOpen).toBe(true); // Should still be open
  });

  it("should update assistant state correctly", () => {
    const { result } = renderHook(() => useAppStore());

    expect(result.current.assistantState).toBe("idle");

    act(() => {
      result.current.setAssistantState("listening");
    });

    expect(result.current.assistantState).toBe("listening");

    act(() => {
      result.current.setAssistantState("thinking");
    });

    expect(result.current.assistantState).toBe("thinking");

    act(() => {
      result.current.setAssistantState("speaking");
    });

    expect(result.current.assistantState).toBe("speaking");
  });
});
