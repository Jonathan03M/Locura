
const {model, Schema} = require('mongoose')

const userSchema = new Schema({
    usuario: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
 timestamps: true,
 versionKey: false
});

module.exports = model('user', userSchema);