const express = require('express');
const { cadastrarUsuario } = require('../controllers/cadastroUsuarioController');
const { listarCategorias } = require('../controllers/categoriaController');
const verificarLogin = require('../middlewares/loginVerify');
const loginUsuario = require('../controllers/loginController');
const editarUsuario = require('../controllers/editarUsuario');
const { detalharUsuario } = require('../controllers/detalharUsuarioController');


const router = express.Router();




// Rota para listar categorias
router.get('/categoria', listarCategorias);
// Rota para cadastrar usuário
router.post('/usuario', cadastrarUsuario);
// Rota para login
router.post('/login', loginUsuario)

// Middleware para autenticação nas rotas subsequentes
router.use(verificarLogin)

// Rota para detalhar perfil do usuário
router.get('/usuario', detalharUsuario);

// Rota para editar perfil do usuário
router.put('/usuario', editarUsuario)


module.exports = router;
