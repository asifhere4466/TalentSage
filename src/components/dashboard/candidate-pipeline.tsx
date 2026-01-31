"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Star,
  Mail,
  Phone,
  Calendar,
  Video,
  CheckCircle,
  XCircle,
  ChevronRight,
  GripVertical,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Candidate, CandidateStage } from "@/lib/types";
import { CandidateDrawer } from "./candidate-drawer";
import { toast } from "sonner";

interface CandidatePipelineProps {
  jobId: string;
}

const stages: { id: CandidateStage; label: string; color: string }[] = [
  { id: "new", label: "New", color: "bg-muted" },
  { id: "screening", label: "Screening", color: "bg-primary/10" },
  { id: "interview", label: "Interview", color: "bg-accent/10" },
  { id: "offer", label: "Offer", color: "bg-warning/10" },
  { id: "hired", label: "Hired", color: "bg-success/10" },
];

export function CandidatePipeline({ jobId }: CandidatePipelineProps) {
  const { candidates, moveCandidate, shortlistCandidate, rejectCandidate } = useStore();
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const jobCandidates = candidates.filter(
    (c) => c.jobId === jobId && c.stage !== "rejected"
  );

  const getCandidatesByStage = (stage: CandidateStage) => {
    return jobCandidates.filter((c) => c.stage === stage);
  };

  const handleMoveCandidate = (candidateId: string, newStage: CandidateStage) => {
    moveCandidate(candidateId, newStage);
    const candidate = candidates.find((c) => c.id === candidateId);
    toast.success(`${candidate?.name} moved to ${newStage}`);
  };

  const handleShortlist = (candidateId: string) => {
    shortlistCandidate(candidateId);
    const candidate = candidates.find((c) => c.id === candidateId);
    toast.success(`${candidate?.name} shortlisted`);
  };

  const handleReject = (candidateId: string) => {
    rejectCandidate(candidateId);
    const candidate = candidates.find((c) => c.id === candidateId);
    toast.info(`${candidate?.name} moved to rejected`);
  };

  const handleViewCandidate = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setDrawerOpen(true);
  };

  return (
    <>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => {
          const stageCandidates = getCandidatesByStage(stage.id);
          return (
            <div key={stage.id} className="flex-shrink-0 w-72">
              <Card className={`${stage.color} border-none`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">
                      {stage.label}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {stageCandidates.length}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 min-h-[400px]">
                  <AnimatePresence mode="popLayout">
                    {stageCandidates.map((candidate) => (
                      <motion.div
                        key={candidate.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Card
                          className="cursor-pointer hover:shadow-md transition-shadow bg-card"
                          onClick={() => handleViewCandidate(candidate)}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-start gap-3">
                              <div className="flex items-center gap-2">
                                <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={candidate.avatar || "/placeholder.svg"} />
                                  <AvatarFallback>
                                    {candidate.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium text-sm truncate">
                                    {candidate.name}
                                  </h4>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleViewCandidate(candidate);
                                        }}
                                      >
                                        <ChevronRight className="h-4 w-4 mr-2" />
                                        View Profile
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleShortlist(candidate.id);
                                        }}
                                      >
                                        <Star className="h-4 w-4 mr-2" />
                                        {candidate.isShortlisted
                                          ? "Remove from Shortlist"
                                          : "Add to Shortlist"}
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <Mail className="h-4 w-4 mr-2" />
                                        Send Email
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <Calendar className="h-4 w-4 mr-2" />
                                        Schedule Interview
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <Video className="h-4 w-4 mr-2" />
                                        Request Video Screen
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      {stage.id !== "hired" && (
                                        <DropdownMenuItem
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            const nextStageIndex =
                                              stages.findIndex(
                                                (s) => s.id === stage.id
                                              ) + 1;
                                            if (nextStageIndex < stages.length) {
                                              handleMoveCandidate(
                                                candidate.id,
                                                stages[nextStageIndex].id
                                              );
                                            }
                                          }}
                                        >
                                          <CheckCircle className="h-4 w-4 mr-2" />
                                          Move to Next Stage
                                        </DropdownMenuItem>
                                      )}
                                      <DropdownMenuItem
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleReject(candidate.id);
                                        }}
                                        className="text-destructive"
                                      >
                                        <XCircle className="h-4 w-4 mr-2" />
                                        Reject Candidate
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                                <p className="text-xs text-muted-foreground truncate">
                                  {candidate.currentRole} at {candidate.currentCompany}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <div className="flex items-center gap-1">
                                    <div
                                      className={`h-2 w-2 rounded-full ${
                                        candidate.aiScore >= 80
                                          ? "bg-success"
                                          : candidate.aiScore >= 60
                                          ? "bg-warning"
                                          : "bg-destructive"
                                      }`}
                                    />
                                    <span className="text-xs font-medium">
                                      {candidate.aiScore}%
                                    </span>
                                  </div>
                                  {candidate.isShortlisted && (
                                    <Star className="h-3 w-3 text-warning fill-warning" />
                                  )}
                                  {candidate.videoScreening && (
                                    <Video className="h-3 w-3 text-accent" />
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {stageCandidates.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground text-sm">
                      No candidates in this stage
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>

      <CandidateDrawer
        candidate={selectedCandidate}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </>
  );
}
