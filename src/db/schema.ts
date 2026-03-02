import { pgTable, serial, text, integer, timestamp, varchar } from 'drizzle-orm/pg-core'

export const movies = pgTable('movies', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: varchar('description', { length: 1000 }),
  year: integer('year').notNull(),
  director: varchar('director', { length: 255 }).notNull(),
  genre: varchar('genre', { length: 255 }).notNull(),
  posterUrl: text('poster_url'),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

export type Movie = typeof movies.$inferSelect
export type NewMovie = typeof movies.$inferInsert

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert