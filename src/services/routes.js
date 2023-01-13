import { read } from './queries.js'
import { remove } from './queries.js'
import { update } from './queries.js'
import { create } from './queries.js'
import express from 'express'

const router = express.Router()

router.get('/', async (req, res) => {
  const data = await read()
  return res.json(
    data
  )
})

router.delete('/:id', async (req, res)=> {
  await remove(req.params.id )
  res.send(`status: ${res.statusMessage}`)
})

router.post('/', async (req, res)=> {
  await create(req.body.data )
  res.send(`status: ${res.statusCode}`)  
})

router.put('/:id', async (req, res)=> {
  await update(req.params.id, req.body.data )
  res.send(`status: ${res.statusMessage}`)
})

export default router