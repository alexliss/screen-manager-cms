import { ApiProperty } from "@nestjs/swagger"

export class ContentResponseDto {
    @ApiProperty()
    id: string

    @ApiProperty()
    contentId: string
    
    @ApiProperty()
    order: number
}
