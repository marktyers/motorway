
/* simple script to test the Postgres container */

import pkg from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const { Client } = pkg

const connection = {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE
}

console.log(connection)

const pgclient = new Client(connection)

pgclient.connect()

const statements = [
  `DROP VIEW IF EXISTS public.vehicle_states cascade;`,
  `DROP TABLE IF EXISTS public.stateLogs cascade;`,
  `DROP TABLE IF EXISTS public.vehicles cascade;`,
  'CREATE TABLE public.vehicles(id INTEGER NOT NULL, make TEXT NOT NULL, model TEXT NOT NULL, state TEXT NOT NULL, PRIMARY KEY (id));',
  `INSERT INTO public.vehicles(id, make, model, state) VALUES (1, 'BMW', 'X1', 'quoted');`,
  `INSERT INTO public.vehicles(id, make, model, state) VALUES (2, 'AUDI', 'A4', 'selling');`,
  `INSERT INTO public.vehicles(id, make, model, state) VALUES (3, 'VW', 'GOLF', 'sold');`,
  'CREATE TABLE IF NOT EXISTS public.stateLogs(id BIGSERIAL PRIMARY KEY, vehicleId  INTEGER NOT NULL, state TEXT NOT NULL, timestamp TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT fk_vehicles FOREIGN KEY(vehicleId) REFERENCES vehicles(id));',
  `INSERT INTO public.stateLogs(vehicleId, state, timestamp) VALUES (1, 'quoted',  '2022-09-10 10:23:54+00');`,
  `INSERT INTO public.stateLogs(vehicleId, state, timestamp) VALUES (2, 'quoted',  '2022-09-10 14:59:01+00');`,
  `INSERT INTO public.stateLogs(vehicleId, state, timestamp) VALUES (2, 'selling', '2022-09-11 17:03:17+00');`,
  `INSERT INTO public.stateLogs(vehicleId, state, timestamp) VALUES (3, 'quoted',  '2022-09-11 09:11:45+00');`,
  `INSERT INTO public.stateLogs(vehicleId, state, timestamp) VALUES (3, 'selling', '2022-09-11 23:21:38+00');`,
  `INSERT INTO public.stateLogs(vehicleId, state, timestamp) VALUES (3, 'sold',    '2022-09-12 12:41:41+00');`,
  `CREATE INDEX timestamp_idx ON public.stateLogs (timestamp);`,
  `CREATE VIEW public.vehicle_states AS SELECT make, model, public.stateLogs.vehicleId as vehicleId, public.stateLogs.state as state, timestamp FROM public.vehicles INNER JOIN public.stateLogs ON public.stateLogs.vehicleId = public.vehicles.id;`
]

// run each of these queries
statements.forEach(async query => {
  console.log(query)
  await pgclient.query(query, (err, res) => {
    if (err) {
      console.log('ERROR')
      console.log(query)
      console.log(err.message)
    }
  })
})

pgclient.query('SELECT * FROM vehicle_states', (err, res) => {
  if (err) throw err
  console.log(err, res.rows)
  pgclient.end()
})
