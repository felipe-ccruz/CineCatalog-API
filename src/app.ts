import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { cors } from '@elysiajs/cors'

import { movieController } from './modules/movies/movie.controller'
import { HttpError } from './shared/errors/httpError'

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

  // Error handler global
  .onError(({ error, code, set }) => {
    // Erros customizados da aplicação
    if (error instanceof HttpError) {
      set.status = error.statusCode
      return {
        success: false,
        error: {
          message: error.message,
          code: error.code,
        }
      }
    }

    // Erros de validação do Elysia (schema validation)
    if (code === 'VALIDATION') {
      set.status = 400
      return {
        success: false,
        error: {
          message: 'Validation failed',
          code: 'VALIDATION_ERROR',
          details: error.message,
        }
      }
    }

    // Rota não encontrada
    if (code === 'NOT_FOUND') {
      set.status = 404
      return {
        success: false,
        error: {
          message: 'Route not found',
          code: 'ROUTE_NOT_FOUND',
        }
      }
    }

    // Erro genérico não tratado
    console.error('Unhandled error:', error)
    set.status = 500
    return {
      success: false,
      error: {
        message: 'Internal server error',
        code: 'INTERNAL_ERROR',
      }
    }
  })

  .get('/health', () => ({ status: 'ok' }))
  .use(movieController)