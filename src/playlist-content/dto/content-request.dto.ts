import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { Type } from "class-transformer";
import { IsDefined, IsNumber, IsPositive } from "class-validator";

export class ContentRequestDto {
    @ApiProperty()
    @Type(() => Number)
    @IsDefined()
    @IsNumber()
    @IsPositive({})
    duration: number
}
