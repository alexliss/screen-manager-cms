import { Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"

export abstract class BucketFile {
    @PrimaryColumn('uuid')
    id: string

    @Column({unique: true})
    link: string

    @Column()
    key: string;

    constructor(id: string, link: string, key: string) {
        this.id = id
        this.link = link
        this.key = key
    }
}
