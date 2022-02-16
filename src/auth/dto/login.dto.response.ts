import { ApiProperty } from "@nestjsx/crud/lib/crud"

export class LoginDtoResponse {
    @ApiProperty()
    readonly token: string

    constructor(token: string) {
        this.token = token
    }
}
