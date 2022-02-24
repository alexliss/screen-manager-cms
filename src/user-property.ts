import { Column } from "typeorm";

export abstract class UserProperty {
    @Column()
    userId: string
}
