    FROM node:19-alpine

    WORKDIR /app

    COPY package*.json ./

    RUN npm install
    RUN npm install -g gulp-cli

    COPY . .

    CMD ["npm", "start"]