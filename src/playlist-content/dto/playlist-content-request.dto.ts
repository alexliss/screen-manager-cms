import { IsNumber, IsOptional, IsPositive, IsUrl } from "class-validator"

export class PlaylistContentRequestDto {
    
    @IsOptional()
    @IsNumber()
    @IsPositive()
    order: number
    
    @IsOptional()
    @IsNumber()
    @IsPositive()
    duration: number
    
    @IsOptional()
    @IsUrl()
    link: string
}
