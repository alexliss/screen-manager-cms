import { ApiPropertyOptional } from "@nestjs/swagger";
import { CrudValidationGroups } from "@nestjsx/crud";
import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { IsDefined, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator"
import { AllowedResolutions } from "../screen.entity";

const { CREATE, UPDATE } = CrudValidationGroups;

export class ScreenRequestDto {
    @ApiProperty()
    @IsString()
    @IsDefined({ groups: [CREATE] })
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsString()
    @IsDefined({ groups: [CREATE] })
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty()
    eventId: string

    @ApiProperty({ 
        enum: AllowedResolutions,
        description: "1280x720 or 1920x1080" 
    })
    @IsString()
    @IsDefined({ groups: [CREATE] })
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty()
    resolution: string

    @ApiPropertyOptional()
    @IsUUID()
    @IsOptional()
    @IsNotEmpty()
    playlistId: string
}
