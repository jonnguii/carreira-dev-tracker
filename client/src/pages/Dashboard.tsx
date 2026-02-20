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
  // Spring & Java
  { id: "spring-1", category: "Spring & Java", title: "Inversão de Controle (IoC)", completed: false },
  { id: "spring-2", category: "Spring & Java", title: "Injeção de Dependência (DI)", completed: false },
  { id: "spring-3", category: "Spring & Java", title: "Controllers", completed: false },
  { id: "spring-4", category: "Spring & Java", title: "Services", completed: false },
  { id: "spring-5", category: "Spring & Java", title: "DTOs", completed: false },
  { id: "spring-6", category: "Spring & Java", title: "DAOs", completed: false },
  { id: "spring-7", category: "Spring & Java", title: "Spring Boot Basics", completed: false },
  { id: "spring-8", category: "Spring & Java", title: "REST APIs", completed: false },
  { id: "spring-9", category: "Spring & Java", title: "Hibernate/JPA", completed: false },

  // React & JavaScript
  { id: "react-1", category: "React & JavaScript", title: "ES6+ Fundamentos", completed: false },
  { id: "react-2", category: "React & JavaScript", title: "Arrow Functions", completed: false },
  { id: "react-3", category: "React & JavaScript", title: "Destructuring", completed: false },
  { id: "react-4", category: "React & JavaScript", title: "Promises", completed: false },
  { id: "react-5", category: "React & JavaScript", title: "Componentes React", completed: false },
  { id: "react-6", category: "React & JavaScript", title: "Hooks (useState, useEffect)", completed: false },
  { id: "react-7", category: "React & JavaScript", title: "Context API", completed: false },
  { id: "react-8", category: "React & JavaScript", title: "Consumo de APIs", completed: false },
  { id: "react-9", category: "React & JavaScript", title: "React Router", completed: false },

  // JasperReports & SQL
  { id: "jasper-1", category: "JasperReports & SQL", title: "SQL Puro", completed: false },
  { id: "jasper-2", category: "JasperReports & SQL", title: "Otimização de Queries", completed: false },
  { id: "jasper-3", category: "JasperReports & SQL", title: "Estrutura de Relatórios", completed: false },
  { id: "jasper-4", category: "JasperReports & SQL", title: "Grupos e Filtros", completed: false },
  { id: "jasper-5", category: "JasperReports & SQL", title: "Integração com Spring", completed: false },

  // JSF & JSP
  { id: "jsf-1", category: "JSF & JSP", title: "Ciclo de vida JSF", completed: false },
  { id: "jsf-2", category: "JSF & JSP", title: "Sintaxe JSP", completed: false },
  { id: "jsf-3", category: "JSF & JSP", title: "Integração com Spring antigo", completed: false },
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

  const categories = Array.from(new Set(items.map(item => item.category)));
  
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
            
            if (category === "Spring & Java") {
              borderColor = "border-red-200";
              bgColor = "bg-red-50";
              progressColor = "bg-red-600";
            } else if (category === "React & JavaScript") {
              borderColor = "border-orange-200";
              bgColor = "bg-orange-50";
              progressColor = "bg-orange-600";
            } else if (category === "JasperReports & SQL") {
              borderColor = "border-yellow-200";
              bgColor = "bg-yellow-50";
              progressColor = "bg-yellow-600";
            } else if (category === "JSF & JSP") {
              borderColor = "border-green-200";
              bgColor = "bg-green-50";
              progressColor = "bg-green-600";
            }

            return (
              <Card key={category} className={`border-2 ${borderColor} ${bgColor}`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-blue-900">{category}</CardTitle>
                      <CardDescription>
                        {categoryStats.completed} de {categoryStats.total} conceitos
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
