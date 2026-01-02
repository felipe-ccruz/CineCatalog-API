import { movieRepository } from './movie.repository'
import type { CreateMovieInput } from './movie.schema'

export const movieService = {
  async create(data: CreateMovieInput) {
    return movieRepository.create(data)
  },

  async findAll() {
    return movieRepository.findAll()
  }
}