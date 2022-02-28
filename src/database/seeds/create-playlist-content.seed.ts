import { ContentEntity } from "src/playlist-content/entity/content.entity";
import { PlaylistContentEntity } from "src/playlist-content/entity/playlist-content.entity";
import { PlaylistEntity } from "src/playlist-content/entity/playlist.entity";
import { Connection, getRepository } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreatePlaylistContentSeed implements Seeder {
    public async run(factory: Factory, connection: Connection) {
        const content = await getRepository(ContentEntity).find({})
        const playlists = await getRepository(PlaylistEntity).find({
            relations: ["content"]
        })
        await factory(PlaylistContentEntity)().map(async playlistContent => {
            const contentIdx = Math.floor(Math.random() * content.length)
            const playlistIdx = Math.floor(Math.random() * playlists.length)
            playlistContent.contentId = content[contentIdx].id
            playlistContent.playlistId = playlists[playlistIdx].id
            if (!playlists[playlistIdx].content.length) {
                playlistContent.order = 0
            }
            playlistContent.order = playlists[playlistIdx].content.length
            playlists[playlistIdx].content.push(playlistContent)
            return playlistContent
        }).createMany(4000)
    }
}
