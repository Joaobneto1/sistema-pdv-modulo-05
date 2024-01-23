const knex = require("../../database/conexao");
const bcrypt = require("bcrypt");
const { schemaEditarUsuario } = require("../../validations/validacoesEditarUsuario");

const editarUsuario = async (req, res) => {
  const { error } = schemaEditarUsuario.validate(req.body);

  if (error) {
    const errorMessage = error.details[0].message;
    return res.status(400).json({ erro: errorMessage });
  }

  const { nome, email, senha } = req.body;

  try {
    const emailExiste = await knex("usuarios").where({ email }).first();

    if (emailExiste && email == !req.usuario.email) {
      return res.status(400).json({ mensagem: "O email já existe" });
    }
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuarioEditado = await knex("usuarios")
      .where({ id: req.usuario.id })
      .update({
        nome,
        email,
        senha: senhaCriptografada,
      });

    if (!usuarioEditado) {
      return res.status(400).json("Usuário não foi atualizado.");
    }

    return res.status(200).json("Usuário atualizado com sucesso.");
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

module.exports = editarUsuario;
