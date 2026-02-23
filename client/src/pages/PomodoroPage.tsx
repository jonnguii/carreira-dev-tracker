import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowLeft, Clock } from "lucide-react";
import PomodoroTimer from "@/components/PomodoroTimer";

export default function PomodoroPage() {
  const [totalMinutes, setTotalMinutes] = useState(0);

  const handleSessionComplete = (minutes: number) => {
    setTotalMinutes((prev) => prev + minutes);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4 flex items-center gap-4">
          <Link href="/study-tracker">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-primary">Pomodoro Timer</h1>
        </div>
      </header>

      <div className="container py-8 max-w-2xl">
        {/* Timer Principal */}
        <div className="mb-8">
          <PomodoroTimer onSessionComplete={handleSessionComplete} />
        </div>

        {/* Estatísticas */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Tempo Total Estudado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-5xl font-bold text-primary mb-2">
                {Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m
              </p>
              <p className="text-muted-foreground">
                {totalMinutes} minutos de foco nesta sessão
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Dicas */}
        <Card className="bg-secondary/30 border-primary/30">
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
