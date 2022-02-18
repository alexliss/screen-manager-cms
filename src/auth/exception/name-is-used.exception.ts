import { BadRequestException } from "@nestjs/common";

export class NameIsUsedException extends BadRequestException {
    constructor() {
        super('Name is already used')
    }
}
