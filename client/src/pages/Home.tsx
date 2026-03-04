import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, Code, Moon, Sun, Search } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Input } from "@/components/ui/input";

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [searchFocus, setSearchFocus] = useState("");

  const focusTopics = [
    {
      name: "Java",
      color: "border-red-500/50 text-red-600",
      description: "Fundamentos, OOP, Collections, Exception Handling, Streams, Lambdas, Generics",
    },
    {
      name: "Spring Boot",
      color: "border-orange-500/50 text-orange-600",
      description: "IoC, DI, Beans, Controllers, Services, DTOs, REST APIs, JPA, Configuração",
    },
    {
      name: "SQL",
      color: "border-yellow-500/50 text-yellow-600",
      description: "SELECT, JOINs, GROUP BY, Agregações, Índices, Otimização, Transações",
    },
  ];

  const filteredTopics = focusTopics.filter((topic) =>
    topic.name.toLowerCase().includes(searchFocus.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">Roadmappnpm Dev</h1>
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

      {/* Foco Inicial com Filtro */}
      <section className="py-12 px-4">
        <div className="container max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center">
            Meu Foco Inicial
          </h3>

          {/* Filtro de Busca */}
          <div className="mb-8 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar tópico (Java, Spring Boot, SQL)..."
              value={searchFocus}
              onChange={(e) => setSearchFocus(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {filteredTopics.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {filteredTopics.map((topic) => (
                <Card key={topic.name} className={`border-2 ${topic.color}`}>
                  <CardHeader>
                    <CardTitle className={topic.color.split(" ")[1]}>
                      {topic.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    {topic.description}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>Nenhum tópico encontrado para "{searchFocus}"</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-muted-foreground">
        <p>Roadmap Dev • Desenvolvido para o João Guilherme</p>
      </footer>
    </div>
  );
}
