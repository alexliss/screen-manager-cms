import {MigrationInterface, QueryRunner} from "typeorm";

export class UserToAuthZ1647438023548 implements MigrationInterface {
    name = 'UserToAuthZ1647438023548'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "playlists" DROP CONSTRAINT "FK_708a919e9aa49019000d9e9b68e"`);
        await queryRunner.query(`ALTER TABLE "screens" DROP CONSTRAINT "FK_9bc222ea626bf47bbb9d86b9f7e"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_9929fa8516afa13f87b41abb263"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "playlists" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "playlists" ADD "userId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "screens" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "screens" ADD "userId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "userId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "playlists" ADD CONSTRAINT "FK_708a919e9aa49019000d9e9b68e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "screens" ADD CONSTRAINT "FK_9bc222ea626bf47bbb9d86b9f7e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_9929fa8516afa13f87b41abb263" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_9929fa8516afa13f87b41abb263"`);
        await queryRunner.query(`ALTER TABLE "screens" DROP CONSTRAINT "FK_9bc222ea626bf47bbb9d86b9f7e"`);
        await queryRunner.query(`ALTER TABLE "playlists" DROP CONSTRAINT "FK_708a919e9aa49019000d9e9b68e"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "screens" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "screens" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "playlists" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "playlists" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_9929fa8516afa13f87b41abb263" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "screens" ADD CONSTRAINT "FK_9bc222ea626bf47bbb9d86b9f7e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "playlists" ADD CONSTRAINT "FK_708a919e9aa49019000d9e9b68e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL DEFAULT '00000000'`);
    }

}
