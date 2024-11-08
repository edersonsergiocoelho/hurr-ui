# Usando a imagem do Node.js 18 como base para a construção do projeto Angular
FROM node:18 AS build

# Definindo o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Instalando as dependências
COPY package*.json ./
RUN npm install

# Copiando o código para o diretório de trabalho
COPY . .

# Compilando a aplicação Angular para produção
RUN npm run build --configuration production

# Configuração para rodar o servidor com Node.js e Express
FROM node:18-alpine

WORKDIR /usr/src/app

# Copiando o código da aplicação compilada e o servidor para o contêiner final
COPY --from=build /usr/src/app/dist/hurr-ui /usr/src/app/dist/hurr-ui
COPY index.js .

# Expondo a porta que o Express usará
EXPOSE 8080

# Iniciando a aplicação
CMD ["node", "index.js"]