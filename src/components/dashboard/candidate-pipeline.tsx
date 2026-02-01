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
  Calendar,
  Video,
  CheckCircle,
  XCircle,
  ChevronRight,
  GripVertical,
  ExternalLink,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Candidate, CandidateStage } from "@/lib/types";
import { CandidateDrawer } from "./candidate-drawer";
import { toast } from "sonner";
import Link from "next/link";

interface CandidatePipelineProps {
  jobId: string;
}

const stages: {
  id: CandidateStage;
  label: string;
  color: string;
  bgColor: string;
  iconColor: string;
}[] = [
  {
    id: "new",
    label: "New",
    color: "border-muted",
    bgColor: "bg-muted/30",
    iconColor: "text-muted-foreground",
  },
  {
    id: "screening",
    label: "Screening",
    color: "border-primary/30",
    bgColor: "bg-primary/5",
    iconColor: "text-primary",
  },
  {
    id: "interview",
    label: "Interview",
    color: "border-accent/30",
    bgColor: "bg-accent/5",
    iconColor: "text-accent",
  },
  {
    id: "offer",
    label: "Offer",
    color: "border-warning/30",
    bgColor: "bg-warning/5",
    iconColor: "text-warning",
  },
  {
    id: "hired",
    label: "Hired",
    color: "border-success/30",
    bgColor: "bg-success/5",
    iconColor: "text-success",
  },
];

export function CandidatePipeline({ jobId }: CandidatePipelineProps) {
  const { candidates, moveCandidate, shortlistCandidate, rejectCandidate } =
    useStore();
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null,
  );
  const [drawerOpen, setDrawerOpen] = useState(false);

  const jobCandidates = candidates.filter(
    (c) => c.jobId === jobId && c.stage !== "rejected",
  );

  const getCandidatesByStage = (stage: CandidateStage) => {
    // Map 'applied' and 'shortlisted' to appropriate stages for display
    if (stage === "new") {
      return jobCandidates.filter(
        (c) => c.stage === "new" || c.stage === "applied",
      );
    }
    if (stage === "screening") {
      return jobCandidates.filter(
        (c) => c.stage === "screening" || c.stage === "shortlisted",
      );
    }
    return jobCandidates.filter((c) => c.stage === stage);
  };

  const handleMoveCandidate = (
    candidateId: string,
    newStage: CandidateStage,
  ) => {
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
      <div className="w-full overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max lg:min-w-0 lg:grid lg:grid-cols-5">
          {stages.map((stage, stageIndex) => {
            const stageCandidates = getCandidatesByStage(stage.id);
            return (
              <motion.div
                key={stage.id}
                className="w-64 lg:w-auto min-w-[240px] lg:min-w-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: stageIndex * 0.1 }}
              >
                <Card
                  className={`border-2 ${stage.color} ${stage.bgColor} h-full`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${stage.iconColor.replace("text-", "bg-")}`}
                        />
                        <CardTitle className="text-sm font-semibold">
                          {stage.label}
                        </CardTitle>
                      </div>
                      <Badge
                        variant="secondary"
                        className={`text-xs font-semibold ${
                          stageCandidates.length > 0
                            ? stage.iconColor.replace("text-", "bg-") +
                              "/20 " +
                              stage.iconColor
                            : ""
                        }`}
                      >
                        {stageCandidates.length}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 min-h-[400px]">
                    <AnimatePresence mode="popLayout">
                      {stageCandidates.map((candidate, index) => {
                        const aiScore = candidate.aiScore ?? candidate.score;
                        return (
                          <motion.div
                            key={candidate.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                          >
                            <Card
                              className="cursor-pointer hover:shadow-lg hover:border-primary/30 transition-all duration-200 bg-card group"
                              onClick={() => handleViewCandidate(candidate)}
                            >
                              <CardContent className="p-3">
                                <div className="flex items-start gap-3">
                                  <div className="flex items-center gap-2">
                                    <GripVertical className="h-4 w-4 text-muted-foreground/50 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <Avatar className="h-10 w-10 border-2 border-background shadow-sm shrink-0">
                                      <AvatarImage
                                        src={
                                          candidate.avatar || "/placeholder.svg"
                                        }
                                      />
                                      <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                                        {candidate.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                      <h4 className="font-semibold text-sm truncate pr-2">
                                        {candidate.name}
                                      </h4>
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                                            onClick={(e) => e.stopPropagation()}
                                          >
                                            <MoreHorizontal className="h-4 w-4" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                          align="end"
                                          className="w-48"
                                        >
                                          <DropdownMenuItem
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleViewCandidate(candidate);
                                            }}
                                          >
                                            <ChevronRight className="h-4 w-4 mr-2" />
                                            Quick View
                                          </DropdownMenuItem>
                                          <DropdownMenuItem asChild>
                                            <Link
                                              href={`/dashboard/candidates/${candidate.id}`}
                                              onClick={(e) =>
                                                e.stopPropagation()
                                              }
                                            >
                                              <ExternalLink className="h-4 w-4 mr-2" />
                                              Full Profile
                                            </Link>
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
                                                    (s) => s.id === stage.id,
                                                  ) + 1;
                                                if (
                                                  nextStageIndex < stages.length
                                                ) {
                                                  handleMoveCandidate(
                                                    candidate.id,
                                                    stages[nextStageIndex].id,
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
                                            className="text-destructive focus:text-destructive"
                                          >
                                            <XCircle className="h-4 w-4 mr-2" />
                                            Reject Candidate
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>
                                    <p className="text-xs text-muted-foreground truncate">
                                      {candidate.currentRole}
                                      {candidate.currentCompany &&
                                        ` at ${candidate.currentCompany}`}
                                    </p>
                                    <div className="flex items-center gap-2 mt-2">
                                      <div className="flex items-center gap-1.5">
                                        <div
                                          className={`h-2 w-2 rounded-full ${
                                            aiScore >= 80
                                              ? "bg-success"
                                              : aiScore >= 60
                                                ? "bg-warning"
                                                : "bg-destructive"
                                          }`}
                                        />
                                        <span className="text-xs font-semibold">
                                          {aiScore}%
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
                        );
                      })}
                    </AnimatePresence>
                    {stageCandidates.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mb-3">
                          <Clock className="h-6 w-6 text-muted-foreground/50" />
                        </div>
                        <p className="text-muted-foreground text-sm">
                          No candidates in this stage
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      <CandidateDrawer
        candidate={selectedCandidate}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </>
  );
}
