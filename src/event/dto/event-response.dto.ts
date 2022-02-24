import { ApiProperty } from "@nestjsx/crud/lib/crud"
import { ScreenResponseDto } from "src/screen/dto/screen-response.dto"

export class EventResponseDto {
    @ApiProperty()
    id: string

    @ApiProperty()
    name:string

    @ApiProperty()
    createdAt: Date

    @ApiProperty()
    userId: string

    @ApiProperty()
    screens: ScreenResponseDto[]
}
