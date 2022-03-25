import { ApiProperty } from "@nestjsx/crud/lib/crud"
import { ContentResponseDto } from "src/playlist-content/dto/content-response.dto"
import { AllowedResolutions, ScreenEntity } from "../screen.entity"

export class ScreenResponseWithPlaylistDto {
    
    @ApiProperty()
    id: string

    @ApiProperty()
    eventId: string

    @ApiProperty()
    playlistId: string

    @ApiProperty({ type: () => [ContentResponseDto]})
    content: ContentResponseDto[]

    @ApiProperty({enum: AllowedResolutions})
    resolution: string

    constructor(screen: ScreenEntity, content: ContentResponseDto[]) {
        this.id = screen.id
        this.eventId = screen.eventId
        this.playlistId = screen.playlistId
        this.resolution = screen.resolution
        if (content) {
            this.content = content
        }
    }
}