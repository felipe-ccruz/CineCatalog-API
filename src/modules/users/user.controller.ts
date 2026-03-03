import { Elysia } from 'elysia'
import { userService } from './user.service'
import { CreateUserDTO } from './user.schema'
import { HttpError } from '../../shared/errors/httpError'

export const userController = new Elysia({ prefix: '/api/users' })
// POST /api/users
    .post('/', async ({ body, set }) => {
        const user = await userService.create(body)
        set.status = 201
        return user
    }, {
        body: CreateUserDTO
    })