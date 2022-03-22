import { BucketFile } from "src/bucket/bucket-file";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PlaylistContentEntity } from "./playlist-content.entity";

@Entity('content')
export class ContentEntity extends BucketFile {

    @OneToMany(() => PlaylistContentEntity, playlistContent => playlistContent.content, {
        onDelete: "CASCADE"
    })
    playlistContent: PlaylistContentEntity[]

    constructor(id: string, link: string, key: string) {
        super(id, link, key)
    }
}
