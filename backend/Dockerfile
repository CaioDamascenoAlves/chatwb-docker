# Use uma imagem Node.js como base
FROM node:alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos necessários para o contêiner
COPY package.json package-lock.json /app/
COPY . /app/

# Instala as dependências
RUN npm install

# Expõe a porta em que o servidor do Node.js estará escutando
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]
