import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowLeft, BookOpen } from "lucide-react";

export default function TrilhaJSF() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <header className="border-b border-green-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-green-600" />
            <h1 className="text-2xl font-bold text-green-900">JSF & JSP</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="container max-w-4xl mx-auto">
          {/* Priority Badge */}
          <div className="mb-8 p-4 bg-green-100 border-2 border-green-300 rounded-lg">
            <p className="text-green-900 font-semibold text-center">🟢 PRIORIDADE BAIXA</p>
            <p className="text-green-800 text-center mt-2">
              Estude apenas o mínimo estritamente necessário para manutenção do sistema legado.
            </p>
          </div>

          {/* Why NOT Focus Here */}
          <Card className="mb-8 border-2 border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-900">Por que NÃO focar aqui?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>✗ São tecnologias antigas</p>
              <p>✗ Você precisa apenas manter o sistema legado</p>
              <p>✗ Gastar energia aqui é perder tempo que poderia dedicar a Java/React moderno</p>
              <p>✗ O futuro da empresa é React, não JSF/JSP</p>
            </CardContent>
          </Card>

          {/* Important Note */}
          <Card className="mb-8 border-2 border-green-400 bg-green-100">
            <CardHeader>
              <CardTitle className="text-green-900">⚠️ Filosofia de Aprendizado</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700">
              <p>
                Você está em uma posição privilegiada: tem acesso ao código legado para aprender como <strong>não</strong> fazer as coisas no futuro. 
                Use JSF/JSP como referência negativa, não como modelo a seguir.
              </p>
            </CardContent>
          </Card>

          {/* Core Concepts */}
          <Card className="mb-8 border-2 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-900">Conceitos Mínimos Necessários</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-l-4 border-green-600 pl-4">
                <h4 className="font-bold text-green-900 mb-2">1. Ciclo de Vida do JSF</h4>
                <p className="text-gray-700">
                  Apenas o essencial para manutenção. Entenda as fases: Restore View, Apply Request Values, Process Validations, Update Model Values, Invoke Application, Render Response.
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Quando estudar:</strong> Quando surgir um bug específico que exija entender o ciclo.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-4">
                <h4 className="font-bold text-green-900 mb-2">2. Sintaxe JSP</h4>
                <p className="text-gray-700">
                  Sintaxe básica para correções rápidas. Tags JSTL, EL (Expression Language), diretivas.
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Quando estudar:</strong> Quando precisar fazer uma correção rápida em um template JSP.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-4">
                <h4 className="font-bold text-green-900 mb-2">3. Integração com Spring Antigo</h4>
                <p className="text-gray-700">
                  Como JSF/JSP se integram com Spring antigo. Beans, configuração XML, injeção de dependência.
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Quando estudar:</strong> Quando precisar entender como o legado funciona para fazer manutenção.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* How to Study */}
          <Card className="mb-8 border-2 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-900">Como Estudar (Estratégia)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-bold text-green-900 mb-2">1. Estude Apenas Quando Necessário</h4>
                <p className="text-gray-700 mb-3">
                  Não tente aprender JSF/JSP "para estar preparado". Estude quando surgir uma demanda específica.
                </p>
                <p className="text-sm text-gray-600">
                  Isso economiza tempo e mantém você focado no que realmente importa.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-green-900 mb-2">2. Use a Documentação como Referência</h4>
                <p className="text-gray-700 mb-3">
                  Não leia tutoriais longos. Consulte a documentação quando precisar de uma resposta específica.
                </p>
                <p className="text-sm text-gray-600">
                  Stack Overflow é seu amigo para perguntas rápidas sobre JSF/JSP.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-green-900 mb-2">3. Aprenda com o Código Existente</h4>
                <p className="text-gray-700 mb-3">
                  O melhor professor é o código legado da empresa. Examine como JSF/JSP são usados.
                </p>
                <p className="text-sm text-gray-600">
                  Copie padrões existentes para manutenção, mas não os imite para novo código.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-green-900 mb-2">4. Identifique Problemas do Legado</h4>
                <p className="text-gray-700 mb-3">
                  Enquanto estuda, identifique o que torna JSF/JSP difíceis de manter.
                </p>
                <p className="text-sm text-gray-600">
                  Isso ajudará você a apreciar React e a evitar os mesmos erros no futuro.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* What NOT to Do */}
          <Card className="mb-8 border-2 border-red-300 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-900">❌ O Que NÃO Fazer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-red-900">
              <p>✗ Não tente virar especialista em JSF/JSP</p>
              <p>✗ Não gaste tempo estudando advanced JSF features</p>
              <p>✗ Não crie novo código em JSF/JSP (sempre use React para novas features)</p>
              <p>✗ Não use JSF/JSP como referência para boas práticas</p>
            </CardContent>
          </Card>

          {/* Recommended Resources */}
          <Card className="mb-8 border-2 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-900">Recursos (Use Apenas Quando Necessário)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>📚 <strong>Oracle JSF Documentation</strong> - Referência oficial</p>
              <p>📚 <strong>Stack Overflow</strong> - Para perguntas específicas</p>
              <p>📚 <strong>Código legado da empresa</strong> - Seu melhor professor</p>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="bg-green-50 border-2 border-green-300">
            <CardHeader>
              <CardTitle className="text-green-900">Próximos Passos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>1. Quando surgir uma demanda de manutenção, estude o mínimo necessário</p>
              <p>2. Examine o código legado para entender os padrões usados</p>
              <p>3. Identifique problemas que React resolve melhor</p>
              <p>4. Documente o que aprendeu para referência futura</p>
              <p>5. Foque seu tempo em Java/React - o futuro da empresa</p>
            </CardContent>
          </Card>

          {/* Final Thought */}
          <Card className="bg-blue-50 border-2 border-blue-300">
            <CardHeader>
              <CardTitle className="text-blue-900">💡 Pensamento Final</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700">
              <p>
                O sistema legado é uma oportunidade de aprendizado, não um destino. Use-o para entender o que funcionava no passado, 
                mas não deixe que ele limite seu crescimento. O futuro é React, Spring Boot moderno e arquiteturas mais limpas.
              </p>
            </CardContent>
          </Card>

          {/* Back Button */}
          <div className="mt-8 flex gap-4">
            <Link href="/dashboard">
              <Button className="bg-green-600 hover:bg-green-700">
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
