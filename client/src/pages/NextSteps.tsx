import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "wouter";
import { ArrowLeft, Plus, Trash2, Edit2, CheckCircle2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface NextStep {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export default function NextSteps() {
  const [steps, setSteps] = useState<NextStep[]>([]);
  const [newStepTitle, setNewStepTitle] = useState("");
  const [editingStep, setEditingStep] = useState<NextStep | null>(null);
  const [editingStepTitle, setEditingStepTitle] = useState("");
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  // Carregar próximos passos do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("next-steps");
    if (saved) {
      try {
        setSteps(JSON.parse(saved));
      } catch (e) {
        console.error("Erro ao carregar próximos passos:", e);
      }
    }
  }, []);

  // Salvar próximos passos no localStorage
  useEffect(() => {
    if (steps.length > 0 || localStorage.getItem("next-steps")) {
      localStorage.setItem("next-steps", JSON.stringify(steps));
    }
  }, [steps]);

  const handleAddStep = () => {
    if (newStepTitle.trim()) {
      const newStep: NextStep = {
        id: Date.now().toString(),
        title: newStepTitle,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setSteps((prev) => [newStep, ...prev]);
      setNewStepTitle("");
      setOpenAddDialog(false);
    }
  };

  const handleEditStep = (step: NextStep) => {
    setEditingStep(step);
    setEditingStepTitle(step.title);
    setOpenEditDialog(true);
  };

  const handleSaveEditStep = () => {
    if (editingStep && editingStepTitle.trim()) {
      setSteps((prev) =>
        prev.map((s) =>
          s.id === editingStep.id ? { ...s, title: editingStepTitle } : s
        )
      );
      setEditingStep(null);
      setEditingStepTitle("");
      setOpenEditDialog(false);
    }
  };

  const handleDeleteStep = (stepId: string) => {
    setSteps((prev) => prev.filter((s) => s.id !== stepId));
  };

  const handleToggleStep = (stepId: string) => {
    setSteps((prev) =>
      prev.map((s) =>
        s.id === stepId ? { ...s, completed: !s.completed } : s
      )
    );
  };

  const completedCount = steps.filter((s) => s.completed).length;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="icon">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Próximos Passos</h1>
          </div>
          <Link href="/">
            <Button variant="outline">Voltar</Button>
          </Link>
        </div>

        {/* Estatísticas */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{steps.length}</div>
                <div className="text-sm text-muted-foreground">Passos Totais</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{completedCount}</div>
                <div className="text-sm text-muted-foreground">Concluídos</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botão para adicionar novo passo */}
        <div className="mb-8">
          <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
            <DialogTrigger asChild>
              <Button className="w-full gap-2">
                <Plus className="w-4 h-4" />
                Adicionar Próximo Passo
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Próximo Passo</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">O que fazer?</label>
                  <Input
                    value={newStepTitle}
                    onChange={(e) => setNewStepTitle(e.target.value)}
                    placeholder="Ex: Estudar React Hooks"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleAddStep();
                      }
                    }}
                  />
                </div>
                <Button onClick={handleAddStep} className="w-full">
                  Adicionar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Lista de Próximos Passos */}
        {steps.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>Nenhum próximo passo adicionado ainda</p>
            <p className="text-sm mt-2">Comece adicionando seus objetivos!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {steps.map((step) => (
              <Card
                key={step.id}
                className={`border-2 transition-all ${
                  step.completed
                    ? "border-green-500/30 bg-green-50/30 dark:bg-green-950/10"
                    : "border-primary/20 hover:border-primary/40"
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <Checkbox
                      checked={step.completed}
                      onCheckedChange={() => handleToggleStep(step.id)}
                      className="w-6 h-6"
                    />
                    <div className="flex-1">
                      <p
                        className={`text-lg ${
                          step.completed
                            ? "line-through text-muted-foreground"
                            : "text-foreground"
                        }`}
                      >
                        {step.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Adicionado em {new Date(step.createdAt).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    {step.completed && (
                      <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                    )}
                    <Dialog open={openEditDialog && editingStep?.id === step.id} onOpenChange={setOpenEditDialog}>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditStep(step)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Editar Próximo Passo</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-semibold mb-2 block">O que fazer?</label>
                            <Input
                              value={editingStepTitle}
                              onChange={(e) => setEditingStepTitle(e.target.value)}
                              placeholder="Ex: Estudar React Hooks"
                            />
                          </div>
                          <Button onClick={handleSaveEditStep} className="w-full">
                            Salvar
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteStep(step.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
