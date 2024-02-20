import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['./src/**/*.entity.{js,ts}'],
  migrations: ['src/config/migrations/**/*.{js,ts}'],
  migrationsTableName: 'migrations',
  synchronize: false,
};

export const dataSource = new DataSource(dataSourceOptions);

import { Pool } from 'pg';
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool
  .connect()
  .then(() => {
    console.log('Connected to PostgreSQL successfully!');
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL:', err);
  });

export default pool;
