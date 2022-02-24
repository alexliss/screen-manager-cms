import { CrudValidationGroups } from "@nestjsx/crud";
import { IsDefined, IsOptional } from "class-validator";
import { ScreenEntity } from "src/screen/screen.entity";
import { UserProperty } from "src/user-property";
import { UserEntity } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('events')
export class EventEntity extends UserProperty {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @IsOptional({ groups: [UPDATE] })
    @IsDefined({ groups: [CREATE]})
    @Column()
    name:string

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => UserEntity, user => user.events, {
        onDelete: "CASCADE"
    })
    user: UserEntity

    @OneToMany(() => ScreenEntity, screen => screen.event)
    screens: ScreenEntity[]
}
