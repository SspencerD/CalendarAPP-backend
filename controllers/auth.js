const bcrypt = require('bcryptjs');
const { response } = require('express');
const UserModel = require('../models/UserModel');
const { generateJWT } = require('../helpers/jwt');



const RegisterUser = async (req, res = response) => {

    const { email, password } = (req.body);

    try {

        let user = await UserModel.findOne({ email });

        if (user) {

            return res.status(400).json({
                ok: false,
                msg: 'ya hay un usuario con este correo electronico'
            });
        }




        user = new UserModel(req.body);

        //encriptar pass
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        //generar JWT
        const token = await generateJWT(user.id, user.name);



        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin'
        });

    }



}

const LoginUser = async (req, res = response) => {


    const { email, password } = (req.body);

    try {

        const user = await UserModel.findOne({ email });

        if (!user) {

            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe , crealo!'
            });
        }

        //Confirmar pass

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecta'
            });
        }

        // Generar JWT

        const token = await generateJWT(user.id, user.name);


        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin'
        });

    }



}


const TokenRevalid =  async(req, res) => {

    const uid = req.uid;
    const name = req.name;

    //Generar un nuevo jwt
    const token =  await generateJWT(uid, name);

    res.json({
        ok: true,
        uid: req.uid,
        name: req.name,
        token

    })

}


module.exports = {

    RegisterUser,
    LoginUser,
    TokenRevalid,

}