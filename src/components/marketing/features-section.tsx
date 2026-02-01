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
    borderColor: "border-primary/20",
    gradient: "from-primary to-primary/70",
  },
  {
    icon: FileSearch,
    title: "Automated Resume Parsing",
    description:
      "Instantly extract and structure candidate information from resumes in any format. No manual data entry required.",
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/20",
    gradient: "from-accent to-accent/70",
  },
  {
    icon: Target,
    title: "AI-Driven Shortlisting & Scoring",
    description:
      "Automatically rank and score candidates against your custom evaluation rubrics. Surface top talent in seconds.",
    color: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success/20",
    gradient: "from-success to-success/70",
  },
  {
    icon: Calendar,
    title: "Smart Interview Scheduling",
    description:
      "Eliminate scheduling back-and-forth. Our AI coordinates calendars and finds optimal interview times instantly.",
    color: "text-warning",
    bgColor: "bg-warning/10",
    borderColor: "border-warning/20",
    gradient: "from-warning to-warning/70",
  },
  {
    icon: TrendingUp,
    title: "Predictive Hiring Analytics",
    description:
      "Data-driven insights predict candidate success, time-to-fill, and hiring outcomes before you make decisions.",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
    gradient: "from-primary to-primary/70",
  },
  {
    icon: MessageSquare,
    title: "Chat-based Candidate Engagement",
    description:
      "24/7 AI chatbot handles candidate questions, updates, and engagement. Keep candidates informed and excited.",
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/20",
    gradient: "from-accent to-accent/70",
  },
];

export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="features"
      ref={ref}
      className="py-16 lg:py-24 bg-background relative overflow-hidden"
    >
      {/* Background gradient elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm font-semibold text-primary mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20"
          >
            POWERFUL FEATURES
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-balance"
          >
            Everything you need to hire the best talent
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground text-pretty max-w-2xl mx-auto"
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
              transition={{ duration: 0.5, delay: 0.05 * index }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              {/* Card background with gradient border effect */}
              <div
                className={`relative p-8 rounded-2xl bg-gradient-to-br from-card to-secondary/10 border ${feature.borderColor} hover:${feature.borderColor} transition-all duration-300 h-full overflow-hidden`}
              >
                {/* Background gradient on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                {/* Icon container */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`w-14 h-14 rounded-xl ${feature.bgColor} flex items-center justify-center mb-6 group-hover:shadow-lg transition-all duration-300 group-hover:shadow-primary/20`}
                >
                  <feature.icon className={`h-7 w-7 ${feature.color}`} />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {feature.description}
                </p>

                {/* Corner accent */}
                <div
                  className={`absolute top-0 right-0 w-24 h-24 ${feature.bgColor} rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
