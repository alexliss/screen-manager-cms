import { define } from "typeorm-seeding";
import { faker } from "@faker-js/faker";
import { ScreenEntity } from "src/screen/screen.entity";

define(ScreenEntity, () => {
    const screen = new ScreenEntity()
    screen.name = faker.random.word()
    return screen
})
