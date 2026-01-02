import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { cors } from '@elysiajs/cors'

import { movieController } from './modules/movies/movie.controller'

export const app = new Elysia()
  .use(swagger({
    path: '/docs',
    documentation: {
      info: {
        title: 'Movie Catalog API',
        version: '1.0.0'
      }
    }
  }))
  .use(cors())
  .get('/health', () => ({ status: 'ok' }))
  .use(movieController)
