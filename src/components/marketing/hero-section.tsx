"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Play,
  CheckCircle2,
  Sparkles,
  Users,
  Zap,
  BarChart3,
} from "lucide-react";

const benefits = [
  "AI-powered candidate matching",
  "Automated resume screening",
  "Smart interview scheduling",
];

export function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-background via-background to-secondary/30 pt-8 pb-20 lg:pt-16 lg:pb-32"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left column - Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <Sparkles className="h-4 w-4" />
              <span>AI-Native Recruitment Platform</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance"
            >
              Hire smarter.
              <br />
              <span className="text-primary">Hire faster.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 text-pretty"
            >
              TalentSage is the AI-native recruitment operating system that
              reduces time-to-hire by 60% with intelligent candidate matching
              and automated workflows.
            </motion.p>

            {/* Benefits list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button size="lg" className="text-base px-8" asChild>
                <Link href="/dashboard">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 bg-transparent"
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-12 pt-8 border-t border-border"
            >
              <p className="text-sm text-muted-foreground mb-4">
                Trusted by leading companies worldwide
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 opacity-60">
                {["TechCorp", "InnovateCo", "FutureHR", "ScaleUp Inc"].map(
                  (company) => (
                    <span
                      key={company}
                      className="text-lg font-semibold text-muted-foreground"
                    >
                      {company}
                    </span>
                  ),
                )}
              </div>
            </motion.div>
          </div>

          {/* Right column - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            {/* Main dashboard preview */}
            <div className="relative rounded-2xl bg-card border border-border shadow-2xl overflow-hidden">
              {/* Header bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/50" />
                  <div className="w-3 h-3 rounded-full bg-warning/50" />
                  <div className="w-3 h-3 rounded-full bg-success/50" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 rounded-md bg-muted text-xs text-muted-foreground">
                    dashboard.talentsage.ai
                  </div>
                </div>
              </div>

              {/* Dashboard content mock */}
              <div className="p-6 bg-gradient-to-br from-background to-secondary/20">
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    {
                      label: "Active Jobs",
                      value: "24",
                      icon: Zap,
                      color: "text-primary",
                    },
                    {
                      label: "Candidates",
                      value: "1,284",
                      icon: Users,
                      color: "text-accent",
                    },
                    {
                      label: "Hired",
                      value: "156",
                      icon: BarChart3,
                      color: "text-success",
                    },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                      className="p-4 rounded-xl bg-card border border-border"
                    >
                      <stat.icon className={`h-5 w-5 ${stat.color} mb-2`} />
                      <p className="text-2xl font-bold text-foreground">
                        {stat.value}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Candidate cards */}
                <div className="space-y-3">
                  {[
                    {
                      name: "Sarah Chen",
                      role: "Senior Frontend Engineer",
                      score: 92,
                      status: "Shortlisted",
                    },
                    {
                      name: "Emily Watson",
                      role: "Senior Frontend Engineer",
                      score: 88,
                      status: "Interview",
                    },
                    {
                      name: "Jessica Liu",
                      role: "Senior Frontend Engineer",
                      score: 85,
                      status: "Shortlisted",
                    },
                  ].map((candidate, i) => (
                    <motion.div
                      key={candidate.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                      className="flex items-center gap-4 p-3 rounded-lg bg-card border border-border"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                        {candidate.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm">
                          {candidate.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {candidate.role}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-primary">
                          {candidate.score}%
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {candidate.status}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 1 }}
              className="absolute -left-6 top-1/4 p-4 rounded-xl bg-card border border-border shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    AI Match Found
                  </p>
                  <p className="text-xs text-muted-foreground">
                    95% compatibility
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="absolute -right-4 bottom-1/4 p-4 rounded-xl bg-card border border-border shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Interview Scheduled
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Tomorrow, 2:00 PM
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
