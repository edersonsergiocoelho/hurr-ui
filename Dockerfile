# Usando a imagem do Node.js 18 como base para a construção do projeto Angular
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

# Compilando a aplicação Angular para produção
RUN ng build --prod

# Usando a imagem do Nginx para servir a aplicação
FROM nginx:alpine

# Copiando os arquivos compilados da aplicação Angular para o diretório de conteúdo do Nginx
COPY --from=build /usr/src/app/dist/hurr-ui /usr/share/nginx/html

# Copiando o arquivo de configuração do Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Expondo a porta 80, que o Nginx vai escutar
EXPOSE 80

# Iniciando o Nginx
CMD ["nginx", "-g", "daemon off;"]