import { ApiProperty } from "@nestjsx/crud/lib/crud"
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class RegisterDtoRequest {

    @ApiProperty({description: "Nickname, 6 to 14 characters"})
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(14)
    @IsString()
    readonly name: string

    @ApiProperty({description: "Email, that isn't previously used"})
    @IsNotEmpty()
    @IsEmail()
    readonly email: string

    @ApiProperty({description: "Password, 8 to 16 characters"})
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(16)
    @IsString()
    password: string
}
