
// Path auth
// host + /api/auth


const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { RegisterUser, LoginUser, TokenRevalid } = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/field-validator');
const { valdateJWT } = require('../middlewares/validate-jwt');

router.post(
    '/register',
    [
        check('name', 'el nombre es obligatorio').not().isEmpty(),
        check('name', 'El nombre debe tener un largo minimo de 3 caracteres').isLength({ min: 3 }),
        check('email', 'el email es obiligatorio').isEmail(),
        check('password', ' debe ser de 6 caracteres').isLength({ min: 6 }),
        fieldValidator

    ],
    RegisterUser);

router.post(
    '/',
    [
        check('email', 'el email es obligatorio').isEmail().normalizeEmail(),
        check('password', 'la password debe ser de 6 caracteres').isLength({ min: 6 }),
        fieldValidator

    ],
    LoginUser);

router.get('/renew', valdateJWT, TokenRevalid);


module.exports = router;
