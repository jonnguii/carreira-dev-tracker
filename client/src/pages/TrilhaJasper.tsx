import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowLeft, Database } from "lucide-react";

export default function TrilhaJasper() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
      {/* Header */}
      <header className="border-b border-yellow-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Database className="w-6 h-6 text-yellow-600" />
            <h1 className="text-2xl font-bold text-yellow-900">JasperReports & SQL</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="container max-w-4xl mx-auto">
          {/* Priority Badge */}
          <div className="mb-8 p-4 bg-yellow-100 border-2 border-yellow-300 rounded-lg">
            <p className="text-yellow-900 font-semibold text-center">🟡 PRIORIDADE MÉDIA</p>
            <p className="text-yellow-800 text-center mt-2">
              Você usa diariamente no trabalho. Dominar bem acelera suas tarefas atuais.
            </p>
          </div>

          {/* Why Focus Here */}
          <Card className="mb-8 border-2 border-yellow-200">
            <CardHeader>
              <CardTitle className="text-yellow-900">Por que focar aqui?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>✓ Você usa diariamente no trabalho</p>
              <p>✓ Dominar bem acelera suas tarefas atuais</p>
              <p>✓ Deixa tempo para focar em Java/React</p>
            </CardContent>
          </Card>

          {/* Core Concepts */}
          <Card className="mb-8 border-2 border-yellow-200">
            <CardHeader>
              <CardTitle className="text-yellow-900">Conceitos Essenciais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-l-4 border-yellow-600 pl-4">
                <h4 className="font-bold text-yellow-900 mb-2">1. SQL Puro</h4>
                <p className="text-gray-700">
                  Entenda a origem dos dados. Aprenda SELECT, JOIN, WHERE, GROUP BY. SQL é a linguagem universal dos dados.
                </p>
              </div>

              <div className="border-l-4 border-yellow-600 pl-4">
                <h4 className="font-bold text-yellow-900 mb-2">2. Otimização de Queries</h4>
                <p className="text-gray-700">
                  Relatórios rápidos dependem de queries bem escritas. Aprenda índices, EXPLAIN PLAN e boas práticas.
                </p>
              </div>

              <div className="border-l-4 border-yellow-600 pl-4">
                <h4 className="font-bold text-yellow-900 mb-2">3. Estrutura de Relatórios</h4>
                <p className="text-gray-700">
                  Grupos, campos, filtros, parâmetros. Entenda como JasperReports organiza os dados em um layout visual.
                </p>
              </div>

              <div className="border-l-4 border-yellow-600 pl-4">
                <h4 className="font-bold text-yellow-900 mb-2">4. Grupos e Filtros</h4>
                <p className="text-gray-700">
                  Agrupar dados por categorias, aplicar filtros dinâmicos. Essencial para relatórios complexos.
                </p>
              </div>

              <div className="border-l-4 border-yellow-600 pl-4">
                <h4 className="font-bold text-yellow-900 mb-2">5. Integração com Spring</h4>
                <p className="text-gray-700">
                  Como JasperReports consome dados de uma aplicação Spring. Passagem de parâmetros e execução de relatórios.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* How to Master */}
          <Card className="mb-8 border-2 border-yellow-200">
            <CardHeader>
              <CardTitle className="text-yellow-900">Como Dominar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-bold text-yellow-900 mb-2">Estude o Suficiente para Suas Demandas</h4>
                <p className="text-gray-700 mb-3">
                  Não tente aprender tudo. Foque no que você precisa para resolver suas tarefas atuais.
                </p>
                <p className="text-sm text-gray-600">
                  Isso economiza tempo e deixa energia para Java/React.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-yellow-900 mb-2">Otimize as Queries Existentes</h4>
                <p className="text-gray-700 mb-3">
                  Examine as queries que alimentam os relatórios. Identifique gargalos.
                </p>
                <p className="text-sm text-gray-600">
                  Relatórios que carregam mais rápido melhoram a experiência do usuário e demonstram sua capacidade.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-yellow-900 mb-2">Torne-se Especialista da Equipe</h4>
                <p className="text-gray-700 mb-3">
                  Documente o que você aprende. Ajude colegas com dúvidas em JasperReports.
                </p>
                <p className="text-sm text-gray-600">
                  Ser referência em uma ferramenta específica é muito valioso.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-yellow-900 mb-2">Entenda o Contexto de Negócio</h4>
                <p className="text-gray-700 mb-3">
                  Por que esse relatório precisa de uma coluna específica? Qual é a regra de negócio?
                </p>
                <p className="text-sm text-gray-600">
                  Entender o negócio torna você um desenvolvedor muito mais valioso.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Resources */}
          <Card className="mb-8 border-2 border-yellow-200">
            <CardHeader>
              <CardTitle className="text-yellow-900">Recursos Recomendados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>📚 <strong>Documentação do JasperReports</strong> - community.jaspersoft.com</p>
              <p>📚 <strong>SQL Tutorial</strong> - W3Schools, Mode Analytics</p>
              <p>🎥 <strong>Tutoriais sobre SQL e otimização</strong> (YouTube)</p>
              <p>💻 <strong>Análise de relatórios existentes</strong> na empresa</p>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="bg-yellow-50 border-2 border-yellow-300">
            <CardHeader>
              <CardTitle className="text-yellow-900">Próximos Passos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>1. Analise as queries dos relatórios que você modifica</p>
              <p>2. Identifique oportunidades de otimização</p>
              <p>3. Estude SQL puro (SELECT, JOIN, WHERE, GROUP BY)</p>
              <p>4. Aprenda a usar EXPLAIN PLAN para analisar performance</p>
              <p>5. Otimize uma query existente e meça o ganho de performance</p>
            </CardContent>
          </Card>

          {/* Back Button */}
          <div className="mt-8 flex gap-4">
            <Link href="/dashboard">
              <Button className="bg-yellow-600 hover:bg-yellow-700">
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
