import { ApiProperty } from "@nestjsx/crud/lib/crud"
import { AllowedResolutions } from "../screen.entity"

export class ScreenResponseDto {
    @ApiProperty()
    id: string

    @ApiProperty()
    eventId: string

    @ApiProperty()
    playlistId: string

    @ApiProperty({enum: AllowedResolutions})
    resolution: string
}
