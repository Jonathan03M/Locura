const { model, Schema } = require('mongoose');


const TasksSchema = Schema({ 
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    isActive:{
        type: Boolean,
        default: true
    },
    userId: {
        type: Schema.Types.ObjectId, ref: 'User'
    }
}, {
 timestamps: true,
 versionKey: false
});


module.exports = model('Tasks', TasksSchema);