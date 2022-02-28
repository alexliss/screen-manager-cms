import faker from "@faker-js/faker";
import { EventEntity } from "src/event/event.entity";
import { define } from "typeorm-seeding";

define(EventEntity, () => {
    const event = new EventEntity()
    event.name = faker.word.adjective() + ' ' + faker.word.noun()
    return event
})
