# Car Shop API 🚗

[![Node.js](https://img.shields.io/badge/Node.js-v20-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v4.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.x-black?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Redis](https://img.shields.io/badge/Redis-Cache-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Vitest](https://img.shields.io/badge/Vitest-Tests-FCC72B?style=for-the-badge&logo=vitest&logoColor=black)](https://vitest.dev/)
[![Swagger](https://img.shields.io/badge/Swagger-OpenAPI_3.0-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](http://localhost:3001/docs)

API RESTful completa e escalável desenvolvida em **TypeScript** e **Node.js** para gerenciamento de concessionária de veículos, inventário e vendas. 

O projeto foi concebido seguindo princípios de **Clean Architecture**, **SOLID**, **Programação Orientada a Objetos (POO)** e padrões de resiliência como **Fail-Fast** e **Cache em Memória**.

---

## 🌟 Funcionalidades e Destaques

- **Arquitetura em Camadas (DDD / MSC)**:
  - Separação clara entre **Domínio** (Entidades ricas `Vehicle`, `Car`, `Motorcycle`), **Services** (Regras de negócio), **Controllers** (Tratamento HTTP) e **Models / ODM** (`AbstractODM` genérico).
  - Inversão e Injeção de Dependências (DIP) em todas as camadas.
- **Autenticação & Autorização (RBAC)**:
  - Registro e login com hash criptográfico seguro (`bcryptjs`).
  - Proteção de rotas com **JWT (JSON Web Token)** e controle de acesso baseado em papéis (`admin` vs `customer`).
- **Validação de Schemas com Zod**:
  - Validação estrita de contratos de entrada no padrão Fail-Fast antes da execução dos controladores.
- **Filtros e Paginação Avançada**:
  - Listagem com suporte a busca dinâmica por texto (`model`, `color`), faixa de preço (`minPrice`, `maxPrice`), status e paginação estruturada (`page`, `limit`, `totalPages`).
- **Módulo de Vendas (Relacionamento NoSQL)**:
  - Registro atômico de transações de compra/venda, vinculando clientes aos veículos e atualizando automaticamente a disponibilidade no inventário.
- **Cache de Alta Performance com Redis**:
  - Cache transparente nas rotas públicas com cabeçalhos `X-Cache: HIT / MISS` e fallback gracioso (resiliência caso o Redis esteja indisponível).
- **Segurança de Produção**:
  - Cabeçalhos de proteção com `helmet`, `cors` configurável e limitação de taxa (`express-rate-limit`).
- **Documentação Interativa Swagger / OpenAPI 3.0**:
  - Interface visual disponível em `/docs` permitindo testar todos os endpoints diretamente pelo navegador.
- **Health Check**:
  - Rota `GET /health` reportando integridade do servidor e estado da conexão com o MongoDB e Redis.

---

## 🚀 Como Executar

### Pré-requisitos
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) instalados, ou [Node.js 20+](https://nodejs.org/) para execução local.

### 1. Execução Rápida via Docker Compose (Recomendado)

Suba toda a infraestrutura (API Node.js, banco MongoDB e Redis) com um único comando:

```bash
docker compose up --build -d
```

- **API**: `http://localhost:3001`
- **Documentação Swagger**: `http://localhost:3001/docs`
- **Health Check**: `http://localhost:3001/health`

### 2. Execução Local para Desenvolvimento

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Crie um arquivo `.env` na raiz do projeto (opcional, possui fallbacks padrão):
   ```env
   PORT=3001
   MONGO_URI=mongodb://localhost:27017/CarShop
   REDIS_HOST=localhost
   REDIS_PORT=6379
   JWT_SECRET=sua_chave_secreta_jwt
   ```

3. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

---

## 🧪 Testes Automatizados e Qualidade

O projeto utiliza a suíte de testes moderna **Vitest** (com TypeScript nativo) e **Supertest** para testes de integração ponta a ponta (E2E).

```bash
# Executar todos os testes
npm run test

# Executar em modo interativo (Watch Mode)
npm run test:watch

# Gerar relatório detalhado de cobertura de código
npm run test:coverage

# Executar linter de código (ESLint)
npm run lint

# Checagem de tipagem estática (TypeScript)
npx tsc --noEmit
```

---

## 📖 Documentação da API

Você pode explorar e testar todas as rotas diretamente pela interface interativa do **Swagger** em:
👉 **`http://localhost:3001/docs`**

### Principais Rotas

| Método | Endpoint | Descrição | Acesso |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Status de saúde da aplicação, MongoDB e Redis | Público |
| `POST` | `/users/register` | Cadastro de novo usuário | Público |
| `POST` | `/users/login` | Autenticação e obtenção do Bearer JWT | Público |
| `GET` | `/cars` | Listagem paginada e filtrada de carros | Público |
| `POST` | `/cars` | Cadastro de novo carro | Requer Admin |
| `GET` | `/cars/:id` | Detalhes de um carro por ID | Público |
| `PUT` | `/cars/:id` | Atualização de dados de um carro | Requer Admin |
| `DELETE`| `/cars/:id` | Remoção de um carro do estoque | Requer Admin |
| `GET` | `/motorcycles` | Listagem paginada e filtrada de motos | Público |
| `POST` | `/motorcycles` | Cadastro de nova moto | Requer Admin |
| `GET` | `/motorcycles/:id`| Detalhes de uma moto por ID | Público |
| `PUT` | `/motorcycles/:id`| Atualização de dados de uma moto | Requer Admin |
| `DELETE`| `/motorcycles/:id`| Remoção de uma moto do estoque | Requer Admin |
| `POST` | `/sales` | Registro de compra/venda de veículo | Usuário Autenticado |
| `GET` | `/sales/my-sales` | Histórico de compras do usuário logado | Usuário Autenticado |
| `GET` | `/sales` | Relatório completo de todas as vendas | Requer Admin |

---

## 🛠️ Tecnologias Utilizadas

- **Core**: Node.js 20 LTS, Express, TypeScript
- **Database & Cache**: MongoDB, Mongoose ODM, Redis (ioredis)
- **Validação & Segurança**: Zod, BcryptJS, JSON Web Token (JWT), Helmet, CORS, Express Rate Limit
- **Testes & CI**: Vitest (v8 coverage), Supertest, GitHub Actions CI
- **DevOps**: Docker, Docker Compose
- **Documentação**: OpenAPI 3.0, Swagger UI
