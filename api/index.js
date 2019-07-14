const express = require('express');
const bodyParser = require('body-parser');


const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const lodashId = require('lodash-id');


// Crear servidor

const app = express();
app.use('/', express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: true}));

// db

const adapter = new FileSync('db.json');
const db = low(adapter);

db._.mixin(lodashId);

// CORS

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Routes 
// GET

app.get('/api/people/', (req, res) =>{

	const people = db.get('people').value();

	console.log(people);
	res.send(people);
});

app.get('/api/people/:id', (req, res) => {
	console.log(req.params.id);
	const people = db.get('people').find({ id: parseInt(req.params.id)}).value();

	console.log(people);
	res.send(people);
});

// POST

app.post('/api/people/add', (req, res) =>{

	// Revisar
	if(req.body.id == ''){
		var lastId = db.get('people', req.params).value();
		
		var ultimo = lastId[lastId.length-1];

		req.body.id = ultimo.id + 1;
	}

	const people = db.get('people').push(req.body).last().write();

	res.send(people);
});

// PUT

app.put('/api/people/update/:id', (req, res) =>{

	const people = db.get('people').updateById(req.params.id, req.body).write();

	res.send(people);
});

//DELETE

app.delete('/api/people/delete/:id', (req, res) => {

	const people = db.get('people').removeById(req.params.id).write();

	res.send(people);
});

// Inicializar

app.listen(3000, () => console.log("Servidor escuchando en el puerto 3000"));
