# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build  
 # Vite outputs to /dist

# Serve stage (using a lightweight static server)
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# Optional: custom nginx config for SPA routing
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
