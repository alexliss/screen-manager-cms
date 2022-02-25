import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class PlaylistRequestDto {
    
    @ApiProperty()
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    name: string
}
