import { CrudValidationGroups } from "@nestjsx/crud";
import { IsDefined, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator"

const { CREATE, UPDATE } = CrudValidationGroups;

export class ScreenRequestDto {
    @IsString()
    @IsDefined({ groups: [CREATE] })
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty()
    name: string

    @IsUUID()
    @IsOptional()
    @IsNotEmpty()
    playlistId: string
}
