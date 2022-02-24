import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator"

export class UserRequestDto {

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @MinLength(6)
    @MaxLength(14)
    name: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsEmail()
    email: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @MinLength(8)
    @MaxLength(16)
    password: string
}
