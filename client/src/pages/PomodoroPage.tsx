import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { ArrowLeft, Clock, Trash2, Edit2, X } from "lucide-react";
import PomodoroTimer from "@/components/PomodoroTimer";
import { useTopicsManager } from "@/hooks/useTopicsManager";

interface PomodoroSession {
  id: string;
  date: string;
  sessionsCompleted: number;
  totalMinutes: number;
  focusMinutes: number;
  breakMinutes: number;
  topicId?: string;
  subtopicId?: string;
}

export default function PomodoroPage() {
  const { topics } = useTopicsManager();
  const [selectedTopic, setSelectedTopic] = useState<string>("none");
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>("none");
  const [history, setHistory] = useState<PomodoroSession[]>([]);
  const [editingSession, setEditingSession] = useState<PomodoroSession | null>(null);
  const [editValues, setEditValues] = useState({ sessions: 0, focus: 0, break: 0, topicId: "none", subtopicId: "none" });
  
  // Filtros
  const [filterTopic, setFilterTopic] = useState<string>("none");
  const [filterStartDate, setFilterStartDate] = useState<string>("");
  const [filterEndDate, setFilterEndDate] = useState<string>("");

  // Carregar histórico do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("pomodoro-history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Erro ao carregar histórico:", e);
      }
    }
  }, []);

  // Salvar histórico no localStorage
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("pomodoro-history", JSON.stringify(history));
    }
  }, [history]);

  const handleSaveSessionFromTimer = (focusMinutes: number, breakMinutes: number, sessionsCompleted: number) => {
    if (focusMinutes === 0 && sessionsCompleted === 0) return;

    const today = new Date().toLocaleDateString("pt-BR");

    // Criar uma nova sessão separada (não sobrescrever)
    const newSession: PomodoroSession = {
      id: Date.now().toString(),
      date: today,
      sessionsCompleted,
      totalMinutes: focusMinutes,
      focusMinutes,
      breakMinutes,
      topicId: selectedTopic !== "none" ? selectedTopic : undefined,
      subtopicId: selectedSubtopic !== "none" ? selectedSubtopic : undefined,
    };

    setHistory((prev) => [newSession, ...prev]);
  };

  const handleDeleteSession = (id: string) => {
    setHistory((prev) => prev.filter((s) => s.id !== id));
  };

  const handleClearHistory = () => {
    if (confirm("Tem certeza que deseja limpar todo o histórico?")) {
      setHistory([]);
      localStorage.removeItem("pomodoro-history");
    }
  };

  const handleEditSession = (session: PomodoroSession) => {
    setEditingSession(session);
    setEditValues({
      sessions: session.sessionsCompleted,
      focus: session.focusMinutes,
      break: session.breakMinutes,
      topicId: session.topicId || "none",
      subtopicId: session.subtopicId || "none",
    });
  };

  const handleSaveEdit = () => {
    if (!editingSession) return;

    setHistory((prev) =>
      prev.map((s) =>
        s.id === editingSession.id
          ? {
              ...s,
              sessionsCompleted: editValues.sessions,
              focusMinutes: editValues.focus,
              breakMinutes: editValues.break,
              totalMinutes: editValues.focus,
              topicId: editValues.topicId !== "none" ? editValues.topicId : undefined,
              subtopicId: editValues.subtopicId !== "none" ? editValues.subtopicId : undefined,
            }
          : s
      )
    );

    setEditingSession(null);
  };

  // Obter tópico selecionado
  const currentTopic = selectedTopic !== "none" ? topics.find((t) => t.id === selectedTopic) : null;

  // Calcular estatísticas
  const totalSessionsAllTime = history.reduce((sum, s) => sum + s.sessionsCompleted, 0);
  const totalMinutesAllTime = history.reduce((sum, s) => sum + s.totalMinutes, 0);

  // Obter nome do tópico e sub-tópico
  const getTopicName = (topicId?: string, subtopicId?: string) => {
    if (!topicId) return "Sem tópico";
    const topic = topics.find((t) => t.id === topicId);
    if (!topic) return "Tópico não encontrado";
    if (!subtopicId) return topic.category + " - " + topic.title;
    const subtopic = topic.subtopics.find((s) => s.id === subtopicId);
    return subtopic ? `${topic.category} - ${topic.title} > ${subtopic.name}` : topic.category + " - " + topic.title;
  };

  // Converter data de string para comparação
  const parseDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day);
  };

  // Filtrar histórico
  const filteredHistory = history.filter((session) => {
    // Filtro por tópico
    if (filterTopic !== "none" && session.topicId !== filterTopic) {
      return false;
    }

    // Filtro por data
    if (filterStartDate || filterEndDate) {
      const sessionDate = parseDate(session.date);
      if (filterStartDate) {
        const startDate = new Date(filterStartDate);
        if (sessionDate < startDate) return false;
      }
      if (filterEndDate) {
        const endDate = new Date(filterEndDate);
        if (sessionDate > endDate) return false;
      }
    }

    return true;
  });

  // Calcular estatísticas do filtro
  const filteredSessions = filteredHistory.length;
  const filteredTotalMinutes = filteredHistory.reduce((sum, s) => sum + s.totalMinutes, 0);
  const filteredTotalPomodoros = filteredHistory.reduce((sum, s) => sum + s.sessionsCompleted, 0);

  const hasActiveFilters = filterTopic !== "none" || filterStartDate || filterEndDate;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/study-tracker">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-primary">Pomodoro Timer</h1>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <div className="container py-8 max-w-4xl">
        {/* Timer Principal */}
        <div className="mb-8">
          <PomodoroTimer onSaveSession={handleSaveSessionFromTimer} />
        </div>

        {/* Seletor de Tópico */}
        <Card className="mb-8 border-primary/50">
          <CardHeader>
            <CardTitle>Selecione o Tópico Estudado (Opcional)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-semibold mb-2 block">Tópico</label>
              <Select
                value={selectedTopic}
                onValueChange={(value) => {
                  setSelectedTopic(value);
                  setSelectedSubtopic("none");
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Escolha um tópico..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sem tópico</SelectItem>
                  {topics.map((topic) => (
                    <SelectItem key={topic.id} value={topic.id}>
                      {topic.category} - {topic.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {currentTopic && currentTopic.subtopics.length > 0 && (
              <div>
                <label className="text-sm font-semibold mb-2 block">Sub-tema</label>
                <Select value={selectedSubtopic} onValueChange={setSelectedSubtopic}>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha um sub-tema..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Sem sub-tema</SelectItem>
                    {currentTopic.subtopics.map((subtopic) => (
                      <SelectItem key={subtopic.id} value={subtopic.id}>
                        {subtopic.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Estatísticas Gerais */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Estatísticas Gerais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-secondary/30 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Total de Pomodoros</p>
                <p className="text-2xl font-bold text-primary">{totalSessionsAllTime}</p>
              </div>
              <div className="text-center p-3 bg-secondary/30 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Tempo de Foco</p>
                <p className="text-2xl font-bold text-primary">
                  {(totalMinutesAllTime / 60).toFixed(1)}h
                </p>
              </div>
              <div className="text-center p-3 bg-secondary/30 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Sessões Registradas</p>
                <p className="text-2xl font-bold text-primary">{history.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filtros */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filtrar Histórico</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-semibold mb-2 block">Filtrar por Tópico</label>
                <Select value={filterTopic} onValueChange={setFilterTopic}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os tópicos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Todos os tópicos</SelectItem>
                    {topics.map((topic) => (
                      <SelectItem key={topic.id} value={topic.id}>
                        {topic.category} - {topic.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">Data Inicial</label>
                <Input
                  type="date"
                  value={filterStartDate}
                  onChange={(e) => setFilterStartDate(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">Data Final</label>
                <Input
                  type="date"
                  value={filterEndDate}
                  onChange={(e) => setFilterEndDate(e.target.value)}
                />
              </div>
            </div>

            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setFilterTopic("none");
                  setFilterStartDate("");
                  setFilterEndDate("");
                }}
                className="w-full"
              >
                <X className="w-4 h-4 mr-2" />
                Limpar Filtros
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Estatísticas do Filtro */}
        {hasActiveFilters && (
          <Card className="mb-8 border-primary/50">
            <CardHeader>
              <CardTitle>Resultados do Filtro</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Pomodoros</p>
                  <p className="text-2xl font-bold text-primary">{filteredTotalPomodoros}</p>
                </div>
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Tempo de Foco</p>
                  <p className="text-2xl font-bold text-primary">
                    {(filteredTotalMinutes / 60).toFixed(1)}h
                  </p>
                </div>
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Sessões</p>
                  <p className="text-2xl font-bold text-primary">{filteredSessions}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Histórico de Sessões */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{hasActiveFilters ? `Histórico Filtrado (${filteredSessions})` : "Histórico de Sessões"}</CardTitle>
            {history.length > 0 && (
              <Button variant="outline" size="sm" onClick={handleClearHistory} className="text-destructive">
                Limpar Histórico
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {filteredHistory.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                {history.length === 0 ? "Nenhuma sessão registrada ainda" : "Nenhuma sessão encontrada com os filtros aplicados"}
              </p>
            ) : (
              <div className="space-y-2">
                {filteredHistory.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg border border-border">
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{getTopicName(session.topicId, session.subtopicId)}</p>
                      <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                        <span>📅 {session.date}</span>
                        <span>🍅 {session.sessionsCompleted} pomodoros</span>
                        <span>⏱️ {Math.floor(session.focusMinutes / 60)}h {Math.round(session.focusMinutes % 60)}m foco</span>
                        <span>☕ {session.breakMinutes}m pausa</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditSession(session)}
                        className="text-primary hover:bg-primary/10"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteSession(session.id)}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Dialog de Edição */}
        {editingSession && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Editar Sessão</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Pomodoros</label>
                  <Input
                    type="number"
                    min="0"
                    value={editValues.sessions}
                    onChange={(e) => setEditValues({ ...editValues, sessions: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Tempo de Foco (minutos)</label>
                  <Input
                    type="number"
                    min="0"
                    value={editValues.focus}
                    onChange={(e) => setEditValues({ ...editValues, focus: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Tempo de Pausa (minutos)</label>
                  <Input
                    type="number"
                    min="0"
                    value={editValues.break}
                    onChange={(e) => setEditValues({ ...editValues, break: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Tópico</label>
                  <Select
                    value={editValues.topicId}
                    onValueChange={(value) => setEditValues({ ...editValues, topicId: value, subtopicId: "none" })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Escolha um tópico..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Sem tópico</SelectItem>
                      {topics.map((topic) => (
                        <SelectItem key={topic.id} value={topic.id}>
                          {topic.category} - {topic.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {editValues.topicId !== "none" && topics.find((t) => t.id === editValues.topicId)?.subtopics.length! > 0 && (
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Sub-tema</label>
                    <Select value={editValues.subtopicId} onValueChange={(value) => setEditValues({ ...editValues, subtopicId: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Escolha um sub-tema..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Sem sub-tema</SelectItem>
                        {topics
                          .find((t) => t.id === editValues.topicId)
                          ?.subtopics.map((subtopic) => (
                            <SelectItem key={subtopic.id} value={subtopic.id}>
                              {subtopic.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className="flex gap-2">
                  <Button onClick={handleSaveEdit} className="flex-1">
                    Salvar
                  </Button>
                  <Button variant="outline" onClick={() => setEditingSession(null)} className="flex-1">
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
