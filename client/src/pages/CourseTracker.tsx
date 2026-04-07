import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "wouter";
import { ArrowLeft, Plus, Trash2, Edit2, X, CheckCircle2, ChevronUp, GripVertical, Link as LinkIcon, ExternalLink } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

interface CourseModule {
  id: string;
  name: string;
  completed: boolean;
  description?: string;
  resources?: {
    title: string;
    url: string;
  }[];
}

interface Course {
  id: string;
  name: string;
  description: string;
  modules: CourseModule[];
  createdAt: string;
  collapsed?: boolean;
}

export default function CourseTracker() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [newCourseName, setNewCourseName] = useState("");
  const [newCourseDescription, setNewCourseDescription] = useState("");
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editingCourseData, setEditingCourseData] = useState<{ name: string; description: string }>({
    name: "",
    description: "",
  });
  const [newModuleName, setNewModuleName] = useState("");
  const [newModuleDescription, setNewModuleDescription] = useState("");
  const [editingModule, setEditingModule] = useState<{ courseId: string; moduleId: string; name: string; description?: string } | null>(null);
  const [editingModuleDescription, setEditingModuleDescription] = useState("");
  const [openAddCourseDialog, setOpenAddCourseDialog] = useState(false);
  const [openAddModuleDialog, setOpenAddModuleDialog] = useState(false);
  const [openEditCourseDialog, setOpenEditCourseDialog] = useState(false);
  const [openEditModuleDialog, setOpenEditModuleDialog] = useState(false);
  const [draggedCourse, setDraggedCourse] = useState<string | null>(null);
  const [draggedModule, setDraggedModule] = useState<{ courseId: string; moduleId: string } | null>(null);
  const [expandedModuleDescription, setExpandedModuleDescription] = useState<string | null>(null);

  // Carregar cursos do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("courses-tracker");
    if (saved) {
      try {
        const loadedCourses = JSON.parse(saved);
        // Ordenar por data de criação (mais recente no topo)
        const sorted = loadedCourses.sort((a: Course, b: Course) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA;
        });
        setCourses(sorted);
      } catch (e) {
        console.error("Erro ao carregar cursos:", e);
      }
    }
  }, []);

  // Salvar cursos no localStorage
  useEffect(() => {
    if (courses.length > 0) {
      localStorage.setItem("courses-tracker", JSON.stringify(courses));
    }
  }, [courses]);

  const handleAddCourse = () => {
    if (newCourseName.trim()) {
      const newCourse: Course = {
        id: Date.now().toString(),
        name: newCourseName,
        description: newCourseDescription,
        modules: [
          {
            id: `${Date.now()}-1`,
            name: "Módulo inicial",
            completed: false,
            description: "",
            resources: [],
          },
        ],
        createdAt: new Date().toISOString(),
        collapsed: false,
      };
      setCourses((prev) => [newCourse, ...prev]);
      setNewCourseName("");
      setNewCourseDescription("");
      setOpenAddCourseDialog(false);
    }
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setEditingCourseData({ name: course.name, description: course.description });
    setOpenEditCourseDialog(true);
  };

  const handleSaveEditCourse = () => {
    if (editingCourse && editingCourseData.name.trim()) {
      setCourses((prev) =>
        prev.map((c) =>
          c.id === editingCourse.id
            ? { ...c, name: editingCourseData.name, description: editingCourseData.description }
            : c
        )
      );
      setEditingCourse(null);
      setEditingCourseData({ name: "", description: "" });
      setOpenEditCourseDialog(false);
    }
  };

  const handleDeleteCourse = (courseId: string) => {
    if (confirm("Tem certeza que deseja deletar este curso?")) {
      setCourses((prev) => prev.filter((c) => c.id !== courseId));
    }
  };

  const handleToggleModule = (courseId: string, moduleId: string) => {
    setCourses((prev) =>
      prev.map((course) => {
        if (course.id === courseId) {
          const updatedModules = course.modules.map((m) =>
            m.id === moduleId ? { ...m, completed: !m.completed } : m
          );
          return { ...course, modules: updatedModules };
        }
        return course;
      })
    );
  };

  const handleAddModule = (courseId: string) => {
    if (newModuleName.trim()) {
      setCourses((prev) =>
        prev.map((course) => {
          if (course.id === courseId) {
            return {
              ...course,
              modules: [
                ...course.modules,
                {
                  id: Date.now().toString(),
                  name: newModuleName,
                  completed: false,
                  description: newModuleDescription,
                  resources: [],
                },
              ],
            };
          }
          return course;
        })
      );
      setNewModuleName("");
      setNewModuleDescription("");
      setOpenAddModuleDialog(false);
    }
  };

  const handleEditModule = (courseId: string, moduleId: string, moduleName: string, description?: string) => {
    setEditingModule({ courseId, moduleId, name: moduleName, description });
    setEditingModuleDescription(description || "");
    setOpenEditModuleDialog(true);
  };

  const handleSaveEditModule = () => {
    if (editingModule && editingModule.name.trim()) {
      setCourses((prev) =>
        prev.map((course) => {
          if (course.id === editingModule.courseId) {
            return {
              ...course,
              modules: course.modules.map((m) =>
                m.id === editingModule.moduleId
                  ? { ...m, name: editingModule.name, description: editingModuleDescription }
                  : m
              ),
            };
          }
          return course;
        })
      );
      setEditingModule(null);
      setEditingModuleDescription("");
      setOpenEditModuleDialog(false);
    }
  };

  const handleDeleteModule = (courseId: string, moduleId: string) => {
    setCourses((prev) =>
      prev.map((course) => {
        if (course.id === courseId) {
          return {
            ...course,
            modules: course.modules.filter((m) => m.id !== moduleId),
          };
        }
        return course;
      })
    );
  };

  const toggleCollapse = (courseId: string) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === courseId ? { ...c, collapsed: !c.collapsed } : c
      )
    );
  };

  const handleDragStartCourse = (e: React.DragEvent, courseId: string) => {
    setDraggedCourse(courseId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOverCourse = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDropCourse = (e: React.DragEvent, targetCourseId: string) => {
    e.preventDefault();
    if (!draggedCourse || draggedCourse === targetCourseId) {
      setDraggedCourse(null);
      return;
    }

    setCourses((prev) => {
      const draggedIndex = prev.findIndex((c) => c.id === draggedCourse);
      const targetIndex = prev.findIndex((c) => c.id === targetCourseId);

      if (draggedIndex === -1 || targetIndex === -1) return prev;

      const newCourses = [...prev];
      const [draggedItem] = newCourses.splice(draggedIndex, 1);
      newCourses.splice(targetIndex, 0, draggedItem);

      return newCourses;
    });

    setDraggedCourse(null);
  };

  const handleDragStartModule = (e: React.DragEvent, courseId: string, moduleId: string) => {
    setDraggedModule({ courseId, moduleId });
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOverModule = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDropModule = (e: React.DragEvent, targetCourseId: string, targetModuleId: string) => {
    e.preventDefault();
    if (!draggedModule || (draggedModule.courseId === targetCourseId && draggedModule.moduleId === targetModuleId)) {
      setDraggedModule(null);
      return;
    }

    setCourses((prev) => {
      return prev.map((course) => {
        // Se o módulo é do mesmo curso
        if (draggedModule.courseId === targetCourseId && course.id === targetCourseId) {
          const draggedIndex = course.modules.findIndex((m) => m.id === draggedModule.moduleId);
          const targetIndex = course.modules.findIndex((m) => m.id === targetModuleId);

          if (draggedIndex === -1 || targetIndex === -1) return course;

          const newModules = [...course.modules];
          const [draggedItem] = newModules.splice(draggedIndex, 1);
          newModules.splice(targetIndex, 0, draggedItem);

          return { ...course, modules: newModules };
        }
        return course;
      });
    });

    setDraggedModule(null);
  };

  const getProgress = (course: Course) => {
    if (course.modules.length === 0) return 0;
    const completed = course.modules.filter((m) => m.completed).length;
    return (completed / course.modules.length) * 100;
  };

  const totalCourses = courses.length;
  const completedCourses = courses.filter((c) => getProgress(c) === 100).length;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" size="icon">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Rastreador de Cursos</h1>
          </div>
          <Link href="/dashboard">
            <Button variant="outline">Voltar ao Dashboard</Button>
          </Link>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{totalCourses}</div>
                <div className="text-sm text-muted-foreground">Cursos Adicionados</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{completedCourses}</div>
                <div className="text-sm text-muted-foreground">Cursos Concluídos</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Botão para adicionar novo curso */}
        <div className="mb-8">
          <Dialog open={openAddCourseDialog} onOpenChange={setOpenAddCourseDialog}>
            <DialogTrigger asChild>
              <Button className="w-full gap-2">
                <Plus className="w-4 h-4" />
                Adicionar Novo Curso
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Curso</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Nome do Curso</label>
                  <Input
                    value={newCourseName}
                    onChange={(e) => setNewCourseName(e.target.value)}
                    placeholder="Ex: React Avançado"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Descrição (opcional)</label>
                  <Input
                    value={newCourseDescription}
                    onChange={(e) => setNewCourseDescription(e.target.value)}
                    placeholder="Ex: Aprenda React com hooks e context"
                  />
                </div>
                <Button onClick={handleAddCourse} className="w-full">
                  Adicionar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Lista de Cursos */}
        {courses.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>Nenhum curso adicionado ainda</p>
          </div>
        ) : (
          <div className="space-y-6">
            {courses.map((course) => {
              const progress = getProgress(course);
              const completedModules = course.modules.filter((m) => m.completed).length;

              return (
                <Card
                  key={course.id}
                  className="border-2 border-primary/20 cursor-move hover:border-primary/40 transition-colors"
                  draggable
                  onDragStart={(e) => handleDragStartCourse(e, course.id)}
                  onDragOver={handleDragOverCourse}
                  onDrop={(e) => handleDropCourse(e, course.id)}
                  style={{
                    opacity: draggedCourse === course.id ? 0.5 : 1,
                  }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-2 flex-1">
                        <GripVertical className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <CardTitle>{course.name}</CardTitle>
                            {progress === 100 && (
                              <CheckCircle2 className="w-5 h-5 text-green-600" />
                            )}
                          </div>
                          {course.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {course.description}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-2">
                            Adicionado em {new Date(course.createdAt).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleCollapse(course.id)}
                          title={course.collapsed ? "Expandir" : "Minimizar"}
                        >
                          <ChevronUp
                            className={`w-4 h-4 transition-transform ${
                              course.collapsed ? "rotate-180" : ""
                            }`}
                          />
                        </Button>
                        <Dialog open={openEditCourseDialog && editingCourse?.id === course.id} onOpenChange={setOpenEditCourseDialog}>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditCourse(course)}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Editar Curso</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-semibold mb-2 block">Nome do Curso</label>
                                <Input
                                  value={editingCourseData.name}
                                  onChange={(e) =>
                                    setEditingCourseData({ ...editingCourseData, name: e.target.value })
                                  }
                                  placeholder="Ex: React Avançado"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-semibold mb-2 block">Descrição (opcional)</label>
                                <Input
                                  value={editingCourseData.description}
                                  onChange={(e) =>
                                    setEditingCourseData({ ...editingCourseData, description: e.target.value })
                                  }
                                  placeholder="Ex: Aprenda React com hooks e context"
                                />
                              </div>
                              <Button onClick={handleSaveEditCourse} className="w-full">
                                Salvar
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteCourse(course.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Barra de progresso */}
                    <div className="mt-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-semibold">Progresso</span>
                        <span className="text-sm text-muted-foreground">
                          {completedModules}/{course.modules.length}
                        </span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-primary h-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">{progress.toFixed(0)}%</p>
                    </div>
                  </CardHeader>

                  {/* Conteúdo dos módulos (minimizável) */}
                  {!course.collapsed && (
                    <CardContent>
                      <div className="space-y-3">
                        {/* Módulos */}
                        {course.modules.map((module) => {
                          const isDragging = draggedModule?.courseId === course.id && draggedModule?.moduleId === module.id;
                          return (
                          <div
                            key={module.id}
                            draggable
                            onDragStart={(e) => handleDragStartModule(e, course.id, module.id)}
                            onDragOver={handleDragOverModule}
                            onDrop={(e) => handleDropModule(e, course.id, module.id)}
                            className={`p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors cursor-move ${
                              isDragging ? "opacity-50" : ""
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <GripVertical className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                              <Checkbox
                                checked={module.completed}
                                onCheckedChange={() =>
                                  handleToggleModule(course.id, module.id)
                                }
                              />
                              <div className="flex-1 min-w-0">
                                <p
                                  className={`text-sm ${
                                    module.completed
                                      ? "line-through text-muted-foreground"
                                      : ""
                                  }`}
                                >
                                  {module.name}
                                </p>
                                {module.description && (
                                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                    {module.description}
                                  </p>
                                )}
                              </div>
                              <div className="flex gap-1 flex-shrink-0">
                                <Dialog open={openEditModuleDialog && editingModule?.moduleId === module.id} onOpenChange={setOpenEditModuleDialog}>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() => handleEditModule(course.id, module.id, module.name, module.description)}
                                    >
                                      <Edit2 className="w-3 h-3" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-lg">
                                    <DialogHeader>
                                      <DialogTitle>Editar Módulo</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <div>
                                        <label className="text-sm font-semibold mb-2 block">Nome do Módulo</label>
                                        <Input
                                          value={editingModule?.name || ""}
                                          onChange={(e) =>
                                            setEditingModule({ ...editingModule!, name: e.target.value })
                                          }
                                          placeholder="Ex: Introdução ao React"
                                        />
                                      </div>
                                      <div>
                                        <label className="text-sm font-semibold mb-2 block">
                                          Descrição (links de anotações, vídeos, etc)
                                        </label>
                                        <Textarea
                                          value={editingModuleDescription}
                                          onChange={(e) => setEditingModuleDescription(e.target.value)}
                                          placeholder="Ex: https://youtube.com/watch?v=... ou https://notion.so/..."
                                          className="min-h-24"
                                        />
                                      </div>
                                      <Button onClick={handleSaveEditModule} className="w-full">
                                        Salvar
                                      </Button>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleDeleteModule(course.id, module.id)}
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        );
                        })}

                        {/* Adicionar módulo */}
                        <Dialog open={openAddModuleDialog && editingCourse?.id === course.id} onOpenChange={setOpenAddModuleDialog}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full gap-2"
                              onClick={() => setEditingCourse(course)}
                            >
                              <Plus className="w-4 h-4" />
                              Adicionar Módulo
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-lg">
                            <DialogHeader>
                              <DialogTitle>Adicionar Modulo a {course.name}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-semibold mb-2 block">
                                  Nome do Modulo
                                </label>
                                <Input
                                  value={newModuleName}
                                  onChange={(e) => setNewModuleName(e.target.value)}
                                  placeholder="Ex: Introducao ao React"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-semibold mb-2 block">
                                  Descricao (links de anotacoes, videos, etc)
                                </label>
                                <Textarea
                                  value={newModuleDescription}
                                  onChange={(e) => setNewModuleDescription(e.target.value)}
                                  placeholder="Ex: https://youtube.com/watch?v=... ou https://notion.so/..."
                                  className="min-h-20"
                                />
                              </div>
                              <Button
                                onClick={() => {
                                  handleAddModule(course.id);
                                }}
                                className="w-full"
                              >
                                Adicionar
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
