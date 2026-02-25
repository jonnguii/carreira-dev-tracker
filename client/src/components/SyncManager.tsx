import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSyncManager } from "@/hooks/useSyncManager";
import { Download, Upload, AlertCircle, CheckCircle } from "lucide-react";

export default function SyncManager() {
  const { exportToJson, importFromJson, getSyncInfo } = useSyncManager();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const syncInfo = getSyncInfo();

  const handleExport = async () => {
    try {
      setLoading(true);
      exportToJson();
      setMessage({ type: "success", text: "✅ Dados exportados com sucesso! Faça commit no Git." });
      setTimeout(() => setMessage(null), 5000);
    } catch (error) {
      setMessage({ type: "error", text: `❌ Erro ao exportar: ${error}` });
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      await importFromJson(file);
      setMessage({ type: "success", text: "✅ Dados importados com sucesso! Recarregue a página." });
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      setMessage({ type: "error", text: `❌ Erro ao importar: ${error}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-primary/50">
      <CardHeader>
        <CardTitle>Sincronização de Dados</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Informações de Sincronização */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          <div className="p-2 bg-secondary/30 rounded">
            <p className="text-muted-foreground">Tópicos</p>
            <p className="font-bold text-primary">{syncInfo.topicsCount}</p>
          </div>
          <div className="p-2 bg-secondary/30 rounded">
            <p className="text-muted-foreground">Sessões</p>
            <p className="font-bold text-primary">{syncInfo.sessionsCount}</p>
          </div>
          <div className="p-2 bg-secondary/30 rounded">
            <p className="text-muted-foreground">Pomodoros</p>
            <p className="font-bold text-primary">{syncInfo.pomodorosCount}</p>
          </div>
          <div className="p-2 bg-secondary/30 rounded">
            <p className="text-muted-foreground">Última Sync</p>
            <p className="font-bold text-primary text-xs">{syncInfo.lastSync}</p>
          </div>
        </div>

        {/* Mensagem de Status */}
        {message && (
          <div
            className={`p-3 rounded-lg flex items-center gap-2 ${
              message.type === "success" ? "bg-green-500/10 text-green-700" : "bg-red-500/10 text-red-700"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <p className="text-sm">{message.text}</p>
          </div>
        )}

        {/* Botões de Sincronização */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-semibold">Fluxo de Sincronização:</p>

          <div className="space-y-2">
            <Button
              onClick={handleExport}
              disabled={loading}
              className="w-full"
              variant="default"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar Dados (Download JSON)
            </Button>
            <p className="text-xs text-muted-foreground">
              1️⃣ Clique para baixar seus dados em JSON
            </p>
          </div>

          <div className="border-t border-border my-3"></div>

          <div className="space-y-2">
            <label className="w-full">
              <Button
                disabled={loading}
                className="w-full"
                variant="outline"
                asChild
              >
                <span>
                  <Upload className="w-4 h-4 mr-2" />
                  Importar Dados (Upload JSON)
                </span>
              </Button>
              <Input
                type="file"
                accept=".json"
                onChange={handleImport}
                disabled={loading}
                className="hidden"
              />
            </label>
            <p className="text-xs text-muted-foreground">
              3️⃣ Clique para carregar dados de outro backup
            </p>
          </div>
        </div>

        {/* Instruções */}
        <div className="bg-secondary/30 p-3 rounded-lg text-sm space-y-2">
          <p className="font-semibold">📋 Instruções de Sincronização:</p>
          <ol className="space-y-1 text-muted-foreground">
            <li>1. Clique em <strong>"Exportar Dados"</strong> para baixar JSON</li>
            <li>2. Faça commit no Git: <code className="bg-background px-1 rounded">git add data.json && git commit -m "Sync dados"</code></li>
            <li>3. Faça push: <code className="bg-background px-1 rounded">git push</code></li>
            <li>4. Em outra máquina, faça pull: <code className="bg-background px-1 rounded">git pull</code></li>
            <li>5. Clique em <strong>"Importar Dados"</strong> e selecione o JSON</li>
            <li>6. Recarregue a página (F5)</li>
          </ol>
        </div>

        {/* Aviso */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded-lg text-sm">
          <p className="text-yellow-700 font-semibold">⚠️ Importante:</p>
          <p className="text-yellow-600 text-xs mt-1">
            Se editar dados em 2 máquinas simultaneamente, o último a fazer export sobrescreve o anterior.
            Sempre sincronize antes de começar a estudar em uma máquina diferente.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
