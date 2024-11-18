import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddArtist1731932981211 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "artist" (
        "id"       UUID         DEFAULT uuid_generate_v4(),
        "name"     VARCHAR(255) NOT NULL,
        "grammy"   BOOLEAN      DEFAULT false,
        "favorite" BOOLEAN      DEFAULT false,

        CONSTRAINT "pk_artist" PRIMARY KEY ("id")
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "artist";`);
  }
}
