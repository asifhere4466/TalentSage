"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
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
import {
  Plus,
  Trash2,
  Edit,
  Sparkles,
  Save,
  GripVertical,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { RubricCriteria } from "@/lib/types";
import { toast } from "sonner";

interface RubricEditorProps {
  jobId: string;
}

export function RubricEditor({ jobId }: RubricEditorProps) {
  const { rubrics, jobs, updateRubric, generateRubric } = useStore();
  const job = jobs.find((j) => j.id === jobId);
  const rubric = rubrics.find((r) => r.jobId === jobId);

  const [isGenerating, setIsGenerating] = useState(false);
  const [editingCriteria, setEditingCriteria] = useState<RubricCriteria | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [expandedCriteria, setExpandedCriteria] = useState<string | null>(null);

  const [newCriteria, setNewCriteria] = useState<Partial<RubricCriteria>>({
    name: "",
    description: "",
    weight: 20,
    scoreDescriptions: {
      1: "Does not meet requirements",
      2: "Partially meets requirements",
      3: "Meets requirements",
      4: "Exceeds requirements",
      5: "Exceptional performance",
    },
  });

  const handleGenerateRubric = async () => {
    setIsGenerating(true);
    // Simulate AI generation delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    generateRubric(jobId);
    setIsGenerating(false);
    toast.success("AI generated evaluation rubric");
  };

  const handleAddCriteria = () => {
    if (!rubric || !newCriteria.name) return;

    const criteria: RubricCriteria = {
      id: `crit_${Date.now()}`,
      name: newCriteria.name,
      description: newCriteria.description || "",
      weight: newCriteria.weight || 20,
      scoreDescriptions: newCriteria.scoreDescriptions || {
        1: "Does not meet requirements",
        2: "Partially meets requirements",
        3: "Meets requirements",
        4: "Exceeds requirements",
        5: "Exceptional performance",
      },
    };

    updateRubric(rubric.id, {
      criteria: [...rubric.criteria, criteria],
    });

    setNewCriteria({
      name: "",
      description: "",
      weight: 20,
      scoreDescriptions: {
        1: "Does not meet requirements",
        2: "Partially meets requirements",
        3: "Meets requirements",
        4: "Exceeds requirements",
        5: "Exceptional performance",
      },
    });
    setIsDialogOpen(false);
    toast.success("Criteria added");
  };

  const handleUpdateCriteria = () => {
    if (!rubric || !editingCriteria) return;

    const updatedCriteria = rubric.criteria.map((c) =>
      c.id === editingCriteria.id ? editingCriteria : c
    );

    updateRubric(rubric.id, { criteria: updatedCriteria });
    setEditingCriteria(null);
    toast.success("Criteria updated");
  };

  const handleDeleteCriteria = (criteriaId: string) => {
    if (!rubric) return;

    const updatedCriteria = rubric.criteria.filter((c) => c.id !== criteriaId);
    updateRubric(rubric.id, { criteria: updatedCriteria });
    toast.success("Criteria deleted");
  };

  const handleWeightChange = (criteriaId: string, newWeight: number) => {
    if (!rubric) return;

    const updatedCriteria = rubric.criteria.map((c) =>
      c.id === criteriaId ? { ...c, weight: newWeight } : c
    );

    updateRubric(rubric.id, { criteria: updatedCriteria });
  };

  const totalWeight = rubric?.criteria.reduce((sum, c) => sum + c.weight, 0) || 0;

  if (!rubric) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center">
            <Sparkles className="h-12 w-12 mx-auto mb-4 text-primary opacity-50" />
            <h3 className="text-lg font-semibold mb-2">
              No Evaluation Rubric Yet
            </h3>
            <p className="text-muted-foreground mb-4 max-w-md mx-auto">
              Create a structured evaluation rubric to consistently assess
              candidates for this role.
            </p>
            <Button onClick={handleGenerateRubric} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="mr-2"
                  >
                    <Sparkles className="h-4 w-4" />
                  </motion.div>
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate with AI
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{rubric.name}</h3>
          <p className="text-sm text-muted-foreground">
            {rubric.criteria.length} criteria |{" "}
            <span
              className={
                totalWeight === 100 ? "text-success" : "text-destructive"
              }
            >
              {totalWeight}% total weight
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleGenerateRubric}
            disabled={isGenerating}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Regenerate
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Criteria
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Evaluation Criteria</DialogTitle>
                <DialogDescription>
                  Define a new criterion for evaluating candidates.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Criteria Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Technical Skills"
                    value={newCriteria.name}
                    onChange={(e) =>
                      setNewCriteria({ ...newCriteria, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what this criteria evaluates..."
                    value={newCriteria.description}
                    onChange={(e) =>
                      setNewCriteria({
                        ...newCriteria,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Weight: {newCriteria.weight}%</Label>
                  <Slider
                    value={[newCriteria.weight || 20]}
                    onValueChange={([value]) =>
                      setNewCriteria({ ...newCriteria, weight: value })
                    }
                    max={100}
                    step={5}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCriteria}>Add Criteria</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Criteria List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {rubric.criteria.map((criteria, index) => (
            <motion.div
              key={criteria.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{criteria.name}</h4>
                          <Badge variant="secondary">{criteria.weight}%</Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              setExpandedCriteria(
                                expandedCriteria === criteria.id
                                  ? null
                                  : criteria.id
                              )
                            }
                          >
                            {expandedCriteria === criteria.id ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setEditingCriteria(criteria)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => handleDeleteCriteria(criteria.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {criteria.description}
                      </p>

                      {/* Weight Slider */}
                      <div className="mt-3">
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-muted-foreground w-12">
                            Weight
                          </span>
                          <Slider
                            value={[criteria.weight]}
                            onValueChange={([value]) =>
                              handleWeightChange(criteria.id, value)
                            }
                            max={100}
                            step={5}
                            className="flex-1"
                          />
                          <span className="text-sm font-medium w-12 text-right">
                            {criteria.weight}%
                          </span>
                        </div>
                      </div>

                      {/* Expanded Score Descriptions */}
                      <AnimatePresence>
                        {expandedCriteria === criteria.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 pt-4 border-t space-y-2">
                              <p className="text-xs font-medium text-muted-foreground mb-2">
                                Score Descriptions
                              </p>
                              {Object.entries(criteria.scoreDescriptions).map(
                                ([score, description]) => (
                                  <div
                                    key={score}
                                    className="flex items-center gap-3"
                                  >
                                    <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                                      {score}
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                      {description}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Edit Criteria Dialog */}
      <Dialog
        open={!!editingCriteria}
        onOpenChange={(open) => !open && setEditingCriteria(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Criteria</DialogTitle>
            <DialogDescription>
              Update the evaluation criteria details.
            </DialogDescription>
          </DialogHeader>
          {editingCriteria && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Criteria Name</Label>
                <Input
                  id="edit-name"
                  value={editingCriteria.name}
                  onChange={(e) =>
                    setEditingCriteria({
                      ...editingCriteria,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingCriteria.description}
                  onChange={(e) =>
                    setEditingCriteria({
                      ...editingCriteria,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Weight: {editingCriteria.weight}%</Label>
                <Slider
                  value={[editingCriteria.weight]}
                  onValueChange={([value]) =>
                    setEditingCriteria({ ...editingCriteria, weight: value })
                  }
                  max={100}
                  step={5}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingCriteria(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateCriteria}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
