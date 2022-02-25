import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { IsDefined, IsNumber, IsPositive, IsUrl } from "class-validator";

export class ContentRequestDto {
    @ApiProperty()
    @IsDefined()
    @IsUrl()
    link: string

    @ApiProperty()
    @IsDefined()
    @IsNumber()
    @IsPositive()
    duration: number
}
