const http = require('http');
const fs = require('fs');
const path = require('path');

// Função para lidar com as requisições
const handleRequest = (req, res) => {
    console.log('URL requisitada:', req.url);  // Adiciona log da URL requisitada
    let filePath = '';

    // Rota para a página inicial
    if (req.url === '/') {
        filePath = path.join(__dirname, 'index.html');  // Caminho para o index.html
    }
    // Rota para a página sobre
    else if (req.url === '/sobre') {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Esta é a página sobre.');
        return;
    }
    // Servir o CSS
    else if (req.url === '/styles.css') {
        filePath = path.join(__dirname, 'styles.css');  // Caminho para o CSS
    }
    // Servir o JavaScript
    else if (req.url === '/script.js') {
        filePath = path.join(__dirname, 'script.js');  // Caminho para o JS
    }
    // Rota não encontrada
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Página não encontrada (404).');
        return;
    }

    // Determinar o Content-Type com base na extensão do arquivo
    const extname = path.extname(filePath);
    let contentType = 'text/html';
    switch (extname) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
    }

    // Ler o arquivo e enviá-lo na resposta
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Erro interno do servidor.');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
};

// Criação do servidor
const server = http.createServer(handleRequest);

// Porta para o servidor escutar
server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
