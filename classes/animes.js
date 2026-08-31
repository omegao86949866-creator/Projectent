const Scraper = require('./scraper');

class Animes extends Scraper{
    url = 'https://animesonline.cloud/';

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
          titulo: ['article.item div.data h3'],
          img:[ {
            selector: 'article.item div.poster img',
            value:'src'
          }],
            url:[ {
            selector: 'article.item div.data h3 a',
            value:'href'
          }],
        });
        
        let episodes = []
        let estruture = {}
        for(let i = 0; i<= 5;i++){
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
     for(let i = 0; i<= 19;i++){
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
            // 1. Busca o HTML
            const { data } = await axios.get('https://animesdigital.org/search/'+title);
            // 2. Carrega o HTML no Cheerio
            const $ = cheerio.load(data);
            // 3. Extrai dados usando seletores CSS
        const dados = $.extract({
          titulo: ['div.itemA a[title] div.title span.title_anime'],
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
        epsisodio: ['h3.episode-title'],
        img: {
          selector: 'div.poster img',
          value: 'src'
        },
        url: [{
          selector: 'div.episode-card a',
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
    const { data } = await this.axios.get(`https://topanimes.net/?s=${title}`);
    // 2. Carrega o HTML no Cheerio
    const $ = this.cheerio.load(data);
    // 3. Extrai dados usando seletores CSS
const dados = $.extract({
  titulo: ['result-item article div.title'],
  epsisodio: ['div.listupd article div.bsx a div.tt h2'],
  img:[ {
    selector: 'div.listupd article div.bsx a div.limit img',
    value:'src'
  }],
    url:[ {
    selector: 'div.listupd article div.bsx a',
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
    selector: 'source',
    value:'src'
  },
});

    console.log(dados);
    return dados;
  } catch (error) {
    console.error(error);
  }
}
}

module.exports = Animes;
