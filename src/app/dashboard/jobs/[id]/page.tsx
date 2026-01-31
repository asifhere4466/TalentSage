"use client";

import { useParams, useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Users,
  Clock,
  MapPin,
  DollarSign,
  Building,
  Calendar,
  Edit,
  MoreHorizontal,
  Star,
  UserCheck,
  UserX,
  Video,
} from "lucide-react";
import { format } from "date-fns";
import { CandidatePipeline } from "@/components/dashboard/candidate-pipeline";
import { RubricEditor } from "@/components/dashboard/rubric-editor";
import { motion } from "framer-motion";

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { jobs, candidates, selectedJobId, setSelectedJob } = useStore();

  const job = jobs.find((j) => j.id === params.id);
  const jobCandidates = candidates.filter((c) => c.jobId === params.id);
  const jobRubric = job?.rubric; // Job's rubric is stored on the job object

  if (!job) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground">
            Job not found
          </h2>
          <Button
            variant="link"
            onClick={() => router.push("/dashboard/jobs")}
            className="mt-2"
          >
            Back to Jobs
          </Button>
        </div>
      </div>
    );
  }

  // Set current job when viewing
  if (selectedJobId !== job.id) {
    setSelectedJob(job.id);
  }

  const statusColors = {
    draft: "bg-muted text-muted-foreground",
    active: "bg-success/10 text-success",
    paused: "bg-warning/10 text-warning-foreground",
    closed: "bg-destructive/10 text-destructive",
  };

  const pipelineStats = {
    total: jobCandidates.length,
    new: jobCandidates.filter((c) => c.stage === "new").length,
    screening: jobCandidates.filter((c) => c.stage === "screening").length,
    interview: jobCandidates.filter((c) => c.stage === "interview").length,
    offer: jobCandidates.filter((c) => c.stage === "offer").length,
    hired: jobCandidates.filter((c) => c.stage === "hired").length,
    rejected: jobCandidates.filter((c) => c.stage === "rejected").length,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/dashboard/jobs")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">
                {job.title}
              </h1>
              <Badge className={statusColors[job.status]}>{job.status}</Badge>
            </div>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Building className="h-4 w-4" />
                {job.department}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                {job.salary}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Posted {format(new Date(job.postedDate), "MMM d, yyyy")}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit Job
          </Button>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pipelineStats.total}</p>
                <p className="text-xs text-muted-foreground">
                  Total Candidates
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Star className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pipelineStats.screening}</p>
                <p className="text-xs text-muted-foreground">In Screening</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-chart-2/10 rounded-lg">
                <Video className="h-5 w-5 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pipelineStats.interview}</p>
                <p className="text-xs text-muted-foreground">Interviewing</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pipelineStats.offer}</p>
                <p className="text-xs text-muted-foreground">Pending Offer</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <UserCheck className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pipelineStats.hired}</p>
                <p className="text-xs text-muted-foreground">Hired</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <UserX className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pipelineStats.rejected}</p>
                <p className="text-xs text-muted-foreground">Rejected</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="pipeline" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pipeline">Candidate Pipeline</TabsTrigger>
          <TabsTrigger value="rubric">Evaluation Rubric</TabsTrigger>
          <TabsTrigger value="details">Job Details</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline" className="space-y-4">
          <CandidatePipeline jobId={job.id} />
        </TabsContent>

        <TabsContent value="rubric" className="space-y-4">
          <RubricEditor jobId={job.id} />
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none text-muted-foreground">
                <p>{job.description}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.requirements.map((req, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Skills Required</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {(job.requirements || []).slice(0, 8).map((req, index) => (
                    <Badge key={index} variant="secondary">
                      {req}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Hiring Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">
                      Pipeline Progress
                    </span>
                    <span className="font-medium">
                      {Math.round(
                        ((pipelineStats.interview +
                          pipelineStats.offer +
                          pipelineStats.hired) /
                          Math.max(pipelineStats.total, 1)) *
                          100,
                      )}
                      %
                    </span>
                  </div>
                  <Progress
                    value={
                      ((pipelineStats.interview +
                        pipelineStats.offer +
                        pipelineStats.hired) /
                        Math.max(pipelineStats.total, 1)) *
                      100
                    }
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Time to Fill</span>
                    <span className="font-medium">
                      {Math.floor(
                        (Date.now() - new Date(job.postedDate).getTime()) /
                          (1000 * 60 * 60 * 24),
                      )}{" "}
                      days
                    </span>
                  </div>
                  <Progress
                    value={Math.min(
                      100,
                      Math.floor(
                        (Date.now() - new Date(job.postedDate).getTime()) /
                          (1000 * 60 * 60 * 24 * 0.45),
                      ),
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hiring Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    label: "Applications Received",
                    value: pipelineStats.total,
                    color: "bg-primary",
                  },
                  {
                    label: "Passed Screening",
                    value:
                      pipelineStats.screening +
                      pipelineStats.interview +
                      pipelineStats.offer +
                      pipelineStats.hired,
                    color: "bg-chart-2",
                  },
                  {
                    label: "Interviewed",
                    value:
                      pipelineStats.interview +
                      pipelineStats.offer +
                      pipelineStats.hired,
                    color: "bg-accent",
                  },
                  {
                    label: "Offers Extended",
                    value: pipelineStats.offer + pipelineStats.hired,
                    color: "bg-warning",
                  },
                  {
                    label: "Hired",
                    value: pipelineStats.hired,
                    color: "bg-success",
                  },
                ].map((stage, index) => (
                  <div key={stage.label} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {stage.label}
                      </span>
                      <span className="font-medium">{stage.value}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(stage.value / Math.max(pipelineStats.total, 1)) * 100}%`,
                        }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`h-full ${stage.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
