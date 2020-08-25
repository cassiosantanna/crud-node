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

app.get('/select/:id?', function(req, res) {
    if(!req.params.id) {
        sql.query("select * from usuarios order by id asc", function(err, results, fields) {
            res.render('select', {data:results})
        })
    } else {
        sql.query("select * from usuarios where id=? order by id asc", [req.params.id], function(err, results,fields){
            res.render('select', {data:results})
        })
    }
})

app.post("/controllerForm", urlencodeParser, function (req, res) {
    sql.query("insert into usuarios values (?,?,?)", [req.body.id, req.body.nome, req.body.idade])
    res.render('controllerForm', {name: req.body.nome})
})

//start server
app.listen(3000, function(req, res) {
    console.log('Servidor Rodando')
})
