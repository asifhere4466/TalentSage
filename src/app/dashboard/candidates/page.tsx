"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Star,
  MoreHorizontal,
  Mail,
  Calendar,
  Video,
  XCircle,
  SlidersHorizontal,
  Download,
  Upload,
} from "lucide-react";
import { motion } from "framer-motion";
import type { CandidateStage } from "@/lib/types";
import { CandidateDrawer } from "@/components/dashboard/candidate-drawer";
import { format } from "date-fns";
import { toast } from "sonner";

export default function CandidatesPage() {
  const {
    candidates,
    jobs,
    shortlistCandidate,
    rejectCandidate,
    moveCandidate,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<string>("all");
  const [selectedStage, setSelectedStage] = useState<string>("all");
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [drawerCandidate, setDrawerCandidate] = useState<string | null>(null);

  const q = searchQuery.toLowerCase();
  const filteredCandidates = candidates.filter((candidate) => {
    const name = candidate.name ?? "";
    const email = candidate.email ?? "";
    const role = candidate.currentRole ?? "";

    const matchesSearch =
      name.toLowerCase().includes(q) ||
      email.toLowerCase().includes(q) ||
      role.toLowerCase().includes(q);

    const matchesJob = selectedJob === "all" || candidate.jobId === selectedJob;
    const matchesStage =
      selectedStage === "all" || candidate.stage === selectedStage;

    return matchesSearch && matchesJob && matchesStage;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCandidates(filteredCandidates.map((c) => c.id));
    } else {
      setSelectedCandidates([]);
    }
  };

  const handleSelectCandidate = (candidateId: string, checked: boolean) => {
    if (checked) {
      setSelectedCandidates([...selectedCandidates, candidateId]);
    } else {
      setSelectedCandidates(
        selectedCandidates.filter((id) => id !== candidateId),
      );
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedCandidates.length === 0) {
      toast.error("No candidates selected");
      return;
    }

    switch (action) {
      case "shortlist":
        selectedCandidates.forEach((id) => shortlistCandidate(id));
        toast.success(`${selectedCandidates.length} candidates shortlisted`);
        break;
      case "reject":
        selectedCandidates.forEach((id) => rejectCandidate(id));
        toast.success(`${selectedCandidates.length} candidates rejected`);
        break;
      case "move-screening":
        selectedCandidates.forEach((id) => moveCandidate(id, "screening"));
        toast.success(
          `${selectedCandidates.length} candidates moved to screening`,
        );
        break;
      case "move-interview":
        selectedCandidates.forEach((id) => moveCandidate(id, "interview"));
        toast.success(
          `${selectedCandidates.length} candidates moved to interview`,
        );
        break;
    }
    setSelectedCandidates([]);
  };

  const stages: { value: string; label: string }[] = [
    { value: "all", label: "All Stages" },
    { value: "new", label: "New" },
    { value: "screening", label: "Screening" },
    { value: "interview", label: "Interview" },
    { value: "offer", label: "Offer" },
    { value: "hired", label: "Hired" },
    { value: "rejected", label: "Rejected" },
  ];

  const stageColors: Record<CandidateStage, string> = {
    new: "bg-muted text-muted-foreground",
    applied: "bg-muted/10 text-muted-foreground",
    screening: "bg-primary/10 text-primary",
    shortlisted: "bg-yellow-100 text-yellow-800",
    interview: "bg-accent/10 text-accent",
    offer: "bg-warning/10 text-warning-foreground",
    hired: "bg-success/10 text-success",
    rejected: "bg-destructive/10 text-destructive",
  };

  const selectedCandidateData = drawerCandidate
    ? candidates.find((c) => c.id === drawerCandidate) || null
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">All Candidates</h1>
          <p className="text-muted-foreground">
            {filteredCandidates.length} candidates found
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search candidates..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedJob} onValueChange={setSelectedJob}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All Jobs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jobs</SelectItem>
                {jobs.map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStage} onValueChange={setSelectedStage}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="All Stages" />
              </SelectTrigger>
              <SelectContent>
                {stages.map((stage) => (
                  <SelectItem key={stage.value} value={stage.value}>
                    {stage.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedCandidates.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg border border-primary/20"
        >
          <span className="text-sm font-medium">
            {selectedCandidates.length} selected
          </span>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleBulkAction("shortlist")}
            >
              <Star className="h-4 w-4 mr-1" />
              Shortlist
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleBulkAction("move-screening")}
            >
              Move to Screening
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleBulkAction("move-interview")}
            >
              Move to Interview
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleBulkAction("reject")}
            >
              <XCircle className="h-4 w-4 mr-1" />
              Reject
            </Button>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setSelectedCandidates([])}
            className="ml-auto"
          >
            Clear Selection
          </Button>
        </motion.div>
      )}

      {/* Candidates Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={
                      selectedCandidates.length === filteredCandidates.length &&
                      filteredCandidates.length > 0
                    }
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Candidate</TableHead>
                <TableHead>Job</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>AI Score</TableHead>
                <TableHead>Applied</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCandidates.map((candidate) => {
                const job = jobs.find((j) => j.id === candidate.jobId);
                return (
                  <TableRow
                    key={candidate.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => setDrawerCandidate(candidate.id)}
                  >
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedCandidates.includes(candidate.id)}
                        onCheckedChange={(checked) =>
                          handleSelectCandidate(
                            candidate.id,
                            checked as boolean,
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage
                            src={candidate.avatar || "/placeholder.svg"}
                          />
                          <AvatarFallback>
                            {candidate.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              {candidate.name}
                            </span>
                            {candidate.isShortlisted && (
                              <Star className="h-3 w-3 text-warning fill-warning" />
                            )}
                            {candidate.videoScreening && (
                              <Video className="h-3 w-3 text-accent" />
                            )}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {candidate.currentRole} at{" "}
                            {candidate.currentCompany}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{job?.title || "Unknown"}</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={stageColors[candidate.stage]}>
                        {candidate.stage}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {(() => {
                          const ai = candidate.aiScore ?? candidate.score;
                          return (
                            <>
                              <div
                                className={`h-2 w-2 rounded-full ${
                                  ai >= 80
                                    ? "bg-success"
                                    : ai >= 60
                                      ? "bg-warning"
                                      : "bg-destructive"
                                }`}
                              />
                              <span className="font-medium">{ai}%</span>
                            </>
                          );
                        })()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {format(new Date(candidate.appliedDate), "MMM d, yyyy")}
                      </span>
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
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
                          <DropdownMenuItem
                            onClick={() => setDrawerCandidate(candidate.id)}
                          >
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => shortlistCandidate(candidate.id)}
                          >
                            <Star className="h-4 w-4 mr-2" />
                            {candidate.isShortlisted
                              ? "Remove from Shortlist"
                              : "Add to Shortlist"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Mail className="h-4 w-4 mr-2" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="h-4 w-4 mr-2" />
                            Schedule Interview
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => rejectCandidate(candidate.id)}
                            className="text-destructive"
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredCandidates.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12">
                    <div className="text-muted-foreground">
                      <Search className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p className="font-medium">No candidates found</p>
                      <p className="text-sm">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Candidate Drawer */}
      <CandidateDrawer
        candidate={selectedCandidateData}
        open={!!drawerCandidate}
        onOpenChange={(open) => !open && setDrawerCandidate(null)}
      />
    </motion.div>
  );
}
