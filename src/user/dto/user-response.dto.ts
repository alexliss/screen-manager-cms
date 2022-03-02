import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { UserEntity } from "../user.entity";

export class UserResponseDto {
    @ApiProperty({example: 'c6c1519a-264c-48d8-8ec3-dc347c584d88'})
    id: string

    @ApiProperty({example: 'VansamaOfficial'})
    name: string

    @ApiProperty({example: 'vandarkholme@niconico.jp'})
    email: string

    @ApiProperty()
    createdAt: Date

    constructor(user: UserEntity) {
        if (user) {
            this.id = user.id
            this.name = user.name
            this.email = user.email
            this.createdAt = user.createdAt
        }
    }

}
