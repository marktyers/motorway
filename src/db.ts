
/* db.js */

import pg from 'pg'

import { db } from './config.js'

const pool = new pg.Pool(db)

pool.on( 'error', err => console.error('Error:', err) )

export default pool
