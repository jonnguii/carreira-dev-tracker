import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowLeft, Code } from "lucide-react";

export default function TrilhaReact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      {/* Header */}
      <header className="border-b border-orange-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Code className="w-6 h-6 text-orange-600" />
            <h1 className="text-2xl font-bold text-orange-900">JavaScript & React</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="container max-w-4xl mx-auto">
          {/* Priority Badge */}
          <div className="mb-8 p-4 bg-orange-100 border-2 border-orange-300 rounded-lg">
            <p className="text-orange-900 font-semibold text-center">🟠 PRIORIDADE ALTA</p>
            <p className="text-orange-800 text-center mt-2">
              A empresa está modernizando o frontend. React é o futuro do seu trabalho.
            </p>
          </div>

          {/* Why Focus Here */}
          <Card className="mb-8 border-2 border-orange-200">
            <CardHeader>
              <CardTitle className="text-orange-900">Por que focar aqui?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>✓ A empresa está modernizando o frontend</p>
              <p>✓ React é o futuro do seu trabalho</p>
              <p>✓ Você terá oportunidades de contribuir em novas features</p>
            </CardContent>
          </Card>

          {/* Core Concepts */}
          <Card className="mb-8 border-2 border-orange-200">
            <CardHeader>
              <CardTitle className="text-orange-900">Conceitos Essenciais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-l-4 border-orange-600 pl-4">
                <h4 className="font-bold text-orange-900 mb-2">1. ES6+ Fundamentos</h4>
                <p className="text-gray-700">
                  Arrow Functions, Destructuring, Promises. Estes são os blocos de construção do JavaScript moderno.
                </p>
              </div>

              <div className="border-l-4 border-orange-600 pl-4">
                <h4 className="font-bold text-orange-900 mb-2">2. Arrow Functions</h4>
                <p className="text-gray-700">
                  Sintaxe mais concisa que funções tradicionais. Muito usadas em React e callbacks.
                </p>
              </div>

              <div className="border-l-4 border-orange-600 pl-4">
                <h4 className="font-bold text-orange-900 mb-2">3. Destructuring</h4>
                <p className="text-gray-700">
                  Extrair valores de objetos e arrays de forma elegante. Essencial para trabalhar com props em React.
                </p>
              </div>

              <div className="border-l-4 border-orange-600 pl-4">
                <h4 className="font-bold text-orange-900 mb-2">4. Promises</h4>
                <p className="text-gray-700">
                  Lidar com operações assíncronas. Fundamental para consumir APIs do backend.
                </p>
              </div>

              <div className="border-l-4 border-orange-600 pl-4">
                <h4 className="font-bold text-orange-900 mb-2">5. Componentes React</h4>
                <p className="text-gray-700">
                  Blocos reutilizáveis de UI. Observe como o JSF/JSP são repetitivos e como React resolve com componentes.
                </p>
              </div>

              <div className="border-l-4 border-orange-600 pl-4">
                <h4 className="font-bold text-orange-900 mb-2">6. Hooks (useState, useEffect)</h4>
                <p className="text-gray-700">
                  Gerenciam estado e efeitos colaterais. useState para estado local, useEffect para operações após render.
                </p>
              </div>

              <div className="border-l-4 border-orange-600 pl-4">
                <h4 className="font-bold text-orange-900 mb-2">7. Context API</h4>
                <p className="text-gray-700">
                  Compartilhar estado entre componentes sem prop drilling. Essencial para dados globais.
                </p>
              </div>

              <div className="border-l-4 border-orange-600 pl-4">
                <h4 className="font-bold text-orange-900 mb-2">8. Consumo de APIs</h4>
                <p className="text-gray-700">
                  Integração com o backend via JSON. Como React (Frontend) conversa com Spring (Backend).
                </p>
              </div>

              <div className="border-l-4 border-orange-600 pl-4">
                <h4 className="font-bold text-orange-900 mb-2">9. React Router</h4>
                <p className="text-gray-700">
                  Navegação entre páginas em aplicações single-page. Essencial para criar fluxos de usuário.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* How to Master */}
          <Card className="mb-8 border-2 border-orange-200">
            <CardHeader>
              <CardTitle className="text-orange-900">Como Dominar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-bold text-orange-900 mb-2">Comece com JavaScript Puro</h4>
                <p className="text-gray-700 mb-3">
                  Antes de decorar React, entenda Arrow Functions, Destructuring e Promises.
                </p>
                <p className="text-sm text-gray-600">
                  React é apenas JavaScript com esteroides. Dominar JS puro é essencial.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-orange-900 mb-2">Observe o JSF/JSP</h4>
                <p className="text-gray-700 mb-3">
                  Veja como os layouts JSF/JSP são repetitivos. Identifique padrões que se repetem.
                </p>
                <p className="text-sm text-gray-600">
                  React resolve isso criando componentes reutilizáveis. Isso ajudará você a entender o valor do React.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-orange-900 mb-2">Pratique Criando Componentes</h4>
                <p className="text-gray-700 mb-3">
                  Crie componentes simples e reutilizáveis. Use hooks para gerenciar estado.
                </p>
                <p className="text-sm text-gray-600">
                  Comece com componentes pequenos e vá aumentando a complexidade.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-orange-900 mb-2">Integre com APIs Spring</h4>
                <p className="text-gray-700 mb-3">
                  Consuma APIs REST criadas com Spring Boot. Use fetch ou axios.
                </p>
                <p className="text-sm text-gray-600">
                  Veja como o frontend e backend trabalham juntos. Este é o padrão moderno.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Resources */}
          <Card className="mb-8 border-2 border-orange-200">
            <CardHeader>
              <CardTitle className="text-orange-900">Recursos Recomendados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>📚 <strong>Documentação oficial do React</strong> - react.dev</p>
              <p>📚 <strong>MDN Web Docs - JavaScript</strong> - Para fundamentos de JS</p>
              <p>🎥 <strong>Tutoriais sobre Hooks e Context API</strong> (YouTube, Udemy, Alura)</p>
              <p>💻 <strong>Projetos práticos:</strong> Migre um layout JSF para React</p>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="bg-orange-50 border-2 border-orange-300">
            <CardHeader>
              <CardTitle className="text-orange-900">Próximos Passos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>1. Aprenda ES6+ (Arrow Functions, Destructuring, Promises)</p>
              <p>2. Crie componentes React simples e reutilizáveis</p>
              <p>3. Use useState e useEffect para gerenciar estado</p>
              <p>4. Consuma uma API REST com fetch ou axios</p>
              <p>5. Migre um layout JSF/JSP para React</p>
            </CardContent>
          </Card>

          {/* Back Button */}
          <div className="mt-8 flex gap-4">
            <Link href="/dashboard">
              <Button className="bg-orange-600 hover:bg-orange-700">
                Voltar ao Dashboard
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline">
                Voltar ao Início
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
