const { response } = require('express');
const EventModel = require('../models/EventModel');



const getEvents = async(req, res = response) => {

    const event = await EventModel.find()
                                    .populate('user','name');


    try {

        res.status(200).json({

            ok: true,
            msg: event


        })

    } catch (error) {
        console.log(error)

        res.status(400).json({

            ok: false,
            msg: 'Hubo un error en los datos puede que no exista ese evento'
        })

    }

}

const createEvent = async (req, res = response) => {

    const event = new EventModel(req.body);

    try {

        event.user = req.uid;

        const eventSave= await event.save();

        res.status(201).json({
            ok: true,
            msg: 'Evento creado correctamente',
            eventSave



        });

    } catch (error) {
        console.log(error)

        res.status(500).json({

            ok: false,
            msg: 'Hable con el admin'
        });
    }



}
const updateEvent = async (req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;



    try {

        const event = await EventModel.findById( eventId);


        if(!event ){

            res.status(404).json({
                ok: false,
                msg:'Evento no existe con esta id'
            });
        }

        if( event.user.toString() !== uid ){

            return res.status(401).json({

                ok: false,
                msg:'No tiene privilegios para editar este evento'
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const eventUpdate = await EventModel.findByIdAndUpdate( eventId, newEvent, {new: true });

        res.json({
            ok:true,
            evento: eventUpdate
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }



}


const deleteEvent = async (req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;



    try {

        const event = await EventModel.findById( eventId);


        if(!event ){

            return res.status(404).json({
                ok: false,
                msg:'Evento no existe con esta id'
            });
        }

        if( event.user.toString() !== uid ){

            return res.status(401).json({

                ok: false,
                msg:'No tiene privilegios para eliminar este evento'
            })
        }

        

        const eventDelete = await EventModel.findByIdAndDelete( eventId);

        res.json({
            ok:true,
            evento: eventDelete,
            msg:'evento eliminado correctamente'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }



}


module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent

}