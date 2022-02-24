import { PlaylistEntity } from "src/playlist-content/playlist.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { ContentEntity } from "./content.entity";

@Entity('playlistContent')
@Unique(['playlist', 'order'])
export class PlaylistContentEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    contentId: string

    @Column()
    playlistId: string

    // сделать каскадное сохранение
    
    @ManyToOne(() => PlaylistEntity, playlist => playlist.content, {
        onDelete: "CASCADE",
        primary: true
    })
    playlist: PlaylistEntity

    // то же самое
    @ManyToOne(() => ContentEntity)
    content: ContentEntity

    @PrimaryColumn({ type: 'integer' })
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
