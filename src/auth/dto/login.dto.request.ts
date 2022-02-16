import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginDtoRequest {

    @ApiProperty({description: "Email of already registered user"})
    @IsNotEmpty()
    @IsEmail()
    readonly email: string

    @ApiProperty({description: "Password, 8 to 16 characters"})
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(16)
    readonly password: string
}
