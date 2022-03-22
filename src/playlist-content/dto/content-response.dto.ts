import { ApiProperty } from "@nestjs/swagger"
import { PlaylistContentEntity } from "../entity/playlist-content.entity"

export class ContentResponseDto {
    @ApiProperty()
    id: string

    @ApiProperty()
    contentId: string
    
    @ApiProperty()
    order: number

    @ApiProperty()
    duration: number;

    @ApiProperty()
    link: string

    constructor(content: PlaylistContentEntity) {
        this.id = content.id
        this.contentId = content.contentId
        this.order = content.order
        this.duration = content.duration
        this.link = content.content.link
    }
}
