const router = require('express').Router()
const validarJWT = require('../middlewars/validate_token')
const {getTask,postTask,putTask, deleteTask} = require('../controllers/task.controllers')

router.get('/task', validarJWT, getTask)
router.post('/task', validarJWT, postTask)
router.put('/task/:id', validarJWT, putTask)
router.delete('/task/:id', validarJWT, deleteTask)

module.exports = router


