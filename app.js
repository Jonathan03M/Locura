const express = require('express')
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')

const app = express()


app.use(express.json())
app.use(cors())
app.use(morgan())

app.listen()