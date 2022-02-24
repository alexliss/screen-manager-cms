import { PlaylistEntity } from "../playlist.entity"
import { ContentResponseDto } from "./content-response.dto"

export class PlaylistResponseDto {
    id: string
    name: string
    userId: string
    content: ContentResponseDto[]

    constructor(playlist: PlaylistEntity) {
        this.id = playlist.id
        this.name = playlist.name
        this.userId = playlist.userId
        playlist.content.map(element => {
            this.content.push(new ContentResponseDto())
        })
    }
}
