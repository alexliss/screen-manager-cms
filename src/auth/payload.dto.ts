export class PayloadDto {
    readonly id: string
    readonly name: string
    readonly email: string
    constructor(payload: any) {
        this.id = payload.sub
        this.name = payload.nickname
        this.email = payload.email
    }
}
