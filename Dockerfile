#Primero definimos una imagen de base : node;

FROM node 

#Despues creamos una carpeta interna donde vamos a guardar nuestro proyecto (usualmente es app)
WORKDIR /app

#Con esto, copiamos el package.json de nuestra carpeta actual a la carpeta dockeroperations

COPY package*.json ./

#Una vez copiado el package.json, procedemos a ejecutar un npm install interno en esa carpeta.

RUN npm install

#Despues de la instalacion, procedemos a tomar todo el codigo del aplicativo 

COPY . .

#Exponemos un puerto para que este escuche a partir de un puerto de nuestra computadora

EXPOSE 8080

#Una vez realizado se debera ejectuar "npm start" para inicializar la aplicacion (comando:  preconfigurar en packaje.json) 

CMD ["npm","start"]