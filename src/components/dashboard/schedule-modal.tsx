"use client"

import { useState } from "react"
import type { Candidate } from "@/lib/types"
import { useStore } from "@/lib/store"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar, Clock, Video, Users, MapPin, CheckCircle } from "lucide-react"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"

interface ScheduleModalProps {
  open: boolean
  onClose: () => void
  candidate: Candidate | null
}

const TIME_SLOTS = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
]

const INTERVIEW_TYPES = [
  { id: "video", label: "Video Call", icon: Video },
  { id: "phone", label: "Phone Screen", icon: Clock },
  { id: "onsite", label: "On-site", icon: MapPin },
  { id: "panel", label: "Panel Interview", icon: Users },
]

export function ScheduleModal({ open, onClose, candidate }: ScheduleModalProps) {
  const { addInterview } = useStore()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    type: "video",
    date: "",
    time: "",
    duration: "60",
    interviewer: "",
    notes: "",
  })

  if (!candidate) return null

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    addInterview({
      id: `interview-${Date.now()}`,
      candidateId: candidate.id,
      jobId: candidate.jobId,
      type: formData.type as "video" | "phone" | "onsite" | "panel",
      scheduledAt: `${formData.date}T${formData.time}`,
      duration: parseInt(formData.duration),
      interviewers: [formData.interviewer || "Sarah Chen"],
      status: "scheduled",
      notes: formData.notes,
    })
    
    setIsSubmitting(false)
    setStep(3)
    toast.success(`Interview scheduled with ${candidate.name}`)
  }

  const handleClose = () => {
    setStep(1)
    setFormData({
      type: "video",
      date: "",
      time: "",
      duration: "60",
      interviewer: "",
      notes: "",
    })
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {step === 3 ? "Interview Scheduled!" : `Schedule Interview with ${candidate.name}`}
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label>Interview Type</Label>
                <div className="grid grid-cols-2 gap-2">
                  {INTERVIEW_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setFormData({ ...formData, type: type.id })}
                      className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-colors ${
                        formData.type === type.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <type.icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="pl-10"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Time</Label>
                  <Select
                    value={formData.time}
                    onValueChange={(value) => setFormData({ ...formData, time: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIME_SLOTS.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Duration</Label>
                <Select
                  value={formData.duration}
                  onValueChange={(value) => setFormData({ ...formData, duration: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="interviewer">Interviewer</Label>
                <Select
                  value={formData.interviewer}
                  onValueChange={(value) => setFormData({ ...formData, interviewer: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select interviewer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sarah Chen">Sarah Chen (Hiring Manager)</SelectItem>
                    <SelectItem value="Alex Rivera">Alex Rivera (Tech Lead)</SelectItem>
                    <SelectItem value="Jordan Kim">Jordan Kim (Senior Engineer)</SelectItem>
                    <SelectItem value="Taylor Morgan">Taylor Morgan (HR)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes for Interviewer</Label>
                <Textarea
                  id="notes"
                  placeholder="Any specific topics to cover, focus areas, or context..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                <h4 className="text-sm font-medium">Interview Summary</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Type: {INTERVIEW_TYPES.find((t) => t.id === formData.type)?.label}</p>
                  <p>Date: {formData.date ? new Date(formData.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }) : "Not selected"}</p>
                  <p>Time: {formData.time || "Not selected"}</p>
                  <p>Duration: {formData.duration} minutes</p>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6 text-center space-y-4"
            >
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Interview Scheduled</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Calendar invite sent to {candidate.name} and {formData.interviewer || "the interviewer"}
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-left text-sm">
                <p className="font-medium">{INTERVIEW_TYPES.find((t) => t.id === formData.type)?.label}</p>
                <p className="text-muted-foreground">
                  {formData.date && new Date(formData.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at {formData.time}
                </p>
                <p className="text-muted-foreground">{formData.duration} minutes</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <DialogFooter>
          {step === 1 && (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                onClick={() => setStep(2)}
                disabled={!formData.date || !formData.time}
              >
                Continue
              </Button>
            </>
          )}
          {step === 2 && (
            <>
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Scheduling..." : "Schedule Interview"}
              </Button>
            </>
          )}
          {step === 3 && (
            <Button onClick={handleClose} className="w-full">
              Done
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
