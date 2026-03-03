import { t } from 'elysia'

// export const users = pgTable('users', {
//   id: serial('id').primaryKey(),
//   username: varchar('username', { length: 255 }).notNull().unique(),
//   email: varchar('email', { length: 255 }).notNull().unique(),
//   passwordHash: text('password_hash').notNull(),
//   createdAt: timestamp('created_at').defaultNow().notNull()
// })

// export const CreateMovieDTO = t.Object({
//     title: t.String({ minLength: 1 }),
//     description: t.Optional(t.String()),
//     year: t.Number({ minimum: 1888 }),
//     director: t.String({ minLength: 1 }),
//     genre: t.String({ minLength: 1 })
// })

export const CreateUserDTO = t.Object({
    username: t.String({ minLength: 1 }),
    email: t.String({ minLength: 1, format: 'email' }),
    password: t.String({ minLength: 6 })
})

export type CreateUserInput = typeof CreateUserDTO.static