import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { ScreenEntity } from './screen.entity';

@Injectable()
export class ScreenService extends TypeOrmCrudService<ScreenEntity> {
    constructor(@InjectRepository(ScreenEntity) repo: Repository<ScreenEntity>) {
        super(repo)
    }
}
