const express = require('express');
const mysql = require("mysql");
const myconn = require("express-myconnection");

const app = express();
// Config
app.set('port', process.env.PORT || 9000);

app.listen(app.get('port'),()=>{
    console.log("El server esta iniciado", app.get('port'));
});
// Routes 
app.get('/',(req,res)=>{
    res.send('Inicio de la api')
})