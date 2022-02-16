import { ConnectionOptions } from "typeorm";
import { DB_HOST, DB_NAME, DB_PASS, DB_USERNAME } from "./config";

export const ormConfig: ConnectionOptions = {
    type: 'postgres',
    host: DB_HOST,
    port: 5432,
    username: DB_USERNAME,
    password: DB_PASS,
    database: DB_NAME,
    synchronize: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
}
