
/* performance.test.js */

import app from '../build/app.js'
import supertest from 'supertest'

const api = supertest(app)

describe('response times', () => {
  it("first request should respond in under 40ms", async () => {
    const response = await api.get("/vehicles/2")
    expect(response.body.vehicle.dbms).toBeLessThan(40.0)
  })
  it("subsequent request should be faster", async () => {
    let response
    response = await api.get("/vehicles/3?date=2022-09-11 23:21:38")
    const run1 = response.body.vehicle.dbms
    response = await api.get("/vehicles/3?date=2022-09-11 23:21:38")
		console.log(run1, response.body.vehicle.dbms)
    expect(response.body.vehicle.dbms).toBeLessThan(run1)
  })
})
