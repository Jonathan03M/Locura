const express = require('express')
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')
require('dotenv').config()
const app = express()
const bodyparser = require('body-parser')

const initDB = require('./db/conexion')
initDB()


app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(bodyparser.urlencoded({ extended: false}))
app.use(bodyparser.json())

const authRoutes = require('./routes/user.routes')
const admin = require('./middlewars/admin');
const validacion = require('./middlewars/validate_token');



app.use('/api/user', authRoutes)
app.use('/api/admin', validacion, admin)

app.use(require('./routes/task.routes'))


const PORT = process.env.port || 3000
app.listen(PORT, ()=> {
    console.log(`Servidor encontrado en el puerto ${PORT}`)
})