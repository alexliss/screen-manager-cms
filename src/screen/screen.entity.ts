import { EventEntity } from "src/event/event.entity";
import { PlaylistEntity } from "src/playlist-content/entity/playlist.entity";
import { UserProperty } from "src/user-property";
import { UserEntity } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum AllowedResolutions {
    HD = "1280x720",
    FHD = "1920x1080"
}

@Entity('screens')
export class ScreenEntity extends UserProperty {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    eventId: string

    @Column({nullable: true})
    playlistId: string

    @Column({type: 'varchar'})
    resolution: AllowedResolutions

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
