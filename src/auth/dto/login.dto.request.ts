import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginDtoRequest {

    @ApiProperty({description: "Email of already registered user"})
    @IsDefined()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string

    @ApiProperty({description: "Password, 8 to 16 characters"})
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly password: string
}
