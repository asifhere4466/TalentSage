import { renderHook, act } from "@testing-library/react";
import { useAppStore } from "@/lib/store";

describe("App Store - Settings", () => {
  beforeEach(() => {
    useAppStore.setState({
      settings: { voiceEnabledDefault: true, prefersReducedMotion: false },
    });
  });

  it("should toggle voiceEnabledDefault", () => {
    const { result } = renderHook(() => useAppStore());
    expect(result.current.settings.voiceEnabledDefault).toBe(true);

    act(() => {
      result.current.setVoiceEnabledDefault(false);
    });

    expect(result.current.settings.voiceEnabledDefault).toBe(false);
  });

  it("should toggle prefersReducedMotion", () => {
    const { result } = renderHook(() => useAppStore());
    expect(result.current.settings.prefersReducedMotion).toBe(false);

    act(() => {
      result.current.setPrefersReducedMotion(true);
    });

    expect(result.current.settings.prefersReducedMotion).toBe(true);
  });
});
