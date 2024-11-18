import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTrack1731932991548 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "track" (
        "id"         UUID         DEFAULT uuid_generate_v4(),
        "name"       VARCHAR(255) NOT NULL,
        "duration"   INTEGER      NOT NULL,
        "favorite"   BOOLEAN      DEFAULT false,
        "album_id"   UUID,
        "artist_id"  UUID,

        CONSTRAINT "pk_track" PRIMARY KEY ("id"),
        CONSTRAINT "fk_album" FOREIGN KEY ("album_id") REFERENCES "album" ("id") ON DELETE SET NULL,
        CONSTRAINT "fk_artist" FOREIGN KEY ("artist_id") REFERENCES "artist" ("id") ON DELETE SET NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "track";`);
  }
}
