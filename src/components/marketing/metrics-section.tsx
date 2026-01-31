'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { TrendingDown, Zap, Users, DollarSign, Clock, HeadphonesIcon } from 'lucide-react';

const metrics = [
  {
    value: 60,
    suffix: '%',
    label: 'Reduction in time-to-hire',
    description: 'Cut your hiring cycle dramatically with AI-powered workflows',
    icon: TrendingDown,
    color: 'from-primary to-primary/70',
  },
  {
    value: 75,
    suffix: '%',
    label: 'Faster screening and shortlisting',
    description: 'AI evaluates candidates in seconds, not hours',
    icon: Zap,
    color: 'from-accent to-accent/70',
  },
  {
    value: 40,
    suffix: '%',
    label: 'Higher candidate engagement',
    description: 'Keep candidates informed and excited throughout the process',
    icon: Users,
    color: 'from-success to-success/70',
  },
  {
    value: 30,
    suffix: '%',
    label: 'Recruiter productivity boost',
    description: 'Let AI handle repetitive tasks so recruiters can focus on relationships',
    icon: Clock,
    color: 'from-warning to-warning/70',
  },
  {
    value: 50,
    suffix: '%',
    label: 'Cost savings on admin tasks',
    description: 'Reduce manual work and administrative overhead',
    icon: DollarSign,
    color: 'from-primary to-accent',
  },
  {
    value: 24,
    suffix: '/7',
    label: 'AI chatbot support',
    description: 'Instant answers to candidate questions, any time',
    icon: HeadphonesIcon,
    color: 'from-accent to-primary',
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
    const unsubscribe = display.on('change', (latest) => {
      setDisplayValue(latest);
    });
    return () => unsubscribe();
  }, [display]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
}

export function MetricsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="metrics" ref={ref} className="py-20 lg:py-32 bg-gradient-to-b from-secondary/50 to-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm font-medium text-primary mb-4"
          >
            PROVEN RESULTS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance"
          >
            Impact you can measure
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg text-muted-foreground text-pretty"
          >
            Our customers see real, measurable improvements in their hiring process.
            Here is what you can expect with TalentSage.
          </motion.p>
        </div>

        {/* Metrics grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="relative group"
            >
              <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 h-full">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center mb-6`}>
                  <metric.icon className="h-6 w-6 text-white" />
                </div>

                {/* Value */}
                <div className="text-5xl font-bold text-foreground mb-2">
                  <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                </div>

                {/* Label */}
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {metric.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground">
                  {metric.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
