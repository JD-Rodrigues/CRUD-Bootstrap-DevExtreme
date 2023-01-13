const {read} = require('./queries.js')
const {remove} = require('./queries.js')
const {create} = require('./queries.js')
const {update} = require('./queries.js')

const express = require('express')

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

module.exports = {router}