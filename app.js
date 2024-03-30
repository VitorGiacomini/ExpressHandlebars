const express = require('express');
const app = express();

app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(express.json());

const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

var eventos = [
	{
		id: 1,
		nomeEvento: 'Ana Gonçalves da Silva',
		dataEvento: 'ana.silva',
		horaEvento: '',
	},
	{
		id: 2,
		nomeEvento: 'Pedro Bittencurt',
		dataEvento: 'pedro_bittencurt',
		horaEvento: '',
	},
	{
		id: 3,
		nomeEvento: 'Alex Bastos de Souza',
		dataEvento: 'alex.bsouza',
		horaEvento: '',
	},
];

var proximoId = 4;

//Home
app.get('/', (req, res) => {
	res.redirect('/eventos');
});

//Cadastro de usuário (GET)
app.get('/eventos/novo', (req, res) => {
	res.render('formCadastroEventos');
});

//Ver usuário específico
app.get('/eventos/:id', (req, res) => {
	const id = parseInt(req.params.id);

	const evento = eventos.find((user) => user.id === id);

	res.render('evento', { evento });
});

//Cadastro de usuário (POST)
app.post('/eventos/novo', (req, res) => {
	const nomeEvento = req.body.nomeEvento;
	const dataEvento = req.body.dataEvento;
	const horaEvento = req.body.horaEvento;

	eventos.push({
		id: proximoId++,
		nomeEvento: nomeEvento,
		dataEvento: dataEvento,
		horaEvento: horaEvento,
	});

	res.redirect('/');
});

//Listagem de usuários
app.get('/eventos', (req, res) => {
	res.render('eventos', { eventos });
});

app.listen(3000, () => {
	console.log('Server rodando');
});
