import faker from "@faker-js/faker";
import { PlaylistContentEntity } from "src/playlist-content/entity/playlist-content.entity";
import { define } from "typeorm-seeding";

define(PlaylistContentEntity, () => {
    return new PlaylistContentEntity(null, null, faker.datatype.number({
        min: 1,
        max:10000
    }), -1)
})
