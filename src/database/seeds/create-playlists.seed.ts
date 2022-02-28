import { PlaylistEntity } from "src/playlist-content/entity/playlist.entity";
import { ScreenEntity } from "src/screen/screen.entity";
import { UserEntity } from "src/user/user.entity";
import { Connection, getRepository } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreatePlaylistsSeed implements Seeder {
    public async run(factory: Factory, connection: Connection) {
        const users = await getRepository(UserEntity).find({
            relations: ["screens"]
        })
        console.log('abobus``````````````````````````````````````````````````')
        const playlists = await factory(PlaylistEntity)().map(async playlist => {
            let userIdx: number
            do {
                console.log('abobus``````````````````````````````````````````````````')
                userIdx = Math.floor(Math.random() * users.length)
            } while (users[userIdx].screens.length == 0)
            playlist.userId = users[userIdx].id
            return playlist
        }).createMany(1000)
        console.log('abobus``````````````````````````````````````````````````')
        playlists.forEach(async playlist => {
            let screenIdx = Math.floor(Math.random() * users[playlist.id].screens.length)
            users[playlist.userId].screens[screenIdx].playlistId = playlist.id
            await getRepository(ScreenEntity).save(users[playlist.userId].screens[screenIdx].playlistId)
        });
    }
}
