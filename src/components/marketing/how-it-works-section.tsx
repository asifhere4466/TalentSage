'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Upload, Sparkles, Users, CheckCircle } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Post Your Job',
    description:
      'Create a job posting in minutes. Our AI helps you write compelling descriptions and suggests optimal requirements.',
  },
  {
    number: '02',
    icon: Sparkles,
    title: 'AI Screens Candidates',
    description:
      'TalentSage automatically parses resumes, evaluates candidates against your criteria, and ranks them by fit.',
  },
  {
    number: '03',
    icon: Users,
    title: 'Review Top Matches',
    description:
      'See AI-generated insights, scores, and recommendations. Focus your time on the best-fit candidates.',
  },
  {
    number: '04',
    icon: CheckCircle,
    title: 'Hire with Confidence',
    description:
      'Schedule interviews, collect feedback, and make data-driven hiring decisions all in one place.',
  },
];

export function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="how-it-works" ref={ref} className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm font-medium text-primary mb-4"
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
            className="mt-4 text-lg text-muted-foreground text-pretty"
          >
            TalentSage streamlines your entire recruitment workflow with AI-powered 
            automation at every step.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-border lg:-translate-x-1/2 hidden sm:block" />

          {/* Steps */}
          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className={`relative grid lg:grid-cols-2 gap-8 lg:gap-16 ${
                  index % 2 === 1 ? 'lg:text-right' : ''
                }`}
              >
                {/* Content */}
                <div
                  className={`pl-20 sm:pl-24 lg:pl-0 ${
                    index % 2 === 1 ? 'lg:order-2 lg:pl-16' : 'lg:pr-16'
                  }`}
                >
                  <span className="text-6xl font-bold text-primary/20">{step.number}</span>
                  <h3 className="text-2xl font-semibold text-foreground mt-2 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Icon */}
                <div
                  className={`absolute left-0 lg:left-1/2 lg:-translate-x-1/2 sm:relative ${
                    index % 2 === 1 ? 'lg:order-1' : ''
                  }`}
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg sm:mx-auto">
                    <step.icon className="h-7 w-7 text-white" />
                  </div>
                </div>

                {/* Spacer for alternating layout on desktop */}
                <div className="hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
