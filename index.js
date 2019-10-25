const express = require('express');
const bodyParser = require('body-parser');
const conection = require('./database/database');
const pergunta = require('./model/Pergunta');
const resposta = require('./model/Resposta');

//Database connect
conection
  .authenticate()
  .then(() => {
    console.log('Conexão feita com o banco de dados mysql');
  }).catch((msgError) => {
    console.log('Error');
  });

// Instancia o pacote express na variavel app
const app = express();

// Express use o EJS como view engine para exibir html
app.set('view engine', 'ejs');

// Use arquivos estaticos na pasta public
app.use(express.static('public'));

// body-parser para receber os dados do ejs e passar ao express
app.use(bodyParser.urlencoded({extended: false}));
// Ler dados de formulário via JSON
app.use(bodyParser.json());

// Rota para a home do projeto
app.get('/', (req, res) => {
  //SELECT * FROM perguntas
  pergunta.findAll({row: true, order: [
    //ordena os dados exibidos por ID na ordem decrescente
    ['id', 'DESC'] //DESC ou ASC, pelo titulo ordena por letras alfabéticas
  ]}).then(perguntas => {
    res.render('index', {
      perguntas: perguntas
    });
  });
});

app.get('/perguntar', (req, res) => {
  res.render('perguntar');
})

// Recebe os dados enviados pelo formulário
app.post('/salvarpergunta', (req, res) => {
  //pega os dados passados pelo formulário
  const titulo = req.body.titulo;
  const desc = req.body.desc;

  //Responsavel em salvar os dados passado para o banco
  pergunta.create({
    // as key é referente aos nomes das tabelas do banco. e value é o dado inserido
    titulo: titulo,
    description: desc
  }).then(() => {
    // Redireciona o user para a HOME
    res.redirect('/')
  });
});

app.get('/pergunta/:id', (req, res) => {
  const id = req.params.id;
  pergunta.findOne({
    //busca na DB por id
    where: {id: id},
  }).then(pergunta => {
    if(pergunta != undefined) {

      resposta.findAll({ 
        where: { perguntaId: pergunta.id },
        order: [['id', 'DESC']]
      }).then(resposta => {
        res.render('pergunta', {
          pergunta: pergunta,
          resposta: resposta
        });
      });
    }else {
      res.redirect('/');
    }
  });
});

app.post('/responder', (req, res) => {
  const corpo = req.body.corpo;
  const perguntaId = req.body.perguntaId;
  resposta.create({
    corpo: corpo,
    perguntaId: perguntaId
  }).then(() => {
    // redireciona para página pergunta/id
    res.redirect('/pergunta/' + perguntaId);
  });
});

// Lista a porta em uso e ser rodou o servidor nodejs
app.listen(3000, () => {
  console.log('Rodando na porta 3000')
});