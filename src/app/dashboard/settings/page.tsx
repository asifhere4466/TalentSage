"use client";

import { useAppStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const { settings, setVoiceEnabledDefault, setPrefersReducedMotion } =
    useAppStore();

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Settings</h2>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Assistant & Accessibility</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Assistant Voice</div>
              <div className="text-xs text-muted-foreground">
                Enable voice responses by default for the AI assistant
              </div>
            </div>
            <Switch
              checked={settings.voiceEnabledDefault}
              onCheckedChange={(v: boolean) =>
                setVoiceEnabledDefault(Boolean(v))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Reduce Motion</div>
              <div className="text-xs text-muted-foreground">
                Respect system & user reduced motion preference to simplify
                animations
              </div>
            </div>
            <Switch
              checked={settings.prefersReducedMotion}
              onCheckedChange={(v: boolean) =>
                setPrefersReducedMotion(Boolean(v))
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
