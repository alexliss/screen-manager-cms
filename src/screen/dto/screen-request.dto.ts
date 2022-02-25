import { ApiPropertyOptional } from "@nestjs/swagger";
import { CrudValidationGroups } from "@nestjsx/crud";
import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { IsDefined, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator"

const { CREATE, UPDATE } = CrudValidationGroups;

export class ScreenRequestDto {
    @ApiProperty()
    @IsString()
    @IsDefined({ groups: [CREATE] })
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty()
    name: string

    @ApiPropertyOptional()
    @IsUUID()
    @IsOptional()
    @IsNotEmpty()
    playlistId: string
}
