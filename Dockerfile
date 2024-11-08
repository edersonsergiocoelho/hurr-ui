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

# Compilando a aplicação Angular para produção (substituindo --prod por --configuration production)
RUN ng build --configuration production

# Usando a imagem do Nginx para servir a aplicação
FROM nginx:alpine

# Definindo a variável de ambiente PORT para o Google Cloud Run
ENV PORT 8080

# Copiando os arquivos compilados da aplicação Angular para o diretório de conteúdo do Nginx
COPY --from=build /usr/src/app/dist/hurr-ui /usr/share/nginx/html

# Copiando o arquivo de configuração do Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Expondo a porta que o Nginx irá escutar
EXPOSE 8080

# Iniciando o Nginx
CMD ["nginx", "-g", "daemon off;"]