import { ApiProperty } from "@nestjsx/crud/lib/crud"
import { PlaylistEntity } from "../entity/playlist.entity"
import { ContentResponseDto } from "./content-response.dto"

export class PlaylistResponseDto {
    
    @ApiProperty()
    id: string
    
    @ApiProperty()
    name: string
    
    @ApiProperty()
    userId: string

    @ApiProperty({ type: () => [ContentResponseDto]})
    content: ContentResponseDto[]

    constructor(playlist: PlaylistEntity) {
        this.id = playlist.id
        this.name = playlist.name
        this.userId = playlist.userId
        this.content = []
        playlist.content.map(element => {
            this.content.push(new ContentResponseDto(element))
        })
    }
}
