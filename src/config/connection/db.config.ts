import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*.ts'],

  synchronize: true,
};

import { Pool } from 'pg';

// Configure the pool with optimal settings
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false, // Disables SSL certificate validation, adjust as necessary for your environment
  },
  // Connection pool options
  // max: 20, // Maximum number of clients in the pool
  // idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  // connectionTimeoutMillis: 2000, // Timeout for connecting a new client
});

// Log errors related to the pool
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1); // Exit the process if an error occurs to prevent the application from hanging
});

// Connect to the pool and log success or error
pool
  .connect()
  .then(() => {
    console.log('Connected to PostgreSQL successfully!');
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL:', err);
  });

export default pool;
