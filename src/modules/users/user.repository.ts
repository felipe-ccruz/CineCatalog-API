import { db } from '../../db'
import { users, type NewUser } from '../../db/schema'
import { ilike, count, eq } from 'drizzle-orm'

export const userRepository = {

    // Criar um novo usuário
    async create(data: NewUser) {
        const [movie] = await db
            .insert(users)
            .values(data)
            .returning()
        return movie
    }
}