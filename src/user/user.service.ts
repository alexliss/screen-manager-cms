import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { PayloadDto } from 'src/auth/payload.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
    constructor(@InjectRepository(UserEntity) public readonly repo: Repository<UserEntity>) {
        super(repo)
    }

    async createOrFind(data: PayloadDto): Promise<UserResponseDto> {
        let user = await this.repo.findOne(data.id)
        if (!user) {
            user = new UserEntity(data.id, data.name, data.email)
        }
        user = await this.repo.save(user)
        return new UserResponseDto(user)
    }
}
