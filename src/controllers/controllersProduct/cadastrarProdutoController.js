const conexao = require("../../database/conexao");
const { schemaCadastroProduto } = require("../../validations/validacoesCadastroProduto");


const knex = require("../../database/conexao");
const { uploadImagem } = require("../../services/upload");


const cadastrarProduto = async (req, res) => {

  const { error, value } = schemaCadastroProduto.validate(req.body);

  if (error) {
    return res.status(400).json({ mensagem: error.message });
  }

  const { descricao, quantidade_estoque, valor, categoria_id, produto_imagem } = value;

  const { originalname, mimetype, buffer } = req.file

  try {


    const categoriaExistente = await conexao("categorias")
      .where("id", categoria_id)
      .first();

    if (!categoriaExistente) {
      return res.status(400).json({ mensagem: 'A categoria informada não existe.' });
    }

    const produtoCadastrado = await conexao("produtos")
      .insert({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,

      })
      .returning('*');

    if (!produtoCadastrado) {
      return res.status(400).json('O produto não foi cadastrado.')
    }

    const id = produtoCadastrado[0].id

    const imagem = await uploadImagem(
      `produtos/${id}/${originalname}`,
      buffer,
      mimetype
    )
    await knex('produtos').update({
      produto_imagem: imagem.path
    }).where({ id })

    return res.status(201).json({ mensagem: 'Produto cadastrado com sucesso.', produto: produtoCadastrado[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
};

module.exports = { cadastrarProduto };