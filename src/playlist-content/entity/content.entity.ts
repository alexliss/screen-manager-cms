import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PlaylistContentEntity } from "./playlist-content.entity";

@Entity('content')
export class ContentEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({unique: true})
    link: string

    @OneToMany(() => PlaylistContentEntity, playlistContent => playlistContent.content, {
        onDelete: "CASCADE"
    })
    playlistContent: PlaylistContentEntity[]

    constructor(link: string) {
        this.link = link
    }
}
