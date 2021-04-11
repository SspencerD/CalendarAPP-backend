const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors =require('cors');

// creando sv de express

const app = express();

//Base de datos
dbConnection();

//Cors
app.use(cors());

//Public Directory

app.use( express.static('public'));

// Lectura y parseo del body
app.use(express.json());

// RUTAS
app.use('/api/auth', require('./routes/auth') );
app.use('/api/events', require('./routes/events') );

// Crearemos auth // crear,login ,renew
// CRUD: Eventos 


// escucha peticiones
app.listen( process.env.PORT , ()=> {
    console.log(`Servidor corriendo en puerto ${8080}`)
});

