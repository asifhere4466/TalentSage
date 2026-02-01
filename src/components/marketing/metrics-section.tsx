"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import {
  TrendingDown,
  Zap,
  Users,
  DollarSign,
  Clock,
  HeadphonesIcon,
} from "lucide-react";

const metrics = [
  {
    value: 60,
    suffix: "%",
    label: "Reduction in time-to-hire",
    description: "Cut your hiring cycle dramatically with AI-powered workflows",
    icon: TrendingDown,
    color: "from-primary to-primary/70",
    borderColor: "border-primary/20",
  },
  {
    value: 75,
    suffix: "%",
    label: "Faster screening and shortlisting",
    description: "AI evaluates candidates in seconds, not hours",
    icon: Zap,
    color: "from-accent to-accent/70",
    borderColor: "border-accent/20",
  },
  {
    value: 40,
    suffix: "%",
    label: "Higher candidate engagement",
    description: "Keep candidates informed and excited throughout the process",
    icon: Users,
    color: "from-success to-success/70",
    borderColor: "border-success/20",
  },
  {
    value: 30,
    suffix: "%",
    label: "Recruiter productivity boost",
    description:
      "Let AI handle repetitive tasks so recruiters can focus on relationships",
    icon: Clock,
    color: "from-warning to-warning/70",
    borderColor: "border-warning/20",
  },
  {
    value: 50,
    suffix: "%",
    label: "Cost savings on admin tasks",
    description: "Reduce manual work and administrative overhead",
    icon: DollarSign,
    color: "from-primary to-accent",
    borderColor: "border-primary/20",
  },
  {
    value: 24,
    suffix: "/7",
    label: "AI chatbot support",
    description: "Instant answers to candidate questions, any time",
    icon: HeadphonesIcon,
    color: "from-accent to-primary",
    borderColor: "border-accent/20",
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  const spring = useSpring(0, {
    stiffness: 50,
    damping: 30,
  });

  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  useEffect(() => {
    const unsubscribe = display.on("change", (latest) => {
      setDisplayValue(latest);
    });
    return () => unsubscribe();
  }, [display]);

  return (
    <span ref={ref} className="tabular-nums font-bold text-6xl">
      {displayValue}
      <span className="text-3xl">{suffix}</span>
    </span>
  );
}

export function MetricsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="metrics"
      ref={ref}
      className="py-16 lg:py-24 bg-gradient-to-b from-background via-background to-secondary/20 relative overflow-hidden"
    >
      {/* Background pattern and elements */}
      <div className="absolute inset-0 opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Floating gradient orbs */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm font-semibold text-primary mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20"
          >
            PROVEN RESULTS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-balance"
          >
            Impact you can measure
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground text-pretty max-w-2xl mx-auto"
          >
            Our customers see real, measurable improvements in their hiring
            process. Here is what you can expect with TalentSage.
          </motion.p>
        </div>

        {/* Metrics grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 * index }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative"
            >
              <div
                className={`relative p-8 rounded-2xl bg-gradient-to-br from-card to-secondary/10 border ${metric.borderColor} hover:${metric.borderColor} transition-all duration-300 h-full overflow-hidden`}
              >
                {/* Background gradient effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                {/* Icon with gradient background */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center mb-6 shadow-lg shadow-primary/20 group-hover:shadow-2xl group-hover:shadow-primary/30 transition-all duration-300`}
                >
                  <metric.icon className="h-7 w-7 text-white" />
                </motion.div>

                {/* Value - Animated Counter */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + 0.05 * index }}
                  className="mb-4"
                >
                  <div className="text-foreground font-bold">
                    <AnimatedCounter
                      value={metric.value}
                      suffix={metric.suffix}
                    />
                  </div>
                </motion.div>

                {/* Label */}
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {metric.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {metric.description}
                </p>

                {/* Corner accent */}
                <div
                  className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${metric.color} rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
