import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Save, Settings } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PomodoroTimerProps {
  onSessionComplete?: (minutes: number) => void;
  onSaveSession?: (focusMinutes: number, breakMinutes: number, sessionsCompleted: number) => void;
}

type TimerMode = "focus" | "break";

export default function PomodoroTimer({ onSessionComplete, onSaveSession }: PomodoroTimerProps) {
  const [mode, setMode] = useState<TimerMode>("focus");
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutos em segundos
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [showSettings, setShowSettings] = useState(false);
  const [tempFocusDuration, setTempFocusDuration] = useState(25);
  const [tempBreakDuration, setTempBreakDuration] = useState(5);

  const FOCUS_TIME = focusDuration * 60;
  const BREAK_TIME = breakDuration * 60;
  
  const startTimeRef = useRef<number | null>(null);
  const elapsedRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  // Timer logic com performance.now() para precisão
  useEffect(() => {
    if (!isRunning) {
      startTimeRef.current = null;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    if (startTimeRef.current === null) {
      startTimeRef.current = performance.now();
    }

    const updateTimer = (currentTime: number) => {
      if (startTimeRef.current === null) return;

      const elapsed = (currentTime - startTimeRef.current) / 1000; // converter para segundos
      elapsedRef.current = elapsed;

      const targetDuration = mode === "focus" ? FOCUS_TIME : BREAK_TIME;
      const newTimeLeft = Math.max(0, targetDuration - Math.floor(elapsed));

      setTimeLeft(newTimeLeft);

      if (newTimeLeft === 0) {
        // Timer finished
        playSound();

        if (mode === "focus") {
          setSessionsCompleted((prev) => prev + 1);
          onSessionComplete?.(focusDuration);
          setMode("break");
          startTimeRef.current = performance.now();
          elapsedRef.current = 0;
        } else {
          setMode("focus");
          startTimeRef.current = performance.now();
          elapsedRef.current = 0;
        }
      } else {
        animationFrameRef.current = requestAnimationFrame(updateTimer);
      }
    };

    animationFrameRef.current = requestAnimationFrame(updateTimer);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRunning, mode, FOCUS_TIME, BREAK_TIME, focusDuration, onSessionComplete]);

  const playSound = () => {
    if (!soundEnabled) return;

    try {
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
    } catch (error) {
      console.error("Erro ao tocar som:", error);
    }
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMode("focus");
    setTimeLeft(FOCUS_TIME);
    startTimeRef.current = null;
    elapsedRef.current = 0;
  };

  const handleSaveSession = () => {
    const focusMinutes = (FOCUS_TIME - timeLeft) / 60;
    const breakMinutes = sessionsCompleted * breakDuration;
    onSaveSession?.(focusMinutes, breakMinutes, sessionsCompleted);
    resetTimer();
    setSessionsCompleted(0);
  };

  const handleSaveSettings = () => {
    setFocusDuration(Math.max(1, tempFocusDuration));
    setBreakDuration(Math.max(1, tempBreakDuration));
    setTimeLeft(Math.max(1, tempFocusDuration) * 60);
    setShowSettings(false);
    setIsRunning(false);
    startTimeRef.current = null;
    elapsedRef.current = 0;
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

          {/* Dialog de Configurações */}
          <Dialog open={showSettings} onOpenChange={setShowSettings}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="font-semibold">
                <Settings className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Configurar Timer</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="focus-duration">Tempo de Foco (minutos)</Label>
                  <Input
                    id="focus-duration"
                    type="number"
                    min="1"
                    max="120"
                    value={tempFocusDuration}
                    onChange={(e) => setTempFocusDuration(parseInt(e.target.value) || 1)}
                  />
                </div>
                <div>
                  <Label htmlFor="break-duration">Tempo de Pausa (minutos)</Label>
                  <Input
                    id="break-duration"
                    type="number"
                    min="1"
                    max="60"
                    value={tempBreakDuration}
                    onChange={(e) => setTempBreakDuration(parseInt(e.target.value) || 1)}
                  />
                </div>
                <Button onClick={handleSaveSettings} className="w-full">
                  Salvar Configurações
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Botão Salvar Sessão */}
        {(timeLeft < FOCUS_TIME || sessionsCompleted > 0) && (
          <Button
            onClick={handleSaveSession}
            className="w-full mb-6 font-semibold bg-green-600 hover:bg-green-700"
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar Sessão
          </Button>
        )}

        {/* Info estilo terminal */}
        <div className="mt-6 p-3 bg-secondary/50 border border-border rounded text-xs text-muted-foreground font-mono">
          <div>$ pomodoro --info</div>
          <div className="mt-2 space-y-1">
            <div>Focus: {focusDuration}min | Break: {breakDuration}min</div>
            <div>Mode: {mode === "focus" ? "FOCUS" : "BREAK"}</div>
            <div>Status: {isRunning ? "RUNNING" : "PAUSED"}</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
