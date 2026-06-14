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
    console.log(dados)
res.render('index',{dados:dados})
});

// lancamentos
app.get('/lancamentos', async (req, res) => {
    const dados = await animes.listarAnimesEmLancamentos();
res.render('index',{dados:dados})
});

// info
app.get('/info', async (req, res) => {
    const url = req.query.url
    console.log(url)
    const dados = await animes.informe(url);
res.render('info',{dados:dados})
});

// Doramas
app.get('/doramas', async (req, res) => {
    const dados = await doramas.listarDoramas();
res.render('doramas',{dados:dados})
});

// Generos
app.get('/generos', async (req, res) => {
    const dados = await animes.listarGeneros();
    console.log(dados)
res.render('categories',{dados:dados})
});

app.get('/genero/:params', async (req, res) => {
    const parametre = req.params
    const dados = await animes.filtrarGenero(parametre.params);
    console.log(dados)
res.render('resultCategorie',{dados:dados})
});

//search
app.get('/search',async(req, res) => {
  const requisition = req.query.title;
  let newReq = '';

  if(!(requisition == undefined)){
    newReq = requisition.replace(/ /g, '+');
  }
const dados = await animes.search(newReq);
res.render('searchPage',{dados:dados})
});

//assistir
app.get('/assistir',async(req, res) => {
    const url = req.query.url

const dados = await animes.assistirvideo(url);

res.render('assistir',{dados:dados})
});

//sobre
app.get('/sobre',(req,res)=>{
    res.render('sobre')
})

app.listen(3000, () => {
    console.log('Servidor rodando');
});
