import { ContentEntity } from "src/playlist-content/entity/content.entity";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreateContentSeed implements Seeder {
    public async run(factory: Factory, connection: Connection) {
        await factory(ContentEntity)().createMany(4000)
    }
}
