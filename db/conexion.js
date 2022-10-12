const mongoose = require('mongoose')


const dbConexion = async () => {
    try {
      await  mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@ipf2022.co4jpdm.mongodb.net/juju?retryWrites=true&w=majority`)
        console.log("Servidor conectado")
    } catch (error) {
        console.log("Servidor no encontrado", error.mesagge)
    }
}

module.exports = dbConexion