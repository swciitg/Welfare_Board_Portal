FROM node:18-alpine AS builder
WORKDIR /usr/src/app/frontend
RUN npm install -g serve
COPY package* ./
COPY . .
RUN npm run build
RUN mkdir -p ./build/welfare_board
RUN mv ./build/static/* ./build/welfare_board/static/
RUN mv ./build/*.json ./build/welfare_board/ \
    && mv ./build/*.ico ./build/welfare_board/ \
    && mv ./build/*.png ./build/welfare_board/ \
    && mv ./build/*.svg ./build/welfare_board/ 
