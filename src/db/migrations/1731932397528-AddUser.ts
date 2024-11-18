import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUser1731932397528 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "user" (
        "id"         UUID         DEFAULT uuid_generate_v4(),
        "login"      VARCHAR(255) NOT NULL,
        "password"   VARCHAR(255) NOT NULL,
        "version"    INTEGER      DEFAULT 1,
        "created_at" BIGINT       NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000),
        "updated_at" BIGINT       NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000),

        CONSTRAINT "fk_user" PRIMARY KEY ("id")
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user";`);
  }
}
