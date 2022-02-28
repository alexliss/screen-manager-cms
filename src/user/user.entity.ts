import { EventEntity } from "src/event/event.entity";
import { PlaylistEntity } from "src/playlist-content/entity/playlist.entity";
import { ScreenEntity } from "src/screen/screen.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    name: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @CreateDateColumn()
    readonly createdAt: Date

    @OneToMany(() => EventEntity, event => event.user)
    events: EventEntity[]

    @OneToMany(() => ScreenEntity, screen => screen.user)
    screens: ScreenEntity[]

    @OneToMany(() => PlaylistEntity, playlist => playlist.user)
    playlists: PlaylistEntity[]

    constructor(name: string, email: string, password: string) {
        this.name = name
        this.email = email
        this.password = password
    }
}
