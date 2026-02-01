"use client";

import Link from "next/link";
import { format } from "date-fns";
import { useAppStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash, Calendar } from "lucide-react";

export default function InterviewsPage() {
  const { scheduledInterviews, getCandidateById, cancelInterview } =
    useAppStore();

  if (!scheduledInterviews.length) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Interviews</h2>
        <Card>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No interviews scheduled yet.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Interviews</h2>
      <div className="grid grid-cols-1 gap-4">
        {scheduledInterviews.map((iv) => {
          const candidate = getCandidateById(iv.candidateId);
          return (
            <Card key={iv.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {candidate?.name || "Unknown Candidate"}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(iv.scheduledAt), "PPP p")}
                    </span>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => cancelInterview(iv.id)}
                    >
                      <Trash className="h-3 w-3 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Interviewer(s): {iv.interviewers?.join(", ")}
                </p>
                {candidate && (
                  <Link
                    href={`/dashboard/candidates/${candidate.id}`}
                    className="text-sm text-primary"
                  >
                    View candidate
                  </Link>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
