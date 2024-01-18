const express = require('express');
const usuarioController = require('../controllers/usuarioController');


const router = express.Router();


//Galera depois removo os comentários é só pra organizar a ordem das rotas ok ;).

// Rota para listar categorias

// Rota para cadastrar usuário (Leonardo)
router.post('/usuario', 
  usuarioController.cadastrarUsuario);

// Rota para login


// Middleware para autenticação nas rotas subsequentes


// Rota para detalhar perfil do usuário

// Rota para editar perfil do usuário




module.exports = router;