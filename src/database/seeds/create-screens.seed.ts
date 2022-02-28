import { ScreenEntity } from "src/screen/screen.entity";
import { UserEntity } from "src/user/user.entity";
import { Connection, getRepository } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreateScreensSeed implements Seeder {
    public async run(factory: Factory, connection: Connection) {
        const users = await getRepository(UserEntity).find({
            relations: ["events"]
        })
        await factory(ScreenEntity)().map(async screen => {
            let idx: number
            do {
                idx = Math.floor(Math.random() * users.length)
            } while (users[idx].events.length == 0);
            screen.userId = users[idx].id
            const eventIdx = Math.floor(Math.random() * users[idx].events.length)
            console.log(eventIdx)
            screen.eventId = users[idx].events[eventIdx].id
            console.log(screen)
            return screen
        }).createMany(1000)

    }
}
