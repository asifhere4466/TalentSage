"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { AssistantState } from "@/lib/types";

interface AssistantAvatarProps {
  state: AssistantState;
  size?: "sm" | "md" | "lg";
  reduceMotion?: boolean;
}

export function AssistantAvatar({
  state,
  size = "md",
  reduceMotion = false,
}: AssistantAvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  const innerSize = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-8 h-8",
  };

  const pulseSize = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        sizeClasses[size],
      )}
    >
      {/* Background glow */}
      <motion.div
        className={cn("absolute rounded-full bg-primary/20", pulseSize[size])}
        animate={
          reduceMotion
            ? {}
            : {
                scale:
                  state === "idle"
                    ? [1, 1.1, 1]
                    : state === "listening"
                      ? [1, 1.3, 1]
                      : state === "thinking"
                        ? [1, 1.2, 1]
                        : [1, 1.4, 1],
                opacity: state === "idle" ? [0.3, 0.5, 0.3] : [0.4, 0.7, 0.4],
              }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                duration:
                  state === "listening"
                    ? 0.8
                    : state === "thinking"
                      ? 1.5
                      : state === "speaking"
                        ? 0.5
                        : 2,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      />

      {/* Main avatar circle */}
      <motion.div
        className={cn(
          "relative rounded-full flex items-center justify-center",
          sizeClasses[size],
          state === "idle" && "bg-gradient-to-br from-primary to-primary/80",
          state === "listening" && "bg-gradient-to-br from-accent to-accent/80",
          state === "thinking" &&
            "bg-gradient-to-br from-primary/80 to-accent/80",
          state === "speaking" && "bg-gradient-to-br from-primary to-accent",
        )}
        animate={
          reduceMotion
            ? { rotate: 0 }
            : {
                rotate: state === "thinking" ? [0, 360] : 0,
              }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                duration: 3,
                repeat: state === "thinking" ? Infinity : 0,
                ease: "linear",
              }
        }
      >
        {/* Inner animated element */}
        <div className="relative">
          {/* Core */}
          <motion.div
            className={cn("rounded-full bg-white/90", innerSize[size])}
            animate={
              reduceMotion
                ? {}
                : {
                    scale:
                      state === "speaking"
                        ? [1, 1.2, 0.9, 1.1, 1]
                        : state === "listening"
                          ? [1, 1.15, 1]
                          : 1,
                  }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: state === "speaking" ? 0.4 : 0.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
          />

          {/* Sound waves for listening */}
          {state === "listening" && !reduceMotion && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white/50"
                animate={{ scale: [1, 1.8], opacity: [0.8, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white/50"
                animate={{ scale: [1, 1.8], opacity: [0.8, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
              />
            </>
          )}

          {/* Orbiting dots for thinking */}
          {state === "thinking" && !reduceMotion && (
            <>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-white"
                  style={{
                    top: "50%",
                    left: "50%",
                    marginTop: "-3px",
                    marginLeft: "-3px",
                  }}
                  animate={{
                    x: [
                      Math.cos((i * 2 * Math.PI) / 3) * 12,
                      Math.cos((i * 2 * Math.PI) / 3 + Math.PI) * 12,
                      Math.cos((i * 2 * Math.PI) / 3) * 12,
                    ],
                    y: [
                      Math.sin((i * 2 * Math.PI) / 3) * 12,
                      Math.sin((i * 2 * Math.PI) / 3 + Math.PI) * 12,
                      Math.sin((i * 2 * Math.PI) / 3) * 12,
                    ],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </>
          )}

          {/* Sound bars for speaking */}
          {state === "speaking" && !reduceMotion && (
            <div className="absolute -inset-1 flex items-center justify-center gap-0.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-0.5 bg-white/80 rounded-full"
                  animate={{
                    height: ["4px", "12px", "4px"],
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: Infinity,
                    delay: i * 0.08,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Status indicator */}
      <div
        className={cn(
          "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card",
          state === "idle" && "bg-success",
          state === "listening" && "bg-accent animate-pulse",
          state === "thinking" && "bg-warning animate-pulse",
          state === "speaking" && "bg-primary animate-pulse",
        )}
      />
    </div>
  );
}
