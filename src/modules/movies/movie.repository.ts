import { db } from '../../db'
import { movies, type NewMovie } from '../../db/schema'
import { ilike, count, eq } from 'drizzle-orm'

export const movieRepository = {

    // Criar um novo filme
    async create(data: NewMovie) {
        const [movie] = await db
            .insert(movies)
            .values(data)
            .returning()

        return movie
    },

    //Criar vários filmes em massa
    async createMany(data: NewMovie[]) {
        return db.insert(movies).values(data).returning()
    },

    // Listar filmes com paginação e filtro por título
    async findAll(page: number, limit: number, title?: string) {
        const offset = (page - 1) * limit

        // Condição de filtro
        const whereClause = title ? ilike(movies.title, `%${title}%`) : undefined

        // Buscar dados paginados
        const data = await db
            .select()
            .from(movies)
            .where(whereClause)
            .limit(limit)
            .offset(offset)

        // Contar total de registros
        const [{ total }] = await db
            .select({ total: count() })
            .from(movies)
            .where(whereClause)

        return {
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        }
    },

    // Buscar filme por ID
    async findById(id: number) {
        const [movie] = await db
            .select()
            .from(movies)
            .where(eq(movies.id, id))

        return movie ?? null
    },

    // Atualizar um filme existente
    async update(id: number, data: Partial<NewMovie>) {
        const [movie] = await db
            .update(movies)
            .set(data)
            .where(eq(movies.id, id))
            .returning()

        return movie ?? null
    }

}