# Usando a imagem do Node.js 18 como base para a construção do projeto Angular
FROM node:18 AS build

# Definindo o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Instalando o Angular CLI globalmente
RUN npm install -g @angular/cli

# Copiando o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalando as dependências do projeto
RUN npm install

# Copiando todo o código do projeto para o diretório de trabalho
COPY . .

# Compilando a aplicação Angular para produção
RUN ng build --configuration production

# Usando a imagem do Node.js para servir o aplicativo
FROM node:18-alpine

# Definindo o diretório de trabalho
WORKDIR /usr/src/app

# Instalando dependências do servidor (caso necessário)
COPY package*.json ./
RUN npm install

# Copiando os arquivos compilados do Angular para o diretório de trabalho
COPY --from=build /usr/src/app/dist/hurr-ui ./dist/hurr-ui

# Copiando o servidor Node.js para servir o Angular (index.js)
COPY index.js .

# Expondo a porta 8080, que será usada pelo Node.js
EXPOSE 8080

# Iniciando o servidor Node.js
CMD ["node", "index.js"]