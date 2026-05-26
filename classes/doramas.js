const Scraper = require('./scraper')

class Dorama extends Scraper{
    url= 'https://doramasonline.org/br/generos/dublado/';

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
        console.log(dados);
    
        return episodes;
      } catch (error) {
        console.error(error);
      }
    }

    async filtrarAnimes(){

    }

}



 module.exports= Dorama;

