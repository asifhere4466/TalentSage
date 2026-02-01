"use client";

import { useAppStore } from "@/lib/store";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Calendar,
  Video,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  XCircle,
  Play,
  ArrowRight,
} from "lucide-react";
import { format } from "date-fns";
import type { Candidate, CandidateStage } from "@/lib/types";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";
import { AuditTimeline } from "./audit-timeline";

interface CandidateDrawerProps {
  candidate: Candidate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const stageOrder: CandidateStage[] = [
  "new",
  "screening",
  "interview",
  "offer",
  "hired",
];

export function CandidateDrawer({
  candidate,
  open,
  onOpenChange,
}: CandidateDrawerProps) {
  const {
    moveCandidate,
    shortlistCandidate,
    rejectCandidate,
    scheduleInterview,
    getJobById,
  } = useAppStore();

  if (!candidate) return null;

  const job = getJobById(candidate.jobId);
  const jobRubric = job?.rubric;

  const handleMoveToNextStage = () => {
    const currentIndex = stageOrder.indexOf(candidate.stage);
    if (currentIndex < stageOrder.length - 1) {
      moveCandidate(candidate.id, stageOrder[currentIndex + 1]);
      toast.success(
        `${candidate.name} moved to ${stageOrder[currentIndex + 1]}`,
      );
    }
  };

  const handleShortlist = () => {
    shortlistCandidate(candidate.id);
    toast.success(
      candidate.isShortlisted
        ? `${candidate.name} removed from shortlist`
        : `${candidate.name} added to shortlist`,
    );
  };

  const handleReject = () => {
    rejectCandidate(candidate.id);
    toast.info(`${candidate.name} rejected`);
    onOpenChange(false);
  };

  const handleScheduleInterview = () => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    // scheduleInterview expects an interview object
    scheduleInterview({
      candidateId: candidate.id,
      jobId: candidate.jobId,
      scheduledAt: nextWeek.toISOString(),
      duration: 60,
      type: "video",
      interviewers: [],
      notes: "",
    });
    toast.success(`Interview scheduled for ${candidate.name}`);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader className="space-y-4">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={candidate.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-lg">
                {candidate.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <SheetTitle className="text-xl">{candidate.name}</SheetTitle>
                {candidate.isShortlisted && (
                  <Star className="h-4 w-4 text-warning fill-warning" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {candidate.currentRole || candidate.position}
                {candidate.currentCompany
                  ? ` at ${candidate.currentCompany}`
                  : ""}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Badge
                  variant={
                    candidate.stage === "hired"
                      ? "default"
                      : candidate.stage === "rejected"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {candidate.stage}
                </Badge>
                <div className="flex items-center gap-1 text-sm">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      (candidate.aiScore ?? candidate.score) >= 80
                        ? "bg-success"
                        : (candidate.aiScore ?? candidate.score) >= 60
                          ? "bg-warning"
                          : "bg-destructive"
                    }`}
                  />
                  <span className="font-medium">
                    {candidate.aiScore ?? candidate.score}% match
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            <Button size="sm" onClick={handleMoveToNextStage}>
              <ArrowRight className="h-4 w-4 mr-1" />
              Move to Next Stage
            </Button>
            <Button size="sm" variant="outline" onClick={handleShortlist}>
              <Star
                className={`h-4 w-4 mr-1 ${
                  candidate.isShortlisted ? "fill-warning text-warning" : ""
                }`}
              />
              {candidate.isShortlisted ? "Shortlisted" : "Shortlist"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleScheduleInterview}
            >
              <Calendar className="h-4 w-4 mr-1" />
              Schedule
            </Button>
            {candidate.videoScreening && (
              <Button size="sm" variant="outline" asChild>
                <Link href={`/dashboard/video-screening/${candidate.id}`}>
                  <Video className="h-4 w-4 mr-1" />
                  View Video
                </Link>
              </Button>
            )}
            <Button size="sm" variant="destructive" onClick={handleReject}>
              <XCircle className="h-4 w-4 mr-1" />
              Reject
            </Button>
          </div>
        </SheetHeader>

        <Separator className="my-4" />

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="resume">Resume</TabsTrigger>
            <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Contact Info */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`mailto:${candidate.email}`}
                    className="text-primary hover:underline"
                  >
                    {candidate.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{candidate.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{candidate.location}</span>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  {candidate.linkedIn && (
                    <a
                      href={candidate.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  {candidate.github && (
                    <a
                      href={candidate.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                  {candidate.resumeUrl && (
                    <a
                      href={candidate.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary"
                    >
                      <FileText className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* AI Summary */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <span className="h-2 w-2 bg-primary rounded-full animate-pulse" />
                  AI Assessment Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {candidate.aiSummary}
                </p>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Interview Status */}
            {candidate.interviewScheduled && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Scheduled Interview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium">
                    {format(
                      new Date(candidate.interviewScheduled),
                      "EEEE, MMMM d, yyyy 'at' h:mm a",
                    )}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="resume" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Resume Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-h-64 overflow-auto whitespace-pre-wrap text-sm text-muted-foreground">
                  {candidate.resumeText}
                </div>
                <div className="flex gap-2 mt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard?.writeText(candidate.resumeText);
                      toast.success("Resume copied to clipboard");
                    }}
                  >
                    Copy
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href={`data:text/plain;charset=utf-8,${encodeURIComponent(candidate.resumeText)}`}
                      download={`${candidate.name.replace(/\s+/g, "_")}_resume.txt`}
                    >
                      Download
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="evaluation" className="space-y-4">
            {/* AI Scores */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">AI Match Scores</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(candidate.scores ?? {}).map(([key, value]) => {
                  const v = Number(value ?? 0);
                  return (
                    <div key={key}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="capitalize text-muted-foreground">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                        <span className="font-medium">{v}%</span>
                      </div>
                      <Progress value={v} className="h-2" />
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Rubric Evaluation */}
            {jobRubric && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Rubric Evaluation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {jobRubric.map((criterion) => {
                    // Generate a mock score for demo
                    const mockScore = Math.floor(Math.random() * 3) + 3;
                    return (
                      <div
                        key={criterion.id}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="text-sm font-medium">
                            {criterion.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Weight: {criterion.weight}%
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((score) => (
                            <div
                              key={score}
                              className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${
                                score <= mockScore
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {score}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="experience" className="space-y-4">
            {/* Experience */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Work Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.isArray(candidate.experience) ? (
                  candidate.experience.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative pl-4 border-l-2 border-muted"
                    >
                      <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-primary" />
                      <h4 className="font-medium text-sm">{exp.role}</h4>
                      <p className="text-sm text-muted-foreground">
                        {exp.company}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {exp.duration}
                      </p>
                      <p className="text-sm mt-1">{exp.description}</p>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {candidate.experience}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.isArray(candidate.education) ? (
                  candidate.education.map((edu, index) => (
                    <div
                      key={index}
                      className="relative pl-4 border-l-2 border-muted"
                    >
                      <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-accent" />
                      <h4 className="font-medium text-sm">{edu.degree}</h4>
                      <p className="text-sm text-muted-foreground">
                        {edu.school}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {edu.year}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {candidate.education}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Certifications */}
            {candidate.certifications &&
              candidate.certifications.length > 0 && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Certifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {candidate.certifications.map((cert, index) => (
                        <Badge key={index} variant="outline">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
          </TabsContent>

          <TabsContent value="video" className="space-y-4">
            {candidate.videoScreening ? (
              <>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Video className="h-4 w-4" />
                      Video Screening
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                      <Button size="lg" className="z-10" asChild>
                        <Link
                          href={`/dashboard/video-screening/${candidate.id}`}
                        >
                          <Play className="h-6 w-6 mr-2" />
                          Watch Video
                        </Link>
                      </Button>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Submitted{" "}
                        {format(
                          new Date(candidate.videoScreening.submittedAt),
                          "MMM d, yyyy",
                        )}
                      </span>
                      <span className="font-medium">
                        Duration:{" "}
                        {Math.floor(candidate.videoScreening.duration / 60)}:
                        {(candidate.videoScreening.duration % 60)
                          .toString()
                          .padStart(2, "0")}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* AI Video Analysis */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <span className="h-2 w-2 bg-primary rounded-full animate-pulse" />
                      AI Video Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {candidate.videoScreening.aiAnalysis ??
                        candidate.videoScreening.aiSummary?.transcript ??
                        candidate.videoScreening.aiSummary?.recommendation}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Communication Score
                        </p>
                        <Progress
                          value={Number(
                            candidate.videoScreening.communicationScore ??
                              candidate.videoScreening.aiSummary
                                ?.communicationScore ??
                              0,
                          )}
                          className="h-2"
                        />
                        <p className="text-xs font-medium mt-1">
                          {Number(
                            candidate.videoScreening.communicationScore ??
                              candidate.videoScreening.aiSummary
                                ?.communicationScore ??
                              0,
                          )}
                          %
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Confidence Score
                        </p>
                        <Progress
                          value={Number(
                            candidate.videoScreening.confidenceScore ??
                              candidate.videoScreening.aiSummary
                                ?.confidenceScore ??
                              0,
                          )}
                          className="h-2"
                        />
                        <p className="text-xs font-medium mt-1">
                          {Number(
                            candidate.videoScreening.confidenceScore ??
                              candidate.videoScreening.aiSummary
                                ?.confidenceScore ??
                              0,
                          )}
                          %
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="py-8">
                  <div className="text-center text-muted-foreground">
                    <Video className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p className="font-medium">No video screening submitted</p>
                    <p className="text-sm mt-1">
                      Request a video screening from this candidate
                    </p>
                    <Button className="mt-4" size="sm">
                      Request Video Screening
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Activity Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <AuditTimeline events={candidate.auditLog} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
