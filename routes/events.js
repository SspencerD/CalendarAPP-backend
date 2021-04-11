const { Router } = require("express");
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/events");
const { fieldValidator } = require("../middlewares/field-validator");
const { valdateJWT } = require("../middlewares/validate-jwt");

const router = Router();



// Obtener eventos

router.use(valdateJWT);
// digo que cualquier router que se encuentre abajo requiere está validación

router.get('/', getEvents);


// //Crear nuevo evento
router.post('/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'La fecha de finalización es obligatoria').custom(isDate),

        fieldValidator




    ], createEvent);

// //Update eventos
router.put('/:id', updateEvent);

// //borrar evento
router.delete('/:id', deleteEvent);

module.exports = router;


