import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowLeft, BookOpen, BarChart3 } from "lucide-react";
import { TOPICS_WITH_SUBTOPICS, Topic } from "@/data/subtopics";
import ExpandableTopicItem from "@/components/ExpandableTopicItem";

export default function DashboardV2() {
  const [topics, setTopics] = useState<Topic[]>([]);

  // Carregar dados do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("dashboard-v2-progress");
    if (saved) {
      setTopics(JSON.parse(saved));
    } else {
      setTopics(TOPICS_WITH_SUBTOPICS);
    }
  }, []);

  // Salvar dados no localStorage
  useEffect(() => {
    if (topics.length > 0) {
      localStorage.setItem("dashboard-v2-progress", JSON.stringify(topics));
    }
  }, [topics]);

  const handleTopicToggle = (topicId: string) => {
    setTopics((prev) =>
      prev.map((topic) => {
        if (topic.id === topicId) {
          const newCompleted = !topic.completed;
          // Se marcar como completo, marcar todos os sub-temas
          if (newCompleted) {
            return {
              ...topic,
              completed: true,
              subtopics: topic.subtopics.map((s) => ({ ...s, completed: true })),
            };
          } else {
            // Se desmarcar, desmarcar todos os sub-temas
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

          // Verificar se todos os sub-temas estão completos
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

  // Calcular estatísticas
  const totalTopics = topics.length;
  const completedTopics = topics.filter((t) => t.completed).length;
  const totalSubtopics = topics.reduce((sum, t) => sum + t.subtopics.length, 0);
  const completedSubtopics = topics.reduce(
    (sum, t) => sum + t.subtopics.filter((s) => s.completed).length,
    0
  );

  const overallProgress = (completedSubtopics / totalSubtopics) * 100;

  // Agrupar por categoria
  const categories = Array.from(new Set(topics.map((t) => t.category))).sort((a, b) => {
    const priorityOrder = { "(Alta)": 0, "(Média)": 1, "(Baixa)": 2 };
    const aPriority = Object.entries(priorityOrder).find(([key]) => a.includes(key))?.[1] ?? 3;
    const bPriority = Object.entries(priorityOrder).find(([key]) => b.includes(key))?.[1] ?? 3;
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
                <p className="text-sm text-muted-foreground mt-2">{overallProgress.toFixed(1)}% concluído</p>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="p-3 bg-secondary/50 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Tópicos</p>
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

        {/* Tópicos por Categoria */}
        {categories.map((category) => {
          const categoryTopics = topics.filter((t) => t.category === category);
          const categoryCompleted = categoryTopics.filter((t) => t.completed).length;
          const categoryProgress = (categoryCompleted / categoryTopics.length) * 100;

          return (
            <div key={category} className="mb-8">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold">{category}</h3>
                  <span className="text-sm text-muted-foreground">
                    {categoryCompleted}/{categoryTopics.length} tópicos
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-300"
                    style={{ width: `${categoryProgress}%` }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                {categoryTopics.map((topic) => (
                  <ExpandableTopicItem
                    key={topic.id}
                    topic={topic}
                    onTopicToggle={handleTopicToggle}
                    onSubtopicToggle={handleSubtopicToggle}
                  />
                ))}
              </div>
            </div>
          );
        })}

        {/* Botões de Ação */}
        <div className="flex gap-4 mt-12">
          <Button
            variant="outline"
            onClick={() => {
              localStorage.removeItem("dashboard-v2-progress");
              window.location.reload();
            }}
            className="flex-1"
          >
            Resetar Progresso
          </Button>
          <Link href="/study-tracker" className="flex-1">
            <Button className="w-full gap-2">
              <BookOpen className="w-4 h-4" />
              Rastreador de Horas
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
