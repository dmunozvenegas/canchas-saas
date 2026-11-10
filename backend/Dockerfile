FROM node:20-alpine

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

EXPOSE 3001

# Ejecutar nodemon configurado en el package.json
CMD ["npm", "run", "dev"]