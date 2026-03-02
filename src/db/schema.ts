import { pgTable, serial, text, integer, timestamp, varchar } from 'drizzle-orm/pg-core'

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

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert