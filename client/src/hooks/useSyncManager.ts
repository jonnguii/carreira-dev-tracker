import { useCallback } from "react";

export interface SyncData {
  version: string;
  lastSync: string;
  topics: any[];
  studySessions: any[];
  pomodoroHistory: any[];
  dashboardProgress: Record<string, any>;
}

export function useSyncManager() {
  // Exportar dados para JSON
  const exportToJson = useCallback(() => {
    const topicsData = localStorage.getItem("topics-data");
    const studySessions = localStorage.getItem("study-sessions");
    const pomodoroHistory = localStorage.getItem("pomodoro-history");
    const dashboardProgress = localStorage.getItem("dashboard-progress");

    const syncData: SyncData = {
      version: "1.0.0",
      lastSync: new Date().toISOString(),
      topics: topicsData ? JSON.parse(topicsData) : [],
      studySessions: studySessions ? JSON.parse(studySessions) : [],
      pomodoroHistory: pomodoroHistory ? JSON.parse(pomodoroHistory) : [],
      dashboardProgress: dashboardProgress ? JSON.parse(dashboardProgress) : {},
    };

    // Criar blob e download
    const blob = new Blob([JSON.stringify(syncData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `dev-tracker-backup-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return syncData;
  }, []);

  // Importar dados do JSON
  const importFromJson = useCallback((file: File): Promise<SyncData> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string) as SyncData;

          // Validar estrutura
          if (!data.version || !data.lastSync) {
            throw new Error("Arquivo inválido: estrutura não reconhecida");
          }

          // Salvar no localStorage
          if (data.topics.length > 0) {
            localStorage.setItem("topics-data", JSON.stringify(data.topics));
          }
          if (data.studySessions.length > 0) {
            localStorage.setItem("study-sessions", JSON.stringify(data.studySessions));
          }
          if (data.pomodoroHistory.length > 0) {
            localStorage.setItem("pomodoro-history", JSON.stringify(data.pomodoroHistory));
          }
          if (Object.keys(data.dashboardProgress).length > 0) {
            localStorage.setItem("dashboard-progress", JSON.stringify(data.dashboardProgress));
          }

          resolve(data);
        } catch (error) {
          reject(new Error(`Erro ao importar arquivo: ${error}`));
        }
      };

      reader.onerror = () => {
        reject(new Error("Erro ao ler arquivo"));
      };

      reader.readAsText(file);
    });
  }, []);

  // Carregar dados do data.json público
  const loadFromPublicData = useCallback(async () => {
    try {
      const response = await fetch("/data.json");
      if (!response.ok) {
        throw new Error("Arquivo data.json não encontrado");
      }

      const data = (await response.json()) as SyncData;

      // Salvar no localStorage
      if (data.topics.length > 0) {
        localStorage.setItem("topics-data", JSON.stringify(data.topics));
      }
      if (data.studySessions.length > 0) {
        localStorage.setItem("study-sessions", JSON.stringify(data.studySessions));
      }
      if (data.pomodoroHistory.length > 0) {
        localStorage.setItem("pomodoro-history", JSON.stringify(data.pomodoroHistory));
      }
      if (Object.keys(data.dashboardProgress).length > 0) {
        localStorage.setItem("dashboard-progress", JSON.stringify(data.dashboardProgress));
      }

      return data;
    } catch (error) {
      console.warn("Não foi possível carregar data.json:", error);
      return null;
    }
  }, []);

  // Obter informações de sincronização
  const getSyncInfo = useCallback(() => {
    const topicsData = localStorage.getItem("topics-data");
    const studySessions = localStorage.getItem("study-sessions");
    const pomodoroHistory = localStorage.getItem("pomodoro-history");

    return {
      topicsCount: topicsData ? JSON.parse(topicsData).length : 0,
      sessionsCount: studySessions ? JSON.parse(studySessions).length : 0,
      pomodorosCount: pomodoroHistory ? JSON.parse(pomodoroHistory).length : 0,
      lastSync: localStorage.getItem("last-sync") || "Nunca",
    };
  }, []);

  return {
    exportToJson,
    importFromJson,
    loadFromPublicData,
    getSyncInfo,
  };
}
