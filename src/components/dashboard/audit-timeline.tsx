"use client";

import { format } from "date-fns";
import type { AuditEvent } from "@/lib/types";

export function AuditTimeline({ events }: { events: AuditEvent[] }) {
  if (!events || events.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">No activity yet.</div>
    );
  }

  const sorted = [...events].sort(
    (a, b) => +new Date(b.timestamp) - +new Date(a.timestamp),
  );

  return (
    <ol className="space-y-4">
      {sorted.map((e) => (
        <li key={e.id} className="flex items-start gap-3">
          <div className="mt-1 w-2 h-2 rounded-full bg-muted flex-shrink-0" />
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-foreground">
                {e.description}
              </p>
              <span className="text-xs text-muted-foreground">
                • by {e.actor}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {format(new Date(e.timestamp), "PPP p")}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
