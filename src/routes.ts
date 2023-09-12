
/* routes.ts */

import { Router } from 'express'

import vehicles from './vehicles.js'
import { Response } from './interfaces.js'

const router = Router()

router.get('/vehicles/:id', async (req, res) => {
  const id: number = parseInt(req.params.id)
  const suppliedDate: string = req.query.date as string ?? ""
  const response: Response = await vehicles.findByIdAndDate(id, suppliedDate)
  res.status(response.status).json({ vehicle: response.vehicle, error: response.error })
})

export default router
