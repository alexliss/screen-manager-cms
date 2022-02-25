import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsNumber, IsOptional, IsPositive, IsUrl } from "class-validator"

export class PlaylistContentRequestDto {
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    @IsPositive()
    order: number
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    @IsPositive()
    duration: number
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsUrl()
    link: string
}
