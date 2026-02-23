import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
            <h1 className="text-2xl font-bold text-primary">Trilha Dev</h1>
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
            De Estagiário a Desenvolvedor Júnior
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Sua jornada personalizada para evoluir em Java, Spring Boot e SQL com rastreamento de progresso e metas semanais.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/dashboard">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Começar Trilha <ArrowRight className="ml-2 w-4 h-4" />
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

      {/* Foco Inicial */}
      <section className="py-12 px-4">
        <div className="container max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center">
            Seu Foco Inicial
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 border-red-500/50">
              <CardHeader>
                <CardTitle className="text-red-600">Java</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Fundamentos, OOP, Collections, Exception Handling, Streams, Lambdas, Generics
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-500/50">
              <CardHeader>
                <CardTitle className="text-orange-600">Spring Boot</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                IoC, DI, Beans, Controllers, Services, DTOs, REST APIs, JPA, Configuração
              </CardContent>
            </Card>

            <Card className="border-2 border-yellow-500/50">
              <CardHeader>
                <CardTitle className="text-yellow-600">SQL</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                SELECT, JOINs, GROUP BY, Agregações, Índices, Otimização, Transações
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Definição de Sucesso */}
      <section className="py-12 px-4 bg-secondary/30">
        <div className="container max-w-3xl mx-auto text-center">
          <Card>
            <CardHeader>
              <CardTitle>Definição de Sucesso</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-primary">
                Dominado = Sabe explicar + usar
              </p>
              <p className="text-muted-foreground mt-2">
                Você não apenas entende teoricamente, mas consegue aplicar na prática e explicar para alguém.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-muted-foreground">
        <p>Trilha de Carreira Dev • Desenvolvido para João Guilherme</p>
      </footer>
    </div>
  );
}
