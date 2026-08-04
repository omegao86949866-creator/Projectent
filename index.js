const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const Dorama = require('./classes/doramas');
const Anime = require('./classes/animes');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'))
//et muro = new scrap(axios,cheerio)
const  doramas = new Dorama(axios,cheerio)
const animes = new Anime(axios,cheerio); 


// Página inicial
app.get('/', async (req, res) => {
    const dados = await animes.listarUtilmosEpisodios();
    res.render('index',{dados:dados})
});

// lancamentos
app.get('/lancamentos', async (req, res) => {
    const dados = await animes.listarAnimesEmLancamentos();
res.render('lancamentos',{dados:dados})
});

// info
app.get('/info', async (req, res) => {
    const url = req.query.url
    const dados = await animes.informe(url);
    res.render('info',{dados:dados})
});

// Doramas
app.get('/doramas', async (req, res) => {
    const dados = await doramas.listarDoramas();
    res.render('doramas',{dados:dados})
});

// info Doramas
app.get('/infodorama', async (req, res) => {
    const url = req.query.url
    const dados = await doramas.informe(url);
res.render('infodorama',{dados:dados})
});

// info Doramas
app.get('/assistirdorama', async (req, res) => {
    const url = req.query.url
    const dados = await doramas.assistirvideo(url);
res.send(dados)
});

app.get('/assistirdorama2', async (req, res) => {
    const url = req.query.url
    const dados = await doramas.assistirvideo(url);
    res.render('assistirdorama2',{dados:url})
});

// Pesquisar Doramas
app.get('/pesquisardorama', async (req, res) => {
  const requisition = req.query.s;
  let newReq = '';

  if(!(requisition == undefined)){
    newReq = requisition.replace(/ /g, '+');
  }
  console.log(newReq);

    const dados = await doramas.search(newReq);
    console.log(dados) 

  res.render('pesquisarDorama', { dados: dados});
});

// Generos
app.get('/generos', async (req, res) => {
    const dados = await animes.listarGeneros();
res.render('categories',{dados:dados})
});

app.get('/genero/:params', async (req, res) => {
    const parametre = req.params
    const dados = await animes.filtrarGenero(parametre.params);
res.render('resultCategorie',{dados:dados})
});

//search
app.get('/search',async(req, res) => {
  const requisition = req.query.s;
  let newReq = '';

  if(!(requisition == undefined)){
    newReq = requisition.replace(/ /g, '+');
  }
  const [dados, generos] = await Promise.all([
    animes.search(newReq),
    animes.listarGeneros()
  ]);
  res.render('searchPage', { dados: dados, generos: generos });
});

//assistir
/*app.get('/assistir',async(req, res) => {
    const url = req.query.url

const dados = await animes.assistirvideo(url);
console.log(dados);
res.render('assistir',{dados:dados})
});
*/

app.get('/assistir', async (req, res) => {
    const url = req.query.url
    const dados = await animes.assistirvideo(url);
    console.log(dados);
res.render('assistir',{dados:dados})
});

//sobre
app.get('/sobre',(req,res)=>{
    res.render('sobre')
})

app.listen(5000, '0.0.0.0', () => {
    console.log('Servidor rodando na porta 5000');
});
