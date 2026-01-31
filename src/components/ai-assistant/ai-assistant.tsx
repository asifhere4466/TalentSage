"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageCircle,
  X,
  Minus,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Users,
  FileText,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { AssistantAction, ChatMessage } from "@/lib/types";
import { AssistantAvatar } from "./assistant-avatar";

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

const suggestedActions: AssistantAction[] = [
  {
    id: "shortlist",
    type: "shortlist",
    label: "Shortlist top candidates",
    payload: {},
  },
  {
    id: "rubric",
    type: "generate_rubric",
    label: "Generate evaluation rubric",
    payload: {},
  },
  {
    id: "schedule",
    type: "schedule_interview",
    label: "Schedule interview",
    payload: {},
  },
];

const getActionIcon = (type: string) => {
  switch (type) {
    case "shortlist":
      return <Users className="h-3 w-3" />;
    case "generate_rubric":
      return <FileText className="h-3 w-3" />;
    case "schedule_interview":
      return <Calendar className="h-3 w-3" />;
    default:
      return <Sparkles className="h-3 w-3" />;
  }
};

export function AIAssistant() {
  const {
    assistantOpen,
    assistantMinimized,
    assistantState,
    chatMessages,
    selectedJobId,
    selectedCandidateId,
    setAssistantOpen,
    setAssistantMinimized,
    setAssistantState,
    addChatMessage,
    shortlistTopCandidates,
    generateRubric,
    getJobById,
    getCandidateById,
    settings,
  } = useAppStore();

  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(
    settings?.voiceEnabledDefault ?? true,
  );

  // Reflect live changes to settings
  useEffect(() => {
    setVoiceEnabled(settings?.voiceEnabledDefault ?? true);
  }, [settings?.voiceEnabledDefault]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Initialize speech APIs
  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;

      const SpeechRecognitionAPI =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognitionAPI) {
        recognitionRef.current = new SpeechRecognitionAPI();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = "en-US";

        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = event.results[0][0].transcript;
          setInputValue(transcript);
          setIsListening(false);
          setAssistantState("idle");
        };

        recognitionRef.current.onerror = () => {
          setIsListening(false);
          setAssistantState("idle");
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
          setAssistantState("idle");
        };
      }
    }
  }, [setAssistantState]);

  // Auto-scroll to bottom
  useEffect(() => {
    const scrollElement = scrollRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]",
    );
    if (scrollElement) {
      setTimeout(() => {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }, 0);
    }
  }, [chatMessages]);

  const speak = useCallback(
    (text: string) => {
      if (synthRef.current && voiceEnabled) {
        setAssistantState("speaking");
        setIsSpeaking(true);
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.onend = () => {
          setIsSpeaking(false);
          setAssistantState("idle");
        };
        synthRef.current.speak(utterance);
      }
    },
    [voiceEnabled, setAssistantState],
  );

  const toggleListening = () => {
    if (!recognitionRef.current) {
      addChatMessage({
        role: "assistant",
        content:
          "Voice input is not supported in your browser. Please type your message instead.",
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setAssistantState("idle");
    } else {
      recognitionRef.current.start();
      setIsListening(true);
      setAssistantState("listening");
    }
  };

  const processMessage = useCallback(
    (message: string) => {
      const lowerMessage = message.toLowerCase();
      let response = "";
      let actions: AssistantAction[] = [];

      // Check for shortlist command
      if (
        lowerMessage.includes("shortlist") &&
        (lowerMessage.includes("candidate") || lowerMessage.includes("top"))
      ) {
        if (selectedJobId) {
          const job = getJobById(selectedJobId);
          shortlistTopCandidates(selectedJobId);
          response = `I've analyzed all candidates for the ${job?.title || "selected"} position and shortlisted the top performers based on their AI evaluation scores. The candidates with the highest match scores have been moved to the Shortlisted stage.`;
          actions = [
            {
              id: "view",
              type: "view_job",
              label: "View shortlisted candidates",
              payload: { jobId: selectedJobId },
            },
          ];
        } else {
          response =
            "Please select a job first, then I can help you shortlist the top candidates for that position.";
        }
      }
      // Check for rubric command
      else if (
        lowerMessage.includes("rubric") ||
        lowerMessage.includes("evaluation") ||
        lowerMessage.includes("criteria")
      ) {
        if (selectedJobId) {
          const job = getJobById(selectedJobId);
          generateRubric(selectedJobId);
          response = `I've generated a customized evaluation rubric for the ${job?.title || "selected"} position. The rubric includes weighted criteria tailored to this role's requirements. You can review and adjust the weights in the job details.`;
          actions = [
            {
              id: "view",
              type: "view_job",
              label: "View rubric",
              payload: { jobId: selectedJobId },
            },
          ];
        } else {
          response =
            "Please select a job first, then I can generate an appropriate evaluation rubric for that role.";
        }
      }
      // Check for interview scheduling
      else if (
        lowerMessage.includes("schedule") &&
        lowerMessage.includes("interview")
      ) {
        if (selectedCandidateId) {
          const candidate = getCandidateById(selectedCandidateId);
          setShowScheduleModal(true);
          response = `I'll help you schedule an interview with ${candidate?.name || "the selected candidate"}. Opening the scheduling dialog now...`;
        } else if (selectedJobId) {
          response =
            "Please select a specific candidate from the pipeline, and I can help you schedule an interview with them.";
        } else {
          response =
            "Please navigate to a job and select a candidate first, then I can help you schedule an interview.";
        }
      }
      // General help
      else if (
        lowerMessage.includes("help") ||
        lowerMessage.includes("what can you do")
      ) {
        response = `I'm your AI recruitment assistant! Here's what I can help you with:

• **Shortlist candidates** - I'll analyze and rank candidates by their AI evaluation scores
• **Generate evaluation rubrics** - I'll create customized criteria for any role
• **Schedule interviews** - I'll help you set up interviews with candidates

Just select a job from the dashboard and ask me to help!`;
      }
      // Default response
      else {
        response = `I understand you're asking about "${message}". To help you best, try asking me to:

• "Shortlist top candidates for this job"
• "Generate an evaluation rubric for this role"  
• "Schedule an interview with this candidate"

I'm here to make your recruitment process smoother!`;
      }

      return { response, actions };
    },
    [
      selectedJobId,
      selectedCandidateId,
      getJobById,
      getCandidateById,
      shortlistTopCandidates,
      generateRubric,
    ],
  );

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    addChatMessage({
      role: "user",
      content: inputValue,
    });

    setInputValue("");
    setAssistantState("thinking");

    // Simulate AI thinking delay
    setTimeout(() => {
      const { response, actions } = processMessage(inputValue);

      addChatMessage({
        role: "assistant",
        content: response,
        actions,
      });

      setAssistantState("idle");

      if (voiceEnabled) {
        speak(response.replace(/\*\*/g, "").replace(/•/g, ""));
      }
    }, 1000);
  };

  const handleActionClick = (action: AssistantAction) => {
    let message = "";
    switch (action.type) {
      case "shortlist":
        message = "Shortlist top candidates for this job";
        break;
      case "generate_rubric":
        message = "Generate an evaluation rubric for this role";
        break;
      case "schedule_interview":
        message = "Schedule an interview with this candidate";
        break;
    }
    setInputValue(message);
    setTimeout(() => handleSend(), 100);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!assistantOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setAssistantOpen(true)}
            className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
          >
            <MessageCircle className="h-6 w-6" />
            <span className="sr-only">Open AI Assistant</span>
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-accent rounded-full animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {assistantOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: assistantMinimized ? "auto" : "600px",
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] bg-card rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/10 to-accent/10">
              <div className="flex items-center gap-3">
                <AssistantAvatar
                  state={assistantState}
                  reduceMotion={settings?.prefersReducedMotion}
                />
                <div>
                  <h3 className="font-semibold text-foreground">Sage</h3>
                  <p className="text-xs text-muted-foreground">
                    {assistantState === "listening" && "Listening..."}
                    {assistantState === "thinking" && "Thinking..."}
                    {assistantState === "speaking" && "Speaking..."}
                    {assistantState === "idle" && "AI Assistant"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                >
                  {voiceEnabled ? (
                    <Volume2 className="h-4 w-4" />
                  ) : (
                    <VolumeX className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setAssistantMinimized(!assistantMinimized)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setAssistantOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            {!assistantMinimized && (
              <>
                <ScrollArea className="flex-1 overflow-hidden" ref={scrollRef}>
                  <div className="p-4">
                    <div className="space-y-4">
                      {/* Welcome message */}
                      {chatMessages.length === 0 && (
                        <div className="text-center py-8">
                          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                            <Sparkles className="h-8 w-8 text-primary" />
                          </div>
                          <h4 className="font-semibold text-foreground mb-2">
                            Hi, I am Sage!
                          </h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            Your AI recruitment assistant. I can help you
                            shortlist candidates, generate rubrics, and schedule
                            interviews.
                          </p>
                          <div className="flex flex-wrap gap-2 justify-center">
                            {suggestedActions.map((action) => (
                              <Button
                                key={action.id}
                                variant="outline"
                                size="sm"
                                className="text-xs bg-transparent"
                                onClick={() => handleActionClick(action)}
                              >
                                {getActionIcon(action.type)}
                                <span className="ml-1">{action.label}</span>
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Chat messages */}
                      {chatMessages.map((message) => (
                        <div
                          key={message.id}
                          className={cn(
                            "flex gap-3",
                            message.role === "user"
                              ? "justify-end"
                              : "justify-start",
                          )}
                        >
                          {message.role === "assistant" && (
                            <div className="flex-shrink-0">
                              <AssistantAvatar
                                state="idle"
                                size="sm"
                                reduceMotion={settings?.prefersReducedMotion}
                              />
                            </div>
                          )}
                          <div
                            className={cn(
                              "max-w-[80%] rounded-2xl px-4 py-2",
                              message.role === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground",
                            )}
                          >
                            <p className="text-sm whitespace-pre-wrap">
                              {message.content}
                            </p>
                            <p className="text-[10px] opacity-70 mt-1">
                              {formatTime(message.timestamp)}
                            </p>
                            {message.actions && message.actions.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {message.actions.map((action) => (
                                  <Button
                                    key={action.id}
                                    variant="outline"
                                    size="sm"
                                    className="text-xs h-7 bg-background"
                                    onClick={() => handleActionClick(action)}
                                  >
                                    {action.label}
                                  </Button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                      {/* Thinking indicator */}
                      {assistantState === "thinking" && (
                        <div className="flex gap-3 justify-start">
                          <AssistantAvatar
                            state="thinking"
                            size="sm"
                            reduceMotion={settings?.prefersReducedMotion}
                          />
                          <div className="bg-secondary rounded-2xl px-4 py-3">
                            <div className="flex gap-1">
                              <span
                                className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                                style={{ animationDelay: "0ms" }}
                              />
                              <span
                                className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                                style={{ animationDelay: "150ms" }}
                              />
                              <span
                                className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                                style={{ animationDelay: "300ms" }}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </ScrollArea>

                {/* Input */}
                <div className="p-4 border-t border-border bg-card">
                  <div className="flex gap-2">
                    <Button
                      variant={isListening ? "destructive" : "outline"}
                      size="icon"
                      className="flex-shrink-0"
                      onClick={toggleListening}
                    >
                      {isListening ? (
                        <MicOff className="h-4 w-4" />
                      ) : (
                        <Mic className="h-4 w-4" />
                      )}
                    </Button>
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Type a message..."
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSend}
                      disabled={!inputValue.trim()}
                      className="flex-shrink-0"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Schedule Interview Modal */}
      <ScheduleInterviewModal
        open={showScheduleModal}
        onOpenChange={setShowScheduleModal}
      />
    </>
  );
}

function ScheduleInterviewModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const {
    selectedCandidateId,
    getCandidateById,
    scheduleInterview,
    addChatMessage,
    addAuditEvent,
  } = useAppStore();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [type, setType] = useState<"phone" | "video" | "onsite">("video");

  const candidate = selectedCandidateId
    ? getCandidateById(selectedCandidateId)
    : null;

  const handleSchedule = () => {
    if (!selectedCandidateId || !candidate || !date) return;

    const scheduledAt = new Date(`${date}T${time}`).toISOString();

    scheduleInterview({
      candidateId: selectedCandidateId,
      jobId: candidate.jobId,
      scheduledAt,
      duration: 60,
      type,
      interviewers: ["Hiring Manager"],
    });

    addAuditEvent(selectedCandidateId, {
      type: "interview_scheduled",
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} interview scheduled for ${new Date(scheduledAt).toLocaleDateString()}`,
      actor: "Recruiter via AI Assistant",
    });

    addChatMessage({
      role: "assistant",
      content: `Interview scheduled with ${candidate.name} for ${new Date(scheduledAt).toLocaleDateString()} at ${time}. The candidate will receive a calendar invite shortly.`,
    });

    onOpenChange(false);
    setDate("");
    setTime("10:00");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-card rounded-xl p-6 w-[400px] shadow-xl border border-border"
      >
        <h3 className="text-lg font-semibold mb-4">Schedule Interview</h3>
        {candidate ? (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              Schedule an interview with <strong>{candidate.name}</strong>
            </p>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Date</label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Time</label>
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Interview Type
                </label>
                <div className="flex gap-2">
                  {(["video", "phone", "onsite"] as const).map((t) => (
                    <Button
                      key={t}
                      variant={type === t ? "default" : "outline"}
                      size="sm"
                      onClick={() => setType(t)}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleSchedule} disabled={!date}>
                Schedule
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Please select a candidate first
            </p>
            <Button className="mt-4" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
