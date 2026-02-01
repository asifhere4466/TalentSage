"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
  ThumbsUp,
  ThumbsDown,
  Clock,
  MessageSquare,
  CheckCircle,
  Sparkles,
  Download,
  Share2,
  Video,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { format } from "date-fns";

export default function VideoScreeningPage() {
  const params = useParams();
  const router = useRouter();
  const { getCandidateById, getJobById, setRecruiterDecision, addAuditEvent } =
    useAppStore();

  const candidate = getCandidateById(params.candidateId as string);
  const job = candidate ? getJobById(candidate.jobId) : null;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(45); // Default 45 seconds
  const [notes, setNotes] = useState("");
  const [decision, setDecision] = useState<"pass" | "hold" | "reject" | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (candidate?.videoScreening?.recruiterDecision) {
      setDecision(candidate.videoScreening.recruiterDecision.decision);
      setNotes(candidate.videoScreening.recruiterDecision.notes);
    }
    if (candidate?.videoScreening?.duration) {
      setDuration(candidate.videoScreening.duration);
    }
  }, [candidate]);

  // Simulate video playback
  useEffect(() => {
    if (isPlaying && currentTime < duration) {
      progressInterval.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isPlaying, duration, currentTime]);

  if (!candidate) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <Video className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Candidate not found</h2>
          <p className="text-muted-foreground mb-4">
            This candidate doesn&apos;t exist or has been removed.
          </p>
          <Button onClick={() => router.push("/dashboard/candidates")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Candidates
          </Button>
        </div>
      </div>
    );
  }

  if (!candidate.videoScreening) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <Video className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">
            No video screening available
          </h2>
          <p className="text-muted-foreground mb-4">
            This candidate hasn&apos;t submitted a video screening yet.
          </p>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const screening = candidate.videoScreening;

  // Get scores with fallbacks
  const communicationScore =
    screening.aiSummary?.communicationScore ??
    screening.communicationScore ??
    85;
  const confidenceScore =
    screening.aiSummary?.confidenceScore ?? screening.confidenceScore ?? 78;
  const technicalScore =
    screening.aiSummary?.technicalScore ?? screening.technicalScore ?? 82;
  const clarityScore = screening.aiSummary?.clarityScore ?? 80;
  const overallScore =
    screening.aiSummary?.overallScore ??
    Math.round((communicationScore + confidenceScore + technicalScore) / 3);

  const togglePlay = () => {
    if (currentTime >= duration) {
      setCurrentTime(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (seconds: number) => {
    setCurrentTime((prev) => Math.max(0, Math.min(duration, prev + seconds)));
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    setCurrentTime(Math.round(percentage * duration));
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSubmitDecision = async () => {
    if (!decision) {
      toast.error("Please select a decision");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    setRecruiterDecision(candidate.id, decision, notes);

    // Add audit event
    addAuditEvent(candidate.id, {
      type: "screening_reviewed",
      description: `Video screening reviewed - Decision: ${decision.charAt(0).toUpperCase() + decision.slice(1)}`,
      actor: "John Recruiter",
    });

    setIsSubmitting(false);
    toast.success("Decision saved successfully");
  };

  // Default highlights if not provided
  const highlights = screening.highlights ?? [
    "Clear communication of technical concepts",
    "Demonstrated problem-solving approach",
    "Good understanding of role requirements",
    "Professional presentation",
  ];

  // Default questions if not provided
  const questions = screening.questions ?? [
    {
      question: "Tell us about your experience with frontend development",
      timestamp: 0,
    },
    { question: "How do you approach complex UI challenges?", timestamp: 15 },
    { question: "Describe a project you're proud of", timestamp: 30 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 max-w-full"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-primary/20">
              <AvatarImage
                src={candidate.avatar || "/placeholder.svg"}
                alt={candidate.name}
              />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {candidate.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold">{candidate.name}</h1>
              <p className="text-sm text-muted-foreground">
                | {job?.title || candidate.position}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 ml-14 sm:ml-0">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Main Content - Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Player - Takes 2 columns on large screens */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="overflow-hidden">
            <div className="relative aspect-video bg-gradient-to-br from-slate-900 to-slate-800">
              {/* Video placeholder - simulated player */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 border border-white/20">
                    <Avatar className="h-20 w-20">
                      <AvatarImage
                        src={candidate.avatar || "/placeholder.svg"}
                        alt={candidate.name}
                      />
                      <AvatarFallback className="text-2xl bg-primary/20 text-white">
                        {candidate.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <p className="text-lg font-medium">{candidate.name}</p>
                  <p className="text-sm opacity-80">Video Response</p>
                </div>
              </div>

              {/* Play button overlay */}
              {!isPlaying && (
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/90 hover:bg-primary flex items-center justify-center shadow-lg transition-all hover:scale-105">
                    <Play className="h-10 w-10 text-white ml-1" />
                  </div>
                </button>
              )}

              {/* Playing indicator */}
              {isPlaying && (
                <div className="absolute top-4 left-4">
                  <Badge
                    variant="secondary"
                    className="bg-red-500/90 text-white border-0"
                  >
                    <span className="w-2 h-2 rounded-full bg-white mr-2 animate-pulse" />
                    Playing
                  </Badge>
                </div>
              )}
            </div>

            {/* Video Controls */}
            <div className="p-4 bg-card border-t">
              <div
                className="mb-3 cursor-pointer group"
                onClick={handleProgressClick}
              >
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => handleSeek(-10)}
                  >
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10"
                    onClick={togglePlay}
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => handleSeek(10)}
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground ml-2 font-mono">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Maximize className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Questions and Responses */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                Interview Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {questions.map((q, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-muted/50 hover:bg-muted/70 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{q.question}</p>
                      <button
                        className="text-xs text-primary mt-2 hover:underline"
                        onClick={() => setCurrentTime(q.timestamp ?? 0)}
                      >
                        Jump to response ({formatTime(q.timestamp ?? 0)})
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* AI Analysis */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                AI Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Overall Score */}
              <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl">
                <div className="text-4xl font-bold text-primary mb-1">
                  {overallScore}%
                </div>
                <p className="text-xs text-muted-foreground">Overall Score</p>
              </div>

              <Separator />

              {/* Score Breakdown */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      Communication
                    </span>
                    <span className="text-sm font-semibold">
                      {communicationScore}%
                    </span>
                  </div>
                  <Progress value={communicationScore} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      Confidence
                    </span>
                    <span className="text-sm font-semibold">
                      {confidenceScore}%
                    </span>
                  </div>
                  <Progress value={confidenceScore} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      Technical Clarity
                    </span>
                    <span className="text-sm font-semibold">
                      {technicalScore}%
                    </span>
                  </div>
                  <Progress value={technicalScore} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      Clarity
                    </span>
                    <span className="text-sm font-semibold">
                      {clarityScore}%
                    </span>
                  </div>
                  <Progress value={clarityScore} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Highlights */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Key Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Recruiter Decision */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Your Decision</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={decision === "pass" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDecision("pass")}
                  className={
                    decision === "pass"
                      ? "bg-success hover:bg-success/90 border-success"
                      : "hover:border-success hover:text-success"
                  }
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Pass
                </Button>
                <Button
                  variant={decision === "hold" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDecision("hold")}
                  className={
                    decision === "hold"
                      ? "bg-warning hover:bg-warning/90 border-warning text-warning-foreground"
                      : "hover:border-warning hover:text-warning"
                  }
                >
                  <Clock className="h-4 w-4 mr-1" />
                  Hold
                </Button>
                <Button
                  variant={decision === "reject" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDecision("reject")}
                  className={
                    decision === "reject"
                      ? "bg-destructive hover:bg-destructive/90"
                      : "hover:border-destructive hover:text-destructive"
                  }
                >
                  <ThumbsDown className="h-4 w-4 mr-1" />
                  Reject
                </Button>
              </div>
              <Textarea
                placeholder="Add your notes about this screening..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="resize-none"
              />
              <Button
                className="w-full"
                onClick={handleSubmitDecision}
                disabled={!decision || isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Decision"}
              </Button>
              {screening.recruiterDecision && (
                <p className="text-xs text-muted-foreground text-center">
                  Last updated:{" "}
                  {format(
                    new Date(screening.recruiterDecision.decidedAt),
                    "MMM d, yyyy 'at' h:mm a",
                  )}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Submission Info */}
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>
                  Submitted{" "}
                  {format(new Date(screening.submittedAt), "MMM d, yyyy")}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
