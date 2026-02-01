"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
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
      className="relative overflow-hidden bg-gradient-to-b from-background via-background/50 to-background"
    >
      {/* Animated background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/3 -right-1/4 w-[900px] h-[900px] rounded-full bg-gradient-to-br from-primary/15 to-secondary/8 blur-3xl opacity-60"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/3 -left-1/4 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-accent/10 to-primary/8 blur-3xl opacity-60"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-secondary/5 blur-3xl opacity-40" />
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/15 to-secondary/15 border border-primary/20 text-primary text-sm font-medium mb-6 group hover:border-primary/40 transition-colors"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Sparkles className="h-4 w-4" />
              </motion.div>
              <span>AI-Native Recruitment Platform</span>
            </motion.div>

            {/* Headline with gradient */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-tight"
            >
              <span className="text-foreground">Hire smarter.</span>
              <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Hire faster.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 text-pretty leading-relaxed"
            >
              TalentSage is the AI-native recruitment operating system that
              reduces time-to-hire by 60% with intelligent candidate matching
              and automated workflows.
            </motion.p>

            {/* Benefits list with stagger */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start flex-wrap"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                  <span>{benefit}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="text-base px-8 bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 group"
                asChild
              >
                <Link href="/dashboard" className="flex items-center">
                  Start Free Trial
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.div>
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
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
              className="mt-12 pt-8 border-t border-primary/10"
            >
              <p className="text-sm text-muted-foreground mb-4">
                Trusted by leading companies worldwide
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8">
                {["TechCorp", "InnovateCo", "FutureHR", "ScaleUp Inc"].map(
                  (company, i) => (
                    <motion.span
                      key={company}
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                      className="text-sm font-semibold text-muted-foreground opacity-70 hover:opacity-100 transition-opacity"
                    >
                      {company}
                    </motion.span>
                  ),
                )}
              </div>
            </motion.div>
          </div>

          {/* Right column - Visual with animations */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            {/* Main dashboard preview */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative rounded-2xl bg-gradient-to-br from-card via-card to-secondary/5 border-2 border-primary/25 shadow-2xl shadow-primary/30 overflow-hidden group hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-500"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Header bar */}

              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded-md bg-gradient-to-r from-muted to-muted/50 text-xs text-muted-foreground font-mono font-semibold border border-border/50">
                  TalentSage AI Dashboard
                </div>
              </div>

              {/* Inline notifications (inside dashboard card) */}
              <div className="absolute left-6 top-1 right-6 flex items-start justify-between pointer-events-none z-30">
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.9 }}
                  whileHover={{ scale: 1.04 }}
                  className="hidden lg:flex pointer-events-auto items-start gap-3 p-3 rounded-xl bg-gradient-to-br from-success/12 to-success/5 border border-success/30 shadow-md shadow-success/15 w-44"
                  aria-label="AI Match Found notification"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-success/30 to-success/20 flex items-center justify-center flex-shrink-0 border border-success/50 shadow-sm shadow-success/20">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      AI Match Found
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium text-success">
                        95% match
                      </span>{" "}
                      <span className="text-muted-foreground">
                        - Sarah Chen
                      </span>
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 8 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.95 }}
                  whileHover={{ scale: 1.04 }}
                  className="hidden lg:flex pointer-events-auto items-start gap-3 p-3 rounded-xl bg-gradient-to-br from-primary/12 to-accent/6 border border-primary/30 shadow-md shadow-primary/15 w-44"
                  aria-label="Interview scheduled notification"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center flex-shrink-0 border border-primary/50 shadow-sm shadow-primary/20">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Sparkles className="h-4 w-4 text-primary" />
                    </motion.div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      Interview Scheduled
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium text-primary">
                        Tomorrow, 2:00 PM
                      </span>{" "}
                      <span className="text-muted-foreground">
                        - Emily Watson
                      </span>
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Dashboard content mock */}
              <div className="pt-16 px-6 pb-6 bg-gradient-to-br from-background/90 via-background/80 to-secondary/5 relative z-10">
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
                      whileHover={{ scale: 1.05 }}
                      className="p-4 rounded-xl bg-gradient-to-br from-card to-secondary/20 border border-primary/10 hover:border-primary/30 transition-colors"
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
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center gap-4 p-3 rounded-lg bg-gradient-to-r from-card to-secondary/10 border border-primary/10 hover:border-primary/30 transition-colors cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-secondary/20 flex items-center justify-center text-primary font-semibold text-sm">
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
                        <p className="text-sm font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
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
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
