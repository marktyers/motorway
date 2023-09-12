
import pg from 'pg'

const db: pg.PoolConfig = {
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  user: process.env.POSTGRES_USER || 'codio',
  password: process.env.POSTGRES_PASSWORD || 'p455w0rd',
  database: process.env.POSTGRES_DATABASE || 'motorway',
}

export { db }
