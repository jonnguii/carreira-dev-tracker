import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "wouter";
import { ArrowLeft, BarChart3, CheckCircle2, Circle } from "lucide-react";

interface ProgressItem {
  id: string;
  category: string;
  title: string;
  completed: boolean;
}

const INITIAL_ITEMS: ProgressItem[] = [
  // ALTA PRIORIDADE
  { id: "java-1", category: "Java (Alta)", title: "Fundamentos", completed: false },
  { id: "java-2", category: "Java (Alta)", title: "OOP (classes, herança, polimorfismo)", completed: false },
  { id: "java-3", category: "Java (Alta)", title: "Collections (List, Set, Map)", completed: false },
  { id: "java-4", category: "Java (Alta)", title: "Exception Handling", completed: false },
  { id: "java-5", category: "Java (Alta)", title: "Streams e Lambdas", completed: false },
  { id: "java-6", category: "Java (Alta)", title: "Generics", completed: false },

  { id: "spring-1", category: "Spring Boot (Alta)", title: "IoC e Injeção de Dependência", completed: false },
  { id: "spring-2", category: "Spring Boot (Alta)", title: "Beans e Lifecycle", completed: false },
  { id: "spring-3", category: "Spring Boot (Alta)", title: "Controllers e Routing", completed: false },
  { id: "spring-4", category: "Spring Boot (Alta)", title: "Services e Business Logic", completed: false },
  { id: "spring-5", category: "Spring Boot (Alta)", title: "DTOs e Repositories", completed: false },
  { id: "spring-6", category: "Spring Boot (Alta)", title: "REST APIs", completed: false },
  { id: "spring-7", category: "Spring Boot (Alta)", title: "Spring Data JPA", completed: false },
  { id: "spring-8", category: "Spring Boot (Alta)", title: "Configuração (properties, yml)", completed: false },

  { id: "sql-1", category: "SQL (Alta)", title: "SELECT, FROM, WHERE", completed: false },
  { id: "sql-2", category: "SQL (Alta)", title: "JOINs (INNER, LEFT, RIGHT, FULL)", completed: false },
  { id: "sql-3", category: "SQL (Alta)", title: "GROUP BY, HAVING, ORDER BY", completed: false },
  { id: "sql-4", category: "SQL (Alta)", title: "Agregações e Subqueries", completed: false },
  { id: "sql-5", category: "SQL (Alta)", title: "Índices e Otimização", completed: false },
  { id: "sql-6", category: "SQL (Alta)", title: "EXPLAIN PLAN e Performance", completed: false },
  { id: "sql-7", category: "SQL (Alta)", title: "Transações e ACID", completed: false },

  // MÉDIA PRIORIDADE
  { id: "arch-1", category: "Arquiteturas (Média)", title: "MVC", completed: false },
  { id: "arch-2", category: "Arquiteturas (Média)", title: "Arquitetura em Camadas", completed: false },
  { id: "arch-3", category: "Arquiteturas (Média)", title: "SOLID Principles", completed: false },
  { id: "arch-4", category: "Arquiteturas (Média)", title: "Design Patterns", completed: false },

  { id: "html-1", category: "HTML/CSS (Média)", title: "Semântica HTML5", completed: false },
  { id: "html-2", category: "HTML/CSS (Média)", title: "Formulários", completed: false },
  { id: "html-3", category: "HTML/CSS (Média)", title: "CSS Flexbox e Grid", completed: false },
  { id: "html-4", category: "HTML/CSS (Média)", title: "Responsividade", completed: false },
  { id: "html-5", category: "HTML/CSS (Média)", title: "Acessibilidade (a11y)", completed: false },

  { id: "js-1", category: "JavaScript (Média)", title: "Variáveis (var, let, const)", completed: false },
  { id: "js-2", category: "JavaScript (Média)", title: "Arrow Functions e Escopos", completed: false },
  { id: "js-3", category: "JavaScript (Média)", title: "Promises e Async/Await", completed: false },
  { id: "js-4", category: "JavaScript (Média)", title: "Destructuring e Spread", completed: false },
  { id: "js-5", category: "JavaScript (Média)", title: "Módulos (import/export)", completed: false },

  { id: "react-1", category: "React (Média)", title: "Componentes Funcionais", completed: false },
  { id: "react-2", category: "React (Média)", title: "JSX e Props", completed: false },
  { id: "react-3", category: "React (Média)", title: "Hooks (useState, useEffect)", completed: false },
  { id: "react-4", category: "React (Média)", title: "Context API", completed: false },
  { id: "react-5", category: "React (Média)", title: "Consumo de APIs", completed: false },
  { id: "react-6", category: "React (Média)", title: "React Router", completed: false },
  { id: "react-7", category: "React (Média)", title: "Performance e Memoization", completed: false },

  { id: "http-1", category: "HTTP (Média)", title: "Métodos HTTP (GET, POST, PUT, DELETE)", completed: false },
  { id: "http-2", category: "HTTP (Média)", title: "Status Codes", completed: false },
  { id: "http-3", category: "HTTP (Média)", title: "Headers e CORS", completed: false },
  { id: "http-4", category: "HTTP (Média)", title: "REST Principles", completed: false },
  { id: "http-5", category: "HTTP (Média)", title: "Autenticação (Bearer, JWT)", completed: false },

  { id: "fund-1", category: "Fundamentos (Média)", title: "Lógica de Programação", completed: false },
  { id: "fund-2", category: "Fundamentos (Média)", title: "Estruturas de Dados", completed: false },
  { id: "fund-3", category: "Fundamentos (Média)", title: "Algoritmos e Complexidade", completed: false },
  { id: "fund-4", category: "Fundamentos (Média)", title: "Big O Notation", completed: false },

  // BAIXA PRIORIDADE
  { id: "git-1", category: "Git (Baixa)", title: "Branches e Commits", completed: false },
  { id: "git-2", category: "Git (Baixa)", title: "Merge, Rebase e Conflitos", completed: false },
  { id: "git-3", category: "Git (Baixa)", title: "Pull Requests", completed: false },

  { id: "sec-1", category: "Segurança (Baixa)", title: "OWASP Top 10", completed: false },
  { id: "sec-2", category: "Segurança (Baixa)", title: "SQL Injection e XSS", completed: false },
  { id: "sec-3", category: "Segurança (Baixa)", title: "Hashing e Encryption", completed: false },

  { id: "test-1", category: "Testes (Baixa)", title: "Testes Unitários (JUnit)", completed: false },
  { id: "test-2", category: "Testes (Baixa)", title: "Mocking (Mockito)", completed: false },
  { id: "test-3", category: "Testes (Baixa)", title: "TDD", completed: false },

  { id: "api-1", category: "API (Baixa)", title: "Design de APIs REST", completed: false },
  { id: "api-2", category: "API (Baixa)", title: "Documentação (Swagger)", completed: false },
  { id: "api-3", category: "API (Baixa)", title: "Rate Limiting e Pagination", completed: false },

  { id: "docker-1", category: "Docker (Baixa)", title: "Conceitos e Dockerfile", completed: false },
  { id: "docker-2", category: "Docker (Baixa)", title: "Docker Compose", completed: false },
  { id: "docker-3", category: "Docker (Baixa)", title: "Volumes e Networks", completed: false },

  { id: "cicd-1", category: "CI/CD (Baixa)", title: "GitHub Actions", completed: false },
  { id: "cicd-2", category: "CI/CD (Baixa)", title: "Pipelines", completed: false },
  { id: "cicd-3", category: "CI/CD (Baixa)", title: "Deploy Automatizado", completed: false },

  { id: "aws-1", category: "AWS (Baixa)", title: "EC2 e S3", completed: false },
  { id: "aws-2", category: "AWS (Baixa)", title: "RDS e Lambda", completed: false },
  { id: "aws-3", category: "AWS (Baixa)", title: "API Gateway", completed: false },
];

