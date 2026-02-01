// "use client";

// import { useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { useStore } from "@/lib/store";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Progress } from "@/components/ui/progress";
// import { Separator } from "@/components/ui/separator";
// import {
//   ArrowLeft,
//   Users,
//   Clock,
//   MapPin,
//   DollarSign,
//   Building,
//   Calendar,
//   Edit,
//   MoreHorizontal,
//   Star,
//   UserCheck,
//   UserX,
//   Video,
//   Briefcase,
//   Target,
//   TrendingUp,
//   CheckCircle,
//   AlertCircle,
//   ExternalLink,
//   Copy,
//   Share2,
// } from "lucide-react";
// import { format } from "date-fns";
// import { CandidatePipeline } from "@/components/dashboard/candidate-pipeline";
// import { RubricEditor } from "@/components/dashboard/rubric-editor";
// import { motion } from "framer-motion";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { toast } from "sonner";

// export default function JobDetailPage() {
//   const params = useParams();
//   const router = useRouter();
//   const { jobs, candidates, selectedJobId, setSelectedJob } = useStore();

//   const job = jobs.find((j) => j.id === params.id);
//   const jobCandidates = candidates.filter((c) => c.jobId === params.id);

//   useEffect(() => {
//     if (job && selectedJobId !== job.id) {
//       setSelectedJob(job.id);
//     }
//   }, [job?.id, selectedJobId, setSelectedJob]);

//   if (!job) {
//     return (
//       <div className="flex items-center justify-center h-[60vh]">
//         <div className="text-center">
//           <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
//             <Briefcase className="h-8 w-8 text-muted-foreground" />
//           </div>
//           <h2 className="text-xl font-semibold text-foreground mb-2">
//             Job not found
//           </h2>
//           <p className="text-muted-foreground mb-4">
//             This job posting doesn&apos;t exist or has been removed.
//           </p>
//           <Button onClick={() => router.push("/dashboard/jobs")}>
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Back to Jobs
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   const statusConfig: Record<
//     string,
//     { color: string; icon: typeof CheckCircle }
//   > = {
//     draft: { color: "bg-muted text-muted-foreground", icon: Edit },
//     open: { color: "bg-success/10 text-success", icon: CheckCircle },
//     paused: { color: "bg-warning/10 text-warning", icon: AlertCircle },
//     closed: { color: "bg-destructive/10 text-destructive", icon: UserX },
//   };

//   const pipelineStats = {
//     total: jobCandidates.length,
//     new: jobCandidates.filter((c) => c.stage === "new" || c.stage === "applied")
//       .length,
//     screening: jobCandidates.filter(
//       (c) => c.stage === "screening" || c.stage === "shortlisted",
//     ).length,
//     interview: jobCandidates.filter((c) => c.stage === "interview").length,
//     offer: jobCandidates.filter((c) => c.stage === "offer").length,
//     hired: jobCandidates.filter((c) => c.stage === "hired").length,
//     rejected: jobCandidates.filter((c) => c.stage === "rejected").length,
//   };

