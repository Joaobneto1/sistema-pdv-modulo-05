const conexao = require("../../database/conexao");
const { uploadImagem } = require("../../services/upload");
const { schemaCadastroProduto } = require("../../validations/validacoesCadastroProduto");

const cadastrarProduto = async (req, res) => {
  const { error, value } = schemaCadastroProduto.validate(req.body);

  if (error) {
    return res.status(400).json({ mensagem: error.message });
  }

  const { descricao, quantidade_estoque, valor, categoria_id } = value;
  const { originalname, mimetype, buffer } = req.file;

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
        produto_imagem: null
      })
      .returning('*');

    if (!produtoCadastrado || produtoCadastrado.length === 0) {
      return res.status(400).json({ mensagem: 'O produto não foi cadastrado.' });
    }

    const id = produtoCadastrado[0].id;

    const imagem = await uploadImagem(
      `produtos/${id}/${originalname}`,
      buffer,
      mimetype
  );

  const imageUrl = `https://${process.env.BUCKET_NAME}.${process.env.ENDPOINT_BACKBLAZE}/${imagem.path}`;


  await conexao('produtos')
      .update({
          produto_imagem: imageUrl
      })
      .where({ id });
 
  return res.status(201).json({
      mensagem: 'Produto cadastrado com sucesso.',
      produto: {
          ...produtoCadastrado[0],
          produto_imagem: imageUrl 
      }
  });
} catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
};

module.exports = { cadastrarProduto };