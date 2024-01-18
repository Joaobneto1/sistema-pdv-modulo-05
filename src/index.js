const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const routes = require('./routes/routes');

const app = express();
app.use(express.json());
 
app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`);
});


app.use(routes);