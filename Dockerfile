FROM node:18-slim

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    bzip2 \
    fonts-liberation \
    libappindicator3-1 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-glib-1-2 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libfontconfig1 \
    x11-utils \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración y dependencias
COPY package*.json ./

# Limpiar caché de npm y luego instalar dependencias
RUN npm cache clean --force && npm install

# Copiar el resto de la aplicación
COPY . .

# Instalar PM2 globalmente
RUN npm install -g pm2

# Exponer el puerto que usará tu aplicación
EXPOSE 5200

# Comando para iniciar la aplicación al ejecutar el contenedor
CMD ["pm2-runtime", "dist/app.js"]
