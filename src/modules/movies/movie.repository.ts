import { db } from '../../db'
import { movies, type NewMovie } from '../../db/schema'

export const movieRepository = {
  async create(data: NewMovie) {
    const [movie] = await db
      .insert(movies)
      .values(data)
      .returning()
    
    return movie
  },

  async findAll() {
    return db.select().from(movies)
  }
}