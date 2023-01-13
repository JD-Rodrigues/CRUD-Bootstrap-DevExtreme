const {router} = require('./routes.cjs')

const express = require('express')
const cors = require('cors')

const port = process.env.PORT || 3000;

const app = express()

app.use(cors({origin: '*'}))
app.use(express.json())
app.use(router)

app.use(express.urlencoded({extended: true}))

app.listen(port, ()=>console.info('Server ON in port '+ port))