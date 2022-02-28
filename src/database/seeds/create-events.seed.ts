import { EventEntity } from "src/event/event.entity";
import { UserEntity } from "src/user/user.entity";
import { Connection, getRepository } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreateEventsSeed implements Seeder {
    public async run(factory: Factory, connection: Connection) {
        const users = await getRepository(UserEntity).find({})
        const events = await factory(EventEntity)().map(async event => {
            const randomUserCount = Math.floor(Math.random() * users.length)
            event.user = users[randomUserCount]
            event.userId = event.user.id
            return event
        }).createMany(100)
    }
}
