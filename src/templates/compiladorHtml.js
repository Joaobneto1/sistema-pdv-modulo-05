const fs = require('fs/promises');
const handlebars = require('handlebars');

const compiladorHtml = async (arquivo, contexto) => {
  try {
    const caminhoAbsoluto = require('path').resolve(arquivo);


    const html = await fs.readFile(caminhoAbsoluto, 'utf-8');
    const compilador = handlebars.compile(html);
    return compilador(contexto);
  } catch (error) {
    throw new Error(`Erro ao ler o arquivo HTML: ${arquivo}`);
  }
};

module.exports =  compiladorHtml ;