const Tasks = require('../models/task')

ctrlTask = {} 


ctrlTask.getTask = async (req, res) => {
    const tarea = await Tasks.find({ isActive: true });
    return res.json(tarea)
}

ctrlTask.postTask = async (req,res) =>  {
    const {titulo, descripcion} = req.body


    const nuevatarea = new Tasks ({
        titulo,
        descripcion
    })

    try {
        const tarea = await nuevatarea.save()
        return res.json('Tarea guardada correctamente')
    } catch (err) {
        console.log(err)
    }
}

ctrlTask.putTask = async (req, res) => {
    const id = req.params.id;
    const { titulo, descripcion } = req.body;

    if (!id || !descripcion || !titulo) {
        return res.status(400).json({
            msg: 'No viene id en la petición',
        });
    };

    try {
        const tareaActualizada = await Tasks.findByIdAndUpdate(id, { titulo, descripcion })

        return res.json({
            msg: 'Tarea actualizada correctamente',
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            msg: 'Error al actualizar la tarea'
        })
    }
};

ctrlTask.deleteTask = async (req, res) => {
    const id = req.params.id;

    try {
        await Tasks.findByIdAndUpdate(id, { isActive: false })
        return res.json('Tarea eliminada correctamente');
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            msg: 'Error al eliminar la tarea'
        });
    }
};


module.exports = ctrlTask