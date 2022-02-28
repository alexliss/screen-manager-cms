import { ScreenEntity } from "src/screen/screen.entity";
import { UserProperty } from "src/user-property";
import { UserEntity } from "src/user/user.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @OneToMany(() => ScreenEntity, screen => screen.playlist)
    screens: ScreenEntity[]

    @OneToMany(() => PlaylistContentEntity, content => content.playlist, {
        cascade: true,
        eager: true
    })
    content: PlaylistContentEntity[]

    constructor(user: UserEntity, name: string) {
        super()
        this.name = name
        this.user = user
    }
}