export default function Dashboard() {
  const [items, setItems] = useState<ProgressItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("carreira-progress");
    if (saved) {
      setItems(JSON.parse(saved));
    } else {
      setItems(INITIAL_ITEMS);
    }
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("carreira-progress", JSON.stringify(items));
    }
  }, [items]);

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const resetProgress = () => {
    if (confirm("Tem certeza que deseja resetar todo o progresso?")) {
      setItems(INITIAL_ITEMS);
      localStorage.removeItem("carreira-progress");
    }
  };

  const categories = Array.from(new Set(items.map(item => item.category))).sort((a, b) => {
    const priorityOrder = { "(Alta)": 0, "(Média)": 1, "(Baixa)": 2 };
    const aPriority = Object.entries(priorityOrder).find(([key]) => a.includes(key))?.[1] ?? 3;
    const bPriority = Object.entries(priorityOrder).find(([key]) => b.includes(key))?.[1] ?? 3;
    if (aPriority !== bPriority) return aPriority - bPriority;
    return a.localeCompare(b);
  });
  
  const getStats = () => {
    const total = items.length;
    const completed = items.filter(item => item.completed).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, percentage };
  };

  const getCategoryStats = (category: string) => {
    const categoryItems = items.filter(item => item.category === category);
    const completed = categoryItems.filter(item => item.completed).length;
    const total = categoryItems.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, percentage };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b border-blue-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-blue-900">Meu Progresso</h1>
          <div className="w-20" />
        </div>
      </header>

      {/* Overall Progress */}
      <section className="py-8 px-4">
        <div className="container max-w-4xl mx-auto">
          <Card className="bg-white border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <BarChart3 className="w-6 h-6" />
                Progresso Geral
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">
                      {stats.completed} de {stats.total} conceitos dominados
                    </span>
                    <span className="text-sm font-bold text-blue-600">{stats.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${stats.percentage}%` }}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={resetProgress}>
                    Resetar Progresso
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-4">
        <div className="container max-w-4xl mx-auto space-y-8">
          {categories.map(category => {
            const categoryStats = getCategoryStats(category);
            const categoryItems = items.filter(item => item.category === category);
            
            // Color coding by priority
            let borderColor = "border-gray-200";
            let bgColor = "bg-gray-50";
            let progressColor = "bg-gray-600";
            
            if (category.includes("(Alta)")) {
              borderColor = "border-red-200";
              bgColor = "bg-red-50";
              progressColor = "bg-red-600";
            } else if (category.includes("(Média)")) {
              borderColor = "border-orange-200";
              bgColor = "bg-orange-50";
              progressColor = "bg-orange-600";
            } else if (category.includes("(Baixa)")) {
              borderColor = "border-green-200";
              bgColor = "bg-green-50";
              progressColor = "bg-green-600";
            }

            return (
              <Card key={category} className={`border-2 ${borderColor} ${bgColor}`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-blue-900 text-lg">{category}</CardTitle>
                      <CardDescription className="text-sm">
                        {categoryStats.completed} de {categoryStats.total} conceitos dominados
                      </CardDescription>
                    </div>
                    <span className="text-sm font-bold text-blue-600">{categoryStats.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${progressColor}`}
                      style={{ width: `${categoryStats.percentage}%` }}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categoryItems.map(item => (
                      <div key={item.id} className="flex items-center gap-3 p-2 rounded hover:bg-white/50 transition-colors">
                        <Checkbox 
                          checked={item.completed}
                          onCheckedChange={() => toggleItem(item.id)}
                          className="w-5 h-5"
                        />
                        <span className={`flex-1 ${item.completed ? "line-through text-gray-400" : "text-gray-700"}`}>
                          {item.title}
                        </span>
                        {item.completed && (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-8 mt-12">
        <div className="container text-center text-gray-600">
          <p>Seu progresso é salvo automaticamente no navegador</p>
        </div>
      </footer>
    </div>
  );
}
