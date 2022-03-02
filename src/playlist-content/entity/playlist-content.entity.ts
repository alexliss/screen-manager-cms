import { PlaylistEntity } from "./playlist.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ContentEntity } from "./content.entity";

@Entity('playlistContent')
export class PlaylistContentEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    contentId: string

    @Column()
    playlistId: string

    // сделать каскадное сохранение
    
    @ManyToOne(() => PlaylistEntity, playlist => playlist.content, {
        onDelete: "CASCADE"
    })
    playlist: PlaylistEntity

    // то же самое
    @ManyToOne(() => ContentEntity)
    content: ContentEntity

    @Column({ type: 'integer' })
    order: number

    @Column()
    duration: number //in secs, i think

    constructor(content: ContentEntity, playlist: PlaylistEntity, duration: number, order: number) {
        this.content = content
        this.playlist = playlist
        this.duration = duration
        this.order = order
    }

}
