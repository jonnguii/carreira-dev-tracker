import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowLeft, Zap } from "lucide-react";

export default function TrilhaSpring() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100">
      {/* Header */}
      <header className="border-b border-red-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-red-600" />
            <h1 className="text-2xl font-bold text-red-900">Ecossistema Spring & Java</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="container max-w-4xl mx-auto">
          {/* Priority Badge */}
          <div className="mb-8 p-4 bg-red-100 border-2 border-red-300 rounded-lg">
            <p className="text-red-900 font-semibold text-center">🔴 PRIORIDADE MÁXIMA</p>
            <p className="text-red-800 text-center mt-2">
              Você já está usando no trabalho. Dominar bem garante autonomia em ambas as frentes (legado e moderno).
            </p>
          </div>

          {/* Why Focus Here */}
          <Card className="mb-8 border-2 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-900">Por que focar aqui?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>✓ Você já está usando no trabalho</p>
              <p>✓ É a base do sistema legado E da modernização</p>
              <p>✓ Dominar bem garante autonomia em ambas as frentes</p>
            </CardContent>
          </Card>

          {/* Core Concepts */}
          <Card className="mb-8 border-2 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-900">Conceitos Essenciais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-l-4 border-red-600 pl-4">
                <h4 className="font-bold text-red-900 mb-2">1. Inversão de Controle (IoC)</h4>
                <p className="text-gray-700">
                  O Spring gerencia a criação e ciclo de vida dos objetos. Você não cria instâncias manualmente; o framework faz isso por você.
                </p>
              </div>

              <div className="border-l-4 border-red-600 pl-4">
                <h4 className="font-bold text-red-900 mb-2">2. Injeção de Dependência (DI)</h4>
                <p className="text-gray-700">
                  Padrão idêntico no legado e no moderno. O Spring injeta as dependências que uma classe precisa automaticamente.
                </p>
              </div>

              <div className="border-l-4 border-red-600 pl-4">
                <h4 className="font-bold text-red-900 mb-2">3. Controllers</h4>
                <p className="text-gray-700">
                  Recebem requisições HTTP, processam e retornam respostas. São o ponto de entrada da sua aplicação.
                </p>
              </div>

              <div className="border-l-4 border-red-600 pl-4">
                <h4 className="font-bold text-red-900 mb-2">4. Services</h4>
                <p className="text-gray-700">
                  Contêm a lógica de negócio. Separam a lógica do controller, tornando o código mais testável e reutilizável.
                </p>
              </div>

              <div className="border-l-4 border-red-600 pl-4">
                <h4 className="font-bold text-red-900 mb-2">5. DTOs (Data Transfer Objects)</h4>
                <p className="text-gray-700">
                  Transferem dados entre camadas. Evitam expor entidades do banco de dados diretamente.
                </p>
              </div>

              <div className="border-l-4 border-red-600 pl-4">
                <h4 className="font-bold text-red-900 mb-2">6. DAOs (Data Access Objects)</h4>
                <p className="text-gray-700">
                  Acessam o banco de dados. Encapsulam a lógica de persistência, facilitando manutenção e testes.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* How to Master */}
          <Card className="mb-8 border-2 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-900">Como Dominar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-bold text-red-900 mb-2">Entenda o Fluxo de Dados</h4>
                <p className="text-gray-700 mb-3">
                  Banco de Dados → DAO → Service → Controller → Frontend
                </p>
                <p className="text-sm text-gray-600">
                  Trace este caminho em um exemplo real do seu trabalho. Entenda cada etapa.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-red-900 mb-2">Estude o Spring Legado</h4>
                <p className="text-gray-700 mb-3">
                  Examine o código antigo da empresa. Veja como o Spring era configurado com XML ou anotações antigas.
                </p>
                <p className="text-sm text-gray-600">
                  Isso ajudará você a entender o fundamento antes de aprender Spring Boot moderno.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-red-900 mb-2">Aplique em Spring Boot Moderno</h4>
                <p className="text-gray-700 mb-3">
                  Crie uma API REST simples com Spring Boot. Use Controllers, Services, DTOs e DAOs.
                </p>
                <p className="text-sm text-gray-600">
                  Veja como os conceitos se aplicam de forma mais limpa e moderna.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Resources */}
          <Card className="mb-8 border-2 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-900">Recursos Recomendados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>📚 <strong>Documentação oficial do Spring Framework</strong></p>
              <p>📚 <strong>Spring Boot Official Documentation</strong></p>
              <p>🎥 <strong>Tutoriais sobre Spring Boot e REST APIs</strong> (YouTube, Udemy, Alura)</p>
              <p>💻 <strong>Projetos práticos:</strong> Crie uma API REST simples com CRUD operations</p>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="bg-red-50 border-2 border-red-300">
            <CardHeader>
              <CardTitle className="text-red-900">Próximos Passos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>1. Escolha um exemplo real do seu trabalho e trace o fluxo de dados</p>
              <p>2. Crie um pequeno projeto Spring Boot com Controllers e Services</p>
              <p>3. Integre com um banco de dados usando DAOs ou JPA</p>
              <p>4. Teste a API usando Postman ou curl</p>
              <p>5. Volte ao código legado e identifique os mesmos padrões</p>
            </CardContent>
          </Card>

          {/* Back Button */}
          <div className="mt-8 flex gap-4">
            <Link href="/dashboard">
              <Button className="bg-red-600 hover:bg-red-700">
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
