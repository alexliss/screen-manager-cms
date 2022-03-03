import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { RegisterDtoRequest } from 'src/auth/dto/register.dto.request';
import { Repository } from 'typeorm';
import { UserResponseDto } from './dto/user-response.dto';
import { UserRequestDto } from './dto/user-request.dto';
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

    async update(user: UserEntity, data: UserRequestDto): Promise<UserResponseDto> {
        Promise.all([
            this.repo.update(user.id, {email: data.email}),
            this.repo.update(user.id, {name: data.name}),
            this.repo.update(user.id, {password: data.password})
        ]).catch
        user = await this.repo.findOne(user.id)
        return new UserResponseDto(user)
    } 

    async delete(user: UserEntity) {
        this.repo.delete(user.id)
    }
}
