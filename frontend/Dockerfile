FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app
RUN npm install -g serve
# Copy our node module specification
COPY package* ./


# install node modules and build assets
RUN npm install
# Copy all files from current directory to working dir in image
# Except the one defined in '.dockerignore'
COPY . .

# Create production build of React App
RUN npm run build
# RUN mkdir -p ./build/election_portal
# RUN mv ./build/static ./build/election_portal/static
# RUN mv ./build/manifest.json ./build/election_portal/manifest.json
# RUN mv ./build/favicon.ico ./build/election_portal/favicon.ico
# RUN mv ./build/asset-manifest.json ./build/election_portal/asset-manifest.json
# RUN mv ./build/logo192.png ./build/election_portal/logo192.png