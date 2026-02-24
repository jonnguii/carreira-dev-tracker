import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";

interface PomodoroTimerProps {
  onSessionComplete?: (minutes: number) => void;
}

type TimerMode = "focus" | "break";

export default function PomodoroTimer({ onSessionComplete }: PomodoroTimerProps) {
  const [mode, setMode] = useState<TimerMode>("focus");
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutos em segundos
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const FOCUS_TIME = 25 * 60;
  const BREAK_TIME = 5 * 60;

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      // Timer finished
      playSound();

      if (mode === "focus") {
        setSessionsCompleted((prev) => prev + 1);
        onSessionComplete?.(25);
        setMode("break");
        setTimeLeft(BREAK_TIME);
      } else {
        setMode("focus");
        setTimeLeft(FOCUS_TIME);
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode, onSessionComplete]);

  const playSound = () => {
    if (!soundEnabled) return;

    // Criar um som simples usando Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMode("focus");
    setTimeLeft(FOCUS_TIME);
  };



  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const displayTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const progressPercentage = mode === "focus" 
    ? ((FOCUS_TIME - timeLeft) / FOCUS_TIME) * 100
    : ((BREAK_TIME - timeLeft) / BREAK_TIME) * 100;

  return (
    <Card className="w-full max-w-md mx-auto border-2 border-primary/50 bg-gradient-to-br from-background to-secondary/30">
      {/* Estilo Linux Retro */}
      <div className="p-6 font-mono">
        {/* Header estilo terminal */}
        <div className="bg-primary/20 border-2 border-primary/50 rounded-lg p-4 mb-6 text-center">
          <div className="text-xs text-muted-foreground mb-2">
            $ pomodoro --timer
          </div>
          <div className="text-4xl font-bold text-primary tracking-wider mb-2">
            {displayTime}
          </div>
          <div className="text-sm font-semibold text-foreground">
            {mode === "focus" ? "🔴 FOCO" : "🟢 PAUSA"}
          </div>
        </div>

        {/* Barra de progresso estilo ASCII */}
        <div className="mb-6">
          <div className="text-xs text-muted-foreground mb-2">
            Progress: [{progressPercentage.toFixed(0)}%]
          </div>
          <div className="w-full bg-secondary rounded-full h-2 overflow-hidden border border-primary/30">
            <div
              className="bg-primary h-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Contador de sessões */}
        <div className="bg-secondary/50 border border-border rounded p-3 mb-6 text-center">
          <div className="text-xs text-muted-foreground">Sessions Completed</div>
          <div className="text-2xl font-bold text-primary">{sessionsCompleted}</div>
        </div>

        {/* Controles */}
        <div className="flex gap-2 mb-6">
          <Button
            onClick={toggleTimer}
            className="flex-1 gap-2 font-semibold"
            variant={isRunning ? "destructive" : "default"}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" />
                PAUSE
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                START
              </>
            )}
          </Button>

          <Button
            onClick={resetTimer}
            variant="outline"
            size="icon"
            className="font-semibold"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>

          <Button
            onClick={() => setSoundEnabled(!soundEnabled)}
            variant="outline"
            size="icon"
            className="font-semibold"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Info estilo terminal */}
        <div className="mt-6 p-3 bg-secondary/50 border border-border rounded text-xs text-muted-foreground font-mono">
          <div>$ pomodoro --info</div>
          <div className="mt-2 space-y-1">
            <div>Focus: {FOCUS_TIME / 60}min | Break: {BREAK_TIME / 60}min</div>
            <div>Mode: {mode === "focus" ? "FOCUS" : "BREAK"}</div>
            <div>Status: {isRunning ? "RUNNING" : "PAUSED"}</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
