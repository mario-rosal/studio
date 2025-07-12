import { Pool } from 'pg';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

let pool: Pool;

// Using a global object to persist the connection pool across hot reloads in development.
// This prevents creating a new pool on every change.
if (process.env.NODE_ENV === 'production') {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
} else {
  if (!(global as any).dbPool) {
    (global as any).dbPool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }
  pool = (global as any).dbPool;
}

export default pool;
