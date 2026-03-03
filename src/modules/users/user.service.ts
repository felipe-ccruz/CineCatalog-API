import { userRepository } from './user.repository'
import type { CreateUserInput } from './user.schema'
import bcrypt from 'bcrypt'
import { storageService } from '../../config/storage'
import { HttpError } from '../../shared/errors/httpError'

export const userService = {
    async create(data: CreateUserInput) {
        const passwordHash = await bcrypt.hash(data.password, 10)
        
        // Remove password e adiciona passwordHash
        const { password, ...userData } = data
        
        return userRepository.create({
            ...userData,
            passwordHash
        })
    }
}