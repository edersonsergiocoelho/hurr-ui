# Usando uma imagem do Node.js 18 como base
FROM node:18

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

# Expondo a porta que a aplicação usa
EXPOSE 4200

# Comando para iniciar a aplicação Angular em modo de desenvolvimento
CMD ["ng", "serve", "--host", "0.0.0.0"]
