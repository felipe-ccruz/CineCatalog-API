import { t } from 'elysia'

// Revebe os dados necessários para criar um novo filme
export const CreateMovieDTO = t.Object({
  title: t.String({ minLength: 1 }),
  description: t.Optional(t.String()),
  year: t.Number({ minimum: 1888 }),
  director: t.String({ minLength: 1 }),
  genre: t.String({ minLength: 1 })
})

// Recebe os parâmetros de consulta para listar filmes
export const ListMoviesQueryDTO = t.Object({
  page: t.Optional(t.Numeric({ minimum: 1, default: 1 })),
  limit: t.Optional(t.Numeric({ minimum: 1, maximum: 100, default: 10 })),
  title: t.Optional(t.String())
})

// Recebe um array de filmes para criação em massa
export const CreateManyMoviesDTO = t.Array(CreateMovieDTO)

export type CreateMovieInput = typeof CreateMovieDTO.static
export type ListMoviesQuery = typeof ListMoviesQueryDTO.static
export type CreateManyMoviesInput = typeof CreateManyMoviesDTO.static