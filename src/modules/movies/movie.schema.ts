import { t } from 'elysia'

export const CreateMovieDTO = t.Object({
  title: t.String({ minLength: 1 }),
  description: t.Optional(t.String()),
  year: t.Number({ minimum: 1888 }),
  director: t.String({ minLength: 1 }),
  genre: t.String({ minLength: 1 })
})

export type CreateMovieInput = typeof CreateMovieDTO.static