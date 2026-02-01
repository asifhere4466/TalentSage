"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, MapPin, Phone, Mail } from "lucide-react";

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#" },
    { label: "Integrations", href: "#" },
    { label: "API", href: "#" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Press", href: "#" },
  ],
  resources: [
    { label: "Documentation", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "Webinars", href: "#" },
    { label: "Case Studies", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "GDPR", href: "#" },
  ],
};

const locations = [
  {
    city: "Houston, TX",
    address:
      "8990 Kirby Dr, Ste 220, Houston, TX 77054, United States of America",
  },
  {
    city: "Dubai, UAE",
    address:
      "Building A1, Dubai Digital Park, Dubai Silicon Oasis, Dubai, United Arab Emirates",
  },
];

export function Footer() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <footer
      id="contact"
      className="bg-gradient-to-b from-foreground to-foreground/95 text-background relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main footer content */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="py-16 lg:py-20 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12"
        >
          {/* Brand column */}
          <motion.div variants={item} className="col-span-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block mb-4"
            >
              <Link
                href="/"
                className="flex items-center gap-2 font-bold text-xl group"
              >
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/50 transition-shadow">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span>TalentSage</span>
              </Link>
            </motion.div>
            <p className="text-background/70 text-sm leading-relaxed mb-6 max-w-sm">
              The AI-native recruitment operating system that helps you hire
              smarter and faster.
            </p>

            {/* Contact info */}
            <div className="space-y-3 text-sm">
              <a
                href="tel:+12817860706"
                className="flex items-center gap-2 text-background/70 hover:text-background transition-colors group"
              >
                <motion.div whileHover={{ scale: 1.2 }}>
                  <Phone className="h-4 w-4" />
                </motion.div>
                <span>+(1) 281-786-0706</span>
              </a>
              <a
                href="mailto:info@visiontact.com"
                className="flex items-center gap-2 text-background/70 hover:text-background transition-colors group"
              >
                <motion.div whileHover={{ scale: 1.2 }}>
                  <Mail className="h-4 w-4" />
                </motion.div>
                <span>info@visiontact.com</span>
              </a>
            </div>
          </motion.div>

          {/* Product links */}
          <motion.div variants={item}>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, i) => (
                <motion.li key={link.label} variants={item}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company links */}
          <motion.div variants={item}>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <motion.li key={link.label} whileHover={{ x: 4 }}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources links */}
          <motion.div variants={item}>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <motion.li key={link.label} whileHover={{ x: 4 }}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Legal links */}
          <motion.div variants={item}>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <motion.li key={link.label} whileHover={{ x: 4 }}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Locations */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="py-8 border-t border-background/10"
        >
          <h4 className="font-semibold mb-6">Our Locations</h4>
          <div className="grid md:grid-cols-2 gap-6">
            {locations.map((location, i) => (
              <motion.div
                key={location.city}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="flex gap-3 group p-3 rounded-lg hover:bg-background/5 transition-colors"
              >
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-medium">{location.city}</p>
                  <p className="text-sm text-background/70">
                    {location.address}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="py-6 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-background/60">
            &copy; {new Date().getFullYear()} Vision Tact LLC. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Twitter", "LinkedIn", "GitHub"].map((social) => (
              <motion.div key={social} whileHover={{ scale: 1.1 }}>
                <Link
                  href="#"
                  className="text-sm text-background/60 hover:text-background transition-colors"
                >
                  {social}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
