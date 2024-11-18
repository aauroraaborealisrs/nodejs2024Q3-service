import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';

dotenvConfig({ path: '.env' });

const config = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,

  entities: [
    join(process.cwd(), 'dist', 'db', 'entities', '*.entity{.js,.ts}'),
  ],
  migrations: [join(process.cwd(), 'dist', 'db', 'migrations', '*{.js,.js}')],

  synchronize: false,
  migrationsRun: false,
  migrationsTableName: 'migrations',
} as DataSourceOptions;

export const dbConfig = registerAs('db', () => config);
export const datasource = new DataSource(config);
