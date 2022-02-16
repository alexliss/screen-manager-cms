import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { RegisterDtoRequest } from 'src/auth/dto/register.dto.request';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
    constructor(@InjectRepository(UserEntity) public readonly repo: Repository<UserEntity>) {
        super(repo)
    }

    async register(data: RegisterDtoRequest): Promise<UserEntity> {
        let user = new UserEntity(data.name, data.email, data.password)
        user = await this.repo.save(user)
        user.password = undefined
        return user
    }

    async findByEmail(email: string): Promise<UserEntity> {
        return await this.repo.findOne({
            where: {
                email: email
            }
        })
    }
    
    async findByName(name: string): Promise<UserEntity> {
        return await this.repo.findOne({
            where: {
                name: name
            }
        })
    }
}
