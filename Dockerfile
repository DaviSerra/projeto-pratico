# usar imagem oficial do Node.js
FROM node:20-alpine

# definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# copiar código da aplicação
COPY . .

# copiar arquivo .env
COPY .env .

# expor porta 5173
EXPOSE 5173

# comando para iniciar a aplicação
CMD ["npm", "run", "dev", "--", "--host"]