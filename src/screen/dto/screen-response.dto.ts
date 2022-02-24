import { ApiProperty } from "@nestjsx/crud/lib/crud"

export class ScreenResponseDto {
    @ApiProperty()
    id: string

    @ApiProperty()
    eventId: string

    @ApiProperty()
    playlistId: string
}
