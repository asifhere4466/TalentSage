"use client";

import React from "react";

import { useState, useRef } from "react";
import { useAppStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Video,
  Upload,
  Play,
  Pause,
  CheckCircle,
  Clock,
  Sparkles,
  ExternalLink,
  Camera,
  Mic,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { format } from "date-fns";
import Link from "next/link";

interface VideoScreeningSectionProps {
  candidateId: string;
}

export function VideoScreeningSection({
  candidateId,
}: VideoScreeningSectionProps) {
  const { getCandidateById, updateVideoScreening } = useAppStore();
  const candidate = getCandidateById(candidateId);
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [pendingScreening, setPendingScreening] =
    useState<Partial<VideoScreening> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!candidate) return null;

  const screening = candidate.videoScreening;

  const submitPendingScreening = () => {
    if (!pendingScreening) return;
    updateVideoScreening(candidateId, pendingScreening);
    setPendingScreening(null);
    toast.success("Video submitted and analyzed successfully");
  };

  const cancelPending = () => {
    setPendingScreening(null);
    toast.info("Submission canceled");
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate upload completion and show preview before committing
    setTimeout(() => {
      clearInterval(interval);
      setIsUploading(false);
      setUploadProgress(0);

      const candidateScreening: Partial<VideoScreening> = {
        id: `vs_${Date.now()}`,
        videoUrl: URL.createObjectURL(file),
        duration: 180,
        submittedAt: new Date().toISOString(),
        status: "pending_review",
        questions: [
          {
            question: "Tell us about yourself and your background",
            timestamp: 0,
          },
          { question: "What interests you about this role?", timestamp: 60 },
          {
            question: "Describe a challenging project you've worked on",
            timestamp: 120,
          },
        ],
        aiAnalysis:
          "The candidate demonstrates strong communication skills and enthusiasm for the role. Technical explanations were clear and well-structured.",
        communicationScore: 85,
        confidenceScore: 78,
        technicalScore: 82,
        highlights: [
          "Clear articulation of technical concepts",
          "Demonstrated relevant project experience",
          "Showed genuine enthusiasm for the role",
        ],
      };

      setPendingScreening(candidateScreening);
    }, 2500);
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    toast.info("Recording started - speak clearly into your microphone");

    // Simulate recording and show preview before committing
    setTimeout(() => {
      setIsRecording(false);

      const recordedScreening: Partial<VideoScreening> = {
        id: `vs_${Date.now()}`,
        videoUrl: "/placeholder-video.mp4",
        duration: 120,
        submittedAt: new Date().toISOString(),
        status: "pending_review",
        questions: [
          {
            question: "Tell us about yourself and your background",
            timestamp: 0,
          },
          { question: "What interests you about this role?", timestamp: 40 },
          {
            question: "Describe a challenging project you've worked on",
            timestamp: 80,
          },
        ],
        aiAnalysis:
          "Strong candidate showing excellent communication abilities. Responses were thoughtful and demonstrated relevant experience.",
        communicationScore: 88,
        confidenceScore: 82,
        technicalScore: 85,
        highlights: [
          "Excellent verbal communication",
          "Strong technical background",
          "Good cultural fit indicators",
        ],
      };

      setPendingScreening(recordedScreening);
    }, 5000);
  };

  if (!screening) {
    return (
      <>
        <AnimatePresence>
          {pendingScreening && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="relative w-full max-w-2xl bg-popover rounded-lg shadow-lg overflow-hidden">
                <div className="p-4 border-b flex items-center justify-between">
                  <h3 className="font-medium">Preview Submission</h3>
                  <span className="text-sm text-muted-foreground">
                    {pendingScreening.submittedAt
                      ? format(new Date(pendingScreening.submittedAt), "MMM d, yyyy")
                      : ""}
                  </span>
                </div>
                <div className="p-4 space-y-4">
                  <div className="aspect-video bg-black rounded overflow-hidden">
                    <video
                      src={pendingScreening.videoUrl}
                      controls
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {pendingScreening.aiAnalysis && (
                    <p className="text-sm text-muted-foreground">
                      {pendingScreening.aiAnalysis}
                    </p>
                  )}

                  <div className="flex items-center gap-2 justify-end">
                    <Button variant="ghost" onClick={cancelPending}>
                      Cancel
                    </Button>
                    <Button onClick={submitPendingScreening}>Confirm & Submit</Button>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/40" onClick={cancelPending} />
            </motion.div>
          )}
        </AnimatePresence>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Video className="h-5 w-5" />
              Video Screening
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Video className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-2">No video screening yet</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
              Upload a video response or start recording to capture the
              candidate&apos;s screening
            </p>

            <AnimatePresence>
              {isUploading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6"
                >
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Uploading and analyzing...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </motion.div>
              )}

              {isRecording && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="mb-6 p-4 bg-destructive/10 rounded-lg"
                >
                  <div className="flex items-center justify-center gap-2 text-destructive">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive" />
                    </span>
                    Recording in progress...
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-center gap-3">
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading || isRecording}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Video
              </Button>
              <Button
                onClick={handleStartRecording}
                disabled={isUploading || isRecording}
              >
                <Camera className="h-4 w-4 mr-2" />
                {isRecording ? "Recording..." : "Start Recording"}
              </Button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleUpload}
            />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <AnimatePresence>
        {pendingScreening && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-2xl bg-popover rounded-lg shadow-lg overflow-hidden">
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="font-medium">Preview Submission</h3>
                <span className="text-sm text-muted-foreground">
                  {pendingScreening.submittedAt
                    ? format(new Date(pendingScreening.submittedAt), "MMM d, yyyy")
                    : ""}
                </span>
              </div>
              <div className="p-4 space-y-4">
                <div className="aspect-video bg-black rounded overflow-hidden">
                  <video
                    src={pendingScreening.videoUrl}
                    controls
                    className="w-full h-full object-cover"
                  />
                </div>

                {pendingScreening.aiAnalysis && (
                  <p className="text-sm text-muted-foreground">
                    {pendingScreening.aiAnalysis}
                  </p>
                )}

                <div className="flex items-center gap-2 justify-end">
                  <Button variant="ghost" onClick={cancelPending}>
                    Cancel
                  </Button>
                  <Button onClick={submitPendingScreening}>Confirm & Submit</Button>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-black/40" onClick={cancelPending} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Video className="h-5 w-5" />
                Video Screening
              </CardTitle>
              <Badge
                variant={
                  screening.status === "reviewed" ? "default" : "secondary"
                }
                className={
                  screening.status === "reviewed"
                    ? "bg-success text-success-foreground"
                    : ""
                }
              >
              {screening.status === "reviewed" ? (
                <>
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Reviewed
                </>
              ) : (
                <>
                  <Clock className="h-3 w-3 mr-1" />
                  Pending Review
                </>
              )}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden mb-4">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
            <Button size="lg" className="z-10" asChild>
              <Link href={`/dashboard/video-screening/${candidateId}`}>
                <Play className="h-6 w-6 mr-2" />
                Watch Full Video
              </Link>
            </Button>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Submitted {format(new Date(screening.submittedAt), "MMM d, yyyy")}
            </span>
            <span className="font-medium">
              Duration: {Math.floor(screening.duration / 60)}:
              {(screening.duration % 60).toString().padStart(2, "0")}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* AI Analysis Summary */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            AI Analysis Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {screening.aiAnalysis}
          </p>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">
                  Communication
                </span>
                <span className="text-xs font-medium">
                  {screening.communicationScore}%
                </span>
              </div>
              <Progress
                value={screening.communicationScore}
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
              <Progress value={screening.confidenceScore} className="h-1.5" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">Technical</span>
                <span className="text-xs font-medium">
                  {screening.technicalScore}%
                </span>
              </div>
              <Progress value={screening.technicalScore} className="h-1.5" />
            </div>
          </div>

          <div className="pt-2">
            <h4 className="text-xs font-medium mb-2">Key Highlights</h4>
            <ul className="space-y-1">
              {screening.highlights.map((highlight, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-xs text-muted-foreground"
                >
                  <CheckCircle className="h-3 w-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full bg-transparent"
            asChild
          >
            <Link href={`/dashboard/video-screening/${candidateId}`}>
              View Full Analysis
              <ExternalLink className="h-3 w-3 ml-2" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Recruiter Decision */}
      {screening.recruiterDecision && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Recruiter Decision</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant={
                  screening.recruiterDecision.decision === "pass"
                    ? "default"
                    : screening.recruiterDecision.decision === "hold"
                      ? "secondary"
                      : "destructive"
                }
                className={
                  screening.recruiterDecision.decision === "pass"
                    ? "bg-emerald-600"
                    : ""
                }
              >
                {screening.recruiterDecision.decision.toUpperCase()}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {format(
                  new Date(screening.recruiterDecision.decidedAt),
                  "MMM d, yyyy",
                )}
              </span>
            </div>
            {screening.recruiterDecision.notes && (
              <p className="text-sm text-muted-foreground">
                {screening.recruiterDecision.notes}
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
