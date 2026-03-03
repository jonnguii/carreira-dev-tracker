// Tópicos MASTER para Pomodoro - Desacoplados do Dashboard
// Estes são os tópicos principais que você estuda no dia a dia

export interface MasterTopic {
  id: string;
  name: string;
  color: string;
  description: string;
}

export const MASTER_TOPICS: MasterTopic[] = [
  {
    id: "java",
    name: "Java",
    color: "bg-orange-600",
    description: "Fundamentos, OOP, Collections, Streams"
  },
  {
    id: "springboot",
    name: "Spring Boot",
    color: "bg-green-600",
    description: "REST APIs, Controllers, Services, Repositories"
  },
  {
    id: "html",
    name: "HTML",
    color: "bg-red-600",
    description: "Estrutura, Semântica, Forms, Acessibilidade"
  },
  {
    id: "css",
    name: "CSS",
    color: "bg-blue-600",
    description: "Layouts, Flexbox, Grid, Responsivo, Animações"
  }
];

export const getMasterTopicById = (id: string): MasterTopic | undefined => {
  return MASTER_TOPICS.find(topic => topic.id === id);
};

export const getMasterTopicColor = (id: string): string => {
  return getMasterTopicById(id)?.color || "bg-gray-600";
};
