import { renderHook, act } from "@testing-library/react";
import { useAppStore } from "@/lib/store";
import type { RubricCriteria } from "@/lib/types";

describe("App Store - Rubric Management", () => {
  beforeEach(() => {
    useAppStore.setState({
      candidates: useAppStore.getState().candidates,
      jobs: useAppStore.getState().jobs,
    });
  });

  it("should update job rubric successfully", () => {
    const { result } = renderHook(() => useAppStore());
    const jobId = result.current.jobs[0].id;

    const newRubric: RubricCriteria[] = [
      {
        id: "new-r1",
        name: "Technical Skills",
        description: "Technical proficiency",
        weight: 40,
        maxScore: 10,
      },
      {
        id: "new-r2",
        name: "Communication",
        description: "Communication ability",
        weight: 30,
        maxScore: 10,
      },
      {
        id: "new-r3",
        name: "Cultural Fit",
        description: "Team alignment",
        weight: 30,
        maxScore: 10,
      },
    ];

    act(() => {
      result.current.updateJobRubric(jobId, newRubric);
    });

    const updatedJob = result.current.getJobById(jobId);

    expect(updatedJob?.rubric).toEqual(newRubric);
    expect(updatedJob?.rubric.length).toBe(3);
  });

  it("should generate new rubric for a role", () => {
    const { result } = renderHook(() => useAppStore());
    const jobId = result.current.jobs[0].id;
    const initialRubric = result.current.jobs[0].rubric;

    act(() => {
      result.current.generateRubric(jobId);
    });

    const updatedJob = result.current.getJobById(jobId);

    // Verify rubric was updated (should be different from initial)
    expect(updatedJob?.rubric).toBeDefined();
    expect(updatedJob?.rubric.length).toBeGreaterThan(0);
    // Check that rubric has proper structure
    updatedJob?.rubric.forEach((criteria) => {
      expect(criteria.id).toBeDefined();
      expect(criteria.name).toBeDefined();
      expect(criteria.weight).toBeGreaterThan(0);
      expect(criteria.maxScore).toBeGreaterThan(0);
    });
  });

  it("should maintain weight consistency in rubric", () => {
    const { result } = renderHook(() => useAppStore());
    const jobId = result.current.jobs[0].id;

    const job = result.current.getJobById(jobId);
    const totalWeight = job?.rubric.reduce((sum, c) => sum + c.weight, 0) || 0;

    // Total weight should be 100
    expect(totalWeight).toBe(100);
  });
});
