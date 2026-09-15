FROM node:20-slim

WORKDIR /app

COPY package*.json ./

RUN ["npm", "i"] 

COPY . .

RUN chown node:node /app

USER node

EXPOSE 3001

CMD ["npm", "start"]
