"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Brain,
  FileSearch,
  Target,
  Calendar,
  TrendingUp,
  MessageSquare,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Intelligent Candidate Matching",
    description:
      "Our AI analyzes thousands of data points to match candidates with positions based on skills, experience, culture fit, and career trajectory.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: FileSearch,
    title: "Automated Resume Parsing",
    description:
      "Instantly extract and structure candidate information from resumes in any format. No manual data entry required.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Target,
    title: "AI-Driven Shortlisting & Scoring",
    description:
      "Automatically rank and score candidates against your custom evaluation rubrics. Surface top talent in seconds.",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: Calendar,
    title: "Smart Interview Scheduling",
    description:
      "Eliminate scheduling back-and-forth. Our AI coordinates calendars and finds optimal interview times instantly.",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    icon: TrendingUp,
    title: "Predictive Hiring Analytics",
    description:
      "Data-driven insights predict candidate success, time-to-fill, and hiring outcomes before you make decisions.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: MessageSquare,
    title: "Chat-based Candidate Engagement",
    description:
      "24/7 AI chatbot handles candidate questions, updates, and engagement. Keep candidates informed and excited.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
];

export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" ref={ref} className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm font-medium text-primary mb-4"
          >
            POWERFUL FEATURES
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance"
          >
            Everything you need to hire the best talent
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg text-muted-foreground text-pretty"
          >
            TalentSage combines AI-powered automation with human-centered design
            to transform how you discover, evaluate, and hire talent.
          </motion.p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