//   const handleCopyLink = () => {
//     navigator.clipboard?.writeText(window.location.href);
//     toast.success("Job link copied to clipboard");
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="space-y-6 max-w-full overflow-x-hidden"
//     >
//       {/* Header */}
//       <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
//         <div className="flex items-start gap-4 min-w-0">
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => router.push("/dashboard/jobs")}
//             className="mt-1 shrink-0"
//           >
//             <ArrowLeft className="h-5 w-5" />
//           </Button>
//           <div className="min-w-0 flex-1">
//             <div className="flex items-center gap-3 flex-wrap">
//               <h1 className="text-2xl font-bold text-foreground truncate">
//                 {job.title}
//               </h1>
//               <Badge className={statusConfig[job.status]?.color}>
//                 {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
//               </Badge>
//             </div>
//             <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
//               <span className="flex items-center gap-1.5">
//                 <Building className="h-4 w-4 shrink-0" />
//                 <span className="truncate">{job.department}</span>
//               </span>
//               <span className="flex items-center gap-1.5">
//                 <MapPin className="h-4 w-4 shrink-0" />
//                 <span className="truncate">{job.location}</span>
//               </span>
//               <span className="flex items-center gap-1.5 whitespace-nowrap">
//                 <DollarSign className="h-4 w-4 shrink-0" />$
//                 {(job.salary.min / 1000).toFixed(0)}k - $
//                 {(job.salary.max / 1000).toFixed(0)}k
//               </span>
//               <span className="flex items-center gap-1.5 whitespace-nowrap">
//                 <Calendar className="h-4 w-4 shrink-0" />
//                 Posted {format(new Date(job.postedDate), "MMM d, yyyy")}
//               </span>
//             </div>
//           </div>
//         </div>
//         <div className="flex items-center gap-2 pl-14 lg:pl-0 shrink-0 flex-wrap">
//           <Button variant="outline" size="sm" onClick={handleCopyLink}>
//             <Copy className="h-4 w-4 mr-2" />
//             Copy Link
//           </Button>
//           <Button variant="outline" size="sm">
//             <Share2 className="h-4 w-4 mr-2" />
//             Share
//           </Button>
//           <Button variant="outline" size="sm">
//             <Edit className="h-4 w-4 mr-2" />
//             Edit Job
//           </Button>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" size="icon">
//                 <MoreHorizontal className="h-5 w-5" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuItem>
//                 <ExternalLink className="h-4 w-4 mr-2" />
//                 View Public Listing
//               </DropdownMenuItem>
//               <DropdownMenuItem>Duplicate Job</DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem>Pause Hiring</DropdownMenuItem>
//               <DropdownMenuItem className="text-destructive">
//                 Close Job
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>

