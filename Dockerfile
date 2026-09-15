FROM node:20-slim

# Install dependencies required by MongoDB binaries in Linux Debian
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    libcurl4 \
    openssl \
    liblzma5 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN ["npm", "i"] 

COPY . .

RUN chown node:node /app

USER node

EXPOSE 3001

CMD ["npm", "start"]
