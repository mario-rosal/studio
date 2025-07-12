import { Pool } from 'pg';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

let pool: Pool;

// Check if we are in a production environment
if (process.env.NODE_ENV === 'production') {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  // In development, we might have a global object to persist the connection across hot reloads
  if (!global.hasOwnProperty('dbPool')) {
    (global as any).dbPool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }
  pool = (global as any).dbPool;
}

export default pool;
