const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const handlebars = require('express-handlebars')
const app = express()
const urlencodeParser = bodyParser.urlencoded({extended:false})
const sql = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306
})
sql.query("use crud_node")

// Tamplate engine
app.engine("handlebars", handlebars ({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use('/css', express.static('css'))
app.use('/js', express.static('js'))
app.use('/img', express.static('img'))


// Routes and tamplate
app.get('/', function(req, res) {
    res.render('index')
})

app.get('/inserir', function(req, res) {
    res.render('inserir')
})

app.post("/controllerForm", urlencodeParser, function (req, res) {
    sql.query("insert into usuarios values (?,?,?)", [req.body.id, req.body.nome, req.body.idade])
    res.render('controllerForm', {name: req.body.nome})
})

//start server
app.listen(3000, function(req, res) {
    console.log('Servidor Rodando')
})
