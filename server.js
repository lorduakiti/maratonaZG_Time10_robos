// const path = require('path');
const express = require('express');
var routes = express.Router(),
	bodyParser = require('body-parser'),
	swaggerUi = require('swagger-ui-express'),
	swaggerDocument = require('./swagger.json');
// var https = require("https");
// var options = {
// 	key  : fs.readFileSync("my.= private.key"),
// 	cert : fs.readFileSync("my.certificate.cer")
// };

var ProcessaConsolidacao = require('./automacoes/ProcessaConsolidacao');

const port = 3000;




// Iniciando o App
const app = express(); //rest API requirements
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());


// Primeira rota
app.get('/', (req, res) => {
	console.log('rota padrão');
	//res.send('Olá!');
	let dateNow = new Date();
	res.status(200).json({status: 'Servidor está online!', dateTime: dateNow});
})

// Teste de API
app.get('/teste', (req, res, next) => {
	console.log('rota de teste');

	return res.status(200).json( {rowsCount: 0, data: ''} );
});


// Documentação swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Teste rotas
routes.get('/', (req, res) => {
    res.send('Online!');
});

// Implementando rotas de processamento
//./prestadores/ERPMariaPenha
routes.get('/processamentos', ProcessaConsolidacao.list);

routes.post('/processamento/start', ProcessaConsolidacao.start);

routes.post('/processamento/stop', ProcessaConsolidacao.stop);

routes.get('/processamento/status', ProcessaConsolidacao.status);


app.use('/api/v1', routes);

//app.listen(port);
app.listen(port, () => {
	console.info(`Servidor rodando em localhost: ${port}`);
});
// https.createServer(options, app).listen(port, function () {
// 	console.log("Server started @ %s!", port);
// });
module.exports = app;