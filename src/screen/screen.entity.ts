import { EventEntity } from "src/event/event.entity";
import { PlaylistEntity } from "src/playlist-content/playlist.entity";
import { UserProperty } from "src/user-property";
import { UserEntity } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('screens')
export class ScreenEntity extends UserProperty {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    eventId: string

    @Column()
    playlistId: string

    @ManyToOne(() => UserEntity, user => user.screens, {
        onDelete: "CASCADE"
    })
    user: UserEntity

    @ManyToOne(() => EventEntity, event => event.screens, {
        onDelete: "CASCADE"
    })
    event: EventEntity

    @ManyToOne(() => PlaylistEntity, { eager: true })
    playlist: PlaylistEntity
}
