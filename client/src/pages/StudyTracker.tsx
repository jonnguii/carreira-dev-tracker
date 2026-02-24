import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "wouter";
import { ArrowLeft, Plus, Trash2, Clock, Timer } from "lucide-react";
import { useTopicsManager } from "@/hooks/useTopicsManager";

interface StudySession {
  id: string;
  date: string;
  topicId?: string;
  subtopicId?: string;
  hours: number;
}

interface WeeklyStats {
  [key: string]: number;
  total: number;
}

export default function StudyTracker() {
  const { topics } = useTopicsManager();
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedSubtopic, setSelectedSubtopic] = useState("");
  const [hours, setHours] = useState("");
  const [weeklyStats, setWeeklyStats] = useState<WeeklyStats>({
    total: 0,
  });

  // Carregar dados do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("study-sessions");
    if (saved) {
      try {
        setSessions(JSON.parse(saved));
      } catch (e) {
        console.error("Erro ao carregar sessões:", e);
      }
    }
  }, []);

  // Atualizar estatísticas
  useEffect(() => {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());

    const weekSessions = sessions.filter((session) => {
      const sessionDate = new Date(session.date);
      return sessionDate >= weekStart && sessionDate <= today;
    });

    const stats: WeeklyStats = {
      total: 0,
    };

    weekSessions.forEach((session) => {
      const topic = session.topicId ? topics.find((t) => t.id === session.topicId) : null;
      const topicKey = topic ? `${topic.category} - ${topic.title}` : "Sem tópico";
      if (!stats[topicKey]) {
        stats[topicKey] = 0;
      }
      stats[topicKey] += session.hours;
      stats.total += session.hours;
    });

    setWeeklyStats(stats);

    // Salvar no localStorage
    localStorage.setItem("study-sessions", JSON.stringify(sessions));
  }, [sessions, topics]);

  const addSession = () => {
    if (!hours || parseFloat(hours) <= 0) {
      alert("Digite uma quantidade válida de horas");
      return;
    }

    const newSession: StudySession = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      topicId: selectedTopic || undefined,
      subtopicId: selectedSubtopic || undefined,
      hours: parseFloat(hours),
    };

    setSessions([...sessions, newSession]);
    setHours("");
  };

  const deleteSession = (id: string) => {
    setSessions(sessions.filter((s) => s.id !== id));
  };

  const handleTopicChange = (topicId: string) => {
    setSelectedTopic(topicId);
    setSelectedSubtopic("");
  };

  const progressPercentage = Math.min((weeklyStats.total / 10) * 100, 100);

  // Agrupar sessões por tópico para exibição
  const topicStats = Object.entries(weeklyStats)
    .filter(([key, value]) => key !== "total" && value > 0)
    .map(([topic, hours]) => ({
      topic,
      hours,
    }));

  // Obter tópico e sub-tópico selecionados
  const currentTopic = selectedTopic ? topics.find((t) => t.id === selectedTopic) : null;
  const currentSubtopics = currentTopic?.subtopics || [];

  // Obter nome formatado do tópico/sub-tópico para exibição
  const getSessionDisplayName = (topicId?: string, subtopicId?: string) => {
    if (!topicId) return "Sem tópico";
    const topic = topics.find((t) => t.id === topicId);
    if (!topic) return "Tópico não encontrado";
    const subtopic = subtopicId ? topic.subtopics.find((s) => s.id === subtopicId) : null;
    return subtopic ? `${topic.category} - ${topic.title} > ${subtopic.name}` : `${topic.category} - ${topic.title}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-primary">Rastreador de Horas</h1>
          </div>
          <Link href="/pomodoro">
            <Button variant="outline" className="gap-2">
              <Timer className="w-4 h-4" />
              Pomodoro
            </Button>
          </Link>
        </div>
      </header>

      <div className="container py-8 max-w-4xl">
        {/* Meta Semanal */}
        <Card className="mb-8 border-2 border-primary/50">
          <CardHeader>
            <CardTitle>Meta Semanal</CardTitle>
            <CardDescription>10 horas de estudo por semana</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">{weeklyStats.total.toFixed(1)}h / 10h</span>
                  <span className="text-sm text-muted-foreground">{progressPercentage.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Breakdown por tópico */}
              {topicStats.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-semibold mb-3">Horas por Tópico</p>
                  <div className="space-y-2">
                    {topicStats.map((stat) => (
                      <div key={stat.topic} className="flex justify-between items-center p-2 bg-secondary/50 rounded">
                        <span className="text-sm">{stat.topic}</span>
                        <span className="font-bold text-primary">{stat.hours.toFixed(1)}h</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Adicionar Sessão */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Registrar Sessão de Estudo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Seletor de Tópico (opcional) */}
              <div>
                <label className="text-sm font-semibold mb-2 block">Tópico (Opcional)</label>
                <Select value={selectedTopic} onValueChange={handleTopicChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha um tópico..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Sem tópico</SelectItem>
                    {topics.map((topic) => (
                      <SelectItem key={topic.id} value={topic.id}>
                        {topic.category} - {topic.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Seletor de Sub-tema (opcional) */}
              {currentSubtopics.length > 0 && (
                <div>
                  <label className="text-sm font-semibold mb-2 block">Sub-tema (Opcional)</label>
                  <Select value={selectedSubtopic} onValueChange={setSelectedSubtopic}>
                    <SelectTrigger>
                      <SelectValue placeholder="Escolha um sub-tema..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Sem sub-tema</SelectItem>
                      {currentSubtopics.map((subtopic) => (
                        <SelectItem key={subtopic.id} value={subtopic.id}>
                          {subtopic.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Input de Horas */}
              <div>
                <label className="text-sm font-semibold mb-2 block">Horas Estudadas</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    step="0.5"
                    min="0"
                    placeholder="Ex: 1.5"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={addSession} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Adicionar
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Histórico de Sessões */}
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Sessões</CardTitle>
            <CardDescription>Últimas 15 sessões</CardDescription>
          </CardHeader>
          <CardContent>
            {sessions.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">Nenhuma sessão registrada ainda</p>
            ) : (
              <div className="space-y-2">
                {sessions
                  .slice()
                  .reverse()
                  .slice(0, 15)
                  .map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg border border-border"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <div className="flex-1">
                          <p className="font-semibold text-sm">
                            {getSessionDisplayName(session.topicId, session.subtopicId)}
                          </p>
                          <p className="text-xs text-muted-foreground">{session.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{session.hours}h</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteSession(session.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
