import { BadRequestException } from "@nestjs/common";

export class EmailIsUsedException extends BadRequestException {
    constructor() {
        super('Email is already used')
    }
}