//       {/* Quick Stats - Fixed responsive grid */}
//       <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4 w-full">
//         <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20 min-w-0">
//           <CardContent className="p-3 lg:p-4">
//             <div className="flex items-center gap-2 lg:gap-3">
//               <div className="p-2 lg:p-2.5 bg-primary/10 rounded-lg lg:rounded-xl shrink-0">
//                 <Users className="h-4 w-4 lg:h-5 lg:w-5 text-primary" />
//               </div>
//               <div className="min-w-0 flex-1">
//                 <p className="text-lg lg:text-2xl font-bold">
//                   {pipelineStats.total}
//                 </p>
//                 <p className="text-[10px] lg:text-xs text-muted-foreground truncate">
//                   Total
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//         <Card className="hover:bg-secondary/30 transition-colors min-w-0">
//           <CardContent className="p-3 lg:p-4">
//             <div className="flex items-center gap-2 lg:gap-3">
//               <div className="p-2 lg:p-2.5 bg-accent/10 rounded-lg lg:rounded-xl shrink-0">
//                 <Star className="h-4 w-4 lg:h-5 lg:w-5 text-accent" />
//               </div>
//               <div className="min-w-0 flex-1">
//                 <p className="text-lg lg:text-2xl font-bold">
//                   {pipelineStats.screening}
//                 </p>
//                 <p className="text-[10px] lg:text-xs text-muted-foreground truncate">
//                   Screening
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//         <Card className="hover:bg-secondary/30 transition-colors min-w-0">
//           <CardContent className="p-3 lg:p-4">
//             <div className="flex items-center gap-2 lg:gap-3">
//               <div className="p-2 lg:p-2.5 bg-chart-2/10 rounded-lg lg:rounded-xl shrink-0">
//                 <Video className="h-4 w-4 lg:h-5 lg:w-5 text-chart-2" />
//               </div>
//               <div className="min-w-0 flex-1">
//                 <p className="text-lg lg:text-2xl font-bold">
//                   {pipelineStats.interview}
//                 </p>
//                 <p className="text-[10px] lg:text-xs text-muted-foreground truncate">
//                   Interview
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//         <Card className="hover:bg-secondary/30 transition-colors min-w-0">
//           <CardContent className="p-3 lg:p-4">
//             <div className="flex items-center gap-2 lg:gap-3">
//               <div className="p-2 lg:p-2.5 bg-warning/10 rounded-lg lg:rounded-xl shrink-0">
//                 <Clock className="h-4 w-4 lg:h-5 lg:w-5 text-warning" />
//               </div>
//               <div className="min-w-0 flex-1">
//                 <p className="text-lg lg:text-2xl font-bold">
//                   {pipelineStats.offer}
//                 </p>
//                 <p className="text-[10px] lg:text-xs text-muted-foreground truncate">
//                   Offer
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//         <Card className="hover:bg-secondary/30 transition-colors min-w-0">
//           <CardContent className="p-3 lg:p-4">
//             <div className="flex items-center gap-2 lg:gap-3">
//               <div className="p-2 lg:p-2.5 bg-success/10 rounded-lg lg:rounded-xl shrink-0">
//                 <UserCheck className="h-4 w-4 lg:h-5 lg:w-5 text-success" />
//               </div>
//               <div className="min-w-0 flex-1">
//                 <p className="text-lg lg:text-2xl font-bold">
//                   {pipelineStats.hired}
//                 </p>
//                 <p className="text-[10px] lg:text-xs text-muted-foreground truncate">
//                   Hired
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Main Content Tabs */}
//       <Tabs defaultValue="pipeline" className="space-y-4 w-full">
//         <div className="overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0">
//           <TabsList className="bg-card border inline-flex lg:flex w-max lg:w-auto">
//             <TabsTrigger value="pipeline" className="gap-2 whitespace-nowrap">
//               <Users className="h-4 w-4" />
//               <span className="hidden sm:inline">Candidate Pipeline</span>
//               <span className="sm:hidden">Pipeline</span>
//             </TabsTrigger>
//             <TabsTrigger value="rubric" className="gap-2 whitespace-nowrap">
//               <Target className="h-4 w-4" />
//               <span className="hidden sm:inline">Evaluation Rubric</span>
//               <span className="sm:hidden">Rubric</span>
//             </TabsTrigger>
//             <TabsTrigger value="details" className="gap-2 whitespace-nowrap">
//               <Briefcase className="h-4 w-4" />
//               <span className="hidden sm:inline">Job Details</span>
//               <span className="sm:hidden">Details</span>
//             </TabsTrigger>
//             <TabsTrigger value="analytics" className="gap-2 whitespace-nowrap">
//               <TrendingUp className="h-4 w-4" />
//               Analytics
//             </TabsTrigger>
//           </TabsList>
//         </div>

//         <TabsContent value="pipeline" className="space-y-4">
//           <CandidatePipeline jobId={job.id} />
//         </TabsContent>

//         <TabsContent value="rubric" className="space-y-4">
//           <RubricEditor jobId={job.id} />
//         </TabsContent>

