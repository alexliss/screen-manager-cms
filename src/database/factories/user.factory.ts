import { faker } from '@faker-js/faker'
import { UserEntity } from 'src/user/user.entity';
import { define } from 'typeorm-seeding';

define(UserEntity, () => {
    const username = faker.internet.userName()
    const user = new UserEntity(username, faker.internet.email(username), username)
    return user
})
