export interface SubTopic {
  id: string;
  name: string;
  completed: boolean;
}

export interface Topic {
  id: string;
  category: string;
  title: string;
  subtopics: SubTopic[];
  completed: boolean;
}

export const TOPICS_WITH_SUBTOPICS: Topic[] = [
  // JAVA
  {
    id: "java-fund",
    category: "Java (Alta)",
    title: "Fundamentos",
    completed: false,
    subtopics: [
      { id: "java-fund-1", name: "Tipos de dados e variáveis", completed: false },
      { id: "java-fund-2", name: "Operadores", completed: false },
      { id: "java-fund-3", name: "Controle de fluxo (if, for, while)", completed: false },
    ],
  },
  {
    id: "java-oop",
    category: "Java (Alta)",
    title: "OOP (classes, herança, polimorfismo)",
    completed: false,
    subtopics: [
      { id: "java-oop-1", name: "Classes e objetos", completed: false },
      { id: "java-oop-2", name: "Herança", completed: false },
      { id: "java-oop-3", name: "Polimorfismo", completed: false },
      { id: "java-oop-4", name: "Encapsulamento", completed: false },
    ],
  },
  {
    id: "java-coll",
    category: "Java (Alta)",
    title: "Collections (List, Set, Map)",
    completed: false,
    subtopics: [
      { id: "java-coll-1", name: "List (ArrayList, LinkedList)", completed: false },
      { id: "java-coll-2", name: "Set (HashSet, TreeSet)", completed: false },
      { id: "java-coll-3", name: "Map (HashMap, TreeMap)", completed: false },
    ],
  },
  {
    id: "java-exc",
    category: "Java (Alta)",
    title: "Exception Handling",
    completed: false,
    subtopics: [
      { id: "java-exc-1", name: "Try-catch-finally", completed: false },
      { id: "java-exc-2", name: "Custom exceptions", completed: false },
      { id: "java-exc-3", name: "Throws", completed: false },
    ],
  },
  {
    id: "java-stream",
    category: "Java (Alta)",
    title: "Streams e Lambdas",
    completed: false,
    subtopics: [
      { id: "java-stream-1", name: "Stream API", completed: false },
      { id: "java-stream-2", name: "Lambda expressions", completed: false },
      { id: "java-stream-3", name: "Functional interfaces", completed: false },
    ],
  },
  {
    id: "java-gen",
    category: "Java (Alta)",
    title: "Generics",
    completed: false,
    subtopics: [
      { id: "java-gen-1", name: "Type parameters", completed: false },
      { id: "java-gen-2", name: "Bounded types", completed: false },
      { id: "java-gen-3", name: "Wildcards", completed: false },
    ],
  },

  // SPRING BOOT
  {
    id: "spring-core",
    category: "Spring Boot (Alta)",
    title: "IoC e Injeção de Dependência",
    completed: false,
    subtopics: [
      { id: "spring-core-1", name: "Inversion of Control", completed: false },
      { id: "spring-core-2", name: "Dependency Injection", completed: false },
      { id: "spring-core-3", name: "Beans lifecycle", completed: false },
      { id: "spring-core-4", name: "Annotations (@Component, @Service, @Repository)", completed: false },
    ],
  },
  {
    id: "spring-web",
    category: "Spring Boot (Alta)",
    title: "Controllers e Routing",
    completed: false,
    subtopics: [
      { id: "spring-web-1", name: "@RestController", completed: false },
      { id: "spring-web-2", name: "Request mapping", completed: false },
      { id: "spring-web-3", name: "Path variables e query parameters", completed: false },
      { id: "spring-web-4", name: "Request/Response handling", completed: false },
    ],
  },
  {
    id: "spring-data",
    category: "Spring Boot (Alta)",
    title: "Spring Data JPA",
    completed: false,
    subtopics: [
      { id: "spring-data-1", name: "Repositories", completed: false },
      { id: "spring-data-2", name: "Query methods", completed: false },
      { id: "spring-data-3", name: "Custom queries", completed: false },
      { id: "spring-data-4", name: "Entity relationships", completed: false },
    ],
  },
  {
    id: "spring-config",
    category: "Spring Boot (Alta)",
    title: "Configuração (properties, yml)",
    completed: false,
    subtopics: [
      { id: "spring-config-1", name: "application.properties", completed: false },
      { id: "spring-config-2", name: "application.yml", completed: false },
      { id: "spring-config-3", name: "Profiles (dev, prod)", completed: false },
      { id: "spring-config-4", name: "Environment variables", completed: false },
    ],
  },

  // SQL
  {
    id: "sql-basics",
    category: "SQL (Alta)",
    title: "SELECT, FROM, WHERE",
    completed: false,
    subtopics: [
      { id: "sql-basics-1", name: "SELECT clause", completed: false },
      { id: "sql-basics-2", name: "FROM clause", completed: false },
      { id: "sql-basics-3", name: "WHERE conditions", completed: false },
      { id: "sql-basics-4", name: "Data types", completed: false },
    ],
  },
  {
    id: "sql-joins",
    category: "SQL (Alta)",
    title: "JOINs (INNER, LEFT, RIGHT, FULL)",
    completed: false,
    subtopics: [
      { id: "sql-joins-1", name: "INNER JOIN", completed: false },
      { id: "sql-joins-2", name: "LEFT JOIN", completed: false },
      { id: "sql-joins-3", name: "RIGHT JOIN", completed: false },
      { id: "sql-joins-4", name: "FULL OUTER JOIN", completed: false },
    ],
  },
  {
    id: "sql-agg",
    category: "SQL (Alta)",
    title: "GROUP BY, HAVING, ORDER BY",
    completed: false,
    subtopics: [
      { id: "sql-agg-1", name: "GROUP BY", completed: false },
      { id: "sql-agg-2", name: "HAVING", completed: false },
      { id: "sql-agg-3", name: "ORDER BY", completed: false },
      { id: "sql-agg-4", name: "Agregações (COUNT, SUM, AVG)", completed: false },
    ],
  },
  {
    id: "sql-adv",
    category: "SQL (Alta)",
    title: "Agregações e Subqueries",
    completed: false,
    subtopics: [
      { id: "sql-adv-1", name: "Subqueries", completed: false },
      { id: "sql-adv-2", name: "CTEs (Common Table Expressions)", completed: false },
      { id: "sql-adv-3", name: "Window functions", completed: false },
    ],
  },
  {
    id: "sql-perf",
    category: "SQL (Alta)",
    title: "Índices e Otimização",
    completed: false,
    subtopics: [
      { id: "sql-perf-1", name: "Índices", completed: false },
      { id: "sql-perf-2", name: "Query optimization", completed: false },
      { id: "sql-perf-3", name: "EXPLAIN PLAN", completed: false },
      { id: "sql-perf-4", name: "Execution plans", completed: false },
    ],
  },
  {
    id: "sql-trans",
    category: "SQL (Alta)",
    title: "Transações e ACID",
    completed: false,
    subtopics: [
      { id: "sql-trans-1", name: "ACID properties", completed: false },
      { id: "sql-trans-2", name: "Isolation levels", completed: false },
      { id: "sql-trans-3", name: "Rollback e commit", completed: false },
    ],
  },
];
