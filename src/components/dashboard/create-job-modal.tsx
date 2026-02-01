"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Briefcase, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface CreateJobModalProps {
  trigger?: React.ReactNode;
}

const departments = [
  "Engineering",
  "Design",
  "Marketing",
  "Sales",
  "Product",
  "Operations",
  "Human Resources",
  "Finance",
  "Legal",
  "Customer Success",
];

const jobTypes = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "remote", label: "Remote" },
];

export function CreateJobModal({ trigger }: CreateJobModalProps) {
  const router = useRouter();
  const { addJob } = useAppStore();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "full-time" as "full-time" | "part-time" | "contract" | "remote",
    salaryMin: "",
    salaryMax: "",
    description: "",
    requirements: "",
    responsibilities: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Job title is required";
    }
    if (!formData.department) {
      newErrors.department = "Department is required";
    }
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }
    if (!formData.salaryMin || parseInt(formData.salaryMin) < 0) {
      newErrors.salaryMin = "Valid minimum salary is required";
    }
    if (!formData.salaryMax || parseInt(formData.salaryMax) < 0) {
      newErrors.salaryMax = "Valid maximum salary is required";
    }
    if (parseInt(formData.salaryMin) > parseInt(formData.salaryMax)) {
      newErrors.salaryMax = "Maximum salary must be greater than minimum";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Job description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const requirementsArray = formData.requirements
      .split("\n")
      .map((r) => r.trim())
      .filter((r) => r.length > 0);

    const responsibilitiesArray = formData.responsibilities
      .split("\n")
      .map((r) => r.trim())
      .filter((r) => r.length > 0);

    const jobId = addJob({
      title: formData.title.trim(),
      department: formData.department,
      location: formData.location.trim(),
      type: formData.type,
      status: "open",
      description: formData.description.trim(),
      requirements:
        requirementsArray.length > 0
          ? requirementsArray
          : ["Experience required"],
      responsibilities:
        responsibilitiesArray.length > 0
          ? responsibilitiesArray
          : ["Responsibilities to be defined"],
      salary: {
        min: parseInt(formData.salaryMin) * 1000,
        max: parseInt(formData.salaryMax) * 1000,
        currency: "USD",
      },
    });

    setIsSubmitting(false);
    setOpen(false);

    // Reset form
    setFormData({
      title: "",
      department: "",
      location: "",
      type: "full-time",
      salaryMin: "",
      salaryMax: "",
      description: "",
      requirements: "",
      responsibilities: "",
    });
    setErrors({});

    toast.success("Job created successfully!");
    router.push(`/dashboard/jobs/${jobId}`);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Job
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
            Create New Job
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new job posting. Required
            fields are marked with *.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Basic Info */}
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Job Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="e.g. Senior Frontend Engineer"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className={errors.title ? "border-destructive" : ""}
                />
                {errors.title && (
                  <p className="text-xs text-destructive">{errors.title}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">
                  Department <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) =>
                    handleInputChange("department", value)
                  }
                >
                  <SelectTrigger
                    className={errors.department ? "border-destructive" : ""}
                  >
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.department && (
                  <p className="text-xs text-destructive">
                    {errors.department}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">
                  Location <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="location"
                  placeholder="e.g. Houston, TX or Remote"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  className={errors.location ? "border-destructive" : ""}
                />
                {errors.location && (
                  <p className="text-xs text-destructive">{errors.location}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Job Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleInputChange("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Salary Range */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="salaryMin">
                  Min Salary (k/year){" "}
                  <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="salaryMin"
                    type="number"
                    placeholder="80"
                    className={`pl-7 ${errors.salaryMin ? "border-destructive" : ""}`}
                    value={formData.salaryMin}
                    onChange={(e) =>
                      handleInputChange("salaryMin", e.target.value)
                    }
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                    k
                  </span>
                </div>
                {errors.salaryMin && (
                  <p className="text-xs text-destructive">{errors.salaryMin}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="salaryMax">
                  Max Salary (k/year){" "}
                  <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="salaryMax"
                    type="number"
                    placeholder="120"
                    className={`pl-7 ${errors.salaryMax ? "border-destructive" : ""}`}
                    value={formData.salaryMax}
                    onChange={(e) =>
                      handleInputChange("salaryMax", e.target.value)
                    }
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                    k
                  </span>
                </div>
                {errors.salaryMax && (
                  <p className="text-xs text-destructive">{errors.salaryMax}</p>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Job Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Describe the role, team, and what makes this opportunity exciting..."
              rows={4}
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className={errors.description ? "border-destructive" : ""}
            />
            {errors.description && (
              <p className="text-xs text-destructive">{errors.description}</p>
            )}
          </div>

          {/* Requirements */}
          <div className="space-y-2">
            <Label htmlFor="requirements">
              Requirements
              <span className="text-muted-foreground text-xs ml-2">
                (one per line)
              </span>
            </Label>
            <Textarea
              id="requirements"
              placeholder="5+ years of experience in frontend development
Strong proficiency in React and TypeScript
Experience with modern CSS and responsive design"
              rows={4}
              value={formData.requirements}
              onChange={(e) =>
                handleInputChange("requirements", e.target.value)
              }
            />
          </div>

          {/* Responsibilities */}
          <div className="space-y-2">
            <Label htmlFor="responsibilities">
              Responsibilities
              <span className="text-muted-foreground text-xs ml-2">
                (one per line)
              </span>
            </Label>
            <Textarea
              id="responsibilities"
              placeholder="Lead frontend architecture decisions
Mentor junior developers
Collaborate with design and product teams"
              rows={4}
              value={formData.responsibilities}
              onChange={(e) =>
                handleInputChange("responsibilities", e.target.value)
              }
            />
          </div>

          {/* AI Suggestion */}
          <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Pro Tip</p>
                <p className="text-xs text-muted-foreground mt-1">
                  After creating the job, use the AI Assistant to automatically
                  generate an evaluation rubric tailored to this role.
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Job"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
