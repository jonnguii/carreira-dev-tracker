import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { ArrowLeft, Clock, Trash2, Calendar, Edit2 } from "lucide-react";
import PomodoroTimer from "@/components/PomodoroTimer";
import { TOPICS_WITH_SUBTOPICS } from "@/data/subtopics";

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
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>("");
  const [history, setHistory] = useState<PomodoroSession[]>([]);
  const [editingSession, setEditingSession] = useState<PomodoroSession | null>(null);
  const [editValues, setEditValues] = useState({ sessions: 0, focus: 0, break: 0 });

  // Carregar histórico do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("pomodoro-history");
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  // Salvar histórico no localStorage
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("pomodoro-history", JSON.stringify(history));
    }
  }, [history]);

  const handleSessionComplete = (minutes: number) => {
    setTotalMinutes((prev) => prev + minutes);
    setSessionsCompleted((prev) => prev + 1);
  };

  const handleSaveSession = () => {
    if (totalMinutes === 0) return;

    const today = new Date().toLocaleDateString("pt-BR");
    const existingSession = history.find((s) => s.date === today);

    const topicData = selectedTopic ? TOPICS_WITH_SUBTOPICS.find((t) => t.id === selectedTopic) : null;
    const subtopicData = topicData?.subtopics.find((s) => s.id === selectedSubtopic);

    if (existingSession) {
      setHistory((prev) =>
        prev.map((s) =>
          s.date === today
            ? {
                ...s,
                sessionsCompleted: s.sessionsCompleted + sessionsCompleted,
                totalMinutes: s.totalMinutes + totalMinutes,
                focusMinutes: s.focusMinutes + totalMinutes,
                breakMinutes: s.breakMinutes + sessionsCompleted * 5,
                topicId: selectedTopic || s.topicId,
                subtopicId: selectedSubtopic || s.subtopicId,
              }
            : s
        )
      );
    } else {
      const newSession: PomodoroSession = {
        id: Date.now().toString(),
        date: today,
        sessionsCompleted,
        totalMinutes,
        focusMinutes: totalMinutes,
        breakMinutes: sessionsCompleted * 5,
        topicId: selectedTopic,
        subtopicId: selectedSubtopic,
      };
      setHistory((prev) => [newSession, ...prev]);
    }

    setTotalMinutes(0);
    setSessionsCompleted(0);
    setSelectedTopic("");
    setSelectedSubtopic("");
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
            }
          : s
      )
    );

    setEditingSession(null);
  };

  // Obter tópico selecionado
  const currentTopic = selectedTopic ? TOPICS_WITH_SUBTOPICS.find((t) => t.id === selectedTopic) : null;

  // Calcular estatísticas
  const totalSessionsAllTime = history.reduce((sum, s) => sum + s.sessionsCompleted, 0);
  const totalMinutesAllTime = history.reduce((sum, s) => sum + s.totalMinutes, 0);
  const totalHoursAllTime = Math.floor(totalMinutesAllTime / 60);

  // Obter nome do tópico e sub-tópico
  const getTopicName = (topicId?: string, subtopicId?: string) => {
    if (!topicId) return "Sem tópico";
    const topic = TOPICS_WITH_SUBTOPICS.find((t) => t.id === topicId);
    if (!topic) return "Tópico não encontrado";
    if (!subtopicId) return topic.title;
    const subtopic = topic.subtopics.find((s) => s.id === subtopicId);
    return subtopic ? `${topic.title} > ${subtopic.name}` : topic.title;
  };

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
          <Link href="/study-tracker">
            <Button variant="outline" size="sm">
              Rastreador
            </Button>
          </Link>
        </div>
      </header>

      <div className="container py-8 max-w-4xl">
        {/* Timer Principal */}
        <div className="mb-8">
          <PomodoroTimer onSessionComplete={handleSessionComplete} />
        </div>

        {/* Seletor de Tópico */}
        <Card className="mb-8 border-primary/50">
          <CardHeader>
            <CardTitle>Selecione o Tópico Estudado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-semibold mb-2 block">Tópico</label>
              <Select value={selectedTopic} onValueChange={(value) => {
                setSelectedTopic(value);
                setSelectedSubtopic("");
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Escolha um tópico..." />
                </SelectTrigger>
                <SelectContent>
                  {TOPICS_WITH_SUBTOPICS.map((topic) => (
                    <SelectItem key={topic.id} value={topic.id}>
                      {topic.title} {topic.category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {currentTopic && (
              <div>
                <label className="text-sm font-semibold mb-2 block">Sub-tema</label>
                <Select value={selectedSubtopic} onValueChange={setSelectedSubtopic}>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha um sub-tema..." />
                  </SelectTrigger>
                  <SelectContent>
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

        {/* Estatísticas da Sessão Atual */}
        <Card className="mb-8 border-2 border-primary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Sessão Atual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-secondary/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Pomodoros</p>
                <p className="text-3xl font-bold text-primary">{sessionsCompleted}</p>
              </div>
              <div className="text-center p-4 bg-secondary/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Tempo de Foco</p>
                <p className="text-3xl font-bold text-primary">
                  {Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m
                </p>
              </div>
              <div className="text-center p-4 bg-secondary/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Tempo de Pausa</p>
                <p className="text-3xl font-bold text-primary">{sessionsCompleted * 5}m</p>
              </div>
            </div>

            {totalMinutes > 0 && (
              <Button onClick={handleSaveSession} className="w-full" size="lg">
                Salvar Sessão
              </Button>
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
                <p className="text-xs text-muted-foreground mb-1">Horas de Foco</p>
                <p className="text-2xl font-bold text-primary">{totalHoursAllTime}h</p>
              </div>
              <div className="text-center p-3 bg-secondary/30 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Dias Estudados</p>
                <p className="text-2xl font-bold text-primary">{history.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Histórico */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Histórico de Sessões
            </CardTitle>
            {history.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearHistory}
                className="text-destructive hover:text-destructive"
              >
                Limpar Tudo
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {history.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Nenhuma sessão registrada ainda. Complete uma sessão de Pomodoro e salve para ver o histórico!
              </p>
            ) : (
              <div className="space-y-3">
                {history.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-foreground">{session.date}</p>
                        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                          {getTopicName(session.topicId, session.subtopicId)}
                        </span>
                      </div>
                      <div className="flex gap-6 mt-2 text-sm text-muted-foreground">
                        <span>🍅 {session.sessionsCompleted} pomodoros</span>
                        <span>⏱️ {Math.floor(session.focusMinutes / 60)}h {session.focusMinutes % 60}m foco</span>
                        <span>☕ {session.breakMinutes}m pausa</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditSession(session)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Editar Sessão - {session.date}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-semibold mb-2 block">Pomodoros</label>
                              <Input
                                type="number"
                                min="0"
                                value={editValues.sessions}
                                onChange={(e) =>
                                  setEditValues((prev) => ({
                                    ...prev,
                                    sessions: parseInt(e.target.value) || 0,
                                  }))
                                }
                              />
                            </div>
                            <div>
                              <label className="text-sm font-semibold mb-2 block">Tempo de Foco (minutos)</label>
                              <Input
                                type="number"
                                min="0"
                                value={editValues.focus}
                                onChange={(e) =>
                                  setEditValues((prev) => ({
                                    ...prev,
                                    focus: parseInt(e.target.value) || 0,
                                  }))
                                }
                              />
                            </div>
                            <div>
                              <label className="text-sm font-semibold mb-2 block">Tempo de Pausa (minutos)</label>
                              <Input
                                type="number"
                                min="0"
                                value={editValues.break}
                                onChange={(e) =>
                                  setEditValues((prev) => ({
                                    ...prev,
                                    break: parseInt(e.target.value) || 0,
                                  }))
                                }
                              />
                            </div>
                            <Button onClick={handleSaveEdit} className="w-full">
                              Salvar Alterações
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteSession(session.id)}
                        className="text-destructive hover:text-destructive"
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

        {/* Dicas */}
        <Card className="mt-8 bg-secondary/30 border-primary/30">
          <CardHeader>
            <CardTitle className="text-lg">Dicas de Produtividade</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <p className="font-semibold text-primary mb-1">✓ Prepare seu ambiente</p>
              <p className="text-muted-foreground">Desligue notificações e distrações antes de começar</p>
            </div>
            <div>
              <p className="font-semibold text-primary mb-1">✓ Use a pausa</p>
              <p className="text-muted-foreground">Levante, estique, beba água durante os 5 minutos de pausa</p>
            </div>
            <div>
              <p className="font-semibold text-primary mb-1">✓ Rastreie seu progresso</p>
              <p className="text-muted-foreground">Volte ao Rastreador de Horas para registrar sua sessão</p>
            </div>
            <div>
              <p className="font-semibold text-primary mb-1">✓ Consistência é chave</p>
              <p className="text-muted-foreground">Estude regularmente para consolidar o aprendizado</p>
            </div>
          </CardContent>
        </Card>

        {/* Link para Study Tracker */}
        <div className="mt-8 text-center">
          <Link href="/study-tracker">
            <Button size="lg" className="gap-2">
              ← Voltar ao Rastreador de Horas
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
