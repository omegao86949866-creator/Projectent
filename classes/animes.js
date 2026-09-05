const Scraper = require('./scraper');

class Animes extends Scraper{
    url = 'https://animesonlinehdk.com/';

    constructor(axios,cheerio){
       super(axios,cheerio) 
    }

    async listarUtilmosEpisodios() {
        try {
            // 1. Busca o HTML
            const { data } = await this.axios.get(this.url);
            // 2. Carrega o HTML no Cheerio
            const $ = this.cheerio.load(data);
            // 3. Extrai dados usando seletores CSS
        const dados = $.extract({
          titulo: ['div.items.normal article.item.tvshows div.data h3'],
          img:[ {
            selector: 'div.items.normal article.item.tvshows div.poster img',
            value:'src'
          }],
            url:[ {
            selector: 'div.items.normal article.item.tvshows div.poster a',
            value:'href'
          }],
        });
        
        let episodes = []
        let estruture = {}
        for(let i = 0; i<= 10;i++){
            estruture = {
                title:dados.titulo[i],
                src:dados.img[i],
                url:dados.url[i]
            };
            episodes.push(estruture);
            estruture = {};
        }   
            console.log(episodes)    
            return episodes;
          } catch (error) {
            console.error(error);
          }
        }

    async listarGeneros(){
         try {
        // 1. Busca o HTML
        const { data } = await this.axios.get(`${this.url}generos`);
        // 2. Carrega o HTML no Cheerio
        const $ = this.cheerio.load(data);
        // 3. Extrai dados usando seletores CSS
        const dados = $.extract({
            titulo: ['ul.glossary li span'],
             url:[ {
                selector: 'ul.genres li a',
                value:'href'
                }],
                });
    
    let episodes = []
    let estruture = {}
    for(let i = 0; i<= dados.titulo.length-1;i++){
        estruture = {
            title:dados.titulo[i],
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

    async filtrarGenero(param){
 try {
            // 1. Busca o HTML
            const { data } = await this.axios.get(`${this.url}genero/${param}`);
            // 2. Carrega o HTML no Cheerio
            const $ = this.cheerio.load(data);
            // 3. Extrai dados usando seletores CSS
        const dados = $.extract({
          titulo: ['div.itemA a[title] div.title span.title_anime'],
          img:[ {
            selector: 'div.itemA a[title] div.thumb img[title]',
            value:'src'
          }],
            url:[ {
            selector: 'div.itemA a[title]',
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
    
    async listarAnimesEmLancamentos() {
     try {
         // 1. Busca o HTML
         const { data } = await this.axios.get(this.url);
         // 2. Carrega o HTML no Cheerio
         const $ = this.cheerio.load(data);
         // 3. Extrai dados usando seletores CSS
     const dados = $.extract({
       titulo: ['div.animation-2 article.item div.data h3'],
       epsisodio: ['div.animation-2 article.item a div.limit div.bt div.btx'],
       img:[ {
         selector: 'div.animation-2 article div.poster img',
         value:'src'
       }],
         url:[ {
         selector: 'div.animation-2 article.item div.poster div.season_m a',
         value:'href'
       }],
     });
     
     let episodes = []
     let estruture = {}
     for(let i = 0; i<= 10;i++){
         estruture = {
             title:dados.titulo[i],
             episode:dados.epsisodio[i],
             src:dados.img[i],
             url:dados.url[i]
         };
         episodes.push(estruture);
         estruture = {}
     }
     console.log(episodes)
         return episodes;
       } catch (error) {
         console.error(error);
       }
    }

    async filtrarTitulo(){
        try {
          const { data } = await axios.get(this.url+'s='+title);
            // 1. Busca o HTML
            // 2. Carrega o HTML no Cheerio
            const $ = cheerio.load(data);
            // 3. Extrai dados usando seletores CSS
        const dados = $.extract({
          titulo: ['div.result-item a[title] div.title span.title_anime'],
          epsisodio: ['div.itemA a[title] div.title span.number'],
          img:[ {
            selector: 'div.itemA a[title] div.thumb img[title]',
            value:'src'
          }],
            url:[ {
            selector: 'div.itemA a[title]',
            value:'href'
          }],
        });
        
        let episodes = []
        let estruture = {}
        for(let i = 8; i<= dados.titulo.length-1;i++){
            estruture = {
                title:dados.titulo[i],
                episode:dados.epsisodio[i],
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

    async informe(url) {
      try {
        // 1. Busca o HTML
        const { data } = await this.axios.get(url+'#episodes');
        // 2. Carrega o HTML no Cheerio
        const $ = this.cheerio.load(data);
        // 3. Extrai dados usando seletores CSS
    const dados = $.extract({
        titulo: ['div.data h1'],
        info: ['div.extra span.date'],
        genre: ['div.sgeneros'],
        sinopse: 'div.wp-content p',
        epsisodio: ['ul.episodios li div.episodiotitle a'],
        img: {
          selector: 'div.poster img',
          value: 'src'
        },
        url: [{
          selector: 'ul.episodios li div.episodiotitle a',
          value: 'href'
        }],
      });
        return dados;
      } catch (error) {
        console.error(error);
      }
    }

    async search(title) {
  try {
    // 1. Busca o HTML
    const { data } = await this.axios.get(`${this.url}?s=${title}`);
    // 2. Carrega o HTML no Cheerio
    const $ = this.cheerio.load(data);
    // 3. Extrai dados usando seletores CSS
const dados = $.extract({
  titulo: ['div.result-item article div.details div.title a'],
  epsisodio: ['div.result-item article div.bsx a div.tt h2'],
  img:[ {
    selector: 'div.result-item article div.image div a img',
    value:'src'
  }],
    url:[ {
    selector: 'div.result-item article div.details div.title a',
    value:'href'
  }],
});

let episodes = []
let estruture = {}
for(let i = 0; i<= dados.titulo.length-1;i++){
    estruture = {
        title:dados.titulo[i],
        episode:dados.epsisodio[i],
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

async assistirvideo(url) {
  try {
    // 1. Busca o HTML
    const { data } = await this.axios.get(url);
    // 2. Carrega o HTML no Cheerio
    const $ = this.cheerio.load(data);
    // 3. Extrai dados usando seletores CSS
const dados = $.extract({
  title:'iframe',
    img:{
    selector: 'div.div-mypopads-protector-iframe img',
    value:'src'
  },
  link:{
    selector: 'div.div-mypopads-protector-iframe a',
    value:'href'
  },
    video:{
    selector: 'iframe.metaframe',
    value:'src'
  },
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
console.log(text.html());
    return text.html();
   // console.log(dados);
  //return dados;
  } catch (error) {
    console.error(error);
  }
}
}

module.exports = Animes;
