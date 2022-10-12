const mongoose = require('mongoose')


const dbConexion = async () => {
    try {
      await  mongoose.connect(process.env.MONGO_URI_DB)
        console.log("Servidor conectado")
    } catch (error) {
        console.log("Servidor no encontrado", error.mesagge)
    }
}

module.exports = dbConexion