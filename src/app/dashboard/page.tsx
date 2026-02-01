"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Briefcase,
  Users,
  Calendar,
  TrendingUp,
  ArrowRight,
  Clock,
  Sparkles,
  Target,
  Video,
  Star,
} from "lucide-react";
import { format } from "date-fns";

export default function DashboardPage() {
  const { jobs, candidates, scheduledInterviews } = useAppStore();

  const stats = [
    {
      label: "Active Jobs",
      value: jobs.filter((j) => j.status === "open").length,
      icon: Briefcase,
      color: "text-primary",
      bgColor: "bg-primary/10",
      trend: "+2 this week",
      trendUp: true,
    },
    {
      label: "Total Candidates",
      value: candidates.length,
      icon: Users,
      color: "text-accent",
      bgColor: "bg-accent/10",
      trend: "+15 this week",
      trendUp: true,
    },
    {
      label: "Scheduled Interviews",
      value: scheduledInterviews.length,
      icon: Calendar,
      color: "text-warning",
      bgColor: "bg-warning/10",
      trend: "3 today",
      trendUp: true,
    },
    {
      label: "Hired This Month",
      value: candidates.filter((c) => c.stage === "hired").length,
      icon: TrendingUp,
      color: "text-success",
      bgColor: "bg-success/10",
      trend: "On track",
      trendUp: true,
    },
  ];

  const recentCandidates = candidates
    .slice()
    .sort(
      (a, b) =>
        new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime(),
    )
    .slice(0, 5);

  const topCandidates = candidates
    .filter((c) => c.stage !== "rejected" && c.stage !== "hired")
    .sort((a, b) => (b.aiScore ?? b.score) - (a.aiScore ?? a.score))
    .slice(0, 3);

  const pipelineData = [
    {
      stage: "new",
      label: "New",
      count: candidates.filter(
        (c) => c.stage === "new" || c.stage === "applied",
      ).length,
      color: "bg-muted",
    },
    {
      stage: "screening",
      label: "Screening",
      count: candidates.filter(
        (c) => c.stage === "screening" || c.stage === "shortlisted",
      ).length,
      color: "bg-primary",
    },
    {
      stage: "interview",
      label: "Interview",
      count: candidates.filter((c) => c.stage === "interview").length,
      color: "bg-accent",
    },
    {
      stage: "offer",
      label: "Offer",
      count: candidates.filter((c) => c.stage === "offer").length,
      color: "bg-warning",
    },
    {
      stage: "hired",
      label: "Hired",
      count: candidates.filter((c) => c.stage === "hired").length,
      color: "bg-success",
    },
  ];

  const totalInPipeline = pipelineData.reduce(
    (acc, curr) => acc + curr.count,
    0,
  );

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here is an overview of your recruitment pipeline.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild>
            <Link href="/dashboard/candidates">
              <Users className="h-4 w-4 mr-2" />
              View All Candidates
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/jobs">
              <Briefcase className="h-4 w-4 mr-2" />
              Manage Jobs
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg hover:border-primary/20 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    {stat.trendUp && (
                      <TrendingUp className="h-3 w-3 text-success" />
                    )}
                    {stat.trend}
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pipeline Overview - Full width on mobile, 2 cols on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Pipeline Overview
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/jobs">
                  View Details
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Pipeline visualization */}
              <div className="flex items-center gap-1 h-4 rounded-full overflow-hidden bg-muted">
                {pipelineData.map((stage) => (
                  <motion.div
                    key={stage.stage}
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(stage.count / Math.max(totalInPipeline, 1)) * 100}%`,
                    }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={`h-full ${stage.color}`}
                    title={`${stage.label}: ${stage.count}`}
                  />
                ))}
              </div>

              {/* Pipeline stats */}
              <div className="grid grid-cols-5 gap-4">
                {pipelineData.map(({ stage, label, count, color }) => (
                  <div
                    key={stage}
                    className="text-center p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <div
                      className={`w-3 h-3 rounded-full ${color} mx-auto mb-2`}
                    />
                    <p className="text-2xl font-bold text-foreground">
                      {count}
                    </p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Candidates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-warning" />
                Top Candidates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topCandidates.map((candidate, index) => {
                const job = jobs.find((j) => j.id === candidate.jobId);
                const aiScore = candidate.aiScore ?? candidate.score;
                return (
                  <Link
                    key={candidate.id}
                    href={`/dashboard/candidates/${candidate.id}`}
                    className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors group"
                  >
                    <div className="relative">
                      <Avatar className="h-10 w-10 border-2 border-background">
                        <AvatarImage
                          src={candidate.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                          {candidate.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {index === 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-warning rounded-full flex items-center justify-center">
                          <Star className="h-3 w-3 text-warning-foreground fill-current" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                        {candidate.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {job?.title || "Unknown Position"}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <div
                          className={`h-2 w-2 rounded-full ${aiScore >= 80 ? "bg-success" : aiScore >= 60 ? "bg-warning" : "bg-destructive"}`}
                        />
                        <span className="text-sm font-semibold">
                          {aiScore}%
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/candidates">
                  View All Candidates
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Active Jobs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Active Jobs
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/jobs">
                  View All
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {jobs
                  .filter((j) => j.status === "open")
                  .slice(0, 4)
                  .map((job) => {
                    const jobCandidates = candidates.filter(
                      (c) => c.jobId === job.id,
                    );
                    const inProgress = jobCandidates.filter(
                      (c) => c.stage === "interview" || c.stage === "offer",
                    ).length;
                    return (
                      <Link
                        key={job.id}
                        href={`/dashboard/jobs/${job.id}`}
                        className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors group"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
                            {job.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {job.department} | {job.location}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-semibold">
                              {jobCandidates.length}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              candidates
                            </p>
                          </div>
                          {inProgress > 0 && (
                            <Badge className="bg-accent/10 text-accent">
                              {inProgress} in progress
                            </Badge>
                          )}
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Candidates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                Recent Applications
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/candidates">
                  View All
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentCandidates.map((candidate) => {
                  const job = jobs.find((j) => j.id === candidate.jobId);
                  return (
                    <Link
                      key={candidate.id}
                      href={`/dashboard/candidates/${candidate.id}`}
                      className="flex items-center gap-4 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors group"
                    >
                      <Avatar className="h-10 w-10 border-2 border-background">
                        <AvatarImage
                          src={candidate.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                          {candidate.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
                            {candidate.name}
                          </p>
                          {candidate.videoScreening && (
                            <Video className="h-3 w-3 text-accent flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {job?.title || "Unknown Position"}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <Badge
                          variant={
                            candidate.stage === "interview"
                              ? "default"
                              : candidate.stage === "shortlisted"
                                ? "secondary"
                                : candidate.stage === "rejected"
                                  ? "destructive"
                                  : "outline"
                          }
                          className="text-xs"
                        >
                          {candidate.stage}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(new Date(candidate.appliedDate), "MMM d")}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
