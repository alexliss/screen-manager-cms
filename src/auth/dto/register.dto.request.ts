import { ApiProperty } from "@nestjsx/crud/lib/crud"
import { IsDefined, IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class RegisterDtoRequest {

    @ApiProperty({description: "Nickname, 6 to 14 characters"})
    @IsDefined()
    @MinLength(6)
    @MaxLength(14)
    @IsString()
    readonly name: string

    @ApiProperty({description: "Email, that isn't previously used"})
    @IsDefined()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string

    @ApiProperty({description: "Password, 8 to 16 characters"})
    // password length & definity checked in PasswordHashingInterceptor bc we cannot check length after hashing
    password: string
}
