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
            Sua jornada personalizada para evoluir em Java, Spring, React e tecnologias modernas. 
            Acompanhe seu progresso e domine as habilidades que realmente importam.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/dashboard">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Começar Trilha <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Saiba Mais
            </Button>
          </div>
        </div>
      </section>

      {/* Trilhas Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-blue-900 mb-12 text-center">
            Escolha Sua Trilha de Aprendizado
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Spring & Java - Prioridade Máxima */}
            <Link href="/spring-java">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-red-200 bg-red-50">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-blue-900 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-red-600" />
                        Ecossistema Spring & Java
                      </CardTitle>
                      <CardDescription className="text-red-600 font-semibold">
                        🔴 PRIORIDADE MÁXIMA
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 mb-4">
                    Domine IoC, DI, Controllers, Services, DTOs e DAOs. Entenda como a informação viaja do banco de dados até a interface.
                  </p>
                  <ul className="text-sm space-y-2 text-gray-600">
                    <li>✓ Inversão de Controle (IoC)</li>
                    <li>✓ Injeção de Dependência (DI)</li>
                    <li>✓ Controllers & Services</li>
                    <li>✓ REST APIs com Spring Boot</li>
                  </ul>
                </CardContent>
              </Card>
            </Link>

            {/* JavaScript & React - Prioridade Alta */}
            <Link href="/javascript-react">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-orange-200 bg-orange-50">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-blue-900 flex items-center gap-2">
                        <Code className="w-5 h-5 text-orange-600" />
                        JavaScript & React
                      </CardTitle>
                      <CardDescription className="text-orange-600 font-semibold">
                        🟠 PRIORIDADE ALTA
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 mb-4">
                    Como o front-end está sendo modernizado com React. Domine componentes, estado e hooks.
                  </p>
                  <ul className="text-sm space-y-2 text-gray-600">
                    <li>✓ ES6+ Fundamentos</li>
                    <li>✓ Componentes React</li>
                    <li>✓ Hooks (useState, useEffect)</li>
                    <li>✓ Consumo de APIs</li>
                  </ul>
                </CardContent>
              </Card>
            </Link>

            {/* JasperReports & SQL - Prioridade Média */}
            <Link href="/jasper-sql">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-yellow-200 bg-yellow-50">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-blue-900 flex items-center gap-2">
                        <Database className="w-5 h-5 text-yellow-600" />
                        JasperReports & SQL
                      </CardTitle>
                      <CardDescription className="text-yellow-600 font-semibold">
                        🟡 PRIORIDADE MÉDIA
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 mb-4">
                    Estude o suficiente para resolver suas demandas atuais. Otimize queries e torne-se especialista.
                  </p>
                  <ul className="text-sm space-y-2 text-gray-600">
                    <li>✓ SQL Puro</li>
                    <li>✓ Otimização de Queries</li>
                    <li>✓ Estrutura de Relatórios</li>
                    <li>✓ Integração com Spring</li>
                  </ul>
                </CardContent>
              </Card>
            </Link>

            {/* JSF & JSP - Prioridade Baixa */}
            <Link href="/jsf-jsp">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-green-200 bg-green-50">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-blue-900 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-green-600" />
                        JSF & JSP
                      </CardTitle>
                      <CardDescription className="text-green-600 font-semibold">
                        🟢 PRIORIDADE BAIXA
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 mb-4">
                    Estude apenas o mínimo estritamente necessário para manutenção do sistema legado.
                  </p>
                  <ul className="text-sm space-y-2 text-gray-600">
                    <li>✓ Ciclo de vida JSF</li>
                    <li>✓ Sintaxe JSP</li>
                    <li>✓ Integração com Spring antigo</li>
                    <li>✓ Manutenção básica</li>
                  </ul>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Insight */}
      <section className="py-16 px-4 bg-blue-900 text-white">
        <div className="container max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">💡 Dica de Ouro</h3>
          <p className="text-lg leading-relaxed">
            Para evoluir para Júnior, o segredo não é saber todas as tecnologias, mas sim <strong>demonstrar autonomia na resolução de problemas</strong>. 
            Continue questionando o "porquê" de cada funcionalidade e use o sistema legado para aprender como <strong>não</strong> fazer as coisas no futuro.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-8">
        <div className="container text-center text-gray-600">
          <p>Trilha de Carreira Dev • Desenvolvido para João Guilherme</p>
        </div>
      </footer>
    </div>
  );
}
