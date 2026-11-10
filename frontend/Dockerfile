FROM node:20-alpine

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

EXPOSE 5173

# Ejecutar Vite con host expuesto
CMD ["npm", "run", "dev"]