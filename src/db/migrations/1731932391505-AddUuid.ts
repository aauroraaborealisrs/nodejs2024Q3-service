import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUuid1731932391505 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP EXTENSION IF EXISTS "uuid-ossp";
      CREATE EXTENSION "uuid-ossp";
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP EXTENSION "uuid-ossp";
    `);
  }
}
