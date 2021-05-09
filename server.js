const express = require('express');
const mysql = require("mysql");
const myconn = require("express-myconnection");
const app = express();
const routes = require('./routes');
const dbOptions = {
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : '',
    database : 'sneakerpop'
}
// Config
app.set('port', process.env.PORT || 9000);

//Middlewares
app.use(myconn(mysql, dbOptions, "single"));
app.use(express.json());
// Router Api
app.use('/api', routes);


app.listen(app.get('port'),()=>{
    console.log("El server esta iniciado", app.get('port'));
});