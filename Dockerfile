FROM node:18-slim

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración y dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto de la aplicación
COPY . .

# Instalar PM2 globalmente
RUN npm install -g pm2

# Exponer el puerto que usará tu aplicación
EXPOSE 5200

# Comando para iniciar la aplicación al ejecutar el contenedor
CMD ["pm2-runtime", "dist/app.js"]
