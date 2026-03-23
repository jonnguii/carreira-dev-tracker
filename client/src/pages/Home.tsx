import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, Code, Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">Roadmap Dev</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              title={`Mudar para modo ${theme === "light" ? "escuro" : "claro"}`}
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
            <Link href="/dashboard">
              <Button variant="outline">Meu Progresso</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Dev Beginner Roadmap
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Minha jornada para evoluir em programação com rastreamento de progresso e metas semanais.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/dashboard">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Dashboard Estudo <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/course-tracker">
              <Button size="lg" variant="outline">
                Dashboard Cursos <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/next-steps">
              <Button size="lg" variant="outline">
                Próximos Passos <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Resumo Rápido */}
      <section className="py-12 px-4 bg-secondary/30">
        <div className="container max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center">
            Estrutura da Trilha
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">72 Conceitos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Distribuídos em 16 tópicos</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">3 Prioridades</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Alta, Média e Baixa</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">10hrs/Semana</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Meta de estudo</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="border-t py-8 text-center text-muted-foreground">
        <p>Roadmap Dev • Desenvolvido para o João Guilherme</p>
      </footer>
    </div>
  );
}
