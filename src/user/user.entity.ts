import { ApiPropertyOptional } from "@nestjs/swagger";
import { CrudValidationGroups } from "@nestjsx/crud";
import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { Exclude } from "class-transformer";
import { IsDefined, IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('users')
export class UserEntity {

    @ApiProperty()
    @IsOptional({ always: true })
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty()
    @IsOptional({ groups: [UPDATE] })
    @IsDefined({ groups: [CREATE] })
    @IsString({ always: true })
    @Column({ unique: true })
    name: string

    @ApiProperty()
    @IsOptional({ groups: [UPDATE] })
    @IsDefined({ groups: [CREATE] })
    @IsEmail()
    @Column({ unique: true })
    email: string

    @ApiPropertyOptional({
        description: 'useful only on update, undefined by default'
    })
    @IsOptional({ groups: [UPDATE] })
    @IsDefined({ groups: [CREATE] })
    @MinLength(8)
    @MaxLength(20)
    @Exclude()
    @Column()
    password: string

    @ApiProperty()
    @IsOptional({ always: true })
    @CreateDateColumn()
    readonly createdAt: Date

    constructor(name: string, email: string, password: string) {
        this.name = name
        this.email = email
        this.password = password
    }
}
