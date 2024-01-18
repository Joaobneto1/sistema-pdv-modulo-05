const express = require('express');
const {cadastrarUsuario} = require('../controllers/cadastroUsuarioController');
const { listarCategorias } = require('../controllers/categoriaController');
const verificarLogin = require('../middlewares/loginVerify');
const loginUsuario = require('../controllers/loginController');


const router = express.Router();


//Galera depois removo os comentários é só pra organizar a ordem das rotas ok ;).

// Rota para listar categorias
router.get('/categoria', listarCategorias);
// Rota para cadastrar usuário
router.post('/usuario',  cadastrarUsuario);
// Rota para login
router.post('/login', loginUsuario)

// Middleware para autenticação nas rotas subsequentes
router.use(verificarLogin)
 
// Rota para detalhar perfil do usuário

// Rota para editar perfil do usuário




module.exports = router;
