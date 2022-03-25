import {MigrationInterface, QueryRunner} from "typeorm";

export class ScreenResolution1648190119923 implements MigrationInterface {
    name = 'ScreenResolution1648190119923'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "screens" ADD "resolution" character varying NOT NULL DEFAULT '1280x720'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "screens" DROP COLUMN "resolution"`);
    }

}
