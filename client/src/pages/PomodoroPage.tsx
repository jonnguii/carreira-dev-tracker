import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowLeft, Clock, Trash2, Calendar } from "lucide-react";
import PomodoroTimer from "@/components/PomodoroTimer";

interface PomodoroSession {
  id: string;
  date: string;
  sessionsCompleted: number;
  totalMinutes: number;
  focusMinutes: number;
  breakMinutes: number;
}

export default function PomodoroPage() {
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [history, setHistory] = useState<PomodoroSession[]>([]);

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

    if (existingSession) {
      // Atualizar sessão do dia
      setHistory((prev) =>
        prev.map((s) =>
          s.date === today
            ? {
                ...s,
                sessionsCompleted: s.sessionsCompleted + sessionsCompleted,
                totalMinutes: s.totalMinutes + totalMinutes,
                focusMinutes: s.focusMinutes + totalMinutes,
              }
            : s
        )
      );
    } else {
      // Criar nova sessão
      const newSession: PomodoroSession = {
        id: Date.now().toString(),
        date: today,
        sessionsCompleted,
        totalMinutes,
        focusMinutes: totalMinutes,
        breakMinutes: sessionsCompleted * 5,
      };
      setHistory((prev) => [newSession, ...prev]);
    }

    // Resetar contadores
    setTotalMinutes(0);
    setSessionsCompleted(0);
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

  // Calcular estatísticas
  const totalSessionsAllTime = history.reduce((sum, s) => sum + s.sessionsCompleted, 0);
  const totalMinutesAllTime = history.reduce((sum, s) => sum + s.totalMinutes, 0);
  const totalHoursAllTime = Math.floor(totalMinutesAllTime / 60);

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
                      <p className="font-semibold text-foreground">{session.date}</p>
                      <div className="flex gap-6 mt-2 text-sm text-muted-foreground">
                        <span>🍅 {session.sessionsCompleted} pomodoros</span>
                        <span>⏱️ {Math.floor(session.focusMinutes / 60)}h {session.focusMinutes % 60}m foco</span>
                        <span>☕ {session.breakMinutes}m pausa</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteSession(session.id)}
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
