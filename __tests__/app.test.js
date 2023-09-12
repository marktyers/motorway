
/* app.test.js */

import app from '../build/app.js'
import supertest from 'supertest'

const api = supertest(app)

describe('checking valid and invalid car ids', () => {
  it("200 response for valid car id", async () => {
    const response = await api.get("/vehicles/3")
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('vehicle')
  })
  it("404 response for invalid car id", async () => {
    const response = await api.get("/vehicles/4")
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')
  })
  it("404 response for car id 0", async () => {
    const response = await api.get("/vehicles/0")
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')
  })
})

describe('checking date ranges for car 3', () => {
  it("returns status 404 if date before being added", async () => {
    const response = await api.get("/vehicles/3?date=2022-09-10 09:11:45")
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')
  })
  it("returns status 200 if date just after quoted", async () => {
    const response = await api.get("/vehicles/3?date=2022-09-11 09:12:45")
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('vehicle')
    expect(response.body.vehicle.state).toEqual('quoted')
  })
  it("returns status 200 if date just after selling", async () => {
    const response = await api.get("/vehicles/3?date=2022-09-11 23:21:38")
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('vehicle')
    expect(response.body.vehicle.state).toEqual('selling')
  })
  it("returns status 200 if date just after sold", async () => {
    const response = await api.get("/vehicles/3?date=2022-09-12 12:41:41")
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('vehicle')
    expect(response.body.vehicle.state).toEqual('sold')
  })
  it("returns status 200 and latest state if no date", async () => {
    const response = await api.get("/vehicles/3")
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('vehicle')
    expect(response.body.vehicle.state).toEqual('sold')
  })
})

describe('malformed date strings', () => {
  it("returns status 422 if malformed date", async () => {
    const response = await api.get("/vehicles/3?date=foobar")
    expect(response.status).toBe(422)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toEqual('invalid date string')
  })
  it("can hande date strings without time", async () => {
    const response = await api.get("/vehicles/3?date=2022-09-12")
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('vehicle')
    expect(response.body.vehicle.state).toEqual('selling')
  })
})
