import { db } from './db'
import { movies } from './db/schema'

async function test() {
  // Inserir um filme
  const [movie] = await db.insert(movies).values({
    title: 'The Matrix',
    description: 'A computer hacker learns about the true nature of reality',
    year: 1999,
    director: 'Wachowskis',
    genre: 'Sci-Fi'
  }).returning()

  console.log('Filme criado:', movie)

  // Listar todos
  const allMovies = await db.select().from(movies)
  console.log('Todos os filmes:', allMovies)
}

test()