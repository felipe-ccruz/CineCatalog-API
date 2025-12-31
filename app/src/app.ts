import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { cors } from '@elysiajs/cors'

export const app = new Elysia()
  // Swagger (documentação automática)
  .use(swagger({
    path: '/docs',
    documentation: {
      info: {
        title: 'Movie Catalog API',
        version: '1.0.0'
      }
    }
  }))
  // CORS
  .use(cors())
  // Health check
  .get('/health', () => ({ status: 'ok' }))