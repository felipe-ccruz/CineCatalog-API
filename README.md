# 🎬 CineCatalog API

API REST para catálogo de filmes desenvolvida com **Bun**, **Elysia.js**, **Drizzle ORM** e **PostgreSQL**.

## 📋 Índice

- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Executando o Projeto](#-executando-o-projeto)
- [Endpoints](#-endpoints)
- [Exemplos de Requisição](#-exemplos-de-requisição)
- [Estrutura do Projeto](#-estrutura-do-projeto)

## 🚀 Tecnologias

| Tecnologia | Descrição |
|------------|-----------|
| [Bun](https://bun.sh/) | Runtime JavaScript ultra-rápido |
| [Elysia.js](https://elysiajs.com/) | Framework web para Bun |
| [Drizzle ORM](https://orm.drizzle.team/) | ORM TypeScript type-safe |
| [PostgreSQL](https://www.postgresql.org/) | Banco de dados relacional |
| [MinIO](https://min.io/) | Storage S3-compatível para upload de arquivos |
| [TypeScript](https://www.typescriptlang.org/) | Superset JavaScript com tipagem estática |
| [Docker](https://www.docker.com/) | Containerização dos serviços |

## 📦 Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Bun](https://bun.sh/) v1.0 ou superior
- [Docker](https://www.docker.com/) e Docker Compose
- [Git](https://git-scm.com/)

### Instalando o Bun

```bash
# Windows (PowerShell)
powershell -c "irm bun.sh/install.ps1 | iex"

# Linux/macOS
curl -fsSL https://bun.sh/install | bash
```

## 🛠️ Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/felipe-ccruz/CineCatalog-API
cd CineCatalog-API
```

### 2. Instale as dependências

```bash
bun install
```

## ⚙️ Configuração

### 1. Crie o arquivo `.env`

```bash
cp .env.example .env
```

### 2. Configure as variáveis de ambiente

```env
# Banco de Dados
DATABASE_URL=postgres://postgres:postgres@localhost:5433/movies

# Storage S3/MinIO
S3_ENDPOINT=http://localhost:9000
S3_BUCKET=cine-catalog-posters
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=ios3mini
```

## 🚀 Executando o Projeto

### 1. Suba os serviços (PostgreSQL + MinIO)

```bash
docker compose up -d
```

### 2. Verifique se os containers estão rodando

```bash
docker ps
```

Deve mostrar três containers: `postgres`, `minio` e `minio-setup`.

> **Nota:** O bucket `cine-catalog-posters` é criado automaticamente pelo container `minio-setup`. Caso queira gerenciar os buckets manualmente, acesse o console do MinIO em `http://localhost:9001` com as credenciais `minioadmin` / `ios3mini`.

### 3. Aplique o schema no banco de dados

```bash
bun drizzle-kit push
```

### 4. (Opcional) Popule o banco com dados iniciais

O arquivo `json-seeds.txt` contém dados de exemplo. Você pode inserir via endpoint:

```bash
# Usando o endpoint POST /api/movies/bulk
curl -X POST http://localhost:3000/api/movies/bulk \
  -H "Content-Type: application/json" \
  -d '[
    {"title": "The Matrix", "description": "A computer hacker learns about reality", "year": 1999, "director": "Wachowskis", "genre": "Sci-Fi"},
    {"title": "Inception", "description": "A thief who steals corporate secrets", "year": 2010, "director": "Christopher Nolan", "genre": "Sci-Fi"}
  ]'
```

Ou copie o conteúdo de `json-seeds.txt` e envie via Postman/Insomnia para `POST /api/movies/bulk`.

### 5. Inicie o servidor

```bash
bun run src/server.ts
```

O servidor estará disponível em `http://localhost:3000`

## 📚 Endpoints

### Filmes

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/movies` | Listar filmes (com paginação e filtro) |
| `GET` | `/api/movies/:id` | Buscar filme por ID |
| `POST` | `/api/movies` | Criar novo filme |
| `POST` | `/api/movies/bulk` | Criar vários filmes de uma vez |
| `PUT` | `/api/movies/:id` | Atualizar filme |
| `DELETE` | `/api/movies/:id` | Excluir filme |
| `POST` | `/api/movies/:id/poster` | Upload de poster |

### Health Check

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/health` | Verificar status da API |

### Documentação

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/docs` | Swagger UI |

## 📝 Exemplos de Requisição

### Listar filmes

```bash
# Listar todos (paginado)
curl http://localhost:3000/api/movies

# Com paginação
curl "http://localhost:3000/api/movies?page=1&limit=5"

# Filtrar por título (case-insensitive)
curl "http://localhost:3000/api/movies?title=matrix"
```

**Resposta:**

```json
{
  "data": [
    {
      "id": 1,
      "title": "The Matrix",
      "description": "A computer hacker learns about reality",
      "year": 1999,
      "director": "Wachowskis",
      "genre": "Sci-Fi",
      "posterUrl": null,
      "createdAt": "2026-01-03T12:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

### Buscar por ID

```bash
curl http://localhost:3000/api/movies/1
```

### Criar filme

```bash
curl -X POST http://localhost:3000/api/movies \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Inception",
    "description": "A thief who steals corporate secrets",
    "year": 2010,
    "director": "Christopher Nolan",
    "genre": "Sci-Fi"
  }'
```

### Criar vários filmes

```bash
curl -X POST http://localhost:3000/api/movies/bulk \
  -H "Content-Type: application/json" \
  -d '[
    {"title": "Movie 1", "year": 2020, "director": "Director 1", "genre": "Action"},
    {"title": "Movie 2", "year": 2021, "director": "Director 2", "genre": "Drama"}
  ]'
```

### Atualizar filme

```bash
curl -X PUT http://localhost:3000/api/movies/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Matrix Reloaded"
  }'
```

### Excluir filme

```bash
curl -X DELETE http://localhost:3000/api/movies/1
```

### Upload de poster

```bash
curl -X POST http://localhost:3000/api/movies/1/poster \
  -F "file=@./img/matrix-movie.png"
```

## 📁 Estrutura do Projeto

```
CineCatalog-API/
├── src/
│   ├── config/
│   │   └── storage.ts          # Configuração S3/MinIO
│   ├── db/
│   │   ├── index.ts            # Conexão com banco
│   │   └── schema.ts           # Definição das tabelas
│   ├── modules/
│   │   └── movies/
│   │       ├── movie.controller.ts
│   │       ├── movie.service.ts
│   │       ├── movie.repository.ts
│   │       └── movie.schema.ts
│   ├── app.ts                  # Configuração do Elysia
│   └── server.ts               # Entry point
├── drizzle/                    # Migrações do banco
├── img/                        # Imagens para teste
├── json-seeds.txt              # Dados de exemplo para popular o banco
├── docker-compose.yml
├── drizzle.config.ts
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## 🔧 Scripts Disponíveis

```bash
# Iniciar servidor em desenvolvimento
bun run src/server.ts

# Aplicar schema no banco
bun drizzle-kit push

# Gerar migrações
bun drizzle-kit generate

# Abrir Drizzle Studio (visualizar dados)
bun drizzle-kit studio
```

## 🐳 Docker

### Comandos úteis

```bash
# Subir serviços
docker compose up -d

# Parar serviços
docker compose down

# Parar e remover volumes (reset completo)
docker compose down -v

# Ver logs
docker compose logs -f

# Ver containers rodando
docker ps
```

### Acessos

| Serviço | URL | Credenciais |
|---------|-----|-------------|
| API | http://localhost:3000 | - |
| Swagger | http://localhost:3000/docs | - |
| MinIO Console | http://localhost:9001 | minioadmin / ios3mini |
| PostgreSQL | localhost:5433 | postgres / postgres |

## 📄 Modelo de Dados

### Movies

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | serial | ID único (auto-incremento) |
| title | text | Título do filme |
| description | text | Descrição (opcional) |
| year | integer | Ano de lançamento |
| director | text | Diretor |
| genre | text | Gênero |
| poster_url | text | URL do poster (opcional) |
| created_at | timestamp | Data de criação |

---

Desenvolvido com ❤️ usando Bun + Elysia.js