//         <TabsContent value="details" className="space-y-4">
//           <div className="grid gap-6 md:grid-cols-2">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg">Job Description</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-muted-foreground leading-relaxed">
//                   {job.description}
//                 </p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg">Requirements</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <ul className="space-y-2">
//                   {job.requirements.map((req, index) => (
//                     <li
//                       key={index}
//                       className="flex items-start gap-3 text-sm text-muted-foreground"
//                     >
//                       <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
//                       {req}
//                     </li>
//                   ))}
//                 </ul>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg">Responsibilities</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <ul className="space-y-2">
//                   {job.responsibilities.map((resp, index) => (
//                     <li
//                       key={index}
//                       className="flex items-start gap-3 text-sm text-muted-foreground"
//                     >
//                       <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
//                       {resp}
//                     </li>
//                   ))}
//                 </ul>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg">Hiring Progress</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div>
//                   <div className="flex justify-between text-sm mb-2">
//                     <span className="text-muted-foreground">
//                       Pipeline Progress
//                     </span>
//                     <span className="font-medium">
//                       {Math.round(
//                         ((pipelineStats.interview +
//                           pipelineStats.offer +
//                           pipelineStats.hired) /
//                           Math.max(pipelineStats.total, 1)) *
//                           100,
//                       )}
//                       %
//                     </span>
//                   </div>
//                   <Progress
//                     value={
//                       ((pipelineStats.interview +
//                         pipelineStats.offer +
//                         pipelineStats.hired) /
//                         Math.max(pipelineStats.total, 1)) *
//                       100
//                     }
//                     className="h-2"
//                   />
//                 </div>
//                 <Separator />
//                 <div className="grid grid-cols-2 gap-4 text-sm">
//                   <div>
//                     <p className="text-muted-foreground">Days Open</p>
//                     <p className="text-2xl font-bold">
//                       {Math.floor(
//                         (Date.now() - new Date(job.postedDate).getTime()) /
//                           (1000 * 60 * 60 * 24),
//                       )}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-muted-foreground">Applications/Day</p>
//                     <p className="text-2xl font-bold">
//                       {(
//                         pipelineStats.total /
//                         Math.max(
//                           1,
//                           Math.floor(
//                             (Date.now() - new Date(job.postedDate).getTime()) /
//                               (1000 * 60 * 60 * 24),
//                           ),
//                         )
//                       ).toFixed(1)}
//                     </p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>

