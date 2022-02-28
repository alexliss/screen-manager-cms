import faker from "@faker-js/faker";
import { PlaylistEntity } from "src/playlist-content/entity/playlist.entity";
import { define } from "typeorm-seeding";

define(PlaylistEntity, () => {
    const playlist = new PlaylistEntity(null, faker.word.verb())
    return playlist
})
