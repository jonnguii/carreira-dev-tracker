import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { ArrowLeft, Plus, Trash2, Clock, Timer } from "lucide-react";

interface StudySession {
  id: string;
  date: string;
  topic: "Java" | "Spring Boot" | "SQL";
  subtopic: string;
  hours: number;
}

interface WeeklyStats {
  java: number;
  springBoot: number;
  sql: number;
  total: number;
}

const TOPICS = ["Java", "Spring Boot", "SQL"];

const SUBTOPICS: Record<string, string[]> = {
  Java: ["Fundamentos", "OOP", "Collections", "Exception Handling", "Streams/Lambdas", "Generics"],
  "Spring Boot": ["IoC/DI", "Beans", "Controllers", "Services", "DTOs", "REST APIs", "JPA", "Configuração"],
  SQL: ["SELECT/WHERE", "JOINs", "GROUP BY", "Agregações", "Subqueries", "Índices", "Otimização", "Transações"],
};

export default function StudyTracker() {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<"Java" | "Spring Boot" | "SQL">("Java");
  const [selectedSubtopic, setSelectedSubtopic] = useState(SUBTOPICS["Java"][0]);
  const [hours, setHours] = useState("");
  const [weeklyStats, setWeeklyStats] = useState<WeeklyStats>({
    java: 0,
    springBoot: 0,
    sql: 0,
    total: 0,
  });

  // Carregar dados do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("study-sessions");
    if (saved) {
      setSessions(JSON.parse(saved));
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
      java: 0,
      springBoot: 0,
      sql: 0,
      total: 0,
    };

    weekSessions.forEach((session) => {
      if (session.topic === "Java") stats.java += session.hours;
      if (session.topic === "Spring Boot") stats.springBoot += session.hours;
      if (session.topic === "SQL") stats.sql += session.hours;
    });

    stats.total = stats.java + stats.springBoot + stats.sql;
    setWeeklyStats(stats);

    // Salvar no localStorage
    localStorage.setItem("study-sessions", JSON.stringify(sessions));
  }, [sessions]);

  const addSession = () => {
    if (!hours || parseFloat(hours) <= 0) {
      alert("Digite uma quantidade válida de horas");
      return;
    }

    const newSession: StudySession = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      topic: selectedTopic,
      subtopic: selectedSubtopic,
      hours: parseFloat(hours),
    };

    setSessions([...sessions, newSession]);
    setHours("");
  };

  const deleteSession = (id: string) => {
    setSessions(sessions.filter((s) => s.id !== id));
  };

  const handleTopicChange = (topic: "Java" | "Spring Boot" | "SQL") => {
    setSelectedTopic(topic);
    setSelectedSubtopic(SUBTOPICS[topic][0]);
  };

  const progressPercentage = Math.min((weeklyStats.total / 10) * 100, 100);

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
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/30">
                  <p className="text-sm text-muted-foreground">Java</p>
                  <p className="text-2xl font-bold text-red-600">{weeklyStats.java.toFixed(1)}h</p>
                </div>
                <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/30">
                  <p className="text-sm text-muted-foreground">Spring Boot</p>
                  <p className="text-2xl font-bold text-orange-600">{weeklyStats.springBoot.toFixed(1)}h</p>
                </div>
                <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                  <p className="text-sm text-muted-foreground">SQL</p>
                  <p className="text-2xl font-bold text-yellow-600">{weeklyStats.sql.toFixed(1)}h</p>
                </div>
              </div>
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
              {/* Seletor de Tópico */}
              <div>
                <label className="text-sm font-semibold mb-2 block">Tópico</label>
                <div className="grid grid-cols-3 gap-2">
                  {TOPICS.map((topic) => (
                    <button
                      key={topic}
                      onClick={() => handleTopicChange(topic as "Java" | "Spring Boot" | "SQL")}
                      className={`p-2 rounded-lg font-semibold transition-colors ${
                        selectedTopic === topic
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Seletor de Sub-tema */}
              <div>
                <label className="text-sm font-semibold mb-2 block">Sub-tema</label>
                <select
                  value={selectedSubtopic}
                  onChange={(e) => setSelectedSubtopic(e.target.value)}
                  className="w-full p-2 rounded-lg border border-border bg-background text-foreground"
                >
                  {SUBTOPICS[selectedTopic].map((subtopic) => (
                    <option key={subtopic} value={subtopic}>
                      {subtopic}
                    </option>
                  ))}
                </select>
              </div>

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
            <CardDescription>Últimas 10 sessões</CardDescription>
          </CardHeader>
          <CardContent>
            {sessions.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">Nenhuma sessão registrada ainda</p>
            ) : (
              <div className="space-y-2">
                {sessions
                  .slice()
                  .reverse()
                  .slice(0, 10)
                  .map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg border border-border"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <div className="flex-1">
                          <p className="font-semibold">{session.topic}</p>
                          <p className="text-sm text-muted-foreground">{session.subtopic}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{session.hours}h</p>
                          <p className="text-xs text-muted-foreground">{session.date}</p>
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
