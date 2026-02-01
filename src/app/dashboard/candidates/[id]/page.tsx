"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  FileText,
  Star,
  Calendar,
  Video,
  Briefcase,
  GraduationCap,
  Award,
  XCircle,
  CheckCircle,
  ArrowRight,
  Clock,
  Sparkles,
  Download,
  Share2,
  ExternalLink,
} from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";
import { AuditTimeline } from "@/components/dashboard/audit-timeline";
import { VideoScreeningSection } from "@/components/dashboard/video-screening-section";
import { ScheduleModal } from "@/components/dashboard/schedule-modal";
import type { CandidateStage } from "@/lib/types";

const stageOrder: CandidateStage[] = [
  "new",
  "screening",
  "interview",
  "offer",
  "hired",
];

export default function CandidateDetailPage() {
  const params = useParams();
  const router = useRouter();
  const {
    getCandidateById,
    getJobById,
    moveCandidate,
    shortlistCandidate,
    rejectCandidate,
  } = useAppStore();

  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

  const candidate = getCandidateById(params.id as string);
  const job = candidate ? getJobById(candidate.jobId) : null;

  if (!candidate) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <XCircle className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Candidate not found</h2>
          <p className="text-muted-foreground mb-4">
            The candidate you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Button onClick={() => router.push("/dashboard/candidates")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Candidates
          </Button>
        </div>
      </div>
    );
  }

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
    router.push("/dashboard/candidates");
  };

  const stageColors: Record<CandidateStage, string> = {
    new: "bg-muted text-muted-foreground",
    applied: "bg-muted/10 text-muted-foreground",
    screening: "bg-primary/10 text-primary",
    shortlisted:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    interview: "bg-accent/10 text-accent",
    offer: "bg-warning/10 text-warning-foreground",
    hired: "bg-success/10 text-success",
    rejected: "bg-destructive/10 text-destructive",
  };

  const aiScore = candidate.aiScore ?? candidate.score;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="mt-1"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Avatar className="h-16 w-16 border-2 border-background shadow-lg">
            <AvatarImage
              src={candidate.avatar || "/placeholder.svg"}
              alt={candidate.name}
            />
            <AvatarFallback className="text-lg bg-primary/10 text-primary">
              {candidate.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">
                {candidate.name}
              </h1>
              {candidate.isShortlisted && (
                <Star className="h-5 w-5 text-warning fill-warning" />
              )}
              <Badge className={stageColors[candidate.stage]}>
                {candidate.stage}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              {candidate.currentRole || candidate.position}
              {candidate.currentCompany && ` at ${candidate.currentCompany}`}
            </p>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {candidate.location}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                {job?.title || "Unknown Position"}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Applied {format(new Date(candidate.appliedDate), "MMM d, yyyy")}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 pl-14 lg:pl-0">
          <Button onClick={handleMoveToNextStage}>
            <ArrowRight className="h-4 w-4 mr-2" />
            Move to Next Stage
          </Button>
          <Button variant="outline" onClick={handleShortlist}>
            <Star
              className={`h-4 w-4 mr-2 ${
                candidate.isShortlisted ? "fill-warning text-warning" : ""
              }`}
            />
            {candidate.isShortlisted ? "Shortlisted" : "Shortlist"}
          </Button>
          <Button variant="outline" onClick={() => setScheduleModalOpen(true)}>
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </Button>
          {candidate.videoScreening && (
            <Button variant="outline" asChild>
              <Link href={`/dashboard/video-screening/${candidate.id}`}>
                <Video className="h-4 w-4 mr-2" />
                View Video
              </Link>
            </Button>
          )}
          <Button variant="destructive" onClick={handleReject}>
            <XCircle className="h-4 w-4 mr-2" />
            Reject
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="bg-card border">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="resume">Resume</TabsTrigger>
              <TabsTrigger value="evaluation">AI Evaluation</TabsTrigger>
              <TabsTrigger value="video">Video Screening</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              {/* AI Summary Card */}
              <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    AI Assessment Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {candidate.aiEvaluation?.summary ||
                      candidate.aiSummary ||
                      "This candidate shows strong potential with relevant skills and experience for the position."}
                  </p>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full ${
                          aiScore >= 80
                            ? "bg-success"
                            : aiScore >= 60
                              ? "bg-warning"
                              : "bg-destructive"
                        }`}
                      />
                      <span className="text-lg font-bold">{aiScore}%</span>
                      <span className="text-sm text-muted-foreground">
                        Overall Match
                      </span>
                    </div>
                    {candidate.aiEvaluation?.recommendation && (
                      <Badge
                        variant={
                          candidate.aiEvaluation.recommendation === "strong_yes"
                            ? "default"
                            : candidate.aiEvaluation.recommendation === "yes"
                              ? "secondary"
                              : "outline"
                        }
                        className={
                          candidate.aiEvaluation.recommendation === "strong_yes"
                            ? "bg-success"
                            : ""
                        }
                      >
                        {candidate.aiEvaluation.recommendation
                          .replace("_", " ")
                          .toUpperCase()}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Skills</CardTitle>
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

              {/* Experience */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {Array.isArray(candidate.experience) ? (
                    <div className="space-y-4">
                      {candidate.experience.map((exp, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="relative pl-4 border-l-2 border-primary/30"
                        >
                          <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-primary" />
                          <h4 className="font-medium">{exp.role}</h4>
                          <p className="text-sm text-muted-foreground">
                            {exp.company}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {exp.duration}
                          </p>
                          {exp.description && (
                            <p className="text-sm mt-1">{exp.description}</p>
                          )}
                        </motion.div>
                      ))}
                    </div>
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
                  <CardTitle className="text-base flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {Array.isArray(candidate.education) ? (
                    <div className="space-y-3">
                      {candidate.education.map((edu, index) => (
                        <div
                          key={index}
                          className="relative pl-4 border-l-2 border-accent/30"
                        >
                          <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-accent" />
                          <h4 className="font-medium">{edu.degree}</h4>
                          <p className="text-sm text-muted-foreground">
                            {edu.school}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {edu.year}
                          </p>
                        </div>
                      ))}
                    </div>
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
                      <CardTitle className="text-base flex items-center gap-2">
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

            <TabsContent value="resume" className="space-y-4">
              <Card>
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Resume
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard?.writeText(candidate.resumeText);
                        toast.success("Resume copied to clipboard");
                      }}
                    >
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                          candidate.resumeText,
                        )}`}
                        download={`${candidate.name.replace(
                          /\s+/g,
                          "_",
                        )}_resume.txt`}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </a>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 rounded-lg p-4 max-h-[500px] overflow-auto">
                    <pre className="whitespace-pre-wrap text-sm text-muted-foreground font-mono">
                      {candidate.resumeText}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="evaluation" className="space-y-4">
              {/* AI Scores */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    AI Evaluation Scores
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {candidate.aiEvaluation ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">
                              Skills Match
                            </span>
                            <span className="font-medium">
                              {candidate.aiEvaluation.skillsMatch}%
                            </span>
                          </div>
                          <Progress
                            value={candidate.aiEvaluation.skillsMatch}
                            className="h-2"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">
                              Experience Match
                            </span>
                            <span className="font-medium">
                              {candidate.aiEvaluation.experienceMatch}%
                            </span>
                          </div>
                          <Progress
                            value={candidate.aiEvaluation.experienceMatch}
                            className="h-2"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">
                              Culture Fit
                            </span>
                            <span className="font-medium">
                              {candidate.aiEvaluation.cultureFit}%
                            </span>
                          </div>
                          <Progress
                            value={candidate.aiEvaluation.cultureFit}
                            className="h-2"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">
                              Overall Score
                            </span>
                            <span className="font-medium">
                              {candidate.aiEvaluation.overallScore}%
                            </span>
                          </div>
                          <Progress
                            value={candidate.aiEvaluation.overallScore}
                            className="h-2"
                          />
                        </div>
                      </div>

                      <Separator />

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2 flex items-center gap-2 text-success">
                            <CheckCircle className="h-4 w-4" />
                            Strengths
                          </h4>
                          <ul className="space-y-1">
                            {candidate.aiEvaluation.strengths.map(
                              (strength, index) => (
                                <li
                                  key={index}
                                  className="text-sm text-muted-foreground flex items-start gap-2"
                                >
                                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-success flex-shrink-0" />
                                  {strength}
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2 flex items-center gap-2 text-warning">
                            <XCircle className="h-4 w-4" />
                            Concerns
                          </h4>
                          <ul className="space-y-1">
                            {candidate.aiEvaluation.concerns.map(
                              (concern, index) => (
                                <li
                                  key={index}
                                  className="text-sm text-muted-foreground flex items-start gap-2"
                                >
                                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-warning flex-shrink-0" />
                                  {concern}
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground">
                        Evaluated on{" "}
                        {format(
                          new Date(candidate.aiEvaluation.evaluatedAt),
                          "MMM d, yyyy 'at' h:mm a",
                        )}
                      </p>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">
                        AI evaluation not available yet
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Rubric Evaluation */}
              {job?.rubric && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      Rubric Evaluation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {job.rubric.map((criterion) => {
                      const mockScore = Math.floor(Math.random() * 3) + 3;
                      return (
                        <div
                          key={criterion.id}
                          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                        >
                          <div>
                            <p className="font-medium text-sm">
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
                                className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
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

            <TabsContent value="video" className="space-y-4">
              <VideoScreeningSection candidateId={candidate.id} />
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Activity Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <AuditTimeline events={candidate.auditLog} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-4">
          {/* Contact Info */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <a
                href={`mailto:${candidate.email}`}
                className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
              >
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <span className="truncate">{candidate.email}</span>
              </a>
              <a
                href={`tel:${candidate.phone}`}
                className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
              >
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Phone className="h-4 w-4 text-accent" />
                </div>
                <span>{candidate.phone}</span>
              </a>
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-muted rounded-lg">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </div>
                <span>{candidate.location}</span>
              </div>

              <Separator className="my-2" />

              <div className="flex items-center gap-3">
                {candidate.linkedIn && (
                  <a
                    href={candidate.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-muted rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                {candidate.github && (
                  <a
                    href={candidate.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-muted rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                )}
                {candidate.resumeUrl && (
                  <a
                    href={candidate.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-muted rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <FileText className="h-5 w-5" />
                  </a>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Match Score */}
          <Card className="bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Match Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-4">
                <div className="relative">
                  <svg className="w-32 h-32" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-muted"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeDasharray={`${aiScore * 2.51} 251`}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                      className={
                        aiScore >= 80
                          ? "text-success"
                          : aiScore >= 60
                            ? "text-warning"
                            : "text-destructive"
                      }
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">{aiScore}%</span>
                  </div>
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground">
                {aiScore >= 80
                  ? "Excellent match for this role"
                  : aiScore >= 60
                    ? "Good potential candidate"
                    : "May need additional review"}
              </p>
            </CardContent>
          </Card>

          {/* Job Info */}
          {job && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Applied Position</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link
                  href={`/dashboard/jobs/${job.id}`}
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{job.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {job.department} | {job.location}
                      </p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Link>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Salary Range</span>
                  <span className="font-medium">
                    ${(job.salary.min / 1000).toFixed(0)}k - $
                    {(job.salary.max / 1000).toFixed(0)}k
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <Badge
                    variant={job.status === "open" ? "default" : "secondary"}
                    className={
                      job.status === "open" ? "bg-success text-white" : ""
                    }
                  >
                    {job.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Interview Status */}
          {candidate.interviewScheduled && (
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Scheduled Interview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">
                  {format(
                    new Date(candidate.interviewScheduled),
                    "EEEE, MMMM d, yyyy",
                  )}
                </p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(candidate.interviewScheduled), "h:mm a")}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                asChild
              >
                <a href={`mailto:${candidate.email}`}>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => setScheduleModalOpen(true)}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Interview
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => {
                  const url = window.location.href;
                  navigator.clipboard?.writeText(url);
                  toast.success("Link copied to clipboard");
                }}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <ScheduleModal
        open={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        candidate={candidate}
      />
    </motion.div>
  );
}
