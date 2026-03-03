import { t } from 'elysia'

export const CreateUserDTO = t.Object({
    username: t.String({ minLength: 1 }),
    email: t.String({ minLength: 1, format: 'email' }),
    password: t.String({ minLength: 6 })
})

export type CreateUserInput = typeof CreateUserDTO.static