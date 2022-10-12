const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const Joi = require('@hapi/joi');

const schemaRegister = Joi.object({
    usuario: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})


router.post('/login', async (req, res) => {
    // validaciones
    const { error } = schemaLogin.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })
    
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' })


    const token = jwt.sign({
        usuario: user.usuario,
        id: user._id
    }, process.env.TOKEN_SECRET)
    
    res.json({
        error: null,
        data: 'exito bienvenido', 
        token: token
    })
})


router.post('/register', async (req, res) => {

    // validate user
    const { error } = schemaRegister.validate(req.body)
    
    if (error) {
        return res.status(400).json(
            {error: error.details[0].message}
        )
    }

    const existeEmail = await User.findOne({ email: req.body.email });
        if (existeEmail) {
            return res.status(400).json(
        {error: 'Email ya registrado'}
            )
        }

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        usuario: req.body.usuario,
        email: req.body.email,
        password: password
    });
    try {
        const savedUser = await user.save();
        res.json({
            error: null,
            data: savedUser
        })
    } catch (error) {
        res.status(400).json({error})
    }
})

module.exports = router;