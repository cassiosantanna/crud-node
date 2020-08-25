const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const handlebars = require('express-handlebars')
const app = express()


// Tamplate engine
app.engine("handlebars", handlebars ({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')


// Routes and tamplate
app.get('/', function(req, res) {
    res.render('index')
})

//start server
app.listen(3000, function(req, res) {
    console.log('Servidor Rodando')
})
