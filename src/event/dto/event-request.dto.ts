import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class EventRequestDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(16)
    name: string
}
