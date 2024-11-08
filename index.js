const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;  // usa a porta que o Cloud Run define no ambiente

// Servindo os arquivos estáticos do diretório 'dist'
app.use(express.static(path.join(__dirname, 'dist/hurr-ui')));

// Redirecionando todas as outras rotas para o 'index.html'
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/hurr-ui/index.html'));
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});