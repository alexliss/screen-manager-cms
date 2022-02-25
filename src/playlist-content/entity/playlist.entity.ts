import { UserProperty } from "src/user-property";
import { UserEntity } from "src/user/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PlaylistContentEntity } from "./playlist-content.entity";

@Entity('playlists')
export class PlaylistEntity extends UserProperty {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    userId: string

    @Column()
    name: string

    @ManyToOne(() => UserEntity, user => user.playlists)
    user: UserEntity

    @OneToMany(() => PlaylistContentEntity, content => content.playlist, {
        eager: true
    })
    content: PlaylistContentEntity[]

    constructor(user: UserEntity, name: string) {
        super()
        this.name = name
        this.user = user
    }
}