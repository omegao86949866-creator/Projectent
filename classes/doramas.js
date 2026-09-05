const Scraper = require('./scraper')

class Dorama extends Scraper{
    url= 'https://doramasonline.net/br/generos/dublado/';

    constructor(axios,cheerio){
        super(axios,cheerio);
    }

    async listarDoramas() {
      try {
        // 1. Busca o HTML
        const { data } = await this.axios.get(this.url);
        // 2. Carrega o HTML no Cheerio
        const $ = this.cheerio.load(data);
        // 3. Extrai dados usando seletores CSS
    const dados = $.extract({
      titulo: ['div.data h3 a'],
      img:[{
        selector: 'div.poster img',
        value:'src'
      }],
        url:[ {
        selector: 'div.data h3 a',
        value:'href'
      }],
    });
    
    let episodes = []
    let estruture = {}
    for(let i = 0; i<= dados.titulo.length-1;i++){
        estruture = {
            title:dados.titulo[i],
            src:dados.img[i],
            url:dados.url[i]
        };
        episodes.push(estruture);
        estruture = {}
    }
    
        return episodes;
      } catch (error) {
        console.error(error);
      }
    }

    async filtrarAnimes(){

    }

    async informe(url) {
      try {
        // 1. Busca o HTML
        const { data } = await this.axios.get(url);
        // 2. Carrega o HTML no Cheerio
        const $ = this.cheerio.load(data);
        // 3. Extrai dados usando seletores CSS
    const dados = $.extract({
        titulo: ['div.data h1'],
        genres: ['div.sgeneros a'],
        sinopse: 'div.wp-content p',
        epsisodios: ['div.episodiotitle a'],
        img: {
          selector: 'div.poster img',
          value: 'src'
        },
        url: [{
          selector: 'div.episodiotitle a',
          value: 'href'
        }],
      });
        
        return dados;
      } catch (error) {
        console.error(error);
      }
    }


        async assistirvideo(url) {
  try {
    // 1. Busca o HTML
    const { data } = await this.axios.get(url);
    // 2. Carrega o HTML no Cheerio
    const $ = this.cheerio.load(data);
    // 3. Extrai dados usando seletores CSS
const dados = $.extract({
  video:{
    selector: 'iframe.metaframe.rptss.no-lazy',
    value:'src'
  },
  html:'div.dooplay_player'
});
$('header').remove();
$('ins').remove();
$('aside').remove();
$('div.item a').remove();
$('div.dt_social_single').remove();
$('input').remove();
$('textarea').remove();
$('h3').remove();
$('.comments-area').remove();
$('.sheader').remove();
$('.copy').remove();
$('.sidebar').remove();
$('.sbox').remove();
$('.fcmpbox').remove();
$('.module_single_ads').remove();
$('link[type=image/x-icon]').remove();

const text = $('html');
    return text.html();
  } catch (error) {
    console.error(error);
  }
}

async search(title) {
  try {
    // 1. Busca o HTML
    const { data } = await this.axios.get(`https://doramasonline.net/?s=${title}`);
    // 2. Carrega o HTML no Cheerio
    const $ = this.cheerio.load(data);
    // 3. Extrai dados usando seletores CSS
const dados = $.extract({
  titulo: ['div.result-item article div.title'],
  img:[ {
    selector: 'div.result-item article div.image div.thumbnail a img',
    value:'src'
  }],
    url:[ {
    selector: 'div.result-item article div.title a',
    value:'href'
  }],
});

let episodes = []
let estruture = {}
for(let i = 0; i<= dados.titulo.length-1;i++){
    estruture = {
        title:dados.titulo[i],
        src:dados.img[i],
        url:dados.url[i]
    };
    episodes.push(estruture);
    estruture = {}
}

    return episodes;
  } catch (error) {
    console.error(error);
  }
}
}

 module.exports= Dorama;

