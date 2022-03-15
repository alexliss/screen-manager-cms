import { EventEntity } from "src/event/event.entity";
import { PlaylistEntity } from "src/playlist-content/entity/playlist.entity";
import { ScreenEntity } from "src/screen/screen.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity('users')
export class UserEntity {

    @PrimaryColumn()
    id: string

    @Column({ unique: true })
    name: string

    @Column({ unique: true })
    email: string

    @CreateDateColumn()
    readonly createdAt: Date

    @OneToMany(() => EventEntity, event => event.user)
    events: EventEntity[]

    @OneToMany(() => ScreenEntity, screen => screen.user)
    screens: ScreenEntity[]

    @OneToMany(() => PlaylistEntity, playlist => playlist.user)
    playlists: PlaylistEntity[]

    constructor(id: string, name: string, email: string) {
        this.id = id
        this.name = name
        this.email = email
    }
}
