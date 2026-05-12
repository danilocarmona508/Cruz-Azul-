# Usar imagen oficial de Node.js
FROM node:18-alpine

# Crear directorio de trabajo en el contenedor
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código (server.js y la carpeta public)
COPY . .

# Exponer el puerto de Node.js
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]