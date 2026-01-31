'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Briefcase,
  Users,
  Calendar,
  TrendingUp,
  ArrowRight,
  Clock,
  CheckCircle2,
} from 'lucide-react';

export default function DashboardPage() {
  const { jobs, candidates, scheduledInterviews } = useAppStore();

  const stats = [
    {
      label: 'Active Jobs',
      value: jobs.filter((j) => j.status === 'open').length,
      icon: Briefcase,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Total Candidates',
      value: candidates.length,
      icon: Users,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      label: 'Scheduled Interviews',
      value: scheduledInterviews.length,
      icon: Calendar,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      label: 'Hired This Month',
      value: candidates.filter((c) => c.stage === 'hired').length,
      icon: TrendingUp,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
  ];

  const recentCandidates = candidates
    .slice()
    .sort((a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here is an overview of your recruitment pipeline.
        </p>
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
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Content grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Active Jobs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Active Jobs</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/jobs">
                  View All
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jobs.filter((j) => j.status === 'open').map((job) => (
                  <Link
                    key={job.id}
                    href={`/dashboard/jobs/${job.id}`}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div>
                      <p className="font-medium text-foreground">{job.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {job.department} | {job.location}
                      </p>
                    </div>
                    <Badge variant="secondary">{job.candidateCount} candidates</Badge>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Candidates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Candidates</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/candidates">
                  View All
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCandidates.map((candidate) => (
                  <Link
                    key={candidate.id}
                    href={`/dashboard/candidates/${candidate.id}`}
                    className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                      {candidate.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{candidate.name}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {candidate.position}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          candidate.stage === 'interview'
                            ? 'default'
                            : candidate.stage === 'shortlisted'
                            ? 'secondary'
                            : candidate.stage === 'rejected'
                            ? 'destructive'
                            : 'outline'
                        }
                      >
                        {candidate.stage}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Pipeline overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Pipeline Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { stage: 'applied', label: 'Applied', icon: Clock },
                { stage: 'shortlisted', label: 'Shortlisted', icon: CheckCircle2 },
                { stage: 'interview', label: 'Interview', icon: Calendar },
                { stage: 'hired', label: 'Hired', icon: TrendingUp },
              ].map(({ stage, label, icon: Icon }) => {
                const count = candidates.filter((c) => c.stage === stage).length;
                return (
                  <div
                    key={stage}
                    className="p-4 rounded-lg bg-secondary/50 text-center"
                  >
                    <Icon className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-2xl font-bold text-foreground">{count}</p>
                    <p className="text-sm text-muted-foreground">{label}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
