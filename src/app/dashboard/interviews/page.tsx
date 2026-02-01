"use client";

import { useState } from "react";
import Link from "next/link";
import { format, isToday, isTomorrow, isThisWeek, isPast } from "date-fns";
import { useAppStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Trash2,
  Calendar,
  Clock,
  Video,
  Phone,
  MapPin,
  Users,
  ExternalLink,
  Plus,
  CalendarDays,
  Filter,
  MoreHorizontal,
  Mail,
  FileText,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const interviewTypeIcons = {
  video: Video,
  phone: Phone,
  onsite: MapPin,
  panel: Users,
};

const interviewTypeLabels = {
  video: "Video Call",
  phone: "Phone Screen",
  onsite: "On-site",
  panel: "Panel Interview",
};

export default function InterviewsPage() {
  const { scheduledInterviews, getCandidateById, getJobById, cancelInterview } =
    useAppStore();
  const [filter, setFilter] = useState<"all" | "upcoming" | "today" | "past">(
    "all",
  );

  const getDateLabel = (date: Date) => {
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "EEEE, MMM d");
  };

  const filteredInterviews = scheduledInterviews.filter((iv) => {
    const date = new Date(iv.scheduledAt);
    switch (filter) {
      case "today":
        return isToday(date);
      case "upcoming":
        return !isPast(date);
      case "past":
        return isPast(date);
      default:
        return true;
    }
  });

  const sortedInterviews = [...filteredInterviews].sort(
    (a, b) =>
      new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime(),
  );

  const upcomingCount = scheduledInterviews.filter(
    (iv) => !isPast(new Date(iv.scheduledAt)),
  ).length;
  const todayCount = scheduledInterviews.filter((iv) =>
    isToday(new Date(iv.scheduledAt)),
  ).length;

  const handleCancelInterview = (id: string, candidateName: string) => {
    cancelInterview(id);
    toast.success(`Interview with ${candidateName} cancelled`);
  };

  if (!scheduledInterviews.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Interviews</h1>
            <p className="text-muted-foreground">
              Manage your scheduled interviews
            </p>
          </div>
        </div>

        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <CalendarDays className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              No interviews scheduled
            </h3>
            <p className="text-muted-foreground text-center max-w-sm mb-6">
              Schedule interviews with candidates from the Jobs or Candidates
              pages to see them here.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" asChild>
                <Link href="/dashboard/candidates">
                  <Users className="h-4 w-4 mr-2" />
                  View Candidates
                </Link>
              </Button>
              <Button asChild>
                <Link href="/dashboard/jobs">
                  <FileText className="h-4 w-4 mr-2" />
                  View Jobs
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Interviews</h1>
          <p className="text-muted-foreground">
            {upcomingCount} upcoming interview{upcomingCount !== 1 ? "s" : ""}
            {todayCount > 0 && ` - ${todayCount} today`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button asChild>
            <Link href="/dashboard/candidates">
              <Plus className="h-4 w-4 mr-2" />
              Schedule Interview
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card
          className={`cursor-pointer transition-all ${
            filter === "all"
              ? "ring-2 ring-primary bg-primary/5"
              : "hover:bg-secondary/50"
          }`}
          onClick={() => setFilter("all")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {scheduledInterviews.length}
                </p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-all ${
            filter === "today"
              ? "ring-2 ring-primary bg-primary/5"
              : "hover:bg-secondary/50"
          }`}
          onClick={() => setFilter("today")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <Clock className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{todayCount}</p>
                <p className="text-xs text-muted-foreground">Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-all ${
            filter === "upcoming"
              ? "ring-2 ring-primary bg-primary/5"
              : "hover:bg-secondary/50"
          }`}
          onClick={() => setFilter("upcoming")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <CalendarDays className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{upcomingCount}</p>
                <p className="text-xs text-muted-foreground">Upcoming</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-all ${
            filter === "past"
              ? "ring-2 ring-primary bg-primary/5"
              : "hover:bg-secondary/50"
          }`}
          onClick={() => setFilter("past")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted rounded-lg">
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {scheduledInterviews.length - upcomingCount}
                </p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interview List */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">
            {filter === "all"
              ? "All Interviews"
              : filter === "today"
                ? "Today's Interviews"
                : filter === "upcoming"
                  ? "Upcoming Interviews"
                  : "Past Interviews"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <AnimatePresence mode="popLayout">
            {sortedInterviews.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No interviews match the selected filter
              </div>
            ) : (
              sortedInterviews.map((iv, index) => {
                const candidate = getCandidateById(iv.candidateId);
                const job = getJobById(iv.jobId);
                const interviewDate = new Date(iv.scheduledAt);
                const isInterviewPast = isPast(interviewDate);
                const TypeIcon =
                  interviewTypeIcons[iv.type] || interviewTypeIcons.video;

                return (
                  <motion.div
                    key={iv.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 rounded-xl border ${
                      isInterviewPast
                        ? "bg-muted/30 border-border/50"
                        : isToday(interviewDate)
                          ? "bg-success/5 border-success/20"
                          : "bg-card border-border hover:border-primary/30"
                    } transition-colors`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      {/* Candidate Info */}
                      <div className="flex items-center gap-3 flex-1">
                        <Avatar className="h-12 w-12 border-2 border-background shadow">
                          <AvatarImage
                            src={candidate?.avatar || "/placeholder.svg"}
                          />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {candidate?.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("") || "?"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground truncate">
                              {candidate?.name || "Unknown Candidate"}
                            </h3>
                            {isToday(interviewDate) && !isInterviewPast && (
                              <Badge className="bg-success text-white text-xs">
                                Today
                              </Badge>
                            )}
                            {isInterviewPast && (
                              <Badge variant="secondary" className="text-xs">
                                Completed
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {job?.title || "Unknown Position"}
                          </p>
                        </div>
                      </div>

                      {/* Interview Details */}
                      <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-secondary rounded-lg">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {getDateLabel(interviewDate)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {format(interviewDate, "h:mm a")}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-secondary rounded-lg">
                            <TypeIcon className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {interviewTypeLabels[iv.type]}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {iv.duration} min
                            </p>
                          </div>
                        </div>

                        {iv.interviewers && iv.interviewers.length > 0 && (
                          <div className="flex items-center gap-2">
                            <div className="p-2 bg-secondary rounded-lg">
                              <Users className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="font-medium truncate max-w-[120px]">
                                {iv.interviewers[0]}
                              </p>
                              {iv.interviewers.length > 1 && (
                                <p className="text-xs text-muted-foreground">
                                  +{iv.interviewers.length - 1} more
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 ml-auto">
                        {candidate && (
                          <Button variant="outline" size="sm" asChild>
                            <Link
                              href={`/dashboard/candidates/${candidate.id}`}
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Profile
                            </Link>
                          </Button>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {candidate && (
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/dashboard/candidates/${candidate.id}`}
                                >
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  View Candidate
                                </Link>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" />
                              Send Reminder
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="h-4 w-4 mr-2" />
                              Reschedule
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() =>
                                handleCancelInterview(
                                  iv.id,
                                  candidate?.name || "Unknown",
                                )
                              }
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Cancel Interview
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Notes */}
                    {iv.notes && (
                      <div className="mt-3 pt-3 border-t border-border/50">
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">
                            Notes:
                          </span>{" "}
                          {iv.notes}
                        </p>
                      </div>
                    )}
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}
