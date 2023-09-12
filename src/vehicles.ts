
import pg from 'pg'

import pool from './db.js'
import { Response } from './interfaces.js'

class Vehicles {

  async findByIdAndDate(id: number = 0, requestDate: string = ''): Promise<Response> {
    if (id === 0) return {status: 404, error: 'invalid car id provided'}
    const date: Date = requestDate.length > 0 ? new Date(requestDate.replace(' 00', '').replace('+00', '')) : new Date()
    try {
      const formattedDate: string = `${date.toISOString().slice(0, 19).replace('T', ' ')}+00`
      const sql = `select * from public.vehicle_states WHERE vehicleId = ${id}
        AND timestamp <= '${formattedDate}' ORDER BY timestamp DESC LIMIT 1;`
      const start: number = performance.now()
      const client: pg.PoolClient = await pool.connect()
      const result: pg.QueryResult = await client.query(sql)
      const end: number = performance.now()
      if (result.rows.length === 0) return {status: 404, error: 'car not found on the specified date'}
        const vehicle = result.rows.shift()
        vehicle.dbms = Math.trunc((end - start)*100)/100
      return {status: 200, vehicle: vehicle}
    } catch (error) {
      if (error.message === 'Invalid time value') return {status: 422, error: 'invalid date string'}
      return {status: 500, error: error.message}
    }
  }

}

// export a singleton instance
const vehicles = new Vehicles()
Object.freeze(vehicles)
export default vehicles