//         <TabsContent value="analytics" className="space-y-4">
//           <div className="grid gap-6 md:grid-cols-2">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg">Hiring Funnel</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {[
//                     {
//                       label: "Applications Received",
//                       value: pipelineStats.total,
//                       color: "bg-primary",
//                     },
//                     {
//                       label: "Passed Screening",
//                       value:
//                         pipelineStats.screening +
//                         pipelineStats.interview +
//                         pipelineStats.offer +
//                         pipelineStats.hired,
//                       color: "bg-chart-2",
//                     },
//                     {
//                       label: "Interviewed",
//                       value:
//                         pipelineStats.interview +
//                         pipelineStats.offer +
//                         pipelineStats.hired,
//                       color: "bg-accent",
//                     },
//                     {
//                       label: "Offers Extended",
//                       value: pipelineStats.offer + pipelineStats.hired,
//                       color: "bg-warning",
//                     },
//                     {
//                       label: "Hired",
//                       value: pipelineStats.hired,
//                       color: "bg-success",
//                     },
//                   ].map((stage, index) => (
//                     <div key={stage.label} className="space-y-2">
//                       <div className="flex justify-between text-sm">
//                         <span className="text-muted-foreground">
//                           {stage.label}
//                         </span>
//                         <span className="font-medium">{stage.value}</span>
//                       </div>
//                       <div className="h-2 bg-muted rounded-full overflow-hidden">
//                         <motion.div
//                           initial={{ width: 0 }}
//                           animate={{
//                             width: `${(stage.value / Math.max(pipelineStats.total, 1)) * 100}%`,
//                           }}
//                           transition={{ duration: 0.5, delay: index * 0.1 }}
//                           className={`h-full ${stage.color} rounded-full`}
//                         />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg">Source Analytics</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {[
//                     {
//                       source: "LinkedIn",
//                       count: Math.floor(pipelineStats.total * 0.4),
//                       percentage: 40,
//                     },
//                     {
//                       source: "Career Page",
//                       count: Math.floor(pipelineStats.total * 0.25),
//                       percentage: 25,
//                     },
//                     {
//                       source: "Referral",
//                       count: Math.floor(pipelineStats.total * 0.2),
//                       percentage: 20,
//                     },
//                     {
//                       source: "Indeed",
//                       count: Math.floor(pipelineStats.total * 0.15),
//                       percentage: 15,
//                     },
//                   ].map((item) => (
//                     <div
//                       key={item.source}
//                       className="flex items-center justify-between"
//                     >
//                       <div className="flex-1">
//                         <div className="flex justify-between text-sm mb-1">
//                           <span className="text-muted-foreground">
//                             {item.source}
//                           </span>
//                           <span className="font-medium">{item.count}</span>
//                         </div>
//                         <Progress value={item.percentage} className="h-1.5" />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="md:col-span-2">
//               <CardHeader>
//                 <CardTitle className="text-lg">Key Metrics</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//                   <div className="text-center p-4 bg-muted/50 rounded-xl">
//                     <p className="text-3xl font-bold text-primary">
//                       {Math.floor(
//                         (Date.now() - new Date(job.postedDate).getTime()) /
//                           (1000 * 60 * 60 * 24),
//                       )}
//                     </p>
//                     <p className="text-sm text-muted-foreground">
//                       Days to Fill
//                     </p>
//                   </div>
//                   <div className="text-center p-4 bg-muted/50 rounded-xl">
//                     <p className="text-3xl font-bold text-accent">
//                       {pipelineStats.total > 0
//                         ? Math.round(
//                             (pipelineStats.interview / pipelineStats.total) *
//                               100,
//                           )
//                         : 0}
//                       %
//                     </p>
//                     <p className="text-sm text-muted-foreground">
//                       Interview Rate
//                     </p>
//                   </div>
//                   <div className="text-center p-4 bg-muted/50 rounded-xl">
//                     <p className="text-3xl font-bold text-success">
//                       {pipelineStats.interview > 0
//                         ? Math.round(
//                             (pipelineStats.hired / pipelineStats.interview) *
//                               100,
//                           )
//                         : 0}
//                       %
//                     </p>
//                     <p className="text-sm text-muted-foreground">
//                       Conversion Rate
//                     </p>
//                   </div>
//                   <div className="text-center p-4 bg-muted/50 rounded-xl">
//                     <p className="text-3xl font-bold text-warning">
//                       {pipelineStats.total > 0
//                         ? Math.round(
//                             ((pipelineStats.total - pipelineStats.rejected) /
//                               pipelineStats.total) *
//                               100,
//                           )
//                         : 0}
//                       %
//                     </p>
//                     <p className="text-sm text-muted-foreground">
//                       Quality Rate
//                     </p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>
//       </Tabs>
//     </motion.div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
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
  Briefcase,
  Target,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Copy,
  Share2,
  Pause,
  XCircle,
  Files,
} from "lucide-react";
import { format } from "date-fns";
import { CandidatePipeline } from "@/components/dashboard/candidate-pipeline";
import { RubricEditor } from "@/components/dashboard/rubric-editor";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { jobs, candidates, selectedJobId, setSelectedJob, updateJob, addJob } =
    useStore();
  const [showCloseDialog, setShowCloseDialog] = useState(false);
  const [showPauseDialog, setShowPauseDialog] = useState(false);

  const job = jobs.find((j) => j.id === params.id);
  const jobCandidates = candidates.filter((c) => c.jobId === params.id);

  useEffect(() => {
    if (job && selectedJobId !== job.id) {
      setSelectedJob(job.id);
    }
  }, [job?.id, selectedJobId, setSelectedJob]);

  if (!job) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <Briefcase className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Job not found
          </h2>
          <p className="text-muted-foreground mb-4">
            This job posting doesn&apos;t exist or has been removed.
          </p>
          <Button onClick={() => router.push("/dashboard/jobs")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Button>
        </div>
      </div>
    );
  }

  const statusConfig: Record<
    string,
    { color: string; icon: typeof CheckCircle }
  > = {
    draft: { color: "bg-muted text-muted-foreground", icon: Edit },
    open: { color: "bg-success/10 text-success", icon: CheckCircle },
    paused: { color: "bg-warning/10 text-warning", icon: AlertCircle },
    closed: { color: "bg-destructive/10 text-destructive", icon: UserX },
  };

  const pipelineStats = {
    total: jobCandidates.length,
    new: jobCandidates.filter((c) => c.stage === "new" || c.stage === "applied")
      .length,
    screening: jobCandidates.filter(
      (c) => c.stage === "screening" || c.stage === "shortlisted",
    ).length,
    interview: jobCandidates.filter((c) => c.stage === "interview").length,
    offer: jobCandidates.filter((c) => c.stage === "offer").length,
    hired: jobCandidates.filter((c) => c.stage === "hired").length,
    rejected: jobCandidates.filter((c) => c.stage === "rejected").length,
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      toast.success("Job link copied to clipboard");
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      const shareUrl = window.location.href;
      const shareText = `Check out this job opening: ${job.title} at ${job.department}`;

      if (navigator.share) {
        navigator
          .share({
            title: job.title,
            text: shareText,
            url: shareUrl,
          })
          .catch(() => {
            navigator.clipboard?.writeText(shareUrl);
            toast.success("Link copied to clipboard");
          });
      } else {
        navigator.clipboard?.writeText(shareUrl);
        toast.success("Link copied to clipboard");
      }
    }
  };

  const handleEditJob = () => {
    // For now, just show a toast. You can create an edit page later
    toast.info(
      "Edit functionality - Navigate to job creation form with pre-filled data",
    );
    // router.push(`/dashboard/jobs/create?edit=${job.id}`);
  };

  const handleDuplicateJob = () => {
    const newJobId = addJob({
      title: `${job.title} (Copy)`,
      department: job.department,
      location: job.location,
      type: job.type,
      level: job.level,
      description: job.description,
      requirements: job.requirements,
      responsibilities: job.responsibilities,
      salary: job.salary,
      status: "draft",
      applicants: 0,
    });

    toast.success("Job duplicated successfully");
    router.push(`/dashboard/jobs/${newJobId}`);
  };

  const handlePauseJob = () => {
    const newStatus = job.status === "paused" ? "open" : "paused";
    updateJob(job.id, { status: newStatus });
    toast.success(
      newStatus === "open"
        ? "Job reopened successfully"
        : "Job paused successfully",
    );
    setShowPauseDialog(false);
  };

  const handleCloseJob = () => {
    updateJob(job.id, { status: "closed" });
    toast.success("Job closed successfully");
    setShowCloseDialog(false);
    setTimeout(() => {
      router.push("/dashboard/jobs");
    }, 1000);
  };

  const handleViewPublicListing = () => {
    if (typeof window !== "undefined") {
      const publicUrl = `${window.location.origin}/careers/${job.id}`;
      window.open(publicUrl, "_blank");
      toast.info("Opening public job listing...");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 max-w-full overflow-x-hidden"
      >
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="flex items-start gap-4 min-w-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/dashboard/jobs")}
              className="mt-1 shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold text-foreground truncate">
                  {job.title}
                </h1>
                <Badge className={statusConfig[job.status]?.color}>
                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Building className="h-4 w-4 shrink-0" />
                  <span className="truncate">{job.department}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span className="truncate">{job.location}</span>
                </span>
                <span className="flex items-center gap-1.5 whitespace-nowrap">
                  <DollarSign className="h-4 w-4 shrink-0" />$
                  {(job.salary.min / 1000).toFixed(0)}k - $
                  {(job.salary.max / 1000).toFixed(0)}k
                </span>
                <span className="flex items-center gap-1.5 whitespace-nowrap">
                  <Calendar className="h-4 w-4 shrink-0" />
                  Posted {format(new Date(job.postedDate), "MMM d, yyyy")}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 pl-14 lg:pl-0 shrink-0 flex-wrap">
            <Button variant="outline" size="sm" onClick={handleCopyLink}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Link
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={handleEditJob}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Job
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleViewPublicListing}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Public Listing
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDuplicateJob}>
                  <Files className="h-4 w-4 mr-2" />
                  Duplicate Job
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setShowPauseDialog(true)}>
                  {job.status === "paused" ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Resume Hiring
                    </>
                  ) : (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Pause Hiring
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setShowCloseDialog(true)}
                  className="text-destructive focus:text-destructive"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Close Job
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Quick Stats - Fixed responsive grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4 w-full">
          <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20 min-w-0">
            <CardContent className="p-3 lg:p-4">
              <div className="flex items-center gap-2 lg:gap-3">
                <div className="p-2 lg:p-2.5 bg-primary/10 rounded-lg lg:rounded-xl shrink-0">
                  <Users className="h-4 w-4 lg:h-5 lg:w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-lg lg:text-2xl font-bold">
                    {pipelineStats.total}
                  </p>
                  <p className="text-[10px] lg:text-xs text-muted-foreground truncate">
                    Total
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:bg-secondary/30 transition-colors min-w-0">
            <CardContent className="p-3 lg:p-4">
              <div className="flex items-center gap-2 lg:gap-3">
                <div className="p-2 lg:p-2.5 bg-accent/10 rounded-lg lg:rounded-xl shrink-0">
                  <Star className="h-4 w-4 lg:h-5 lg:w-5 text-accent" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-lg lg:text-2xl font-bold">
                    {pipelineStats.screening}
                  </p>
                  <p className="text-[10px] lg:text-xs text-muted-foreground truncate">
                    Screening
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:bg-secondary/30 transition-colors min-w-0">
            <CardContent className="p-3 lg:p-4">
              <div className="flex items-center gap-2 lg:gap-3">
                <div className="p-2 lg:p-2.5 bg-chart-2/10 rounded-lg lg:rounded-xl shrink-0">
                  <Video className="h-4 w-4 lg:h-5 lg:w-5 text-chart-2" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-lg lg:text-2xl font-bold">
                    {pipelineStats.interview}
                  </p>
                  <p className="text-[10px] lg:text-xs text-muted-foreground truncate">
                    Interview
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:bg-secondary/30 transition-colors min-w-0">
            <CardContent className="p-3 lg:p-4">
              <div className="flex items-center gap-2 lg:gap-3">
                <div className="p-2 lg:p-2.5 bg-warning/10 rounded-lg lg:rounded-xl shrink-0">
                  <Clock className="h-4 w-4 lg:h-5 lg:w-5 text-warning" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-lg lg:text-2xl font-bold">
                    {pipelineStats.offer}
                  </p>
                  <p className="text-[10px] lg:text-xs text-muted-foreground truncate">
                    Offer
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:bg-secondary/30 transition-colors min-w-0">
            <CardContent className="p-3 lg:p-4">
              <div className="flex items-center gap-2 lg:gap-3">
                <div className="p-2 lg:p-2.5 bg-success/10 rounded-lg lg:rounded-xl shrink-0">
                  <UserCheck className="h-4 w-4 lg:h-5 lg:w-5 text-success" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-lg lg:text-2xl font-bold">
                    {pipelineStats.hired}
                  </p>
                  <p className="text-[10px] lg:text-xs text-muted-foreground truncate">
                    Hired
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="pipeline" className="space-y-4 w-full">
          <div className="overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0">
            <TabsList className="bg-card border inline-flex lg:flex w-max lg:w-auto">
              <TabsTrigger value="pipeline" className="gap-2 whitespace-nowrap">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Candidate Pipeline</span>
                <span className="sm:hidden">Pipeline</span>
              </TabsTrigger>
              <TabsTrigger value="rubric" className="gap-2 whitespace-nowrap">
                <Target className="h-4 w-4" />
                <span className="hidden sm:inline">Evaluation Rubric</span>
                <span className="sm:hidden">Rubric</span>
              </TabsTrigger>
              <TabsTrigger value="details" className="gap-2 whitespace-nowrap">
                <Briefcase className="h-4 w-4" />
                <span className="hidden sm:inline">Job Details</span>
                <span className="sm:hidden">Details</span>
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="gap-2 whitespace-nowrap"
              >
                <TrendingUp className="h-4 w-4" />
                Analytics
              </TabsTrigger>
            </TabsList>
          </div>

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
                  <CardTitle className="text-lg">Job Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {job.description}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {job.requirements.map((req, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Responsibilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {job.responsibilities.map((resp, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                      >
                        <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        {resp}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Hiring Progress</CardTitle>
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
                      className="h-2"
                    />
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Days Open</p>
                      <p className="text-2xl font-bold">
                        {Math.floor(
                          (Date.now() - new Date(job.postedDate).getTime()) /
                            (1000 * 60 * 60 * 24),
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Applications/Day</p>
                      <p className="text-2xl font-bold">
                        {(
                          pipelineStats.total /
                          Math.max(
                            1,
                            Math.floor(
                              (Date.now() -
                                new Date(job.postedDate).getTime()) /
                                (1000 * 60 * 60 * 24),
                            ),
                          )
                        ).toFixed(1)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Hiring Funnel</CardTitle>
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

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Source Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        source: "LinkedIn",
                        count: Math.floor(pipelineStats.total * 0.4),
                        percentage: 40,
                      },
                      {
                        source: "Career Page",
                        count: Math.floor(pipelineStats.total * 0.25),
                        percentage: 25,
                      },
                      {
                        source: "Referral",
                        count: Math.floor(pipelineStats.total * 0.2),
                        percentage: 20,
                      },
                      {
                        source: "Indeed",
                        count: Math.floor(pipelineStats.total * 0.15),
                        percentage: 15,
                      },
                    ].map((item) => (
                      <div
                        key={item.source}
                        className="flex items-center justify-between"
                      >
                        <div className="flex-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">
                              {item.source}
                            </span>
                            <span className="font-medium">{item.count}</span>
                          </div>
                          <Progress value={item.percentage} className="h-1.5" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">Key Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-muted/50 rounded-xl">
                      <p className="text-3xl font-bold text-primary">
                        {Math.floor(
                          (Date.now() - new Date(job.postedDate).getTime()) /
                            (1000 * 60 * 60 * 24),
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Days to Fill
                      </p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-xl">
                      <p className="text-3xl font-bold text-accent">
                        {pipelineStats.total > 0
                          ? Math.round(
                              (pipelineStats.interview / pipelineStats.total) *
                                100,
                            )
                          : 0}
                        %
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Interview Rate
                      </p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-xl">
                      <p className="text-3xl font-bold text-success">
                        {pipelineStats.interview > 0
                          ? Math.round(
                              (pipelineStats.hired / pipelineStats.interview) *
                                100,
                            )
                          : 0}
                        %
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Conversion Rate
                      </p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-xl">
                      <p className="text-3xl font-bold text-warning">
                        {pipelineStats.total > 0
                          ? Math.round(
                              ((pipelineStats.total - pipelineStats.rejected) /
                                pipelineStats.total) *
                                100,
                            )
                          : 0}
                        %
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Quality Rate
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Pause Job Dialog */}
      <AlertDialog open={showPauseDialog} onOpenChange={setShowPauseDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {job.status === "paused" ? "Resume" : "Pause"} Job Posting?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {job.status === "paused"
                ? "This will reopen the job posting and allow new applications."
                : "This will pause the job posting and prevent new applications. You can resume it later."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handlePauseJob}>
              {job.status === "paused" ? "Resume" : "Pause"} Job
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Close Job Dialog */}
      <AlertDialog open={showCloseDialog} onOpenChange={setShowCloseDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Close Job Posting?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently close the job posting. Candidates in the
              pipeline will remain accessible, but no new applications will be
              accepted. This action can be reversed later if needed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCloseJob}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Close Job
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
