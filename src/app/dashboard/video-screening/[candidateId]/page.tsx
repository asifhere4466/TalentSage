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
  AlertCircle,
  Sparkles,
  Download,
  Share2,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { format } from "date-fns";

export default function VideoScreeningPage() {
  const params = useParams();
  const router = useRouter();
  const { getCandidateById, getJobById, setRecruiterDecision } = useAppStore();

  const candidate = getCandidateById(params.candidateId as string);
  const job = candidate ? getJobById(candidate.jobId) : null;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, _setCurrentTime] = useState(0);
  const [duration, _setDuration] = useState(0);
  const [notes, setNotes] = useState("");
  const [decision, setDecision] = useState<"pass" | "hold" | "reject" | null>(
    null,
  );
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (candidate?.videoScreening?.recruiterDecision) {
      setDecision(candidate.videoScreening.recruiterDecision.decision);
      setNotes(candidate.videoScreening.recruiterDecision.notes);
    }
  }, [candidate]);

  if (!candidate) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Candidate not found</h2>
          <Button onClick={() => router.push("/dashboard/jobs")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Button>
        </div>
      </div>
    );
  }

  if (!candidate.videoScreening) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
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

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(
        0,
        Math.min(duration, currentTime + seconds),
      );
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSubmitDecision = () => {
    if (!decision) {
      toast.error("Please select a decision");
      return;
    }

    setRecruiterDecision(candidate.id, decision, notes);
    toast.success("Decision saved successfully");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={candidate.avatar || "/placeholder.svg"}
                alt={candidate.name}
              />
              <AvatarFallback>
                {candidate.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold">{candidate.name}</h1>
              <p className="text-sm text-muted-foreground">
                {candidate.currentRole} | {job?.title}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
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

      <div className="grid grid-cols-3 gap-6">
        {/* Video Player */}
        <div className="col-span-2 space-y-4">
          <Card className="overflow-hidden">
            <div className="relative aspect-video bg-black">
              {/* Video placeholder - simulated player */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                <div className="text-center text-white">
                  <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage
                        src={candidate.avatar || "/placeholder.svg"}
                        alt={candidate.name}
                      />
                      <AvatarFallback className="text-2xl">
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
                  className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
                >
                  <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center">
                    <Play className="h-10 w-10 text-primary ml-1" />
                  </div>
                </button>
              )}
            </div>

            {/* Video Controls */}
            <div className="p-4 bg-card">
              <div className="mb-3">
                <Progress
                  value={(currentTime / (duration || screening.duration)) * 100}
                  className="h-1 cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleSeek(-10)}
                  >
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={togglePlay}>
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleSeek(10)}
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground ml-2">
                    {formatTime(currentTime)} /{" "}
                    {formatTime(duration || screening.duration)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Maximize className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Questions and Responses */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Interview Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {screening.questions?.map((q, index) => (
                <div key={index} className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{q.question}</p>
                      <button className="text-xs text-primary mt-2 hover:underline">
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
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                AI Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {screening.aiAnalysis}
              </p>
              <Separator />
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">
                      Communication
                    </span>
                    <span className="text-xs font-medium">
                      {screening.communicationScore ?? 0}%
                    </span>
                  </div>
                  <Progress
                    value={screening.communicationScore ?? 0}
                    className="h-1.5"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">
                      Confidence
                    </span>
                    <span className="text-xs font-medium">
                      {screening.confidenceScore}%
                    </span>
                  </div>
                  <Progress
                    value={screening.confidenceScore}
                    className="h-1.5"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">
                      Technical Clarity
                    </span>
                    <span className="text-xs font-medium">
                      {screening.technicalScore}%
                    </span>
                  </div>
                  <Progress
                    value={screening.technicalScore}
                    className="h-1.5"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Highlights */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Key Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {screening.highlights?.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Recruiter Decision */}
          <Card>
            <CardHeader className="pb-2">
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
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : ""
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
                    decision === "hold" ? "bg-amber-600 hover:bg-amber-700" : ""
                  }
                >
                  <AlertCircle className="h-4 w-4 mr-1" />
                  Hold
                </Button>
                <Button
                  variant={decision === "reject" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDecision("reject")}
                  className={
                    decision === "reject"
                      ? "bg-destructive hover:bg-destructive/90"
                      : ""
                  }
                >
                  <ThumbsDown className="h-4 w-4 mr-1" />
                  Reject
                </Button>
              </div>
              <Textarea
                placeholder="Add your notes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="resize-none"
              />
              <Button
                className="w-full"
                onClick={handleSubmitDecision}
                disabled={!decision}
              >
                Save Decision
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
