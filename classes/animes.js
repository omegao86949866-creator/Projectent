const Scraper = require('./scraper');

class Animes extends Scraper{
    url = 'https://animesdigital.org/';

    constructor(axios,cheerio){
       super(axios,cheerio) 
    }

    async doScrap(filter) {
        try {
            // 1. Busca o HTML
            const { data } = await axios.get('https://animesdigital.org/home');
            // 2. Carrega o HTML no Cheerio
            const $ = cheerio.load(data);
            // 3. Extrai dados usando seletores CSS
        const dados = $.extract({
          titulo: ['div.itemE a[title] div.title span.title_anime'],
          epsisodio: ['div.itemE a[title] div.title span.number'],
          img:[ {
            selector: 'div.itemE a[title] div.thumb img[title]',
            value:'src'
          }],
            url:[ {
            selector: 'div.itemE a[title]',
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
            console.log(episodes);
        
            return episodes;
          } catch (error) {
            console.error(error);
          }
        }
    
    async listarUtilmosEpisodios() {
      try {
        // 1. Busca o HTML
        const { data } = await this.axios.get(`${this.url}home`);
        // 2. Carrega o HTML no Cheerio
        const $ = this.cheerio.load(data);
        // 3. Extrai dados usando seletores CSS
        const dados = $.extract({
            titulo: ['div.itemE a[title] div.title span.title_anime'],
            epsisodio: ['div.itemE a[title] div.title span.number'],
            img:[ {
                selector: 'div.itemE a[title] div.thumb img[title]',
                value:'src'
                 }],
             url:[ {
                selector: 'div.itemE a[title]',
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
            titulo: ['ul.genres li span'],
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
            console.log(episodes);
        
            return episodes;
          } catch (error) {
            console.error(error);
          }
        }
    
    async listarUtilmosEpisodios() {
      try {
        // 1. Busca o HTML
        const { data } = await this.axios.get(`${this.url}home`);
        // 2. Carrega o HTML no Cheerio
        const $ = this.cheerio.load(data);
        // 3. Extrai dados usando seletores CSS
        const dados = $.extract({
            titulo: ['div.itemE a[title] div.title span.title_anime'],
            epsisodio: ['div.itemE a[title] div.title span.number'],
            img:[ {
                selector: 'div.itemE a[title] div.thumb img[title]',
                value:'src'
                 }],
             url:[ {
                selector: 'div.itemE a[title]',
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
    console.log(episodes)
        return episodes;
      } catch (error) {
        console.error(error);
      }
    }

}

module.exports = Animes;
