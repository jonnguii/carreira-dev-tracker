import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { ArrowLeft, Clock, Trash2, Edit2, X } from "lucide-react";
import PomodoroTimer from "@/components/PomodoroTimer";
import { MASTER_TOPICS, getMasterTopicColor } from "@/data/masterTopics";

interface PomodoroSession {
  id: string;
  date: string;
  sessionsCompleted: number;
  totalMinutes: number;
  focusMinutes: number;
  breakMinutes: number;
  masterTopic?: string; // Java, SpringBoot, HTML, CSS
}

export default function PomodoroPage() {
  const [selectedMasterTopic, setSelectedMasterTopic] = useState<string>("none");
  const [history, setHistory] = useState<PomodoroSession[]>([]);
  const [editingSession, setEditingSession] = useState<PomodoroSession | null>(null);
  const [editValues, setEditValues] = useState({ sessions: 0, focus: 0, break: 0, masterTopic: "none" });
  
  // Filtros
  const [filterTopic, setFilterTopic] = useState<string>("none");
  const [filterStartDate, setFilterStartDate] = useState<string>("");
  const [filterEndDate, setFilterEndDate] = useState<string>("");

  // Carregar histórico do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("pomodoro-history-master");
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
      localStorage.setItem("pomodoro-history-master", JSON.stringify(history));
    }
  }, [history]);

  const handleSaveSessionFromTimer = (focusMinutes: number, breakMinutes: number, sessionsCompleted: number) => {
    if (focusMinutes === 0 && sessionsCompleted === 0) return;

    const today = new Date().toLocaleDateString("pt-BR");

    const newSession: PomodoroSession = {
      id: Date.now().toString(),
      date: today,
      sessionsCompleted,
      totalMinutes: focusMinutes,
      focusMinutes,
      breakMinutes,
      masterTopic: selectedMasterTopic !== "none" ? selectedMasterTopic : undefined,
    };

    setHistory((prev) => [newSession, ...prev]);
  };

  const handleDeleteSession = (id: string) => {
    setHistory((prev) => prev.filter((s) => s.id !== id));
  };

  const handleClearHistory = () => {
    if (confirm("Tem certeza que deseja limpar todo o histórico?")) {
      setHistory([]);
      localStorage.removeItem("pomodoro-history-master");
    }
  };

  const handleEditSession = (session: PomodoroSession) => {
    setEditingSession(session);
    setEditValues({
      sessions: session.sessionsCompleted,
      focus: session.focusMinutes,
      break: session.breakMinutes,
      masterTopic: session.masterTopic || "none",
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
              masterTopic: editValues.masterTopic !== "none" ? editValues.masterTopic : undefined,
            }
          : s
      )
    );
    setEditingSession(null);
  };

  // Calcular estatísticas gerais
  const stats = {
    totalPomodoros: history.reduce((sum, s) => sum + s.sessionsCompleted, 0),
    totalFocusMinutes: history.reduce((sum, s) => sum + s.focusMinutes, 0),
    totalSessions: history.length,
  };

  // Filtrar histórico
  const filteredHistory = history.filter((session) => {
    if (filterTopic !== "none" && session.masterTopic !== filterTopic) return false;

    if (filterStartDate) {
      const sessionDate = new Date(session.date.split("/").reverse().join("-"));
      const startDate = new Date(filterStartDate);
      if (sessionDate < startDate) return false;
    }

    if (filterEndDate) {
      const sessionDate = new Date(session.date.split("/").reverse().join("-"));
      const endDate = new Date(filterEndDate);
      if (sessionDate > endDate) return false;
    }

    return true;
  });

  // Calcular estatísticas do filtro
  const filteredStats = {
    totalPomodoros: filteredHistory.reduce((sum, s) => sum + s.sessionsCompleted, 0),
    totalFocusMinutes: filteredHistory.reduce((sum, s) => sum + s.focusMinutes, 0),
    totalSessions: filteredHistory.length,
  };

  const isFiltered = filterTopic !== "none" || filterStartDate || filterEndDate;

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
            <h1 className="text-3xl font-bold">Pomodoro Timer</h1>
          </div>
          <div className="flex gap-2">
            <Link href="/study-tracker">
              <Button variant="outline">Rastreador de Horas</Button>
            </Link>
          </div>
        </div>

        {/* Layout: Timer à esquerda, Seletor à direita */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Timer */}
          <div className="lg:col-span-1">
            <PomodoroTimer onSaveSession={handleSaveSessionFromTimer} />
          </div>

          {/* Seletor de Tópico MASTER */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Tema do Dia</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Selecione o tópico que vai estudar:</label>
                  <Select value={selectedMasterTopic} onValueChange={setSelectedMasterTopic}>
                    <SelectTrigger>
                      <SelectValue placeholder="Escolha um tópico..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Sem tópico</SelectItem>
                      {MASTER_TOPICS.map((topic) => (
                        <SelectItem key={topic.id} value={topic.id}>
                          {topic.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedMasterTopic !== "none" && (
                  <div className={`p-4 rounded-lg ${getMasterTopicColor(selectedMasterTopic)} bg-opacity-10 border border-current`}>
                    <p className="font-semibold text-foreground">
                      {MASTER_TOPICS.find((t) => t.id === selectedMasterTopic)?.name}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {MASTER_TOPICS.find((t) => t.id === selectedMasterTopic)?.description}
                    </p>
                  </div>
                )}

                <div className="bg-secondary/50 p-4 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-2">💡 Dica:</p>
                  <p className="text-sm">
                    Escolha um tópico MASTER e estude conforme sua necessidade. Uma vez por semana, acesse o Dashboard para marcar os sub-temas que você realmente dominou.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Estatísticas Gerais */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {stats.totalPomodoros}
                </div>
                <div className="text-sm text-muted-foreground">Pomodoros</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {(stats.totalFocusMinutes / 60).toFixed(1)}h
                </div>
                <div className="text-sm text-muted-foreground">Tempo de Foco</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {stats.totalSessions}
                </div>
                <div className="text-sm text-muted-foreground">Sessões Registradas</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Tópico</label>
                <Select value={filterTopic} onValueChange={setFilterTopic}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Todos</SelectItem>
                    {MASTER_TOPICS.map((topic) => (
                      <SelectItem key={topic.id} value={topic.id}>
                        {topic.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Data Inicial</label>
                <Input
                  type="date"
                  value={filterStartDate}
                  onChange={(e) => setFilterStartDate(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Data Final</label>
                <Input
                  type="date"
                  value={filterEndDate}
                  onChange={(e) => setFilterEndDate(e.target.value)}
                />
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setFilterTopic("none");
                setFilterStartDate("");
                setFilterEndDate("");
              }}
              className="w-full"
            >
              Limpar Filtros
            </Button>
          </CardContent>
        </Card>

        {/* Histórico */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{isFiltered ? "Histórico Filtrado" : "Histórico de Sessões"}</CardTitle>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleClearHistory}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Limpar Tudo
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Estatísticas do Filtro */}
            {isFiltered && (
              <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-secondary/50 rounded-lg border border-border">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{filteredStats.totalPomodoros}</div>
                  <div className="text-xs text-muted-foreground">Pomodoros</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {(filteredStats.totalFocusMinutes / 60).toFixed(1)}h
                  </div>
                  <div className="text-xs text-muted-foreground">Tempo de Foco</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{filteredStats.totalSessions}</div>
                  <div className="text-xs text-muted-foreground">Sessões</div>
                </div>
              </div>
            )}

            {/* Lista de Sessões */}
            {filteredHistory.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Nenhuma sessão registrada</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredHistory.map((session) => (
                  <div
                    key={session.id}
                    className={`p-4 rounded-lg border border-border flex items-center justify-between ${
                      session.masterTopic ? getMasterTopicColor(session.masterTopic) : "bg-secondary/50"
                    } bg-opacity-10`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">
                          {session.masterTopic
                            ? MASTER_TOPICS.find((t) => t.id === session.masterTopic)?.name
                            : "Sem tópico"}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {session.date}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {session.sessionsCompleted} pomodoros • {(session.focusMinutes / 60).toFixed(1)}h de foco
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditSession(session)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteSession(session.id)}
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

        {/* Modal de Edição */}
        {editingSession && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle>Editar Sessão</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditingSession(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Pomodoros</label>
                  <Input
                    type="number"
                    min="0"
                    value={editValues.sessions}
                    onChange={(e) =>
                      setEditValues({ ...editValues, sessions: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Tempo de Foco (minutos)</label>
                  <Input
                    type="number"
                    min="0"
                    value={editValues.focus}
                    onChange={(e) =>
                      setEditValues({ ...editValues, focus: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Tempo de Pausa (minutos)</label>
                  <Input
                    type="number"
                    min="0"
                    value={editValues.break}
                    onChange={(e) =>
                      setEditValues({ ...editValues, break: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Tópico MASTER</label>
                  <Select value={editValues.masterTopic} onValueChange={(value) =>
                    setEditValues({ ...editValues, masterTopic: value })
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Sem tópico</SelectItem>
                      {MASTER_TOPICS.map((topic) => (
                        <SelectItem key={topic.id} value={topic.id}>
                          {topic.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
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
