# Elysia with Bun runtime

## Getting Started
To get started with this template, simply paste this command into your terminal:
```bash
bun create elysia ./elysia-example
```

## Development
To start the development server run:
```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.


# Plugins do Elysia
bun add @elysiajs/swagger @elysiajs/cors

# Banco de dados (Drizzle + PostgreSQL)
bun add drizzle-orm postgres

# S3 para upload de posters
bun add @aws-sdk/client-s3

# Dev dependencies
bun add -d drizzle-kit @types/bun