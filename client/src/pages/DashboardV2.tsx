import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "wouter";
import { ArrowLeft, BookOpen, BarChart3, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Topic } from "@/data/subtopics";
import ExpandableTopicItem from "@/components/ExpandableTopicItem";
import { useTopicsManager } from "@/hooks/useTopicsManager";

export default function DashboardV2() {
  const {
    topics,
    setTopics,
    editTopic,
    editSubtopic,
    addSubtopic,
    deleteSubtopic,
    addTopic,
    deleteTopic,
  } = useTopicsManager();

  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [newTopicName, setNewTopicName] = useState("");
  const [newTopicCategory, setNewTopicCategory] = useState("(Alta)");

  // Inicializar categorias expandidas (todas expandidas por padrao)
  useEffect(() => {
    const allCategories = Array.from(new Set(topics.map((t) => t.category)));
    setExpandedCategories(allCategories);
  }, [topics]);

  const handleTopicToggle = (topicId: string) => {
    setTopics((prev) =>
      prev.map((topic) => {
        if (topic.id === topicId) {
          const newCompleted = !topic.completed;
          if (newCompleted) {
            return {
              ...topic,
              completed: true,
              subtopics: topic.subtopics.map((s) => ({ ...s, completed: true })),
            };
          } else {
            return {
              ...topic,
              completed: false,
              subtopics: topic.subtopics.map((s) => ({ ...s, completed: false })),
            };
          }
        }
        return topic;
      })
    );
  };

  const handleSubtopicToggle = (topicId: string, subtopicId: string) => {
    setTopics((prev) =>
      prev.map((topic) => {
        if (topic.id === topicId) {
          const updatedSubtopics = topic.subtopics.map((s) =>
            s.id === subtopicId ? { ...s, completed: !s.completed } : s
          );

          const allCompleted = updatedSubtopics.every((s) => s.completed);

          return {
            ...topic,
            subtopics: updatedSubtopics,
            completed: allCompleted,
          };
        }
        return topic;
      })
    );
  };

  const handleAddNewTopic = () => {
    if (newTopicName.trim()) {
      const categoryName = `Java${newTopicCategory}`;
      addTopic({
        category: categoryName,
        title: newTopicName,
        subtopics: [
          {
            id: `${Date.now()}-1`,
            name: "Conceito base",
            completed: false,
          },
        ],
        completed: false,
      });
      setNewTopicName("");
      setNewTopicCategory("(Alta)");
    }
  };

  // Calcular estatisticas
  const totalTopics = topics.length;
  const completedTopics = topics.filter((t) => t.completed).length;
  const totalSubtopics = topics.reduce((sum, t) => sum + t.subtopics.length, 0);
  const completedSubtopics = topics.reduce(
    (sum, t) => sum + t.subtopics.filter((s) => s.completed).length,
    0
  );

  const overallProgress = (completedSubtopics / totalSubtopics) * 100;

  // Funcao para obter prioridade
  const getPriority = (category: string): number => {
    if (category.includes("(Alta)")) return 0;
    if (category.includes("(Media-Alta)")) return 1;
    if (category.includes("(Media)")) return 2;
    if (category.includes("(Baixa)")) return 3;
    return 999;
  };

  // Agrupar por categoria e ordenar por prioridade
  const categories = Array.from(new Set(topics.map((t) => t.category))).sort((a, b) => {
    const aPriority = getPriority(a);
    const bPriority = getPriority(b);
    if (aPriority !== bPriority) return aPriority - bPriority;
    return a.localeCompare(b);
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-primary">Meu Progresso</h1>
          </div>
          <div className="flex gap-2">
            <Link href="/study-tracker">
              <Button variant="outline" size="sm">
                Rastreador de Horas
              </Button>
            </Link>
            <Link href="/pomodoro">
              <Button variant="outline" size="sm">
                Pomodoro
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container py-8 max-w-4xl">
        {/* Progresso Geral */}
        <Card className="mb-8 border-2 border-primary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Progresso Geral
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Conceitos Dominados</span>
                  <span className="text-sm text-muted-foreground">
                    {completedSubtopics} de {totalSubtopics}
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-300"
                    style={{ width: `${overallProgress}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">{overallProgress.toFixed(1)}% concluido</p>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="p-3 bg-secondary/50 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Topicos</p>
                  <p className="text-2xl font-bold text-primary">
                    {completedTopics}/{totalTopics}
                  </p>
                </div>
                <div className="p-3 bg-secondary/50 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Sub-temas</p>
                  <p className="text-2xl font-bold text-primary">
                    {completedSubtopics}/{totalSubtopics}
                  </p>
                </div>
                <div className="p-3 bg-secondary/50 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Taxa</p>
                  <p className="text-2xl font-bold text-primary">{overallProgress.toFixed(0)}%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botão para adicionar novo tópico */}
        <div className="mb-8">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full gap-2">
                <Plus className="w-4 h-4" />
                Adicionar Novo Tópico
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Tópico</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Nome do Tópico</label>
                  <Input
                    value={newTopicName}
                    onChange={(e) => setNewTopicName(e.target.value)}
                    placeholder="Ex: Async/Await"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Prioridade</label>
                  <Select value={newTopicCategory} onValueChange={setNewTopicCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="(Alta)">Alta</SelectItem>
                      <SelectItem value="(Media-Alta)">Média-Alta</SelectItem>
                      <SelectItem value="(Media)">Média</SelectItem>
                      <SelectItem value="(Baixa)">Baixa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddNewTopic} className="w-full">
                  Adicionar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Topicos por Categoria com Accordion */}
        <Accordion
          type="multiple"
          value={expandedCategories}
          onValueChange={setExpandedCategories}
          className="space-y-3"
        >
          {categories.map((category) => {
            const categoryTopics = topics.filter((t) => t.category === category);
            const categoryCompleted = categoryTopics.filter((t) => t.completed).length;
            const categoryProgress = (categoryCompleted / categoryTopics.length) * 100;

            return (
              <AccordionItem
                key={category}
                value={category}
                className="border border-border rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-4 py-4 hover:bg-secondary/50 transition-colors data-[state=open]:bg-secondary/30">
                  <div className="flex justify-between items-center w-full pr-4 gap-4">
                    <div className="flex-1 text-left">
                      <h3 className="text-lg font-bold">{category}</h3>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-muted-foreground">
                          {categoryCompleted}/{categoryTopics.length} topicos
                        </span>
                        <div className="w-40 bg-secondary rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-primary h-full transition-all duration-300"
                            style={{ width: `${categoryProgress}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-muted-foreground min-w-fit">
                          {categoryProgress.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 py-4 bg-background/50 border-t border-border">
                  <div className="space-y-3">
                    {categoryTopics.map((topic) => (
                      <ExpandableTopicItem
                        key={topic.id}
                        topic={topic}
                        onTopicToggle={handleTopicToggle}
                        onSubtopicToggle={handleSubtopicToggle}
                        onEditTopic={editTopic}
                        onDeleteTopic={deleteTopic}
                        onEditSubtopic={editSubtopic}
                        onDeleteSubtopic={deleteSubtopic}
                        onAddSubtopic={addSubtopic}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        {/* Botoes de Acao */}
        <div className="flex gap-4 mt-12">
          <Button
            variant="outline"
            onClick={() => {
              localStorage.removeItem("topics-data");
              window.location.reload();
            }}
            className="flex-1"
          >
            Resetar Progresso
          </Button>
          <Link href="/study-tracker" className="flex-1">
            <Button variant="outline" className="w-full">
              Ir para Rastreador
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
