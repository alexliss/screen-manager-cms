import {MigrationInterface, QueryRunner} from "typeorm";

export class BucketCompatibility1647936827293 implements MigrationInterface {
    name = 'BucketCompatibility1647936827293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "content" ADD "key" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "playlistContent" DROP CONSTRAINT "FK_78e2fe7083fe61ae6f3d879b96a"`);
        await queryRunner.query(`ALTER TABLE "content" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "playlistContent" ADD CONSTRAINT "FK_78e2fe7083fe61ae6f3d879b96a" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "playlistContent" DROP CONSTRAINT "FK_78e2fe7083fe61ae6f3d879b96a"`);
        await queryRunner.query(`ALTER TABLE "content" ALTER COLUMN "id" SET DEFAULT nextval('"content_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "playlistContent" ADD CONSTRAINT "FK_78e2fe7083fe61ae6f3d879b96a" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "content" DROP COLUMN "key"`);
    }

}
