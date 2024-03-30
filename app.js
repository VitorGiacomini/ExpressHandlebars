const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

var eventos = [
	{
		id: 1,
		nomeEvento: 'Calourada IFMS',
		dataEvento: '30-03-2024',
		horarioEvento: '00:00',
	},
];

var proxEvento = 2;

app.get('/', (req, res) => {
	res.render('paginaInicial');
});
app.get('/eventos/novo', (req, res) => {
	res.render('cadastroEventos');
});

app.post('/eventos/novo', (req, res) => {
	const nomeEvento = req.body.nomeEvento;
	const dataEvento = req.body.dataEvento;
	const horarioEvento = req.body.horarioEvento;

	eventos.push({
		id: proxEvento++,
		nomeEvento: nomeEvento,
		dataEvento: dataEvento,
		horarioEvento: horarioEvento,
	});
	res.redirect('/');
});
app.get('/eventos', (req, res) => {
	res.render('eventos', { eventos });
});

app.listen(3000, () => {
	console.log('Server rodando');
});
