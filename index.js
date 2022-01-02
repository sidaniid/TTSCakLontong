const fetch = require('node-fetch');
const cheerio = require('cheerio');

const TTS = async () => {
  return new Promise(async (resolve, reject) => {
    try{
      const response = await fetch('https://www.cademedia.com/jawaban-tts-cak-lontong');

      const body =  await response.text();

      const $ = cheerio.load(body);
      const soal = [];
      const jawaban = []

      const soup = $;

      soup('p').each(function(i, e) {
        soup(e).find('b').each(function(j, s) {
          jawaban.push(soup(s).text())
        });
      });
      soup('p').each(function(i, e) {
          var fixdata = soup(e).text().split(" J ")[0].split(" P : ")[1]
          soal.push(fixdata)
      });
      var fixsoal = soal.filter(function(x) {
        return x !== undefined;
      });
      const data = {
        "soal": fixsoal,
        "jawaban": jawaban
      };
      await resolve(data);
    }catch(e){
      reject(e)
    }
  })
};

TTS().then(data => console.log(data))