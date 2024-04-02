const express = require('express');
const app = express();

app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(express.json());
app.use(express.static('public'));
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

var eventos = [
	{
		id: 1,
		nomeEvento: 'Jão SUPERTUNÊ',
		dataEvento: '06-04-2024',
		horaEvento: '22:00',
	},
	{
		id: 2,
		nomeEvento: 'IMPROVÁVEL - BARBIXAS',
		dataEvento: '30-03-2024',
		horaEvento: '19:00',
	},
	{
		id: 3,
		nomeEvento: 'SEPULTURA',
		dataEvento: '08-08-2024',
		horaEvento: '20:00',
	},
];

var proximoId = 4;

app.get('/', (req, res) => {
	res.redirect('eventos');
});

app.get('/eventos/novo', (req, res) => {
	res.render('forms', { cadastroOuAtt: true });
});

app.get('/eventos/:id', (req, res) => {
	const id = parseInt(req.params.id);

	const evento = eventos.find((evento) => evento.id === id);

	res.render('evento', { evento, cadastroOuAtt: true });
});
app.get('/eventos/:id/atualizar', (req, res) => {
	const id = parseInt(req.params.id);
	const evento = eventos.find((evento) => evento.id === id);
	res.render('forms', {
		evento,
		action: `/eventos/${id}/atualizar`,
		isUpdate: true,
	});
});

app.post('/eventos/:id/atualizar', (req, res) => {
	const id = parseInt(req.params.id);
	const nomeEvento = req.body.nomeEvento;
	const dataEvento = req.body.dataEvento;
	const horaEvento = req.body.horaEvento;

	const index = eventos.findIndex((evento) => evento.id === id);
	eventos[index] = {
		id,
		nomeEvento,
		dataEvento,
		horaEvento,
		cadastroOuAtt: true,
	};

	res.redirect('/');
});

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

/// Excluir evento
app.post('/eventos/excluir/:id', (req, res) => {
	const id = parseInt(req.params.id);

	eventos = eventos.filter((evento) => evento.id !== id);

	res.redirect('/');
});

//Listagem de eventos
app.get('/eventos', (req, res) => {
	res.render('eventos', { eventos });
});

app.listen(3001, () => {
	console.log('Server rodando');
});
