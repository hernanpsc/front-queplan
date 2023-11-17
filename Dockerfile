FROM node:18-slim
WORKDIR /app

# Install dependencies and build the project.
COPY package*.json ./
RUN npm install
COPY . .

RUN npm install -g pm2

EXPOSE 5200
RUN npm run build

# Run the web service on container startup.
CMD ["pm2-runtime", "dist/server.js"]
