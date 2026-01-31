'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-accent p-12 lg:p-20"
        >
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-1/2 -left-1/4 w-[400px] h-[400px] rounded-full bg-white/10 blur-3xl" />
          </div>

          <div className="relative text-center max-w-3xl mx-auto">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 mb-8"
            >
              <Sparkles className="h-8 w-8 text-white" />
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance"
            >
              Ready to transform your hiring?
            </motion.h2>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 text-lg sm:text-xl text-white/80 text-pretty"
            >
              Join thousands of companies using TalentSage to build better teams, faster. 
              Start your free trial today - no credit card required.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                variant="secondary"
                className="text-base px-8 bg-white text-primary hover:bg-white/90"
                asChild
              >
                <Link href="/dashboard">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 border-white/30 text-white hover:bg-white/10 bg-transparent"
              >
                Schedule a Demo
              </Button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/60 text-sm"
            >
              <span>No credit card required</span>
              <span className="hidden sm:inline">|</span>
              <span>14-day free trial</span>
              <span className="hidden sm:inline">|</span>
              <span>Cancel anytime</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
