import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, BookOpen, Code, Database, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b border-blue-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-blue-900">Trilha Dev</h1>
          </div>
          <Link href="/dashboard">
            <Button variant="outline">Meu Progresso</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            De Estagiário a Desenvolvedor Júnior
          </h2>
          <p className="text-xl text-blue-700 mb-8 leading-relaxed">
            Sua jornada personalizada para evoluir em Java, Spring, React e 13 outras tecnologias essenciais. 
            Acompanhe seu progresso com 76 conceitos organizados por prioridade.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/dashboard">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Começar Trilha <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Resumo da Trilha */}
      <section className="py-12 px-4 bg-white">
        <div className="container max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-blue-900 mb-8 text-center">
            Sua Trilha Completa
          </h3>
          
          <Card className="border-2 border-blue-300 bg-blue-50 mb-8">
            <CardHeader>
              <CardTitle className="text-blue-900">Resumo da Trilha</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-red-600">21</p>
                  <p className="text-sm text-gray-600">Alta Prioridade</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-600">34</p>
                  <p className="text-sm text-gray-600">Média Prioridade</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">21</p>
                  <p className="text-sm text-gray-600">Baixa Prioridade</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">76</p>
                  <p className="text-sm text-gray-600">Total de Conceitos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Definição de Sucesso */}
          <Card className="border-2 border-green-300 bg-green-50 mb-8">
            <CardHeader>
              <CardTitle className="text-green-900">Definição de Sucesso</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-green-900">
                Dominado = Sabe explicar + usar
              </p>
              <p className="text-gray-700 mt-2">
                Essa é a métrica clara para cada conceito. Você não apenas entende teoricamente, mas consegue aplicar na prática e explicar para alguém.
              </p>
            </CardContent>
          </Card>

          {/* Tópicos por Prioridade */}
          <div className="space-y-6">
            {/* Alta Prioridade */}
            <Card className="border-2 border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-900 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Alta Prioridade (21 conceitos)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="font-bold text-red-900 mb-2">Java</p>
                    <p className="text-sm text-gray-700">Fundamentos, OOP, Collections, Exception Handling, Streams, Lambdas, Generics</p>
                  </div>
                  <div>
                    <p className="font-bold text-red-900 mb-2">Spring Boot</p>
                    <p className="text-sm text-gray-700">IoC, DI, Beans, Controllers, Services, DTOs, REST APIs, JPA, Configuração</p>
                  </div>
                  <div>
                    <p className="font-bold text-red-900 mb-2">SQL</p>
                    <p className="text-sm text-gray-700">SELECT, JOINs, GROUP BY, Agregações, Índices, Otimização, Transações</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Média Prioridade */}
            <Card className="border-2 border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-orange-900 flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Média Prioridade (34 conceitos)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-bold text-orange-900 mb-2">Frontend & Arquitetura</p>
                    <p className="text-sm text-gray-700">Arquiteturas (MVC, Camadas, SOLID), HTML/CSS (Semântica, Flexbox, Grid, Responsividade), Fundamentos (Lógica, Estruturas de Dados, Algoritmos)</p>
                  </div>
                  <div>
                    <p className="font-bold text-orange-900 mb-2">JavaScript & React</p>
                    <p className="text-sm text-gray-700">JavaScript (Variáveis, Arrow Functions, Promises, Async/Await, Destructuring), React (Componentes, Hooks, Context API, Consumo de APIs, Router), HTTP (Métodos, Status Codes, CORS, JWT)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Baixa Prioridade */}
            <Card className="border-2 border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Baixa Prioridade (21 conceitos)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-bold text-green-900 mb-2">Versionamento & Qualidade</p>
                    <p className="text-sm text-gray-700">Git (Branches, Commits, Merge, Pull Requests), Testes (Unitários, Integração, TDD), Segurança (OWASP, SQL Injection, XSS, Hashing)</p>
                  </div>
                  <div>
                    <p className="font-bold text-green-900 mb-2">DevOps & Cloud</p>
                    <p className="text-sm text-gray-700">API (Design REST, Documentação, Rate Limiting), Docker (Conceitos, Dockerfile, Compose), CI/CD (GitHub Actions, Pipelines), AWS (EC2, S3, RDS, Lambda)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Estrutura de Aprendizado */}
      <section className="py-16 px-4 bg-blue-900 text-white">
        <div className="container max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center">Estrutura de Aprendizado</h3>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-blue-800 p-4 rounded-lg">
              <p className="font-bold mb-2">Fase 1: Fundação</p>
              <p className="text-sm text-blue-100">Semanas 1-4: Fundamentos, Java Core, SQL, Git</p>
            </div>
            <div className="bg-blue-800 p-4 rounded-lg">
              <p className="font-bold mb-2">Fase 2: Backend</p>
              <p className="text-sm text-blue-100">Semanas 5-12: Spring Boot, REST APIs, Arquiteturas, Testes</p>
            </div>
            <div className="bg-blue-800 p-4 rounded-lg">
              <p className="font-bold mb-2">Fase 3: Frontend</p>
              <p className="text-sm text-blue-100">Semanas 13-20: JavaScript, React, HTTP, Testes React</p>
            </div>
            <div className="bg-blue-800 p-4 rounded-lg">
              <p className="font-bold mb-2">Fase 4: Profissionalismo</p>
              <p className="text-sm text-blue-100">Semanas 21+: Docker, CI/CD, Segurança, AWS</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Insight */}
      <section className="py-16 px-4 bg-white">
        <div className="container max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">💡 Dica de Ouro</h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            Para evoluir para Júnior, o segredo não é saber todas as tecnologias, mas sim <strong>demonstrar autonomia na resolução de problemas</strong>. 
            Continue questionando o "porquê" de cada funcionalidade e use o sistema legado para aprender como <strong>não</strong> fazer as coisas no futuro.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Pronto para começar?</h3>
          <p className="mb-6">Acesse seu dashboard e comece a acompanhar seu progresso agora mesmo.</p>
          <Link href="/dashboard">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Ir para Dashboard <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-8">
        <div className="container text-center text-gray-600">
          <p>Trilha de Carreira Dev • Desenvolvido para João Guilherme</p>
          <p className="text-sm mt-2">Baseado em sua página Notion + Guia de Carreira Personalizado</p>
        </div>
      </footer>
    </div>
  );
}
