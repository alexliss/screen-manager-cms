import { IsDefined, IsNumber, IsPositive, IsUrl } from "class-validator";

export class ContentRequestDto {
    @IsDefined()
    @IsUrl()
    link: string

    @IsDefined()
    @IsNumber()
    @IsPositive()
    duration: number
}
