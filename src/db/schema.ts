import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core'

export const movies = pgTable('movies', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  year: integer('year').notNull(),
  director: text('director').notNull(),
  genre: text('genre').notNull(),
  posterUrl: text('poster_url'),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

export type Movie = typeof movies.$inferSelect
export type NewMovie = typeof movies.$inferInsert