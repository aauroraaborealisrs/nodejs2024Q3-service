import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAlbum1731932981234 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "album" (
        "id"         UUID         DEFAULT uuid_generate_v4(),
        "name"       VARCHAR(255) NOT NULL,
        "year"       INTEGER      NOT NULL,
        "favorite"   BOOLEAN      DEFAULT false,
        "artist_id"  UUID,

        CONSTRAINT "pk_album" PRIMARY KEY ("id"),
        CONSTRAINT "fk_artist" FOREIGN KEY ("artist_id") REFERENCES "artist" ("id") ON DELETE SET NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "album";`);
  }
}
