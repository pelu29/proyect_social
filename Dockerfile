# Usa una imagen base oficial de Node.js
FROM node:18

# Crea el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de tu código fuente
COPY . .

# Expone el puerto de la app (por ejemplo, 3000)
EXPOSE 3000

# Comando por defecto para ejecutar la app
CMD ["npm", "start"]