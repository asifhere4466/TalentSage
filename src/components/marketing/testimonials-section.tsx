"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "TalentSage cut our time-to-hire in half. The AI shortlisting is incredibly accurate and saves our recruiters hours every day.",
    author: "Sarah Mitchell",
    role: "VP of People",
    company: "TechCorp Inc.",
    avatar: "SM",
  },
  {
    quote:
      "The automated scheduling alone is worth it. No more endless email chains trying to coordinate interviews. It just works.",
    author: "Michael Chen",
    role: "Head of Talent",
    company: "InnovateCo",
    avatar: "MC",
  },
  {
    quote:
      "We have seen a 40% improvement in candidate response rates since implementing the AI chatbot. Candidates love the instant communication.",
    author: "Jennifer Park",
    role: "Director of Recruiting",
    company: "FutureHR Solutions",
    avatar: "JP",
  },
];

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-16 lg:py-24 bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm font-semibold text-primary mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20"
          >
            TESTIMONIALS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-balance"
          >
            Loved by recruiting teams
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            See what our customers have to say about TalentSage
          </motion.p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 * index }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <div className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-card to-secondary/10 border border-primary/10 hover:border-primary/30 transition-all duration-300 overflow-hidden">
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Quote icon */}
                <motion.div
                  animate={{ rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="relative z-10"
                >
                  <Quote className="h-8 w-8 text-primary/30 mb-4" />
                </motion.div>

                {/* Stars */}
                <div className="flex gap-1 mb-4 relative z-10">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                    >
                      <Star className="h-4 w-4 fill-warning text-warning" />
                    </motion.div>
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-foreground text-lg leading-relaxed mb-6 relative z-10">
                  {`"${testimonial.quote}"`}
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/40 to-secondary/40 flex items-center justify-center text-primary font-semibold border border-primary/20"
                  >
                    {testimonial.avatar}
                  </motion.div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
