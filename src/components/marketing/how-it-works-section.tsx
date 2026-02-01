"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Upload, Sparkles, Users, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Post Your Job",
    description:
      "Create a job posting in minutes. Our AI helps you write compelling descriptions and suggests optimal requirements.",
    color: "from-primary to-primary/70",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "AI Screens Candidates",
    description:
      "TalentSage automatically parses resumes, evaluates candidates against your criteria, and ranks them by fit.",
    color: "from-secondary to-secondary/70",
  },
  {
    number: "03",
    icon: Users,
    title: "Review Top Matches",
    description:
      "See AI-generated insights, scores, and recommendations. Focus your time on the best-fit candidates.",
    color: "from-accent to-accent/70",
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Hire with Confidence",
    description:
      "Schedule interviews, collect feedback, and make data-driven hiring decisions all in one place.",
    color: "from-success to-success/70",
  },
];

export function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="py-16 lg:py-24 bg-background relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm font-semibold text-primary mb-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20"
          >
            HOW IT WORKS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance"
          >
            From posting to hiring in 4 simple steps
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 text-base sm:text-lg text-muted-foreground"
          >
            TalentSage streamlines your entire recruitment workflow with
            AI-powered automation at every step.
          </motion.p>
        </div>

        {/* Steps Grid - 4 Column Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + 0.08 * index }}
              whileHover={{ y: -4 }}
              className="group relative"
            >
              {/* Step Card */}
              <div className="h-full p-6 rounded-2xl bg-gradient-to-br from-card to-secondary/5 border border-primary/10 hover:border-primary/30 transition-all duration-300">
                {/* Icon and Number */}
                <div className="flex items-start gap-3 mb-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg shadow-primary/20`}
                  >
                    <step.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <span className="text-3xl font-bold text-primary/30">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
