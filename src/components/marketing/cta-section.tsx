"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent p-12 lg:p-24"
        >
          {/* Background decorations with animation */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full bg-white/15 blur-3xl"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-1/2 -left-1/4 w-[400px] h-[400px] rounded-full bg-white/10 blur-3xl"
            />
          </div>

          <div className="relative text-center max-w-3xl mx-auto">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2,
                type: "spring",
                stiffness: 200,
              }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 mb-8 backdrop-blur-sm border border-white/30"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <Sparkles className="h-8 w-8 text-white" />
              </motion.div>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-balance leading-tight"
            >
              Ready to transform your hiring?
            </motion.h2>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 text-lg sm:text-xl text-white/90 text-pretty max-w-2xl mx-auto"
            >
              Join thousands of companies using TalentSage to build better
              teams, faster. Start your free trial today - no credit card
              required.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="text-base px-8 bg-white text-primary hover:bg-white/90 font-semibold shadow-lg hover:shadow-2xl transition-all duration-300"
                  asChild
                >
                  <Link href="/dashboard" className="flex items-center">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="text-base px-8 border-2 border-white text-white hover:bg-white/10 bg-transparent font-semibold transition-all duration-300 backdrop-blur-sm"
                >
                  Schedule a Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm font-medium"
            >
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
                No credit card required
              </span>
              <span className="hidden sm:inline w-px h-4 bg-white/30" />
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
                14-day free trial
              </span>
              <span className="hidden sm:inline w-px h-4 bg-white/30" />
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
                Cancel anytime
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
