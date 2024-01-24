const conexao = require("../../database/conexao");
const bcrypt = require("bcrypt");
const {
  schemaCadastroUsuario,
} = require("../../validations/validacoesCadastroUsuario");

const cadastrarUsuario = async (req, res) => {
  const { error, value } = schemaCadastroUsuario.validate(req.body);

  if (error) {
    const errorMessage = error.details[0].message;
    return res.status(400).json({ erro: errorMessage });
  }

  const { nome, email, senha } = value;

  try {
    const usuarioExistente = await conexao("usuarios")
      .where("email", email)
      .first();
    if (usuarioExistente) {
      return res.status(400).json({ erro: "E-mail já cadastrado" });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuarioCadastrado = await conexao("usuarios")
      .insert({
        nome,
        email,
        senha: senhaHash,
      })
      .returning(["nome", "email"]);

    return res
      .status(201)
      .json({
        mensagem: "Usuário cadastrado com sucesso",
        usuario: usuarioCadastrado[0],
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
};

module.exports = { cadastrarUsuario };
