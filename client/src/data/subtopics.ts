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
  // ALTA PRIORIDADE - JAVA
  {
    id: "java-fund",
    category: "Java (Alta)",
    title: "Fundamentos",
    completed: false,
    subtopics: [
      { id: "java-fund-1", name: "Tipos de dados e variaveis", completed: false },
      { id: "java-fund-2", name: "Operadores", completed: false },
      { id: "java-fund-3", name: "Controle de fluxo (if, for, while)", completed: false },
    ],
  },
  {
    id: "java-oop",
    category: "Java (Alta)",
    title: "OOP (classes, heranca, polimorfismo)",
    completed: false,
    subtopics: [
      { id: "java-oop-1", name: "Classes e objetos", completed: false },
      { id: "java-oop-2", name: "Heranca", completed: false },
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

  // ALTA PRIORIDADE - SPRING BOOT
  {
    id: "spring-core",
    category: "Spring Boot (Alta)",
    title: "IoC e Injecao de Dependencia",
    completed: false,
    subtopics: [
      { id: "spring-core-1", name: "Inversion of Control", completed: false },
      { id: "spring-core-2", name: "Dependency Injection", completed: false },
      { id: "spring-core-3", name: "Beans lifecycle", completed: false },
      { id: "spring-core-4", name: "Annotations", completed: false },
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
    title: "Configuracao (properties, yml)",
    completed: false,
    subtopics: [
      { id: "spring-config-1", name: "application.properties", completed: false },
      { id: "spring-config-2", name: "application.yml", completed: false },
      { id: "spring-config-3", name: "Profiles (dev, prod)", completed: false },
      { id: "spring-config-4", name: "Environment variables", completed: false },
    ],
  },

  // ALTA PRIORIDADE - SQL
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
      { id: "sql-agg-4", name: "Agregacoes (COUNT, SUM, AVG)", completed: false },
    ],
  },
  {
    id: "sql-adv",
    category: "SQL (Alta)",
    title: "Agregacoes e Subqueries",
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
    title: "Indices e Otimizacao",
    completed: false,
    subtopics: [
      { id: "sql-perf-1", name: "Indices", completed: false },
      { id: "sql-perf-2", name: "Query optimization", completed: false },
      { id: "sql-perf-3", name: "EXPLAIN PLAN", completed: false },
      { id: "sql-perf-4", name: "Execution plans", completed: false },
    ],
  },
  {
    id: "sql-trans",
    category: "SQL (Alta)",
    title: "Transacoes e ACID",
    completed: false,
    subtopics: [
      { id: "sql-trans-1", name: "ACID properties", completed: false },
      { id: "sql-trans-2", name: "Isolation levels", completed: false },
      { id: "sql-trans-3", name: "Rollback e commit", completed: false },
    ],
  },

  // MEDIA PRIORIDADE - ARQUITETURAS
  {
    id: "arch-mvc",
    category: "Arquiteturas (Media)",
    title: "MVC",
    completed: false,
    subtopics: [
      { id: "arch-mvc-1", name: "Model", completed: false },
      { id: "arch-mvc-2", name: "View", completed: false },
      { id: "arch-mvc-3", name: "Controller", completed: false },
    ],
  },
  {
    id: "arch-layers",
    category: "Arquiteturas (Media)",
    title: "Arquitetura em Camadas",
    completed: false,
    subtopics: [
      { id: "arch-layers-1", name: "Presentation layer", completed: false },
      { id: "arch-layers-2", name: "Business layer", completed: false },
      { id: "arch-layers-3", name: "Data layer", completed: false },
    ],
  },
  {
    id: "arch-solid",
    category: "Arquiteturas (Media)",
    title: "SOLID Principles",
    completed: false,
    subtopics: [
      { id: "arch-solid-1", name: "Single Responsibility", completed: false },
      { id: "arch-solid-2", name: "Open/Closed", completed: false },
      { id: "arch-solid-3", name: "Liskov/Interface/Dependency", completed: false },
    ],
  },
  {
    id: "arch-patterns",
    category: "Arquiteturas (Media)",
    title: "Design Patterns",
    completed: false,
    subtopics: [
      { id: "arch-patterns-1", name: "Singleton", completed: false },
      { id: "arch-patterns-2", name: "Factory", completed: false },
      { id: "arch-patterns-3", name: "Observer", completed: false },
    ],
  },

  // MEDIA PRIORIDADE - HTML/CSS
  {
    id: "html-sem",
    category: "HTML/CSS (Media)",
    title: "Semantica HTML5",
    completed: false,
    subtopics: [
      { id: "html-sem-1", name: "Tags semanticas", completed: false },
      { id: "html-sem-2", name: "Acessibilidade", completed: false },
      { id: "html-sem-3", name: "SEO basico", completed: false },
    ],
  },
  {
    id: "html-forms",
    category: "HTML/CSS (Media)",
    title: "Formularios",
    completed: false,
    subtopics: [
      { id: "html-forms-1", name: "Elementos de formulario", completed: false },
      { id: "html-forms-2", name: "Validacao", completed: false },
      { id: "html-forms-3", name: "Envio de dados", completed: false },
    ],
  },
  {
    id: "css-layout",
    category: "HTML/CSS (Media)",
    title: "CSS Flexbox e Grid",
    completed: false,
    subtopics: [
      { id: "css-layout-1", name: "Flexbox", completed: false },
      { id: "css-layout-2", name: "CSS Grid", completed: false },
      { id: "css-layout-3", name: "Posicionamento", completed: false },
    ],
  },
  {
    id: "css-resp",
    category: "HTML/CSS (Media)",
    title: "Responsividade",
    completed: false,
    subtopics: [
      { id: "css-resp-1", name: "Media queries", completed: false },
      { id: "css-resp-2", name: "Mobile-first", completed: false },
      { id: "css-resp-3", name: "Breakpoints", completed: false },
    ],
  },
  {
    id: "css-a11y",
    category: "HTML/CSS (Media)",
    title: "Acessibilidade (a11y)",
    completed: false,
    subtopics: [
      { id: "css-a11y-1", name: "Contraste de cores", completed: false },
      { id: "css-a11y-2", name: "Foco visivel", completed: false },
      { id: "css-a11y-3", name: "ARIA labels", completed: false },
    ],
  },

  // MEDIA PRIORIDADE - JAVASCRIPT
  {
    id: "js-vars",
    category: "JavaScript (Media)",
    title: "Variaveis (var, let, const)",
    completed: false,
    subtopics: [
      { id: "js-vars-1", name: "Escopo", completed: false },
      { id: "js-vars-2", name: "Hoisting", completed: false },
      { id: "js-vars-3", name: "Tipos de dados", completed: false },
    ],
  },
  {
    id: "js-func",
    category: "JavaScript (Media)",
    title: "Arrow Functions e Escopos",
    completed: false,
    subtopics: [
      { id: "js-func-1", name: "Arrow functions", completed: false },
      { id: "js-func-2", name: "Closures", completed: false },
      { id: "js-func-3", name: "This binding", completed: false },
    ],
  },
  {
    id: "js-async",
    category: "JavaScript (Media)",
    title: "Promises e Async/Await",
    completed: false,
    subtopics: [
      { id: "js-async-1", name: "Promises", completed: false },
      { id: "js-async-2", name: "Async/Await", completed: false },
      { id: "js-async-3", name: "Error handling", completed: false },
    ],
  },
  {
    id: "js-destruct",
    category: "JavaScript (Media)",
    title: "Destructuring e Spread",
    completed: false,
    subtopics: [
      { id: "js-destruct-1", name: "Destructuring arrays", completed: false },
      { id: "js-destruct-2", name: "Destructuring objects", completed: false },
      { id: "js-destruct-3", name: "Spread operator", completed: false },
    ],
  },
  {
    id: "js-modules",
    category: "JavaScript (Media)",
    title: "Modulos (import/export)",
    completed: false,
    subtopics: [
      { id: "js-modules-1", name: "ES6 modules", completed: false },
      { id: "js-modules-2", name: "CommonJS", completed: false },
      { id: "js-modules-3", name: "Bundlers", completed: false },
    ],
  },

  // MEDIA PRIORIDADE - REACT
  {
    id: "react-comp",
    category: "React (Media)",
    title: "Componentes Funcionais",
    completed: false,
    subtopics: [
      { id: "react-comp-1", name: "Functional components", completed: false },
      { id: "react-comp-2", name: "Props", completed: false },
      { id: "react-comp-3", name: "Composicao", completed: false },
    ],
  },
  {
    id: "react-jsx",
    category: "React (Media)",
    title: "JSX e Props",
    completed: false,
    subtopics: [
      { id: "react-jsx-1", name: "Sintaxe JSX", completed: false },
      { id: "react-jsx-2", name: "Props drilling", completed: false },
      { id: "react-jsx-3", name: "Default props", completed: false },
    ],
  },
  {
    id: "react-hooks",
    category: "React (Media)",
    title: "Hooks (useState, useEffect)",
    completed: false,
    subtopics: [
      { id: "react-hooks-1", name: "useState", completed: false },
      { id: "react-hooks-2", name: "useEffect", completed: false },
      { id: "react-hooks-3", name: "Dependency array", completed: false },
    ],
  },
  {
    id: "react-context",
    category: "React (Media)",
    title: "Context API",
    completed: false,
    subtopics: [
      { id: "react-context-1", name: "Context creation", completed: false },
      { id: "react-context-2", name: "useContext hook", completed: false },
      { id: "react-context-3", name: "State management", completed: false },
    ],
  },
  {
    id: "react-api",
    category: "React (Media)",
    title: "Consumo de APIs",
    completed: false,
    subtopics: [
      { id: "react-api-1", name: "Fetch API", completed: false },
      { id: "react-api-2", name: "Axios", completed: false },
      { id: "react-api-3", name: "Error handling", completed: false },
    ],
  },
  {
    id: "react-router",
    category: "React (Media)",
    title: "React Router",
    completed: false,
    subtopics: [
      { id: "react-router-1", name: "Routes", completed: false },
      { id: "react-router-2", name: "Navigation", completed: false },
      { id: "react-router-3", name: "Route parameters", completed: false },
    ],
  },
  {
    id: "react-perf",
    category: "React (Media)",
    title: "Performance e Memoization",
    completed: false,
    subtopics: [
      { id: "react-perf-1", name: "React.memo", completed: false },
      { id: "react-perf-2", name: "useMemo", completed: false },
      { id: "react-perf-3", name: "useCallback", completed: false },
    ],
  },

  // MEDIA PRIORIDADE - HTTP
  {
    id: "http-methods",
    category: "HTTP (Media)",
    title: "Metodos HTTP (GET, POST, PUT, DELETE)",
    completed: false,
    subtopics: [
      { id: "http-methods-1", name: "GET", completed: false },
      { id: "http-methods-2", name: "POST", completed: false },
      { id: "http-methods-3", name: "PUT/DELETE", completed: false },
    ],
  },
  {
    id: "http-status",
    category: "HTTP (Media)",
    title: "Status Codes",
    completed: false,
    subtopics: [
      { id: "http-status-1", name: "2xx Success", completed: false },
      { id: "http-status-2", name: "4xx Client errors", completed: false },
      { id: "http-status-3", name: "5xx Server errors", completed: false },
    ],
  },
  {
    id: "http-headers",
    category: "HTTP (Media)",
    title: "Headers e CORS",
    completed: false,
    subtopics: [
      { id: "http-headers-1", name: "Request headers", completed: false },
      { id: "http-headers-2", name: "Response headers", completed: false },
      { id: "http-headers-3", name: "CORS", completed: false },
    ],
  },
  {
    id: "http-rest",
    category: "HTTP (Media)",
    title: "REST Principles",
    completed: false,
    subtopics: [
      { id: "http-rest-1", name: "Resource-oriented", completed: false },
      { id: "http-rest-2", name: "Stateless", completed: false },
      { id: "http-rest-3", name: "Cacheability", completed: false },
    ],
  },
  {
    id: "http-auth",
    category: "HTTP (Media)",
    title: "Autenticacao (Bearer, JWT)",
    completed: false,
    subtopics: [
      { id: "http-auth-1", name: "Bearer tokens", completed: false },
      { id: "http-auth-2", name: "JWT", completed: false },
      { id: "http-auth-3", name: "Token refresh", completed: false },
    ],
  },

  // MEDIA PRIORIDADE - FUNDAMENTOS
  {
    id: "fund-logic",
    category: "Fundamentos (Media)",
    title: "Logica de Programacao",
    completed: false,
    subtopics: [
      { id: "fund-logic-1", name: "Condicionals", completed: false },
      { id: "fund-logic-2", name: "Loops", completed: false },
      { id: "fund-logic-3", name: "Funcoes", completed: false },
    ],
  },
  {
    id: "fund-ds",
    category: "Fundamentos (Media)",
    title: "Estruturas de Dados",
    completed: false,
    subtopics: [
      { id: "fund-ds-1", name: "Arrays", completed: false },
      { id: "fund-ds-2", name: "Linked lists", completed: false },
      { id: "fund-ds-3", name: "Stacks e queues", completed: false },
    ],
  },
  {
    id: "fund-algo",
    category: "Fundamentos (Media)",
    title: "Algoritmos e Complexidade",
    completed: false,
    subtopics: [
      { id: "fund-algo-1", name: "Busca", completed: false },
      { id: "fund-algo-2", name: "Ordenacao", completed: false },
      { id: "fund-algo-3", name: "Recursividade", completed: false },
    ],
  },
  {
    id: "fund-bigo",
    category: "Fundamentos (Media)",
    title: "Big O Notation",
    completed: false,
    subtopics: [
      { id: "fund-bigo-1", name: "Time complexity", completed: false },
      { id: "fund-bigo-2", name: "Space complexity", completed: false },
      { id: "fund-bigo-3", name: "Otimizacao", completed: false },
    ],
  },

  // MEDIA-ALTA PRIORIDADE - JSF/JSP (Usado no dia a dia no estagio)
  {
    id: "jsf-basics",
    category: "JSF/JSP (Media-Alta)",
    title: "Ciclo de Vida JSF",
    completed: false,
    subtopics: [
      { id: "jsf-basics-1", name: "Request/Response cycle", completed: false },
      { id: "jsf-basics-2", name: "Component tree", completed: false },
      { id: "jsf-basics-3", name: "Validation", completed: false },
    ],
  },
  {
    id: "jsp-syntax",
    category: "JSF/JSP (Media-Alta)",
    title: "Sintaxe JSP",
    completed: false,
    subtopics: [
      { id: "jsp-syntax-1", name: "Scriptlets", completed: false },
      { id: "jsp-syntax-2", name: "Directives", completed: false },
      { id: "jsp-syntax-3", name: "JSTL tags", completed: false },
    ],
  },
  {
    id: "jsf-spring",
    category: "JSF/JSP (Media-Alta)",
    title: "Integracao com Spring",
    completed: false,
    subtopics: [
      { id: "jsf-spring-1", name: "Spring JSF integration", completed: false },
      { id: "jsf-spring-2", name: "Beans management", completed: false },
      { id: "jsf-spring-3", name: "Dependency injection", completed: false },
    ],
  },

  // BAIXA PRIORIDADE - GIT
  {
    id: "git-basics",
    category: "Git (Baixa)",
    title: "Branches e Commits",
    completed: false,
    subtopics: [
      { id: "git-basics-1", name: "Branches", completed: false },
      { id: "git-basics-2", name: "Commits", completed: false },
      { id: "git-basics-3", name: "Staging", completed: false },
    ],
  },
  {
    id: "git-advanced",
    category: "Git (Baixa)",
    title: "Merge, Rebase e Conflitos",
    completed: false,
    subtopics: [
      { id: "git-advanced-1", name: "Merge", completed: false },
      { id: "git-advanced-2", name: "Rebase", completed: false },
      { id: "git-advanced-3", name: "Conflict resolution", completed: false },
    ],
  },
  {
    id: "git-pr",
    category: "Git (Baixa)",
    title: "Pull Requests",
    completed: false,
    subtopics: [
      { id: "git-pr-1", name: "Creating PRs", completed: false },
      { id: "git-pr-2", name: "Code review", completed: false },
      { id: "git-pr-3", name: "Merging", completed: false },
    ],
  },

  // BAIXA PRIORIDADE - SEGURANCA
  {
    id: "sec-owasp",
    category: "Seguranca (Baixa)",
    title: "OWASP Top 10",
    completed: false,
    subtopics: [
      { id: "sec-owasp-1", name: "SQL Injection", completed: false },
      { id: "sec-owasp-2", name: "XSS", completed: false },
      { id: "sec-owasp-3", name: "CSRF", completed: false },
    ],
  },
  {
    id: "sec-crypto",
    category: "Seguranca (Baixa)",
    title: "Hashing e Encryption",
    completed: false,
    subtopics: [
      { id: "sec-crypto-1", name: "Hashing", completed: false },
      { id: "sec-crypto-2", name: "Encryption", completed: false },
      { id: "sec-crypto-3", name: "Secrets management", completed: false },
    ],
  },

  // BAIXA PRIORIDADE - TESTES
  {
    id: "test-unit",
    category: "Testes (Baixa)",
    title: "Testes Unitarios (JUnit)",
    completed: false,
    subtopics: [
      { id: "test-unit-1", name: "JUnit basics", completed: false },
      { id: "test-unit-2", name: "Assertions", completed: false },
      { id: "test-unit-3", name: "Test organization", completed: false },
    ],
  },
  {
    id: "test-mock",
    category: "Testes (Baixa)",
    title: "Mocking (Mockito)",
    completed: false,
    subtopics: [
      { id: "test-mock-1", name: "Mockito basics", completed: false },
      { id: "test-mock-2", name: "Stubbing", completed: false },
      { id: "test-mock-3", name: "Verification", completed: false },
    ],
  },
  {
    id: "test-tdd",
    category: "Testes (Baixa)",
    title: "TDD",
    completed: false,
    subtopics: [
      { id: "test-tdd-1", name: "Red-Green-Refactor", completed: false },
      { id: "test-tdd-2", name: "Test first approach", completed: false },
      { id: "test-tdd-3", name: "Best practices", completed: false },
    ],
  },

  // BAIXA PRIORIDADE - API
  {
    id: "api-design",
    category: "API (Baixa)",
    title: "Design de APIs REST",
    completed: false,
    subtopics: [
      { id: "api-design-1", name: "Endpoint design", completed: false },
      { id: "api-design-2", name: "Versioning", completed: false },
      { id: "api-design-3", name: "Error handling", completed: false },
    ],
  },
  {
    id: "api-docs",
    category: "API (Baixa)",
    title: "Documentacao (Swagger)",
    completed: false,
    subtopics: [
      { id: "api-docs-1", name: "Swagger/OpenAPI", completed: false },
      { id: "api-docs-2", name: "API documentation", completed: false },
      { id: "api-docs-3", name: "Interactive docs", completed: false },
    ],
  },
  {
    id: "api-adv",
    category: "API (Baixa)",
    title: "Rate Limiting e Pagination",
    completed: false,
    subtopics: [
      { id: "api-adv-1", name: "Rate limiting", completed: false },
      { id: "api-adv-2", name: "Pagination", completed: false },
      { id: "api-adv-3", name: "Filtering", completed: false },
    ],
  },

  // BAIXA PRIORIDADE - DOCKER
  {
    id: "docker-basics",
    category: "Docker (Baixa)",
    title: "Conceitos e Dockerfile",
    completed: false,
    subtopics: [
      { id: "docker-basics-1", name: "Containers", completed: false },
      { id: "docker-basics-2", name: "Images", completed: false },
      { id: "docker-basics-3", name: "Dockerfile", completed: false },
    ],
  },
  {
    id: "docker-compose",
    category: "Docker (Baixa)",
    title: "Docker Compose",
    completed: false,
    subtopics: [
      { id: "docker-compose-1", name: "Compose file", completed: false },
      { id: "docker-compose-2", name: "Multi-container", completed: false },
      { id: "docker-compose-3", name: "Networking", completed: false },
    ],
  },
  {
    id: "docker-adv",
    category: "Docker (Baixa)",
    title: "Volumes e Networks",
    completed: false,
    subtopics: [
      { id: "docker-adv-1", name: "Volumes", completed: false },
      { id: "docker-adv-2", name: "Networks", completed: false },
      { id: "docker-adv-3", name: "Best practices", completed: false },
    ],
  },

  // BAIXA PRIORIDADE - CI/CD
  {
    id: "cicd-github",
    category: "CI/CD (Baixa)",
    title: "GitHub Actions",
    completed: false,
    subtopics: [
      { id: "cicd-github-1", name: "Workflows", completed: false },
      { id: "cicd-github-2", name: "Actions", completed: false },
      { id: "cicd-github-3", name: "Secrets", completed: false },
    ],
  },
  {
    id: "cicd-pipelines",
    category: "CI/CD (Baixa)",
    title: "Pipelines",
    completed: false,
    subtopics: [
      { id: "cicd-pipelines-1", name: "Build stage", completed: false },
      { id: "cicd-pipelines-2", name: "Test stage", completed: false },
      { id: "cicd-pipelines-3", name: "Deploy stage", completed: false },
    ],
  },
  {
    id: "cicd-deploy",
    category: "CI/CD (Baixa)",
    title: "Deploy Automatizado",
    completed: false,
    subtopics: [
      { id: "cicd-deploy-1", name: "Automated deployment", completed: false },
      { id: "cicd-deploy-2", name: "Blue-green deployment", completed: false },
      { id: "cicd-deploy-3", name: "Rollback", completed: false },
    ],
  },

  // BAIXA PRIORIDADE - AWS
  {
    id: "aws-compute",
    category: "AWS (Baixa)",
    title: "EC2 e S3",
    completed: false,
    subtopics: [
      { id: "aws-compute-1", name: "EC2 instances", completed: false },
      { id: "aws-compute-2", name: "S3 buckets", completed: false },
      { id: "aws-compute-3", name: "IAM", completed: false },
    ],
  },
  {
    id: "aws-database",
    category: "AWS (Baixa)",
    title: "RDS e Lambda",
    completed: false,
    subtopics: [
      { id: "aws-database-1", name: "RDS", completed: false },
      { id: "aws-database-2", name: "Lambda functions", completed: false },
      { id: "aws-database-3", name: "CloudWatch", completed: false },
    ],
  },
  {
    id: "aws-api",
    category: "AWS (Baixa)",
    title: "API Gateway",
    completed: false,
    subtopics: [
      { id: "aws-api-1", name: "API creation", completed: false },
      { id: "aws-api-2", name: "Integration", completed: false },
      { id: "aws-api-3", name: "Deployment", completed: false },
    ],
  },
];
